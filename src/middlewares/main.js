// == IMPORT NPM
import axios from 'axios';

// == IMPORT ASSETS
import {
  GET_WINES,
  setWines,
} from '../actions/main';


const usersApi = (store) => (next) => (action) =>{

  const baseURL = 'https://domaine-des-fournelles-v2-back.herokuapp.com/api';

  switch (action.type) {
   
    case GET_WINES:
      axios.get(`${baseURL}/wines`)
      .then((response) => {
          console.log("%c The response has comme back :", "color: green; font-weight: bold", response.data['hydra:member']);
          store.dispatch(setWines(response.data['hydra:member']));
        })
      .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('error', error);
        }); 
      break;

    default:
    next(action);   
  }
};
export default usersApi;