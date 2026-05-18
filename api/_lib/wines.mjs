import { createClient } from '@supabase/supabase-js';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from './env.mjs';

const wineColumns = `
  bottle,
  order_index,
  wine_name,
  region,
  appel,
  cepage,
  conditionnement,
  price,
  garde,
  temp,
  description,
  pairing,
  caract,
  bottle_image_path,
  title_image_path
`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const localWineFiles = [
  'src/content/wines/elixir.json',
  'src/content/wines/godefroy.json',
  'src/content/wines/brouilly.json',
  'src/content/wines/cdb.json',
  'src/content/wines/sans-artifice.json',
  'src/content/wines/blanc-de-gamay.json',
  'src/content/wines/passion.json',
];

const supabaseAdmin = env.supabaseUrl && env.supabaseServiceRoleKey
  ? createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    })
  : null;

const normalizeWine = (wine) => ({
  order: wine.order_index ?? 0,
  bottle: wine.bottle,
  wineName: wine.wine_name,
  region: wine.region,
  appel: wine.appel,
  cepage: wine.cepage,
  conditionnement: wine.conditionnement,
  price: wine.price || '',
  garde: wine.garde,
  temp: wine.temp,
  desc: wine.description,
  assoc: wine.pairing,
  caract: wine.caract,
  bottleImagePath: wine.bottle_image_path || '',
  titleImagePath: wine.title_image_path || '',
});

const toRow = (wine) => ({
  bottle: wine.bottle,
  order_index: wine.order ?? 0,
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

function getAdminClient() {
  if (!supabaseAdmin) {
    throw new Error('Missing Supabase service role configuration.');
  }

  return supabaseAdmin;
}

export async function uploadWineImage({ bottle, kind, file }) {
  if (!bottle || !kind || !file) {
    throw new Error('Missing upload payload.');
  }

  const client = getAdminClient();
  const safeName = (file.name || `${kind}.bin`).replace(/[^a-zA-Z0-9._-]/g, '-');
  const folder = bottle.toLowerCase();
  const path = `${folder}/${kind}-${Date.now()}-${safeName}`;
  const contentType = file.type || 'application/octet-stream';
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await client.storage
    .from(env.supabaseWineBucket)
    .upload(path, arrayBuffer, {
      contentType,
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw error;
  }

  return path;
}

export async function fetchWines() {
  const client = getAdminClient();
  const { data, error } = await client
    .from('wines')
    .select(wineColumns)
    .order('order_index', { ascending: true });

  if (error) {
    throw error;
  }

  return (data || []).map(normalizeWine);
}

export async function saveWine(wine) {
  const client = getAdminClient();
  const row = toRow(wine);

  const { data, error } = await client
    .from('wines')
    .upsert(row, { onConflict: 'bottle' })
    .select(wineColumns)
    .single();

  if (error) {
    throw error;
  }

  return normalizeWine(data);
}

export async function seedWinesFromLocalFiles() {
  const wines = await Promise.all(
    localWineFiles.map(async (file, index) => {
      const content = await readFile(path.join(rootDir, file), 'utf8');
      const wine = JSON.parse(content);
      return {
        ...wine,
        order: index,
      };
    }),
  );

  const client = getAdminClient();
  const rows = wines.map(toRow);
  const { data, error } = await client
    .from('wines')
    .upsert(rows, { onConflict: 'bottle' })
    .select(wineColumns)
    .order('order_index', { ascending: true });

  if (error) {
    throw error;
  }

  return (data || []).map(normalizeWine);
}
