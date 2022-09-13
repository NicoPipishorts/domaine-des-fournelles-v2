import {
  SET_HERO_PAGE
} from '../actions/main';

export const initialState = {
  // state of visibility of Hero Page
  heroPage: true,
};

// A noter : pour le reducer userReducer, seule la tranche user est visible !
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_HERO_PAGE:
      return {
        ...state,
        // pour définir dynamiquement la propriété d'un objet, on utilise la
        // notation "crochet"
        heroPage: action.value,
      };

    default:
      return state;
  }
};

export default reducer; 