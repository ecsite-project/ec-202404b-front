import { fetchWithToken } from '@/lib/fetch';
import { type CreateOrderForm } from '@/types/order_types';

export const finalizeOrder = async (
  token: string,
  form: CreateOrderForm,
  orderItemIdList: string[]
): Promise<void> => {
  const response = await fetchWithToken(
    `http://localhost:8080/api/confirm/finalize`,
    token,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ form: { ...form, orderItemIdList } }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }
  return;
};
