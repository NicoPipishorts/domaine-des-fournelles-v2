// -- IMPORT NPM

// --  IMPORT COMPONENTS
import BottleView from './BottleView';

// -- IMPORT ASSETS
import './styles.scss';
import Data from '../../data';

const WinesPage = () => {

  const DataElixir = Data.Elixir;
  const DataGodefroy = Data.Godefroy;

  return (

    <>
      
    <main className="winespage-wrapper">

        <BottleView bottle="Elixir" {...DataElixir} />

        <BottleView bottle="Godefroy" {...DataGodefroy} />

    </main>

    </>

  )

}

export default WinesPage;