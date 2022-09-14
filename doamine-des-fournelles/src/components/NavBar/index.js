// -- IMPORT NPM
import React from 'react';
import { NavLink } from 'react-router-dom';

// --  IMPORT COMPONENTS
import NavbarButton from './Button';

// -- IMPORT ASSETS
import './styles.scss';
import IconDomaine from '../../assets/icons/domaine-w.png';
import IconWine from '../../assets/icons/wine-w.png';
import IconNews from '../../assets/icons/news-w.png';
import IconBoutique from '../../assets/icons/boutique-w.png';
import IconContact from '../../assets/icons/contact-w.png';

const NavBar = () => {

  return (   
    
    <nav className="navbar">
      <ul className="navbar__container">
        <NavbarButton
          title='Domaine'
          section='domaine'
          icon={IconDomaine}
        />
        <NavbarButton
          title='Nos Vins'
          section='vins'
          icon={IconWine}
        />
        <NavbarButton
          title='News'
          section='news'
          icon={IconNews}
        />
        <NavbarButton
          title='Boutique'
          section='boutique'
          icon={IconBoutique}
        />
        <NavbarButton
          title='Contact'
          section='contact'
          icon={IconContact}
        />
      </ul>
    </nav> 

  )

}

export default NavBar;