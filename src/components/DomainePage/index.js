// -- IMPORT NPM
import { useEffect } from 'react';

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';
import Thumb from './Thumb';
import PageLogo from '../App/PageLogo';

// -- IMPORT ASSETS
import './styles.scss';
import Data from '../../data';
import Image1 from '../../assets/images/DomainePage-1.jpg';
import Image2 from '../../assets/images/DomainePage-2.jpg';
import Image3 from '../../assets/images/DomainePage-3.jpg';
import Image4 from '../../assets/images/DomainePage-4.jpg';
import Image5 from '../../assets/images/DomainePage-5.jpg';
import Image6 from '../../assets/images/DomainePage-6.jpg';
import Image7 from '../../assets/images/DomainePage-7.jpg';
import Image8 from '../../assets/images/DomainePage-8.jpg';
import Image9 from '../../assets/images/DomainePage-9.jpg';
import Image10 from '../../assets/images/DomainePage-10.jpg';
import Image11 from '../../assets/images/DomainePage-11.jpg';

import Image1Thumb from '../../assets/images/DomainePage-1-thumb.jpg';
import Image2Thumb from '../../assets/images/DomainePage-2-thumb.jpg';
import Image3Thumb from '../../assets/images/DomainePage-3-thumb.jpg';
import Image4Thumb from '../../assets/images/DomainePage-4-thumb.jpg';
import Image5Thumb from '../../assets/images/DomainePage-5-thumb.jpg';
import Image6Thumb from '../../assets/images/DomainePage-6-thumb.jpg';
import Image7Thumb from '../../assets/images/DomainePage-7-thumb.jpg';
import Image8Thumb from '../../assets/images/DomainePage-8-thumb.jpg';
import Image9Thumb from '../../assets/images/DomainePage-9-thumb.jpg';
import Image10Thumb from '../../assets/images/DomainePage-10-thumb.jpg';
import Image11Thumb from '../../assets/images/DomainePage-11-thumb.jpg';

const GalleryImages = [

  { photo : Image1, thumb :  Image1Thumb },
  { photo : Image2, thumb :  Image2Thumb },
  { photo : Image3, thumb :  Image3Thumb },
  { photo : Image4, thumb :  Image4Thumb },
  { photo : Image11, thumb :  Image11Thumb },
  { photo : Image5, thumb :  Image5Thumb },
  { photo : Image6, thumb :  Image6Thumb },
  { photo : Image7, thumb :  Image7Thumb },
  { photo : Image8, thumb :  Image8Thumb },
  { photo : Image9, thumb :  Image9Thumb },
  { photo : Image10, thumb :  Image10Thumb },
  
]

const DomainePage = ( { lang } ) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <>
    <NavBar lang={lang} />

    <PageLogo className="contactpage__logo" />
    
    <main className="domainepage-container">

      <article className="domainepage__section-text">

        <div className="domainepage__section-text--logo"></div>
        
        <h1><span className="domainepage__section--h1-span">Domaine des fournelles</span></h1>

        <div className="domainepage__section-text--p-container">
          <p className="domainepage__section-text--p1">
            {Data.domainePage.p1[lang]}
          </p>
        </div>

        <div className="domainepage__section-text--p-container domainepage__section-text--p-container--right">
          <p className="domainepage__section-text--p2">
            {Data.domainePage.p2[lang]}
          </p>
        </div>

        <div className="domainepage__section-text--p-container">
          <p className="domainepage__section-text--p3">
            {Data.domainePage.p3[lang]}
          </p>
        </div>
    
      </article>

      <section className="domainepage__section-photos">

        {/* <h1>Photos</h1> */}

        <ul className="domainepage__section-photos--ul">

        {
          GalleryImages.map((image) => (
          
            <Thumb 
            photo={image.photo}
            thumb={image.thumb}
            key={image.thumb}
            />

          ))
        }

        </ul>

      </section>

    </main>

    </>

  )

}

export default DomainePage;