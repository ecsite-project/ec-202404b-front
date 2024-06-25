export const addShoppingCart = async (
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
        itemId,
        optionIdList,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to add items');
  }
  const result = await response.json();
  return result;
};
