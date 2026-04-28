import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

dotenv.config({
  path: path.join(rootDir, '.env.local'),
  override: false,
});

export const env = {
  supabaseUrl: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '',
  supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || '',
  supabaseWineBucket: process.env.SUPABASE_WINE_BUCKET || process.env.VITE_SUPABASE_WINE_BUCKET || 'wines',
  adminAllowedEmails: process.env.ADMIN_ALLOWED_EMAILS || '',
};

export const getAllowedAdminEmails = () =>
  env.adminAllowedEmails
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
