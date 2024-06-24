import { addShoppingCart } from '@/services/order_service';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const itemId = formData.get('itemId') as string | null;
  const food = formData.get('food') as string | null;
  const toilet = formData.get('toilet') as string | null;
  const cage = formData.get('cage') as string | null;
  const bed = formData.get('bed') as string | null;
  const collar = formData.get('collar') as string | null;
  const toys = formData.getAll('toy') as string[];
  const cares = formData.getAll('care') as string[];

  const optionIdList = [
    food,
    toilet,
    cage,
    bed,
    collar,
    ...toys,
    ...cares,
  ] as string[];

  if (!itemId) {
    throw new Error('failed to fetch itemId');
  }
  console.log({ itemId, optionIdList });

  const result = await addShoppingCart(itemId, optionIdList);
  return new Response(JSON.stringify(result), { status: 200 });
};
