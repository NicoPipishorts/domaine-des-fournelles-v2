// -- IMPORT NPM
import React from 'react';

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';
import IconDomaine from '../../assets/icons/domaine-w.png';
import IconWine from '../../assets/icons/wine-w.png';
import IconNews from '../../assets/icons/news-w.png';
import IconBoutique from '../../assets/icons/boutique-w.png';
import IconContact from '../../assets/icons/contact-w.png';

const NavBar = () => {

  return (
    
    <>
      
      <nav className="navbar">
        <ul className="navbar__container">
          <div className='navbar__buttons--parent'>
            <li className="navbar__buttons navbar__buttons--domaine">
              <img src={IconDomaine} alt='Button Domaine' className='navbar__buttons--icons' />
            </li>  
            <span className='navbar__buttons--domaine-label'>Domaine</span>
          </div>
          <div className='navbar__buttons--parent'>
            <li className="navbar__buttons navbar__buttons--vins">
              <img src={IconWine} alt='Button Domaine' className='navbar__buttons--icons' />
            </li>  
            <span className='navbar__buttons--vins-label'>Nos Vins</span>
          </div>
          <div className='navbar__buttons--parent'>
            <li className="navbar__buttons navbar__buttons--news">
              <img src={IconNews} alt='Button Domaine' className='navbar__buttons--icons' />
            </li>  
            <span className='navbar__buttons--news-label'>News</span>
          </div>
          <div className='navbar__buttons--parent'>
            <li className="navbar__buttons navbar__buttons--boutique">
              <img src={IconBoutique} alt='Button Domaine' className='navbar__buttons--icons' />
            </li>  
            <span className='navbar__buttons--boutique-label'>Boutique</span>
          </div>
          <div className='navbar__buttons--parent'>
            <li className="navbar__buttons navbar__buttons--contact">
              <img src={IconContact} alt='Button Domaine' className='navbar__buttons--icons' />
            </li>
            <span className='navbar__buttons--contact-label'>Contact</span>
          </div>
        </ul>
      </nav> 

    </>

  )

}

export default NavBar;