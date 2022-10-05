// -- IMPORT NPM
import { useState, useEffect } from 'react';
import axios from 'axios';

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';

// -- IMPORT ASSETS
import './styles.scss';

const ContactPage = () => {

  const API_PATH = process.env.REACT_APP_URL;

  const [ formFName, setFormFName ] = useState('');
  const [ formLName, setFormLName ] = useState('');
  const [ formTel, setFormTel ] = useState('');
  const [ formEmail, setFormEmail ] = useState('');
  const [ formText, setFormText ] = useState('Laissez nous un message.');
  const [ formSent, setFormSent ] = useState(false);
  const [ formError, setFormError ] = useState();

  const handleFormError = (v) => {
    setFormError(v);
  }

  const handleChangeFName = (event) => {
    setFormFName(event.target.value);
  }

  const handleChangeLName = (event) => {
    setFormLName(event.target.value);
  }

  const handleChangeTel = (event) => {
    setFormTel(event.target.value);
  }

  const handleChangeEmail = (event) => {
    setFormEmail(event.target.value);
  }

  const handleChangeText = (event) => {
    setFormText(event.target.value);
  }

  const handleFormSubmit = (e) => {

    const data = {
      fname: formFName,
      lname: formLName,
      tel: formTel,
      email: formEmail,
      message: formText
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
        setFormSent(result.data.sent);
        console.log("%c The email was sent with success", "color: green; font-weight: bold;", result.data);
      })
      .catch(error => {
        setFormError(error.message);
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
          
          <p>Guillaume Dumontet et Mariannick Bernillon.</p>
          
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
            Email: domainedesfournelles@outlook.fr
          </p>
        
        </section>

        <section className="contactpage__col-right">

          <form className="contactpage__form">

            <h2> Envoyez nous un message</h2>

            <div className="contactpage__form--names-container">

              <div>
                {/* <label>Name</label> */}
                <input type="text" placeholder="Prénom" value={formFName} 
                  onChange={handleChangeFName} 
                />
              </div>

              <div>
                {/* <label>Name</label> */}
                <input type="text" placeholder="Nom" value={formLName} 
                  onChange={handleChangeLName} 
                />
              </div>
            </div>

            <div>
            {/* <label>Téléphone</label> */}
            <input type="text" placeholder="Numéro de téléphone" value={formTel} onChange={handleChangeTel} />
            </div>

            <div>
            {/* <label>Email</label> */}
            <input type="email" placeholder="Adresse Mail"  value={formEmail} onChange={handleChangeEmail} />
            </div>

            <div>
            {/* <label>Email</label> */}
            <textarea value={formText} 
              onFocus={() => {if(formText === "Laissez nous un message."){ setFormText("")}}} 
              onBlur={() => {if(formText === ""){ setFormText("Laissez nous un message.")}}} 
              onChange={handleChangeText} 
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