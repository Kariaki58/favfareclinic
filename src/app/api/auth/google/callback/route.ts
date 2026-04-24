import { getTokens } from '@/lib/google-calendar';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/dashboard?error=no_code', request.url));
  }

  try {
    const tokens = await getTokens(code);
    
    if (!tokens.refresh_token) {
      // If we don't get a refresh token, it means the user already authorized.
      // We might need to prompt for consent again if we lost the token.
      // But for now, let's assume we want to save what we have.
      console.warn('No refresh token returned. User may have already authorized.');
    }

    const supabase = await createClient();
    
    // Get existing settings or create new
    const { data: existingSettings } = await supabase
      .from('admin_settings')
      .select('id')
      .single();

    const settingsData: any = {
      is_calendar_enabled: true,
      updated_at: new Date().toISOString(),
    };

    if (tokens.refresh_token) {
      settingsData.google_refresh_token = tokens.refresh_token;
    }

    if (existingSettings) {
      await supabase
        .from('admin_settings')
        .update(settingsData)
        .eq('id', existingSettings.id);
    } else {
      await supabase
        .from('admin_settings')
        .insert([settingsData]);
    }

    return NextResponse.redirect(new URL('/dashboard?success=calendar_connected', request.url));
  } catch (error) {
    console.error('Error in Google Auth callback:', error);
    return NextResponse.redirect(new URL('/dashboard?error=auth_failed', request.url));
  }
}
