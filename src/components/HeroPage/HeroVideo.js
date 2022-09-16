// -- IMPORT NPM
import React from 'react';

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';
import Video from '../../assets/videos/HeroVideo-720.mp4';

const HeroVideo = () => {

  return (

    <video src={Video} autoPlay loop muted />

  )

}

export default HeroVideo;