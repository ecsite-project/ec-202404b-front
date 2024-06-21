import { OrderListSchema, type Order } from '@/types/order_types';

export const fetchCart = async (id: string): Promise<Order[]> => {
  const response = await fetch(
    `http://localhost:8080/api/shoppingCart/getShoppingCart`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
  const data = await response.json();
  const parsed = OrderListSchema.parse(data);
  return parsed;
};
