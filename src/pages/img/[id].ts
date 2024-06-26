import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request, locals, redirect }) => {
  const id = params.id;
  const image = await fetch(`http://back:8080/img/${id}`);
  return image;
};
