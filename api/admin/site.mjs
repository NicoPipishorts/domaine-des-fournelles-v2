import { requireAdmin } from '../_lib/auth.mjs';
import { fetchSiteContent, saveSiteContent, seedSiteContentFromDefaults } from '../_lib/site.mjs';

const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export async function GET(request) {
  const auth = await requireAdmin(request);

  if (auth.error) {
    return json({ error: auth.error }, auth.status);
  }

  try {
    const content = await fetchSiteContent();
    return json({ content });
  } catch (error) {
    return json({ error: error.message || 'Unable to fetch site content.' }, 500);
  }
}

export async function PUT(request) {
  const auth = await requireAdmin(request);

  if (auth.error) {
    return json({ error: auth.error }, auth.status);
  }

  try {
    const { contentKey, contentValue } = await request.json();

    if (!contentKey || !contentValue) {
      return json({ error: 'Missing site content payload.' }, 400);
    }

    const saved = await saveSiteContent(contentKey, contentValue);
    return json({ ok: true, saved });
  } catch (error) {
    return json({ error: error.message || 'Unable to save site content.' }, 500);
  }
}

export async function POST(request) {
  const auth = await requireAdmin(request);

  if (auth.error) {
    return json({ error: auth.error }, auth.status);
  }

  try {
    const content = await seedSiteContentFromDefaults();
    return json({ ok: true, content });
  } catch (error) {
    return json({ error: error.message || 'Unable to initialize site content.' }, 500);
  }
}
