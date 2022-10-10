import {
  SET_HERO_PAGE,
  SET_LANG,
  SET_CURRENT_WINE_VIEW,
  SET_WINES,
  SET_FORM_FIELD,
  RESET_FORM_SENT, 
  SET_FORM_ERRORS,
} from '../actions/main';

export const initialState = {
  // state of visibility of Hero Page
  heroPage: true,
  lang: "fr",
  currentWineView: "Elixir",
  currentWineIndex: 0,
  wines: [],
  contact: {
    fname: '',
    lname: '',
    email: '',
    tel: '',
    message: '',
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
    
    case SET_LANG:
      return {
        ...state,
        lang: action.value,
      };

    case SET_CURRENT_WINE_VIEW:
      return {
        ...state,
        currentWineView: action.value,
        currentWineIndex: action.index
      };
      
    case SET_WINES:
      return {
        ...state,
        wines: action.value
      }
      
    case SET_FORM_FIELD:
      return {
        ...state,
        contact: {
          ...state.contact,
          [action.field]: action.value
        }
      }
    
    case SET_FORM_ERRORS:
      return {
        ...state,
        contact: {
          ...state.contact,
          sent: false,
          errors: action.errors,
        }
      }
    
    case RESET_FORM_SENT:
      return {
        ...state,
        contact: {
          ...state.contact,
          sent: true,
          fname: '',
          lname: '',
          tel: '',
          email: '',
          message: 'Laissez nous un message.',
        }
      }

    default:
      return state;
  }
};

export default reducer; 