import { OptionListSchema, type OptionList } from '@/types/option_type';

export const fetchOptions = async (): Promise<OptionList> => {
  const response = await fetch('http://localhost:8080/api/options');
  if (!response.ok) {
    throw new Error('Failed to fetch options');
  }
  const data = await response.json();
  const parsed = OptionListSchema.parse(data);
  return parsed;
};
