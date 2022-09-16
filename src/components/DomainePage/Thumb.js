// -- IMPORT NPM
import { useState } from 'react';

// --  IMPORT COMPONENTS
import ModalPhotos from './ModalPhotos';

// -- IMPORT ASSETS
import './styles.scss';

const Thumb = ( { photo, thumb } ) => {

  const [show, setShow] = useState(false);

  return (
    <>
    <ModalPhotos 
      photo={photo}
      onClose={() => setShow(false)} 
      show={show}
    />
    
    <li 
      className="domainepage__section-photos--li" 
      style={{ backgroundImage: `url(${thumb})`}}
      onClick={() => {
        setShow(true)}} 
    >
      <span className="domainepage__section-photos--open">
        ouvrir
      </span>
    </li>
    </>

  )

}

export default Thumb;