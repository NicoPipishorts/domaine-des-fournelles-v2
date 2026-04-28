import { requireAdmin } from '../_lib/auth.mjs';
import { saveWine, uploadWineImage } from '../_lib/wines.mjs';

const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export async function POST(request) {
  const auth = await requireAdmin(request);

  if (auth.error) {
    return json({ error: auth.error }, auth.status);
  }

  try {
    const formData = await request.formData();
    const bottle = formData.get('bottle');
    const kind = formData.get('kind');
    const rawWine = formData.get('wine');
    const file = formData.get('file');

    if (typeof bottle !== 'string' || typeof kind !== 'string' || typeof rawWine !== 'string' || !(file instanceof File)) {
      return json({ error: 'Invalid upload payload.' }, 400);
    }

    const wine = JSON.parse(rawWine);
    const path = await uploadWineImage({ bottle, kind, file });
    const field = kind === 'bottle' ? 'bottleImagePath' : 'titleImagePath';
    const savedWine = await saveWine({
      ...wine,
      [field]: path,
    });

    return json({ ok: true, wine: savedWine, path });
  } catch (error) {
    return json({ error: error.message || "Unable to upload image." }, 500);
  }
}
