// ACTION TYPE ADD_TO_CART
export const ADD_TO_CART = 'ADD_TO_CART';
// ACTION CREATOR addToCart
export const addToCart = (value, name, itemValue) => ({
  type: ADD_TO_CART,
  value,
  name,
  itemValue,
});