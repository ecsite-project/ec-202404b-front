import { fetchWithCache } from '@/lib/chche';
import {
  ItemListSchema,
  ItemPageSchema,
  type ItemPage,
  type SearchQuery,
} from '@/types/item_types';

export const fetchItemPage = async (): Promise<ItemPage> => {
  const response = await fetchWithCache(
    `http://localhost:8080/api/getItemList`
  );
  if (!response.ok) {
    throw new Error('failed to fetch items');
  }
  const data = await response.json();
  const parsed = ItemListSchema.parse(data);
  const currentPage = 1;
  const perPage = 10;
  const page: ItemPage = {
    records: parsed.slice((currentPage - 1) * perPage, currentPage * perPage),
    metadata: {
      currentPage: currentPage,
      perPage: perPage,
      lastPage: Math.ceil(parsed.length / perPage),
      total: parsed.length,
    },
  };
  return page;
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
