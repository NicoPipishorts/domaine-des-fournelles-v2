// -- IMPORT NPM
import { useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';

// --  IMPORT COMPONENTS
import HeroPage from '../HeroPage';
import DomainePage from '../DomainePage';

// -- IMPORT ASSETS
import './styles.scss';

const App = () => {

  const stateHeroPage = useSelector((state) => (state.main.heroPage));

  console.log('The state of Hero Page is :' , stateHeroPage);

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
    
    </Routes>
    </div>

  )

}

export default App;