import { fetchWithCache } from '@/lib/chche';
import {
  ItemDetailSchema,
  ItemListSchema,
  ItemPageSchema,
  type ItemDetail,
  type ItemList,
  type ItemPage,
  type SearchQuery,
} from '@/types/item_types';

export const fetchItemList = async (): Promise<ItemList> => {
  const response = await fetchWithCache(
    `http://localhost:8080/api/getItemList`
  );
  if (!response.ok) {
    throw new Error('failed to fetch items');
  }
  const data = await response.json();
  const parsed = ItemListSchema.parse(data);

  return parsed;
};

export const fetchItemDetail = async (id: string): Promise<ItemDetail> => {
  const response = await fetch(`http://localhost:8080/showDetail?id=${id}`);
  if (!response.ok) {
    throw new Error('failed to fetch items');
  }
  const data = await response.json();
  const parsed = ItemDetailSchema.parse(data);

  return parsed;
};

export const fetchItemsWithParams = async (
  query: SearchQuery
): Promise<ItemPage> => {
  const response = await fetch(`http://localhost:8080/api/getItemList/page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  });
  if (!response.ok) {
    throw new Error('failed to fetch items');
  }
  const data = await response.json();
  const parsed = ItemPageSchema.parse(data);
  return parsed;
};
