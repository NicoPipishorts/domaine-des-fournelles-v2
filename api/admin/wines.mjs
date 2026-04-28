import { fetchWines, saveWine, seedWinesFromLocalFiles } from '../_lib/wines.mjs';
import { requireAdmin } from '../_lib/auth.mjs';

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
    const wines = await fetchWines();
    return json({ wines });
  } catch (error) {
    return json({ error: error.message || 'Unable to fetch wines.' }, 500);
  }
}

export async function PUT(request) {
  const auth = await requireAdmin(request);

  if (auth.error) {
    return json({ error: auth.error }, auth.status);
  }

  try {
    const { wine } = await request.json();

    if (!wine?.bottle) {
      return json({ error: 'Missing wine payload.' }, 400);
    }

    const savedWine = await saveWine(wine);
    return json({ ok: true, wine: savedWine });
  } catch (error) {
    return json({ error: error.message || 'Unable to save wine.' }, 500);
  }
}

export async function POST(request) {
  const auth = await requireAdmin(request);

  if (auth.error) {
    return json({ error: auth.error }, auth.status);
  }

  try {
    const wines = await seedWinesFromLocalFiles();
    return json({ wines, ok: true });
  } catch (error) {
    return json({ error: error.message || "Unable to initialize wines." }, 500);
  }
}
