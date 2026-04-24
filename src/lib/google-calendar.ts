import { google } from 'googleapis';

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'}/api/auth/google/callback`;

export const oauth2Client = new google.auth.OAuth2(
  clientID,
  clientSecret,
  redirectUri
);

export function getAuthUrl() {
  const scopes = [
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
  });
}

export async function getTokens(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

export async function createGoogleCalendarEvent(refreshToken: string, booking: {
  customer_name: string;
  service_title: string;
  date: string;
  time: string;
  customer_email: string;
}) {
  try {
    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Parse date and time
    // booking.date is usually YYYY-MM-DD
    // booking.time is usually "HH:MM AM/PM"
    const startDateTime = new Date(`${booking.date} ${booking.time}`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // Default 1 hour

    const event = {
      summary: `Booking: ${booking.service_title} - ${booking.customer_name}`,
      description: `Service: ${booking.service_title}\nCustomer: ${booking.customer_name}\nEmail: ${booking.customer_email}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'Africa/Lagos',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Africa/Lagos',
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    throw error;
  }
}
