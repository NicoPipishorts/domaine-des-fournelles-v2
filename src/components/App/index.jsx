// -- IMPORT NPM
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Helmet} from "react-helmet";
import { useLocation } from 'react-router-dom';

// --  IMPORT COMPONENTS
import HeroPage from '../HeroPage';
import DomainePage from '../DomainePage';
import WinesPage from '../WinesPage';
import ContactPage from '../ContactPage';
import BoutiquePage from '../BoutiquePage';

// -- IMPORT ASSETS
import './styles.scss';

const App = () => {

  const location = useLocation();
  const lang = useSelector((store) => store.main.lang);
  const currentWine = useSelector((store) => store.main.currentWineView);
  let pageLoc = (location.pathname).substring(1);
  
  if(!pageLoc) {
    pageLoc = "hero";
  }

  const metaTags = {
    hero: {
      title: "Le Domaine des Fournelles",
      themeColor: "#000",
    },
    domaine: {
      title: "Le Domaine des Fournelles",
      themeColor: "#000",
    },
    vins: {
      title: "Les Vins du Domaine des Fournelles",
      themeColor: "#000",
    },
    boutique: {
      title: "",
      themeColor: "",
    },
    news: {
      title: "",
      themeColor: "",
    },
    contact: {
      title: "Contacter le Domaine des Fournelles",
      themeColor: "#9F2032",
    },
  };


  return (

    <div className="wrapper"> 
    <Helmet>
        <title>{metaTags[pageLoc].title}</title>
    </Helmet>
    <Routes>

      <Route
        path='/'
        element={
          <HeroPage 
          lang= {lang}
          />}
      /> 
      <Route
        path='/domaine' 
        element={
          <DomainePage
          lang={lang}
          />
        } 
      />
      <Route
        path='/vins' 
        element={
          <WinesPage
          lang={lang}
          />
        } 
      />
      <Route
        path='/boutique' 
        element={
          <BoutiquePage
          lang={lang}
          />
        } 
      />
      <Route
        path='/contact' 
        element={
          <ContactPage
          lang={lang}
          />
        } 
      />
    
    </Routes>
    </div>

  )

}

export default App;