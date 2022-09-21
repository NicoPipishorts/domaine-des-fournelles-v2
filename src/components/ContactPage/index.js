// -- IMPORT NPM
import { useState } from 'react';

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';

// -- IMPORT ASSETS
import './styles.scss';

const ContactPage = () => {

  const [ formName, setFormName ] = useState('');
  const [ formTel, setFormTel ] = useState('');
  const [ formEmail, setFormEmail ] = useState('');

  const handleChangeName = (event) => {
    setFormName(event.target.value);
  }

  console.log("%c The vlue for the Name is : ", "color: purple; font-weight: bold", formName);

  const handleChangeTel = (event) => {
    setFormTel(event.target.value);
  }

  console.log("%c The vlue for the Name is : ", "color: lime; font-weight: bold", formTel);

  const handleChangeEmail = (event) => {
    setFormEmail(event.target.value);
  }

  const mapsSelector = () => {
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.platform.indexOf("iPhone") != -1) || 
       (navigator.platform.indexOf("iPad") != -1) || 
       (navigator.platform.indexOf("iPod") != -1))
      window.open("maps://maps.google.com/maps?daddr=:46.10987668364198,4.6699302204054645&amp;ll=");
  else /* else use Google */
      window.open("https://maps.google.com/maps?daddr=:46.10987668364198,4.6699302204054645&amp;ll=");
  }

  console.log("%c The vlue for the Email is : ", "color: aquamarine; font-weight: bold", formEmail);

  return (

    <>
    <NavBar />
    
    <div className="contactpage__wrapper">

      <div className="contactpage__logo"></div>   

      <main className="contactpage__container">

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

        <form className="contactpage__form">

          <h2> Envoyez nous un message</h2>

          <div>
          {/* <label>Name</label> */}
          <input type="text" placeholder="Prénom Nom" value={formName} onChange={handleChangeName} />
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
          <input type="submit" value="send" />
          </div>

        </form>

      </main>

      <div className="contactpage__map" onClick={mapsSelector}></div>

    </div>

    </>

  )

}

export default ContactPage;