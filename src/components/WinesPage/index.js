// -- IMPORT NPM
import React, { useEffect, useLayoutEffect } from 'react';

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';
import BottleView from './BottleView';

// -- IMPORT ASSETS
import './styles.scss';
import Data from '../../data';

const WinesPage = () => {

  const DataElixir = Data.Elixir;
  const DataGodefroy = Data.Godefroy;
  const DataBrouilly = Data.Brouilly;
  const DataCDB = Data.CDB;
  const DataPassion = Data.Passion;
  const DataSansArtifice = Data.SansArtifice;

  let i=0;
  const slides  = document.getElementsByClassName('winespage__bottles--container');
  const activeClass = 'winespage__bottles--container-active';

  const nextSlide = () => {
    slides[i].classList.remove(activeClass);
    i = (i + 1) % slides.length;
    slides[i].classList.add(activeClass);
  }

  const previousSlide = () => {
    slides[i].classList.remove(activeClass);
    i = ((i - 1 + slides.length) % slides.length);
    slides[i].classList.add(activeClass);
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
    <NavBar />
    <div className="winespage__controls">
      <ul>
        <li onClick={previousSlide}></li>
        <li onClick={nextSlide}></li>
      </ul>
    </div>

    <BottleView bottle="Elixir" {...DataElixir} />

    <BottleView bottle="Godefroy" {...DataGodefroy} />

    <BottleView bottle="Brouilly" {...DataBrouilly} />

    <BottleView bottle="CDB" {...DataCDB} />

    <BottleView bottle="SansArtifice" {...DataSansArtifice} />

    <BottleView bottle="Passion" {...DataPassion} />

    </>

  )

}

export default WinesPage;