import { addShoppingCart } from '@/services/order_service';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const formData = await request.formData();
  const options = [...formData.entries()]
    .filter(([key, value]) => key !== 'itemId' && value !== 'none')
    .map(([key, value]) => value as string);
  const itemId = formData.get('itemId') as string | null;
  if (!itemId) {
    throw new Error('failed to fetch itemId');
  }
  const optionIdList = options.filter((option) => option !== 'none');
  const userId = locals.user?.id ?? locals.anonymous?.uid;
  if (!userId) {
    throw new Error('failed to fetch userId');
  }
  const result = await addShoppingCart(userId, itemId, options);
  return redirect('/cart');
};
