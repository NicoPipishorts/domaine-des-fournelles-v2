import { supabaseClient, wineBucketName } from './client';

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

const toPublicUrl = (path) => {
  if (!path || !supabaseClient) {
    return '';
  }

  const { data } = supabaseClient.storage.from(wineBucketName).getPublicUrl(path);
  return data?.publicUrl || '';
};

export const normalizeSupabaseWine = (wine) => ({
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
  bottleImageUrl: toPublicUrl(wine.bottle_image_path),
  titleImageUrl: toPublicUrl(wine.title_image_path),
});

export const hasSupabaseWineReadConfig = Boolean(supabaseClient);

export async function fetchPublicWines() {
  if (!supabaseClient) {
    throw new Error('Missing Supabase browser configuration.');
  }

  const { data, error } = await supabaseClient
    .from('wines')
    .select(wineColumns)
    .order('order_index', { ascending: true });

  if (error) {
    throw error;
  }

  return (data || []).map(normalizeSupabaseWine);
}
