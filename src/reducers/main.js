import {
  SET_HERO_PAGE,
  SET_WINES,
  SET_FORM_FIELD,
} from '../actions/main';

export const initialState = {
  // state of visibility of Hero Page
  heroPage: true,
  wines: [],
  contact: {
    fname: '',
    lname: '',
    email: '',
    tel: '',
    message: 'Laissez nous un message.',
    sent: false,
    errors: '',
  }
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
      
    case SET_FORM_FIELD:
      console.log("I am in the reducer");
      return {
        ...state,
        contact: {
          ...state.contact,
          [action.field]: action.value
        }
      }

    default:
      return state;
  }
};

export default reducer; 