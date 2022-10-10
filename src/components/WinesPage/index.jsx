// -- IMPORT NPM
import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';
import BottleView from './BottleView';
import { setCurrentWineView } from '../../actions/main';

// -- IMPORT ASSETS
import './styles.scss';
import Data from '../../data';

const WinesPage = ( { lang } ) => {

  const dispatch = useDispatch();
  

  const DataElixir = Data.winesPage.Elixir;
  const DataGodefroy = Data.winesPage.Godefroy;
  const DataBrouilly = Data.winesPage.Brouilly;
  const DataCDB = Data.winesPage.CDB;
  const DataPassion = Data.winesPage.Passion;
  const DataSansArtifice = Data.winesPage.SansArtifice;

  let i= useSelector((state) => state.main.currentWineIndex);

  const slides  = document.getElementsByClassName('winespage__bottles--container');
  const activeClass = 'winespage__bottles--container-active';

  const handleSetWineViewChange = (v, i) => {
    dispatch(setCurrentWineView(v, i));
  }

  const nextSlide = () => {
    slides[i].classList.remove(activeClass);
    i = (i + 1) % slides.length;
    slides[i].classList.add(activeClass);
    const wineName = slides[i].getAttribute("data-wine");
    handleSetWineViewChange(wineName, i);
  }

  const previousSlide = () => {
    slides[i].classList.remove(activeClass);
    i = ((i - 1 + slides.length) % slides.length);
    slides[i].classList.add(activeClass);
    const wineName = slides[i].getAttribute("data-wine");
    handleSetWineViewChange(wineName, i);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useLayoutEffect(
    () => {
      slides[i].classList.add(activeClass)
    } ,[]
  );

  return (

    <>
    <NavBar lang={lang} />
    <div className="winespage__controls">
      <ul>
        <li onClick={previousSlide}></li>
        <li onClick={nextSlide}></li>
      </ul>
    </div>

    <BottleView lang={lang} bottle="Elixir" {...DataElixir} />

    <BottleView lang={lang} bottle="Godefroy" {...DataGodefroy} />

    <BottleView lang={lang} bottle="Brouilly" {...DataBrouilly} />

    <BottleView lang={lang} bottle="CDB" {...DataCDB} />

    <BottleView lang={lang} bottle="SansArtifice" {...DataSansArtifice} />

    <BottleView lang={lang} bottle="Passion" {...DataPassion} />

    </>

  )

}

export default WinesPage;