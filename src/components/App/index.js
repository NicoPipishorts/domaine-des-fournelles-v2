// -- IMPORT NPM
import { Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

// --  IMPORT COMPONENTS
import HeroPage from '../HeroPage';
import DomainePage from '../DomainePage';
import WinesPage from '../WinesPage';
import ContactPage from '../ContactPage';

// -- IMPORT ASSETS
import './styles.scss';
import { getWines } from '../../actions/main';

const App = () => {

  // const dispatch = useDispatch();

  // useEffect(
  //   () => {
  //     dispatch(getWines());
  //     console.log("%c Dispatching request to retreive the wines list", "color: orange; font-weight: bold");
  //   }, []
  // );

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
        path='/contact' 
        element={<ContactPage />} 
      />
    
    </Routes>
    </div>

  )

}

export default App;