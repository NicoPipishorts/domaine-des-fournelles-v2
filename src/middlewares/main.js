// == IMPORT NPM
import axios from 'axios';

// == IMPORT ASSETS
import {
  GET_WINES,
  setWines,
  SEND_CONTACT_FORM,
  resetFormSent, // reset the form and set the sent value to true
  setFormErrors, // set the errors returned by the apu and set the sent value to false
} from '../actions/main';


const mainApi = (store) => (next) => (action) =>{

  const API_PATH = process.env.REACT_APP_URL;

  const baseURL = 'https://domaine-des-fournelles-v2-back.herokuapp.com/api';

  let { 
    main: {
      contact:{
        fname,
        lname,
        tel,
        email,
        message,
      }
    }
  } = store.getState();

  const contactFormData = {
    fname,
    lname,
    tel,
    email,
    message,
  }

  const headers = {
    headers: { 
      'content-type': 'application/json', 
    }   
  }

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
    
    case SEND_CONTACT_FORM:
      console.log("%c API Adress: ", "color: orange" , API_PATH);
      console.log("we are in the middleware and here is the data being transmitted: ", contactFormData);
      axios.post(
        API_PATH,
        contactFormData, 
        headers,
      )
        .then(result => {
          console.log("%c The email was sent with success", "color: green; font-weight: bold;", result.data);
          store.dispatch(resetFormSent(true));
        })
        .catch(error => {
          console.log("%c An error occured, here is the error message:", "color: red; font-weight: bold;", error);
          store.dispatch(setFormErrors(false));
        });

    break;


    default:
    next(action);   
  }
};
export default mainApi;