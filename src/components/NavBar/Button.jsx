// -- IMPORT NPM
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';

const NavBarButton = ( {icon, section, title} ) => {

  const location = useLocation();
  const pathname = location.pathname.substring(1);
  let selected = false;
  
  if( pathname === section ){
    selected = true;
  }

  let button = ""

  if(section === 'boutique') {

    button = <a href={`https://www.lesgrappes.com/en/vignerons/u/domaine-des-fournelles/vins`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
    <div className='navbar__buttons--parent'>
      <li className={ selected ? `navbar__buttons navbar__buttons--${section}-selected` : `navbar__buttons navbar__buttons--${section}`}>
        <img src={icon} alt={`Button ${title}`} className='navbar__buttons--icons' />
      </li>  
      <span className={`navbar__buttons--${section}-label`}>{title}</span>
    </div>
    </a>

  } else {

    button = <NavLink to={`/${section}`} style={{ textDecoration: 'none' }}>
    <div className='navbar__buttons--parent'>
      <li className={ selected ? `navbar__buttons navbar__buttons--${section}-selected` : `navbar__buttons navbar__buttons--${section}`}>
        <img src={icon} alt={`Button ${title}`} className='navbar__buttons--icons' />
      </li>  
      <span className={`navbar__buttons--${section}-label`}>{title}</span>
    </div>
    </NavLink>

  }

  return (   

    button

  )

}

export default NavBarButton;