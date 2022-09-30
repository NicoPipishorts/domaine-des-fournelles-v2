// -- IMPORT NPM
import { Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

// --  IMPORT COMPONENTS
import HeroPage from '../HeroPage';
import DomainePage from '../DomainePage';
import WinesPage from '../WinesPage';
import ContactPage from '../ContactPage';
import BoutiquePage from '../BoutiquePage';

// -- IMPORT ASSETS
import './styles.scss';

const App = () => {

  return (

    <div className="wrapper"> 
    <Routes>

      <Route
        path='/'
        element={<HeroPage />}
      /> 
      <Route
        path='/domaine' 
        element={<DomainePage />} 
      />
      <Route
        path='/vins' 
        element={<WinesPage />} 
      />
      <Route
        path='/boutique' 
        element={<BoutiquePage />} 
      />
      <Route
        path='/contact' 
        element={<ContactPage />} 
      />
    
    </Routes>
    </div>

  )

}

export default App;