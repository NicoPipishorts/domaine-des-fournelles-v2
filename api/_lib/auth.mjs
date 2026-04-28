import { createClient } from '@supabase/supabase-js';
import { env, getAllowedAdminEmails } from './env.mjs';

const supabaseServer = env.supabaseUrl && env.supabasePublishableKey
  ? createClient(env.supabaseUrl, env.supabasePublishableKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    })
  : null;

export async function requireAdmin(request) {
  if (!supabaseServer) {
    const missingKeys = [
      !env.supabaseUrl ? 'SUPABASE_URL' : null,
      !env.supabasePublishableKey ? 'SUPABASE_PUBLISHABLE_KEY' : null,
    ].filter(Boolean);

    return {
      error: `Missing Supabase server configuration: ${missingKeys.join(', ') || 'unknown'}.`,
      status: 500,
    };
  }

  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!token) {
    return { error: 'Missing authorization token.', status: 401 };
  }

  const { data, error } = await supabaseServer.auth.getUser(token);

  if (error || !data?.user) {
    return { error: 'Invalid Supabase session.', status: 401 };
  }

  const allowedEmails = getAllowedAdminEmails();
  const userEmail = (data.user.email || '').toLowerCase();

  if (allowedEmails.length && !allowedEmails.includes(userEmail)) {
    return { error: 'This user is not allowed to access the admin.', status: 403 };
  }

  return { user: data.user, status: 200 };
}
