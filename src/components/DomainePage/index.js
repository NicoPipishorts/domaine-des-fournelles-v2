// -- IMPORT NPM

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';
import Thumb from './Thumb';

// -- IMPORT ASSETS
import './styles.scss';
import Image1 from '../../assets/images/HomePage-1.jpg';
import Image2 from '../../assets/images/HomePage-2.jpg';
import Image3 from '../../assets/images/HomePage-3.jpg';
import Image4 from '../../assets/images/HomePage-4.jpg';
import Image5 from '../../assets/images/HomePage-5.jpg';
import Image6 from '../../assets/images/HomePage-6.jpg';
import Image7 from '../../assets/images/HomePage-7.jpg';
import Image8 from '../../assets/images/HomePage-8.jpg';
import Image9 from '../../assets/images/HomePage-9.jpg';
import Image10 from '../../assets/images/HomePage-10.jpg';

const GalleryImages = [

  Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9, Image10 
]

const DomainePage = () => {


  return (
    <>
    <NavBar />
    
    <main className={`domainepage-container`}>

      <section className="domainepage__section-text">
        
          <h1><span className="domainepage__section--h1-span">Domaine des fournelles</span></h1>

          <p>En 1947, François Bernillon s'installe commme viticulteur sur les hauteurs du Mont Brouilly. En 1973, son fils Alain reprend l'exploitation et fait prospérer l'entreprise. Depuis 2015, le Domaine a été repris par sa fille et son gendre, Mariannick et Guillaume qui représente ainsi la 3eme génération de viticulteur. La propriété s'étend aujourd'hui sur 7 Hectares sur la commune de Saint-Lager. Notre domaine produit deux crus du Beaujolais : Brouilly et Côte de Brouilly.</p>

          <p>Notre vignoble bien exposé à flanc de coteaux est situé sur le versant sud-est de la célèbre Montagne de Brouilly. Le plus grand soin est apporté tant à la culture qu'à la vinification. Nos crus sont élaborés à partir d'un cépage unique de Gamay noir à jus blanc. Les vendanges sont exclusivement manuelles et la récolte est triée méticuleusement.</p>

          <p>Toute la saveur, l'originalité et la qualité des vins du domaine sont issues du savoir-faire d'une production élaborée dans les respect du terroir alliée aux connaissances scientifiques oenologiques, aux techniques de productions et de transformation les plus modernes.</p>
    
      </section>

      <section className="domainepage__section-photos">

        <ul className="domainepage__section-photos--ul">

        {
          GalleryImages.map((image) => (
          
            <Thumb photo={image} />

          ))
        }

        </ul>

      </section>

    </main>

    </>

  )

}

export default DomainePage;