import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteContentDefaults } from '../src/content/site.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env.local');

dotenv.config({
  path: envPath,
  override: true,
});

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_SECRET_KEY,
} = process.env;

const supabaseAdminKey = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !supabaseAdminKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY / SUPABASE_SECRET_KEY.');
  process.exit(1);
}

const client = createClient(SUPABASE_URL, supabaseAdminKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

const wineFiles = [
  'src/content/wines/elixir.json',
  'src/content/wines/godefroy.json',
  'src/content/wines/brouilly.json',
  'src/content/wines/cdb.json',
  'src/content/wines/sans-artifice.json',
  'src/content/wines/passion.json',
];

const toRow = (wine, index) => ({
  bottle: wine.bottle,
  order_index: index,
  wine_name: wine.wineName,
  region: wine.region,
  appel: wine.appel,
  cepage: wine.cepage,
  conditionnement: wine.conditionnement,
  price: wine.price || null,
  garde: wine.garde,
  temp: wine.temp,
  description: wine.desc,
  pairing: wine.assoc,
  caract: wine.caract,
  bottle_image_path: wine.bottleImagePath || null,
  title_image_path: wine.titleImagePath || null,
});

const run = async () => {
  const rows = await Promise.all(
    wineFiles.map(async (file, index) => {
      const content = await readFile(path.join(rootDir, file), 'utf8');
      return toRow(JSON.parse(content), index);
    }),
  );

  const { data, error } = await client
    .from('wines')
    .upsert(rows, { onConflict: 'bottle' })
    .select('bottle');

  if (error) {
    throw error;
  }

  data.forEach((wine) => {
    console.log(`Seeded ${wine.bottle}`);
  });

  const siteRows = Object.entries(siteContentDefaults).map(([content_key, content_value]) => ({
    content_key,
    content_value,
  }));

  const { data: siteData, error: siteError } = await client
    .from('site_content')
    .upsert(siteRows, { onConflict: 'content_key' })
    .select('content_key');

  if (siteError) {
    throw siteError;
  }

  siteData.forEach((item) => {
    console.log(`Seeded ${item.content_key}`);
  });
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
