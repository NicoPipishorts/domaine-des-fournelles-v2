// -- IMPORT NPM
import { useEffect } from 'react';

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';
import Thumb from './Thumb';

// -- IMPORT ASSETS
import './styles.scss';
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

const DomainePage = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <>
    <NavBar />
    
    <main className="domainepage-container">

      <article className="domainepage__section-text">

        <div className="domainepage__section-text--logo"></div>
        
        <h1><span className="domainepage__section--h1-span">Domaine des fournelles</span></h1>

        <div className="domainepage__section-text--p-container">
          <p className="domainepage__section-text--p1">
            En 1947, François Bernillon s'installe commme viticulteur sur les hauteurs du Mont Brouilly. En 1973, son fils Alain reprend l'exploitation et fait prospérer l'entreprise. Depuis 2015, le Domaine a été repris par sa fille et son gendre, Mariannick et Guillaume qui représente ainsi la 3eme génération de viticulteur. La propriété s'étend aujourd'hui sur 7 Hectares sur la commune de Saint-Lager. Notre domaine produit deux crus du Beaujolais : Brouilly et Côte de Brouilly.
          </p>
        </div>

        <div className="domainepage__section-text--p-container domainepage__section-text--p-container--right">
          <p className="domainepage__section-text--p2">
            Notre vignoble bien exposé à flanc de coteaux est situé sur le versant sud-est de la célèbre Montagne de Brouilly. Le plus grand soin est apporté tant à la culture qu'à la vinification. Nos crus sont élaborés à partir d'un cépage unique de Gamay noir à jus blanc. Les vendanges sont exclusivement manuelles et la récolte est triée méticuleusement.
          </p>
        </div>

        <div className="domainepage__section-text--p-container">
          <p className="domainepage__section-text--p3">
            Toute la saveur, l'originalité et la qualité des vins du domaine sont issues du savoir-faire d'une production élaborée dans les respect du terroir alliée aux connaissances scientifiques oenologiques, aux techniques de productions et de transformation les plus modernes.
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