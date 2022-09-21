// -- IMPORT NPM
import { Routes, Route } from 'react-router-dom';

// --  IMPORT COMPONENTS
import HeroPage from '../HeroPage';
import DomainePage from '../DomainePage';
import WinesPage from '../WinesPage';
import ContactPage from '../ContactPage';

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
        path='/contact' 
        element={<ContactPage />} 
      />
    
    </Routes>
    </div>

  )

}

export default App;