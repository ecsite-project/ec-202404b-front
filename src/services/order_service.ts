import { OrderSchema, type Order } from '@/types/order_types';

export const finalizeOrder = async (
  userId: string,
  order: Order
): Promise<Order> => {
  const response = await fetch(`http://localhost:8080/api/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, order }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
  const data = await response.json();

  const parsed = OrderSchema.parse(data.order);
  return parsed;
};
