// -- IMPORT NPM
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';
import { setFormField } from "../../actions/main";

// -- IMPORT ASSETS
import './styles.scss';

const ContactPage = () => {

  const API_PATH = process.env.REACT_APP_URL;

  const dispatch = useDispatch();
  const contact = useSelector((state) => state.main.contact);

  const handleFormField = (e) => {
    dispatch(setFormField(e.target.name, e.target.value));
  }

  const handleFormSubmit = (e) => {

    const data = {
    };

    e.preventDefault();
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 
        'content-type': 'application/json', 
        // 'Access-Control-Allow-Origin': 'http://localhost:8080',  
        // 'Access-Control-Allow-Headers': '*',
      },
      data: data
    })
      .then(result => {
        console.log("%c The email was sent with success", "color: green; font-weight: bold;", result.data);
      })
      .catch(error => {
        console.log("%c An error occured, here is the error message:", "color: red; font-weight: bold;", error);
      });
  };

  const mapsSelector = () => {
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.platform.indexOf("iPhone") != -1) || 
       (navigator.platform.indexOf("iPad") != -1) || 
       (navigator.platform.indexOf("iPod") != -1))
      window.open("maps://maps.google.com/maps?daddr=:46.10987668364198,4.6699302204054645&amp;ll=");
  else /* else use Google */
      window.open("https://maps.google.com/maps?daddr=:46.10987668364198,4.6699302204054645&amp;ll=");
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (

    <>
    <NavBar />
    
    <div className="contactpage__wrapper">

      <div className="contactpage__logo"></div>   

      <main className="contactpage__container">

        <section className="contactpage__col-left">
          
          <h1>Contact</h1>

          <h2> Domaine des Fournelles</h2>
          
          <p>Guillaume et Mariannick Dumontet.</p>
          
          <p>
            137 Montée de Godefoyr, <br /> 
            69220 Saint-Lager, <br />
            France
          </p>
          
          <p>
            Mariannick: +33 6 71 01 11 66 <br /> 
            Guillaume: +33 6 79 17 27 53 <br />
          </p>
          
          <p>
            <a href="mailto: domainedesfournelles@outlook.fr">Email: domainedesfournelles@outlook.fr</a>
          </p>
        
        </section>

        <section className="contactpage__col-right">
          
          <h1 area-hidden="true">Contact</h1>

          <form className="contactpage__form">

            <h2> Envoyez nous un message</h2>

            <div className="contactpage__form--names-container">

              <div>
                {/* <label>Name</label> */}
                <input type="text" placeholder="Prénom" name="fname" value={contact.fname} 
                  onChange={handleFormField} 
                />
              </div>

              <div>
                {/* <label>Name</label> */}
                <input type="text" placeholder="Nom" name="lname" value={contact.lname} 
                  onChange={handleFormField} 
                />
              </div>
            </div>

            <div>
            {/* <label>Téléphone</label> */}
            <input type="text" placeholder="Numéro de téléphone" name="tel" value={contact.tel} onChange={handleFormField} />
            </div>

            <div>
            {/* <label>Email</label> */}
            <input type="email" placeholder="Adresse Mail"  name="email" value={contact.email} onChange={handleFormField} />
            </div>

            <div>
            {/* <label>Email</label> */}
            <textarea name="message" value={contact.message} 
              onFocus={() => {if(contact.message === "Laissez nous un message."){dispatch(setFormField("message", ""))}}} 
              onBlur={() => {if(contact.message === ""){dispatch(setFormField("message", "Laissez nous un message."))}}} 
              onChange={handleFormField} 
              />
            </div>

            <div>
            {/* <label>Email</label> */}
            <input type="submit" value="send" onClick={handleFormSubmit} />
            </div>

          </form>
        
        </section>

      </main>

      <div className="contactpage__map" onClick={mapsSelector}></div>

    </div>

    </>

  )

}

export default ContactPage;