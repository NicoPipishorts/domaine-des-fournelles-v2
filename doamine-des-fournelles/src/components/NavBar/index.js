// -- IMPORT NPM
import React from 'react';

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';

const NavBar = () => {

  return (
    
    <>
      
      <nav className="navbar">
        <ul className="navbar__container">
          <li className="navbar__buttons navbar__buttons--domaine">Domaine</li>  
          <li className="navbar__buttons navbar__buttons--vins">Vins</li>  
          <li className="navbar__buttons navbar__buttons--boutique">Boutique</li>  
          <li className="navbar__buttons navbar__buttons--news">News</li>  
          <li className="navbar__buttons navbar__buttons--contact">Contact</li>  
        </ul>
      </nav> 

    </>

  )

}

export default NavBar;