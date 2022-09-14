// -- IMPORT NPM

// --  IMPORT COMPONENTS
import HeroVideo from './HeroVideo';
import HeroLogo from './HeroLogo';

// -- IMPORT ASSETS
import './styles.scss';

const HeroPage = () => {

  return (

    <div className="container-hero">

      <div className="container-hero__filter-container"></div>

      <div className="container-hero__video-container">

        <HeroVideo />

      </div>

      <div className="container-hero__logo-container">

        <HeroLogo />

      </div>
    
    </div>

  )

}

export default HeroPage;