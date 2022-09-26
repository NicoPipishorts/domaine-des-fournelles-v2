import {
  SET_HERO_PAGE,
  SET_WINES,
} from '../actions/main';

export const initialState = {
  // state of visibility of Hero Page
  heroPage: true,
  wines: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_HERO_PAGE:
      return {
        ...state,
        heroPage: action.value,
      };
      
    case SET_WINES:
      return {
        ...state,
        wines: action.value
      }

    default:
      return state;
  }
};

export default reducer; 