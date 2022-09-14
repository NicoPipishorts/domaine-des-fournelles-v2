// -- IMPORT NPM
import React from 'react';

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';
import IconDomaine from '../../assets/icons/domaine.png';
import IconWine from '../../assets/icons/wine.png';
import IconNews from '../../assets/icons/news.png';
import IconBoutique from '../../assets/icons/boutique.png';
import IconContact from '../../assets/icons/contact.png';

const NavBar = () => {

  return (
    
    <>
      
      <nav className="navbar">
        <ul className="navbar__container">
          <li className="navbar__buttons navbar__buttons--domaine">
            {/* Domaine */}
            <img src={IconDomaine} alt='Button Domaine' className='navbar__buttons--icons' />
          </li>  
          <li className="navbar__buttons navbar__buttons--vins">
            {/* Vins */}
            <img src={IconWine} alt='Button Domaine' className='navbar__buttons--icons' />
          </li>  
          <li className="navbar__buttons navbar__buttons--boutique">
            {/* News */}
            <img src={IconNews} alt='Button Domaine' className='navbar__buttons--icons' />
          </li>  
          <li className="navbar__buttons navbar__buttons--news">
            {/* Boutique */}
            <img src={IconBoutique} alt='Button Domaine' className='navbar__buttons--icons' />
          </li>  
          <li className="navbar__buttons navbar__buttons--contact">
            {/* Contact */}
            <img src={IconContact} alt='Button Domaine' className='navbar__buttons--icons' />
          </li>  
        </ul>
      </nav> 

    </>

  )

}

export default NavBar;