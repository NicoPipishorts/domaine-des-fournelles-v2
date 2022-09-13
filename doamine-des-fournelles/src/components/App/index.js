// -- IMPORT NPM
import { useState } from 'react';

// --  IMPORT COMPONENTS
import HeroPage from '../HeroPage';

// -- IMPORT ASSETS
import './styles.scss';

const App = () => {

  return (

    <div className="wrapper"> 
    
    {(isOnHeroPage) && <HeroPage /> }

    {(!isOnHeroPage) && (<>
      
      <div> No Longer On Hero Page </div>
    </>
    )}

    </div>

  )

}

export default App;