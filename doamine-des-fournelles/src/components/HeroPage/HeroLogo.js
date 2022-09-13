// -- IMPORT NPM
import React from 'react';
import { useDispatch } from 'react-redux';

// --  IMPORT COMPONENTS

// -- IMPORT ACTIONS 
import { setHeroPage } from "../../actions/main";

// -- IMPORT ASSETS
import './styles.scss';
import Logo from '../../assets/images/HeroLogo.png';

const HeroLogo = () => {

  const dispatch = useDispatch();

  const changeHeroPageState = () => {
    dispatch(setHeroPage(true));
  }

  return (
    
    <>
      <a href="#" className="hero-logo-link">
        <svg><rect></rect></svg>
        <img 
          src={Logo} 
          alt="Logo" 
          className="container-hero__logo" 
          onClick={changeHeroPageState}
        />
      </a>
    </>

  )

}

export default HeroLogo;