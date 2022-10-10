// -- IMPORT NPM
import { useSelector, useDispatch } from 'react-redux';

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';
import { setLang } from  '../../actions/main';

const PageLogo = ( { className } ) => {

  const lang = useSelector((state) => state.main.lang);

  const dispatch = useDispatch();

  const handleLangChange = (e) => {
    console.log('I am clicking on button : ', e.target.value);
    dispatch(setLang(e.target.value));
  } 

  return (

    <>
    <div className="langNav__container">
    
      <button 
        className={`${lang === "fr" ? 'langNav__button langNav__button--fr ' : 'langNav__button langNav__button--fr-unselected'}`} 
        value="fr"
        onClick={handleLangChange}
      />
      <button 
        className={`${lang === "en" ? 'langNav__button langNav__button--en ' : 'langNav__button langNav__button--en-unselected'}`} 
        value="en"
        onClick={handleLangChange}
      />

    </div>

    <div className={className}></div> 
    </>

  )

}

export default PageLogo;