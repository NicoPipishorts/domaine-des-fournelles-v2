// -- IMPORT NPM

// --  IMPORT COMPONENTS
import DotRating from './DotRating';
import PageLogo from '../App/PageLogo';

// -- IMPORT ASSETS
import './styles.scss';
import Data from "../../data";

const titleVisualBottles = new Set([
  'Elixir',
  'Godefroy',
  'Brouilly',
  'CDB',
  'BlancDeGamay',
  'Passion',
  'SansArtifice',
]);

const BottleWiew = ( { 
  lang,
  bottle, 
  wineName,
  region,
  appel,
  cepage,
  conditionnement,
  desc,
  caract,
  garde,
  temp,
  assoc,
  bottleImageUrl,
  titleImageUrl,
} ) => {
  const localizedWineName = wineName?.[lang] || wineName?.fr || bottle;
  const hasTitleVisual = Boolean(titleImageUrl || titleVisualBottles.has(bottle));
  
  const dots =
    Object.entries(caract).map(([key, value]) => {      
      return (
        <li key={key}><em className={bottle}>{Data.winesPage.info[key][lang]} : </em>
          <DotRating caracts={value} bottle={bottle} />
        </li>
      );
      });

  const assocArray = assoc[lang].split(", ");
  
  return (
    <>

    <div
      className="winespage__bottles--container"
      data-wine={bottle}
      data-wine-name={localizedWineName}
    >

      <PageLogo className="winespage__logo" />

      <div className={`winespage__bottles`}>
      
        <div className={`winespage__bottles--bottle-container winespage__bottles--bottle-container-${bottle}`}>
        <div
          className={`winespage__bottles--bottle-image${bottleImageUrl ? ' winespage__bottles--bottle-image-custom' : ''}`}
          style={bottleImageUrl ? { backgroundImage: `url(${bottleImageUrl})` } : undefined}
        />
      
          <div
            className={`winespage__bottles--bottle-name winespage__bottles--bottle-name-${bottle}${titleImageUrl ? ' winespage__bottles--bottle-name-custom' : ''}${!hasTitleVisual ? ' winespage__bottles--bottle-name-textual' : ''}`}
            style={titleImageUrl ? { backgroundImage: `url(${titleImageUrl})` } : undefined}
          >
            
          </div>
          
        </div>
      
        <article className={`winespage__bottles--info-container winespage__bottles--info-container-${bottle}`}>
      
          <div className={`winespage__bottles--info-title winespage__bottles--info-title-${bottle}`}>
          </div>
      
          <p className={`${bottle}`}>
            <em>{Data.winesPage.comment[lang]}</em> 
            <br />
            {desc[lang]}
          </p>
          
          <p className={`${bottle}`}>
            <em>{Data.winesPage.accord[lang]}</em> 
            <br /> 
            <ul className="winespage__bottles--info__association-list">
            {
            assocArray.map((assoc) => (
              <li>{assoc}</li>
            ))
            }
            </ul>
          </p> 
      
          <h3 className={`${bottle}`}>{Data.winesPage.info.title[lang]}</h3>

          <aside>
            <ul className={`${bottle}`}>
              <li><em className={`${bottle}`}>{Data.winesPage.info.domaine[lang]}</em> : Domaine des Fournelles</li>
              <li><em className={`${bottle}`}>{Data.winesPage.info.region[lang]}</em> : {region}</li>
              <li><em className={`${bottle}`}>{Data.winesPage.info.appell[lang]}</em> : {appel}</li>
              <li><em className={`${bottle}`}>{Data.winesPage.info.cepage[lang]}</em> : {cepage}</li>
              <li><em className={`${bottle}`}>{Data.winesPage.info.temp[lang]}</em> : {temp}</li>
              <li><em className={`${bottle}`}>{Data.winesPage.info.condition[lang]}</em> : {conditionnement}</li>
              <li><em className={`${bottle}`}>{Data.winesPage.info.garde[lang]}</em> : {garde}</li>
              <li><em className={`${bottle}`}>{Data.winesPage.info.details[lang]}</em> : 
                <ul>
                  {dots}
                </ul>              
              </li>
            </ul>
          </aside>

          <div className="winespage__bottles--info-hve__container">
          
            <div className={`winespage__bottles--info-hve winespage__bottles--info-hve-${bottle}`}>
            La Haute Valeur <br />Environnementale
            </div>
          
          </div>
          
        </article>
      
      </div>

    </div>
    </>
  )

}

export default BottleWiew;
