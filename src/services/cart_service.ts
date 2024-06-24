import { OrderItemListSchema, type OrderItem } from '@/types/orderItem_types';

export const fetchCart = async (userId: string): Promise<OrderItem[]> => {
  const response = await fetch(
    `http://localhost:8080/api/shoppingCart/getShoppingCart`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
  const data = await response.json();

  const parsed = OrderItemListSchema.parse(data.orderItems);
  return parsed;
};
