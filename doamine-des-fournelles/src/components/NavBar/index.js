// -- IMPORT NPM
import React from 'react';

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';
import IconDomaine from '../../assets/icons/domaine.png';
import IconWine from '../../assets/icons/wine.png';

const NavBar = () => {

  return (
    
    <>
      
      <nav className="navbar">
        <ul className="navbar__container">
          <li className="navbar__buttons navbar__buttons--domaine">
            Domaine 
            <img src={IconDomaine} alt='Button Domaine' className='navbar__buttons--icons' />
          </li>  
          <li className="navbar__buttons navbar__buttons--vins">
            Vins 
            <img src={IconWine} alt='Button Domaine' className='navbar__buttons--icons' />
          </li>  
          <li className="navbar__buttons navbar__buttons--boutique">
            Boutique
          </li>  
          <li className="navbar__buttons navbar__buttons--news">News</li>  
          <li className="navbar__buttons navbar__buttons--contact">Contact</li>  
        </ul>
      </nav> 

    </>

  )

}

export default NavBar;