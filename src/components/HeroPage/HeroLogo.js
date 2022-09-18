// -- IMPORT NPM
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// --  IMPORT COMPONENTS

// -- IMPORT ACTIONS 
import { setHeroPage } from "../../actions/main";

// -- IMPORT ASSETS
import './styles.scss';
import Logo from '../../assets/images/HeroLogo.png';

const HeroLogo = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHeroPageState = () => {
    dispatch(setHeroPage(false));
    navigate('/domaine');
  }

  return (
    
    <>
      <button className="hero-logo-link" onClick={changeHeroPageState}>
        <svg><rect></rect></svg>
        <img src={Logo} alt="Logo" className="container-hero__logo" />
      </button>
    </>

  )

}

export default HeroLogo;