export const fetchItems = async () => {
  const response = await fetch(`http://localhost:8080/api/getItemList`);
  if (!response.ok) {
    throw new Error('failed to fetch items');
  }
  const data = await response.json();
  return data;
};
