// == IMPORT NPM

// == IMPORT ASSETS
import {
} from '../actions/main';


const usersApi = (store) => (next) => (action) =>{

  switch (action.type) {
   
    /*
    case CREATE_USER:
      axios.post(`${baseURL}/api/user/new` , {
        email,
        name,
        password  
      }, config
        ).then((response) => {
          console.log('Le data a était envoyé, all is good.',response);
          store.dispatch(setErrorMailCreate(response.status))
        })
        .catch((error) => {
          store.dispatch(setErrorMailCreate(error.response.data.error))
          console.log("je suis la reponse.status",error.response.data.error);
          console.log('error nul', error);
        });
      break;

    case GET_USERS_LIST: 
      axios.get(`${baseURL}/api/users/rand`)
      .then((response) => {
          store.dispatch(setUsersList(response.data));
        })
      .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('error', error);
        });
      break;
    */
      
    default:
    next(action);   
  }
};
export default usersApi;