import { combineReducers } from 'redux';

import mainReducer from './main';
import boutiqueReducer from './boutique';

const rootReducer = combineReducers({
  main: mainReducer,
  boutique: boutiqueReducer,
});

export default rootReducer;