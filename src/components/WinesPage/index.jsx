// -- IMPORT NPM
import React, { useEffect, useLayoutEffect, useRef } from 'react';
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
  const touchStart = useRef(null);
  

  const DataElixir = Data.winesPage.Elixir;
  const DataGodefroy = Data.winesPage.Godefroy;
  const DataBrouilly = Data.winesPage.Brouilly;
  const DataCDB = Data.winesPage.CDB;
  const DataPassion = Data.winesPage.Passion;
  const DataSansArtifice = Data.winesPage.SansArtifice;

  let i= useSelector((state) => state.main.currentWineIndex);

  const slides  = document.getElementsByClassName('winespage__bottles--container');
  const activeClass = 'winespage__bottles--container-active';
  const nextAnimationClass = 'winespage__bottles--container-slide-next';
  const previousAnimationClass = 'winespage__bottles--container-slide-previous';

  const setActiveSlide = (nextIndex, animationClass) => {
    if (!slides.length || !slides[i] || !slides[nextIndex]) {
      return;
    }

    Array.from(slides).forEach((slide) => {
      slide.classList.remove(activeClass, nextAnimationClass, previousAnimationClass);
    });

    slides[nextIndex].classList.add(activeClass, animationClass);
    const wineName = slides[nextIndex].getAttribute("data-wine");
    handleSetWineViewChange(wineName, nextIndex);
  }

  const handleSetWineViewChange = (v, i) => {
    dispatch(setCurrentWineView(v, i));
  }

  const nextSlide = () => {
    if (i >= slides.length - 1) {
      return;
    }

    setActiveSlide(i + 1, nextAnimationClass);
  }

  const previousSlide = () => {
    if (i <= 0) {
      return;
    }

    setActiveSlide(i - 1, previousAnimationClass);
  }

  const handleTouchStart = (event) => {
    const touch = event.changedTouches[0];

    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  const handleTouchEnd = (event) => {
    if (!touchStart.current) {
      return;
    }

    const touch = event.changedTouches[0];
    const distanceX = touchStart.current.x - touch.clientX;
    const distanceY = Math.abs(touchStart.current.y - touch.clientY);
    const minSwipeDistance = 50;

    touchStart.current = null;

    if (Math.abs(distanceX) < minSwipeDistance || Math.abs(distanceX) < distanceY) {
      return;
    }

    if (distanceX > 0) {
      nextSlide();
    } else {
      previousSlide();
    }
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

    <div
      className="winespage__swipe-zone"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <BottleView lang={lang} bottle="Elixir" {...DataElixir} />

      <BottleView lang={lang} bottle="Godefroy" {...DataGodefroy} />

      <BottleView lang={lang} bottle="Brouilly" {...DataBrouilly} />

      <BottleView lang={lang} bottle="CDB" {...DataCDB} />

      <BottleView lang={lang} bottle="SansArtifice" {...DataSansArtifice} />

      <BottleView lang={lang} bottle="Passion" {...DataPassion} />
    </div>

    </>

  )

}

export default WinesPage;
