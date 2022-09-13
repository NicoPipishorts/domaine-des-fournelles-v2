// -- IMPORT NPM
import { useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';

// --  IMPORT COMPONENTS
import HeroPage from '../HeroPage';
import HomePage from '../HomePage';

// -- IMPORT ASSETS
import './styles.scss';

const App = () => {

  const stateHeroPage = useSelector((state) => (state.main.heroPage));

  console.log('The state of Hero Page is :' , stateHeroPage);

  return (

    <div className="wrapper"> 
    <Routes>
    {(stateHeroPage) && 

      <Route
        path='/'
        element={<HeroPage />}
      /> 
      
    }{(!stateHeroPage) &&
        <Route
          path='/home' 
          element={<HomePage />} 
        />
    }
    </Routes>
    </div>

  )

}

export default App;