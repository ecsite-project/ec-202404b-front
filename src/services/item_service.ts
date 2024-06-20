import { ItemListSchema, type Item } from '@/types/item_types';

export const fetchItemList = async (): Promise<Item[]> => {
  const response = await fetch('http://localhost:8080/api/getItemList', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  const data = await response.json();
  const parsed = ItemListSchema.parse(data);
  return parsed;
};
