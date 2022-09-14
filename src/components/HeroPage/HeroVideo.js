// -- IMPORT NPM
import React from 'react';

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';
import Video from '../../assets/videos/HeroVideo.mov';

const HeroVideo = () => {

  return (

    <video src={Video} autoPlay loop muted />

  )

}

export default HeroVideo;