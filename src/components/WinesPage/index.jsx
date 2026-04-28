// -- IMPORT NPM
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';
import BottleView from './BottleView';
import { setCurrentWineView } from '../../actions/main';
import { wines as fallbackWines } from '../../content/wines';
import { fetchPublicWines, hasSupabaseWineReadConfig } from '../../supabase/wines';

// -- IMPORT ASSETS
import './styles.scss';
import Data from '../../data';

const WinesPage = ( { lang } ) => {

  const dispatch = useDispatch();
  const touchStart = useRef(null);
  const [wineList, setWineList] = useState(fallbackWines);

  let i= useSelector((state) => state.main.currentWineIndex);
  const currentWineView = useSelector((state) => state.main.currentWineView);

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

  useEffect(() => {
    let ignore = false;

    if (!hasSupabaseWineReadConfig) {
      return undefined;
    }

    fetchPublicWines()
      .then((response) => {
        if (ignore || !response?.length) {
          return;
        }

        setWineList(response);

        const selectedIndex = response.findIndex((wine) => wine.bottle === currentWineView);

        if (selectedIndex >= 0) {
          handleSetWineViewChange(response[selectedIndex].bottle, selectedIndex);
          return;
        }

        handleSetWineViewChange(response[0].bottle, 0);
      })
      .catch((error) => {
        console.error('Failed to fetch wines from Supabase', error);
      });

    return () => {
      ignore = true;
    };
  }, [currentWineView]);

  useLayoutEffect(
    () => {
      if (!slides.length) {
        return;
      }

      const safeIndex = Math.min(i, slides.length - 1);

      Array.from(slides).forEach((slide) => {
        slide.classList.remove(activeClass, nextAnimationClass, previousAnimationClass);
      });

      slides[safeIndex].classList.add(activeClass);

      if (safeIndex !== i) {
        handleSetWineViewChange(slides[safeIndex].getAttribute("data-wine"), safeIndex);
      }
    }, [i, wineList.length]
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
      {wineList.map((wine) => (
        <BottleView
          key={wine.bottle}
          lang={lang}
          {...wine}
        />
      ))}
    </div>

    </>

  )

}

export default WinesPage;
