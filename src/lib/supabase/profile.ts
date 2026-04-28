// src/lib/supabase/profile.ts

/**
 * Supabase Profile utilities (no triggers).
 *
 * - `createProfileForCurrentUser` inserts a profile row for the logged‑in user.
 * - `setUserRole` updates the role (e.g., promote to admin).
 * - `getCurrentUserWithRole` fetches the auth user together with their role.
 *
 * Import and use these helpers wherever you handle sign‑up, login, or admin actions.
 */

import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

const supabase = createClient();

/**
 * Insert a profile row for a specific user ID.
 * If a profile already exists, it updates the fields.
 *
 * @param userId The UUID of the user from auth.users
 * @param options Optional profile fields.
 */
export async function createProfile(userId: string, options?: {
  fullName?: string;
  avatarUrl?: string;
  role?: string;
}) {
  const { fullName = '', avatarUrl = '', role = 'user' } = options || {};

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      full_name: fullName,
      avatar_url: avatarUrl,
      role,
    }, { onConflict: 'id' });

  if (error) {
    console.error('Failed to create profile:', error);
    throw error;
  }
}

/**
 * Check if a profile exists for a specific user ID.
 * If it doesn't, creates it.
 */
export async function ensureProfileExists(userId: string, options?: {
  fullName?: string;
  avatarUrl?: string;
  role?: string;
}) {
  // Check if profile exists
  const { data } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .single();

  if (!data) {
    // Does not exist, let's create it
    await createProfile(userId, options);
  }
}

/**
 * Insert a profile row for the currently authenticated user.
 * If a profile already exists, the row is left untouched (upsert).
 *
 * @param options Optional profile fields.
 */
export async function createProfileForCurrentUser(options?: {
  fullName?: string;
  avatarUrl?: string;
  role?: string; // defaults to "user"
}) {
  const { data: { session }, error: sessErr } = await supabase.auth.getSession();
  if (sessErr || !session) {
    throw new Error('User not authenticated');
  }

  const userId = session.user.id;
  const { fullName = '', avatarUrl = '', role = 'user' } = options || {};

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      full_name: fullName,
      avatar_url: avatarUrl,
      role,
    })
    .eq('id', userId); // ensure a single row per user

  if (error) {
    console.error('Failed to create profile:', error);
    throw error;
  }
}

/**
 * Update the role for a given user (admin, staff, user, …).
 *
 * @param userId UUID of the user in auth.users
 * @param newRole New role string
 */
export async function setUserRole(userId: string, newRole: string) {
  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId);

  if (error) {
    console.error('Failed to set role:', error);
    throw error;
  }
}

/**
 * Fetch the currently logged‑in user together with their role.
 */
export async function getCurrentUserWithRole(): Promise<{ user: User | null; role: string | null }> {
  const { data: { session }, error: sessErr } = await supabase.auth.getSession();
  if (sessErr || !session) {
    return { user: null, role: null };
  }

  const { data: profile, error: profErr } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  return {
    user: session.user,
    role: profile?.role ?? null,
  };
}
