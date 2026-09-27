import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('sanity_preview', {
    path: '/',
  });

  return redirect('/', 307);
};
