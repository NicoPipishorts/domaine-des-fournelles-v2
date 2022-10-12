// -- IMPORT NPM
import { useSelector } from 'react-redux';

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';
import Data from '../../data';

const BoutiqueCard = ( { name, handleButtons }) => {

  const { lang } = useSelector((state) => state.main);
  const { items } = useSelector((state) => state.boutique);

  const price = Data.winesPage[name].price.split(",");

  return(
          
  <article className="boutique__card">

    <section className="boutique__card--header">
      <span>{name} - </span>
      <span>{Data.winesPage[name].color[lang]} </span>
      <span>  - 2020</span>
    </section>
    
    <main className="boutique__card--main">

      <div className={`boutique__card--image boutique__card--image-${name}`}></div>

      <div className="boutique__card--details">
        <span>{Data.winesPage[name].region},</span>
        <br />
        <span>{Data.winesPage[name].appel}</span>
        <br />
        <span>{Data.winesPage[name].conditionnement}</span>
      </div>

      <div className="boutique__card--price">
      
        <div>
          <span>{price[0]}</span>
          <span>€&nbsp;</span>
          <span>{price[1]}</span>
        </div>

        <div className="boutique__card--buttons">
          <button value="add" name={name} onClick={handleButtons}></button>
          <span>{name in items ? items[name] : '0'}</span>
          <button value="remove" name={name} onClick={handleButtons}></button>
        </div>
        
      </div>

    </main>

  </article>

  );
};

export default BoutiqueCard;