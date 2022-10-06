// -- IMPORT NPM
import React from 'react';

// --  IMPORT COMPONENTS
import NavbarButton from './Button';

// -- IMPORT ASSETS
import './styles.scss';
import Data from '../../data';
import IconDomaine from '../../assets/icons/domaine-w.png';
import IconWine from '../../assets/icons/wine-w.png';
// import IconNews from '../../assets/icons/news-w.png';
// import IconBoutique from '../../assets/icons/boutique-w.png';
import IconContact from '../../assets/icons/contact-w.png';

const NavBar = ( { lang } ) => {

  return (   
    
    <nav className="navbar">
      <ul className="navbar__container">
        <NavbarButton
          title={Data.navBar.domaine[lang]}
          section='domaine'
          icon={IconDomaine}
        />
        <NavbarButton
          title={Data.navBar.wines[lang]}
          section='vins'
          icon={IconWine}
        />
        {/* <NavbarButton
          title='News'
          section='news'
          icon={IconNews}
        />
        <NavbarButton
          title='Boutique'
          section='boutique'
          icon={IconBoutique}
        /> */}
        <NavbarButton
          title={Data.navBar.contact[lang]}
          section='contact'
          icon={IconContact}
        />
      </ul>
    </nav> 

  )

}

export default NavBar;