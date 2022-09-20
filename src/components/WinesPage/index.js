// -- IMPORT NPM

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';
import BottleView from './BottleView';

// -- IMPORT ASSETS
import './styles.scss';
import Data from '../../data';

const WinesPage = () => {

  const DataElixir = Data.Elixir;
  const DataGodefroy = Data.Godefroy;

  return (

    <>
    <NavBar />
    
    <main className="winespage-wrapper">

        <BottleView bottle="Elixir" {...DataElixir} />

        <BottleView bottle="Godefroy" {...DataGodefroy} />

    </main>

    </>

  )

}

export default WinesPage;