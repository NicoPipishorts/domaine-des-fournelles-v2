import { supabaseClient } from './client';
import { siteContentDefaults } from '../content/site';

const deepMerge = (base, overrides) => {
  if (Array.isArray(base) || Array.isArray(overrides)) {
    return overrides ?? base;
  }

  if (
    base
    && typeof base === 'object'
    && overrides
    && typeof overrides === 'object'
  ) {
    const merged = { ...base };

    Object.keys(overrides).forEach((key) => {
      merged[key] = deepMerge(base[key], overrides[key]);
    });

    return merged;
  }

  return overrides ?? base;
};

export async function fetchSiteContent(contentKey) {
  const fallback = siteContentDefaults[contentKey];

  if (!supabaseClient || !fallback) {
    return fallback;
  }

  const { data, error } = await supabaseClient
    .from('site_content')
    .select('content_value')
    .eq('content_key', contentKey)
    .maybeSingle();

  if (error || !data?.content_value) {
    return fallback;
  }

  return deepMerge(fallback, data.content_value);
}
