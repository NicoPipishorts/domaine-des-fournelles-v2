// -- IMPORT NPM

// --  IMPORT COMPONENTS
import HeroVideo from './HeroVideo';

// -- IMPORT ASSETS
import './styles.scss';

const HeroPage = () => {

  return (

    <div className="container-hero">

    <div className="container-hero__filter"></div>

    <div className="container-hero__video">

        <HeroVideo />

      </div>

      <div className="container-hero__logo">
        
      </div>
    
    </div>

  )

}

export default HeroPage;