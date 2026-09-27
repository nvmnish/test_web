import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const slug = url.searchParams.get('slug') || '/';

  const expectedSecret = process.env.SANITY_PREVIEW_SECRET || 'gls-preview-secret-2026';

  if (secret !== expectedSecret) {
    return new Response('Invalid preview authorization token or secret', { status: 401 });
  }

  // Enable preview mode by setting HTTP-only cookie
  cookies.set('sanity_preview', 'true', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  const destination = slug.startsWith('/') ? slug : `/${slug}`;
  return redirect(destination, 307);
};
