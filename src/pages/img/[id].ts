import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request, locals, redirect }) => {
  const id = params.id;
  console.log('locals', locals);
  const image = await fetch(`http://localhost:8080/img/${id}`);
  return image;
};
