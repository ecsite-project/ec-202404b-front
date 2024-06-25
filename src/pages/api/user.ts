import { fetchUserInfo } from '@/services/user_service';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, locals, redirect }) => {
  const userInfo = await fetchUserInfo(locals);
  return new Response(JSON.stringify(userInfo), {
    headers: {
      'content-type': 'application/json',
    },
  });
};
