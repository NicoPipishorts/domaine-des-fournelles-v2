// -- IMPORT NPM
import { useSelector, useDispatch } from 'react-redux';

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';
import PageLogo from '../App/PageLogo';
import BoutiqueCard from './Card';

// -- IMPORT ASSETS
import './styles.scss';
import { addToCart } from '../../actions/boutique';

const BoutiquePage = () => {

  const dispatch = useDispatch();
  const { cart, items } = useSelector((state) => state.boutique);

  const handleButtons = (e) => {
    const action = e.target.value;
    const wineName = e.target.name;
    let itemValue;

    if(wineName in items){
      itemValue = items[wineName];
    } else {
      itemValue = 0;
    }

    if(action === 'add') {
      dispatch(addToCart(cart+1, wineName, itemValue+1));
    } else {
      if(cart === 0) return;
      if(itemValue > 0) {
        dispatch(addToCart(cart-1, wineName, itemValue-1));
      } else {
        dispatch(addToCart(cart, wineName, 0));
      }
    }

  }

  return (

    <>
    
    <NavBar />

    <PageLogo className="boutique__logo" />
    <div className="boutique__wrapper"> 

      <div className="boutique__cart--container">

        <div>
          <span>Votre panier contient</span>&nbsp;
          <div className="boutique__cart--image">{cart}</div>
          &nbsp;<span>produits</span>&nbsp;
          <span>.</span>
        </div>
        
        <div>
          <button>voir mon panier</button>
        </div>


      
      </div>

      <section className="boutique__cards--wrapper">

        <BoutiqueCard
          name="Elixir"
          handleButtons={handleButtons}
        />

        <BoutiqueCard
          name="Godefroy"
          handleButtons={handleButtons}
        />

        <BoutiqueCard
          name="Brouilly"
          handleButtons={handleButtons}
        />

        <BoutiqueCard
          name="CDB"
          handleButtons={handleButtons}
        />

        <BoutiqueCard
          name="SansArtifice"
          handleButtons={handleButtons}
        />

        <BoutiqueCard
          name="Passion"
          handleButtons={handleButtons}
        />


      </section>

    </div>

    </>

  )

}

export default BoutiquePage;