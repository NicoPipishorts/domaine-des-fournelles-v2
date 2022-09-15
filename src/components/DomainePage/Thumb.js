// -- IMPORT NPM

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';

const Thumb = ( { photo }) => {

  return (
    
    <li className="domainepage__section-photos--li" style={{ backgroundImage: `url(${photo})`}}>
      <span className="domainepage__section-photos--open">
        ouvrir
      </span>
    </li>

  )

}

export default Thumb;