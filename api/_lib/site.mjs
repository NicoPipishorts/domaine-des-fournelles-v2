import { createClient } from '@supabase/supabase-js';
import { env } from './env.mjs';
import { siteContentDefaults } from '../../src/content/site.js';

const supabaseAdmin = env.supabaseUrl && env.supabaseServiceRoleKey
  ? createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    })
  : null;

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

function getAdminClient() {
  if (!supabaseAdmin) {
    throw new Error('Missing Supabase service role configuration.');
  }

  return supabaseAdmin;
}

export async function fetchSiteContent() {
  const client = getAdminClient();
  const { data, error } = await client
    .from('site_content')
    .select('content_key, content_value');

  if (error) {
    throw error;
  }

  const rows = data || [];

  return Object.keys(siteContentDefaults).reduce((accumulator, key) => {
    const row = rows.find((item) => item.content_key === key);
    accumulator[key] = row?.content_value
      ? deepMerge(siteContentDefaults[key], row.content_value)
      : siteContentDefaults[key];
    return accumulator;
  }, {});
}

export async function saveSiteContent(contentKey, contentValue) {
  const client = getAdminClient();
  const { data, error } = await client
    .from('site_content')
    .upsert(
      {
        content_key: contentKey,
        content_value: contentValue,
      },
      { onConflict: 'content_key' },
    )
    .select('content_key, content_value')
    .single();

  if (error) {
    throw error;
  }

  return {
    key: data.content_key,
    value: deepMerge(siteContentDefaults[data.content_key], data.content_value),
  };
}

export async function seedSiteContentFromDefaults() {
  const client = getAdminClient();
  const rows = Object.entries(siteContentDefaults).map(([content_key, content_value]) => ({
    content_key,
    content_value,
  }));

  const { data, error } = await client
    .from('site_content')
    .upsert(rows, { onConflict: 'content_key' })
    .select('content_key, content_value');

  if (error) {
    throw error;
  }

  return (data || []).reduce((accumulator, row) => {
    accumulator[row.content_key] = deepMerge(siteContentDefaults[row.content_key], row.content_value);
    return accumulator;
  }, {});
}
