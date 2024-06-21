export const fetchCart = async () => {
  const response = await fetch(
    `http://localhost:8080/api/shoppingCart/getShoppingCart`
  );

  if (!response.ok) {
    throw new Error('failed to fetch cart');
  }
  const data = await response.json();
  // const parsed = OrderItemListSchema.parse(data);
  return data;
};
