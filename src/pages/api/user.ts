import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, locals, redirect }) => {
  locals.user;
};
