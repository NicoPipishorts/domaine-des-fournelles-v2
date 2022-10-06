// -- IMPORT NPM
import { Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// --  IMPORT COMPONENTS
import HeroPage from '../HeroPage';
import DomainePage from '../DomainePage';
import WinesPage from '../WinesPage';
import ContactPage from '../ContactPage';
import BoutiquePage from '../BoutiquePage';

// -- IMPORT ASSETS
import './styles.scss';

const App = () => {

  const lang = useSelector((store) => store.main.lang);

  return (

    <div className="wrapper"> 
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