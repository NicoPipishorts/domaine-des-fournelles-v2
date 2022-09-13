// -- IMPORT NPM
import React from 'react';

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';
import Logo from '../../assets/images/HeroLogo.png';

const HeroLogo = () => {

  return (
    
    <>
      <a href="#" className="hero-logo-link">
        <svg><rect></rect></svg>
        <img src={Logo} alt="Logo" className="container-hero__logo" />
      </a>
    </>

  )

}

export default HeroLogo;