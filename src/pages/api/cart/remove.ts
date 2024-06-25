import { removeFromCart } from '@/services/cart_service';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const orderItemId = formData.get('orderItemId') as string | null;
  if (!orderItemId) {
    throw new Error('failed to fetch orderItemId');
  }
  const result = await removeFromCart(orderItemId);
  return redirect('/cart');
};
