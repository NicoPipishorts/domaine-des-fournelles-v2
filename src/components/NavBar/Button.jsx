// -- IMPORT NPM
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';

const NavBarButton = ( {icon, section, title, outsideUrl} ) => {

  const location = useLocation();
  const pathname = location.pathname.substring(1);
  let selected = false;
  
  if( pathname === section ){
    selected = true;
  }

  const content = (
    <div className='navbar__buttons--parent'>
      <li className={ selected ? `navbar__buttons navbar__buttons--${section}-selected` : `navbar__buttons navbar__buttons--${section}`}>
        <img src={icon} alt={`Button ${title}`} className='navbar__buttons--icons' />
      </li>  
      <span className={`navbar__buttons--${section}-label`}>{title}</span>
    </div>
  );

  if( outsideUrl ){
    return (
      <a href={outsideUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        {content}
      </a>
    )
  }

  return (   

    <NavLink to={`/${section}`} style={{ textDecoration: 'none' }}>
      {content}
    </NavLink>

  )

}

export default NavBarButton;
