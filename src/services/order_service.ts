export const addShoppingCart = async (
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
