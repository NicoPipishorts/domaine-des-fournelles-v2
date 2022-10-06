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
    
    <li 
      className="domainepage__section-photos--li" 
      style={{ backgroundImage: `url(${thumb})`}}
    >
      <button className="domainepage__section-photos--open" onClick={() => { setShow(true) }} />
    </li>
    <ModalPhotos 
      photo={photo}
      onClose={() => setShow(false)} 
      show={show}
    />
    </>

  )

}

export default Thumb;