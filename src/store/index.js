import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';

import reducer from '../reducers';
// import apiMiddleWare from 'src/middlewares/api';
// on importe le middleware d'authentification
import mainApi from '../middlewares/main';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  // on le branche sur le store
  applyMiddleware( mainApi ),
);

const store = createStore(reducer, enhancers);

export default store;
