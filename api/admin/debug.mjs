import { env } from '../_lib/env.mjs';

const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export async function GET() {
  return json({
    envVisibleToFunction: {
      SUPABASE_URL: Boolean(env.supabaseUrl),
      SUPABASE_PUBLISHABLE_KEY: Boolean(env.supabasePublishableKey),
      SUPABASE_SECRET_KEY_OR_SERVICE_ROLE: Boolean(env.supabaseServiceRoleKey),
      SUPABASE_WINE_BUCKET: env.supabaseWineBucket || '',
      ADMIN_ALLOWED_EMAILS: Boolean(env.adminAllowedEmails),
    },
  });
}
