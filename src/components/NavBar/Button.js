// -- IMPORT NPM
import React from 'react';
import { NavLink } from 'react-router-dom';

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';

const NavBarButton = ( {icon, section, title} ) => {

  return (   

    <NavLink to={`/${section}`} style={{ textDecoration: 'none' }}>
    <div className='navbar__buttons--parent'>
      <li className={`navbar__buttons navbar__buttons--${section}`}>
        <img src={icon} alt={`Button ${title}`} className='navbar__buttons--icons' />
      </li>  
      <span className={`navbar__buttons--${section}-label`}>{title}</span>
    </div>
    </NavLink>

  )

}

export default NavBarButton;