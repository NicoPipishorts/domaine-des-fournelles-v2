// -- IMPORT NPM
import { useSelector } from "react-redux";

// --  IMPORT COMPONENTS
import HeroPage from '../HeroPage';

// -- IMPORT ASSETS
import './styles.scss';

const App = () => {

  const stateHeroPage = useSelector((state) => (state.main.heroPage));

  console.log('The state of Hero Page is :' , stateHeroPage);

  return (

    <div className="wrapper"> 
    
    {(stateHeroPage) && <HeroPage /> }

    {(!stateHeroPage) && (<>
      
      <div> No Longer On Hero Page </div>
    </>
    )}

    </div>

  )

}

export default App;