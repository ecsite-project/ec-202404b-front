import { OrderItemListSchema, type OrderItem } from '@/types/order_item_types';

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

export const addToCart = async (
  userId: string,
  itemId: string,
  optionIdList: string[]
) => {
  const response = await fetch(
    `http://localhost:8080/api/shoppingCart/addItem`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        itemId,
        optionIdList,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
  return;
};

export const removeFromCart = async (orderItemId: string) => {
  const response = await fetch(
    `http://localhost:8080/api/shoppingCart/deleteItem`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderItemId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
  return;
};
