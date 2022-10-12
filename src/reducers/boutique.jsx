import {
  ADD_TO_CART
} from '../actions/boutique';

export const initialState = {
  cart: 0,
  items: {},
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.value,
        items: {
          ...state.items,
          [action.name]:action.itemValue,
        }
      };
    
    default:
      return state;
  }
};

export default reducer; 