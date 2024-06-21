export const fetchCart = async (id: string) => {
  const response = await fetch(
    `http://localhost:8080/api/shoppingCart/getShoppingCart`
  );

  if (!response.ok) {
    throw new Error('failed to fetch cart');
  }
  const data = await response.json();
  return data;
};