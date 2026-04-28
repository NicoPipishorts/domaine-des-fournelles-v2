// -- IMPORT NPM
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';
import PageLogo from '../App/PageLogo';
import { setFormField, sendContactForm } from "../../actions/main";

// -- IMPORT ASSETS
import './styles.scss';
import { contactPageDefault } from '../../content/site';
import { fetchSiteContent } from '../../supabase/site';

const ContactPage = ( { lang } ) => {
  const [content, setContent] = useState(contactPageDefault);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []
  );

  useEffect(() => {
    let ignore = false;

    fetchSiteContent('contact_page')
      .then((data) => {
        if (!ignore && data) {
          setContent(data);
        }
      })
      .catch(() => {});

    return () => {
      ignore = true;
    };
  }, []);

  //^Declare dispatch construction
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.main.contact);

  //^Handle field validation and add to store
  const handleFormField = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    
    //^ Verify the First (fname) and Last (lname) names
    if(fieldName === "fname" || fieldName === "lname") {

      const regex = /^(?!\s)([a-zA-Z]+([a-zA-Z]{4,30}(-| )[a-zA-Z]{4,30})*[a-zA-Z])$/i;

      if (!regex.test(fieldValue)) { 
        e.currentTarget.classList.remove("contactpage__form--valide");  
        e.currentTarget.classList.add("contactpage__form");            
      } else {
        e.currentTarget.classList.add("contactpage__form--valide");     
      }
          
      dispatch(setFormField(fieldName, fieldValue));   

    }
    
    //^ Verify the format of the phone number
    if(fieldName === "tel") {

      const regex = /^[0-9-()]+(\s+[0-9-()]+)*$/;
    
      console.log("the value is now :", fieldValue);

      if (!regex.test(fieldValue)) { 
        // console.log("the value fales the regex");
        e.currentTarget.classList.remove("contactpage__form--valide");  
        e.currentTarget.classList.add("contactpage__form");
        dispatch(setFormField(fieldName, "")); 
        return       
      } else {
        // console.log("the value passed the regex");
        e.currentTarget.classList.add("contactpage__form--valide");     
      }

      dispatch(setFormField(fieldName, fieldValue));    

    }
    
    //^ Verify the format of the email address
    if(fieldName === "email") {

      const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (!regex.test(fieldValue)) { 
        e.currentTarget.classList.remove("contactpage__form--valide");  
        e.currentTarget.classList.add("contactpage__form");            
      } else {
        e.currentTarget.classList.add("contactpage__form--valide");     
      }

      dispatch(setFormField(fieldName, fieldValue)); 

    }

    if(fieldName === "message") {

      dispatch(setFormField(fieldName, fieldValue)); 

    }
  
  }

  //^ Form Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(sendContactForm());
  };

  //^ Detect the type of OS to open proper Maps APP
  const mapsSelector = () => {
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.platform.indexOf("iPhone") != -1) || 
       (navigator.platform.indexOf("iPad") != -1) || 
       (navigator.platform.indexOf("iPod") != -1))
      window.open("maps://maps.google.com/maps?daddr=:46.10987668364198,4.6699302204054645&amp;ll");
  else /* else use Google */
      window.open("https://maps.google.com/maps?daddr=46.10987668364198,4.6699302204054645&amp;ll");
  }

  return (

    <>
    <NavBar lang={lang} />
    
    <div className="contactpage__wrapper">

    <PageLogo className="contactpage__logo" />

      <main className="contactpage__container">

        <section className="contactpage__col-left">
          
          <h1>{content.left.pageTitle[lang]}</h1>

          <h2>{content.left.estateTitle[lang]}</h2>
          
          <p>{content.left.owners[lang]}</p>
          
          <p>
            {content.left.addressLine1[lang]} <br /> 
            {content.left.addressLine2[lang]} <br />
            {content.left.addressLine3[lang]}
          </p>
          
          <p>
            Guillaume: {content.left.phoneGuillaume} <br />
            Mariannick: {content.left.phoneMariannick} <br /> 
          </p>
          
          <p>
            <a href={`mailto:${content.left.email}`}>{content.left.email}</a>
          </p>
        
        </section>

        <section className="contactpage__col-right">
          
          <h1 area-hidden="true">Contact</h1>          

          <h2>{content.form.info1[lang]}</h2>

          <div className={ contact.sent ? `contactpage__col-right--sent-message` : `contactpage__col-right--sent-message-hidden`}> 
            <h2>{content.form.thanks[lang]}</h2>
          </div>

          <form className={ contact.sent ? `contactpage__form-hide` : `contactpage__form`}>

            <div className="contactpage__form--names-container">

              <div>
                {/* <label>Name</label> */}
                <input type="text" placeholder={content.form.fname[lang]} name="fname" value={contact.fname} onChange={handleFormField} />
              </div>

              <div>
                {/* <label>Name</label> */}
                <input type="text" placeholder={content.form.lname[lang]} name="lname" value={contact.lname} onChange={handleFormField} />
              </div>
            </div>

            <div>
            {/* <label>Téléphone</label> */}
            <input type="tel" placeholder={content.form.tel[lang]} name="tel" value={contact.tel} onChange={handleFormField} />
            </div>

            <div>
            {/* <label>Email</label> */}
            <input 
              type="email" placeholder={content.form.email[lang]} name="email"  value={contact.email} onChange={handleFormField} />
            </div>

            <div>
            {/* <label>Email</label> */}
            <textarea name="message" value={contact.message} placeholder={content.form.message[lang]} onChange={handleFormField} />
            </div>

            <div>
            {/* <label>Email</label> */}
            <input type="submit" value={content.form.button[lang]} onClick={handleFormSubmit} />
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
