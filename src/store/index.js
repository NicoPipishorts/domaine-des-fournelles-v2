import { createStore, applyMiddleware, compose } from 'redux';

import reducer from '../reducers';
// import apiMiddleWare from 'src/middlewares/api';
// on importe le middleware d'authentification
import mainMiddleware from '../middlewares/main';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  // on le branche sur le store
  applyMiddleware( mainMiddleware ),
);

const store = createStore(reducer, enhancers);

export default store;
