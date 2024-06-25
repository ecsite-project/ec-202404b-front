import { type CreateOrderForm } from '@/types/order_types';

export const finalizeOrder = async (
  userId: string,
  form: CreateOrderForm,
  orderItemIdList: string[]
): Promise<void> => {
  const response = await fetch(`http://localhost:8080/api/confirm/finalize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ form: { userId, ...form, orderItemIdList } }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
  return;
};
