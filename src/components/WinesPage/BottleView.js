// -- IMPORT NPM

// --  IMPORT COMPONENTS
import DotRating from './DotRating';

// -- IMPORT ASSETS
import './styles.scss';

const BottleWiew = ( { 
  bottle, 
  region,
  appel,
  cepage,
  conditionnement,
  desc,
  caract,
  garde,
  temp,
  assoc,
} ) => {
  
  const dots =
    Object.entries(caract).map(([key, value]) => {      
      return (
        <li key={key}><em className={bottle}>{key} : </em>
          <DotRating caracts={value} bottle={bottle} />
        </li>
      );
      });

  console.table(caract);
  
  return (
    <>

    <div className="winespage__bottles--container">

      <div className="winespage__logo"></div>

      <div className={`winespage__bottles`}>
      
        <div className={`winespage__bottles--bottle-container winespage__bottles--bottle-container-${bottle}`}>
      
          <div className={`winespage__bottles--bottle-name winespage__bottles--bottle-name-${bottle}`}></div>
          
        </div>
      
        <article className={`winespage__bottles--info-container winespage__bottles--info-container-${bottle}`}>
      
          <div className={`winespage__bottles--info-title winespage__bottles--info-title-${bottle}`}></div>
      
          <p className={`${bottle}`}>
            <em>COMMENTAIRE DE DEGUSTATION</em> 
            <br />
            {desc}
          </p>
          
          <p className={`${bottle}`}>
            <em>ACCORD METS ET VINS</em> 
            <br /> 
            {assoc}
          </p> 
      
          <h3 className={`${bottle}`}>Information sur le vin</h3>

          <aside>
            <ul className={`${bottle}`}>
              <li><em className={`${bottle}`}>Domaine</em> : Domaine des Fournelles</li>
              <li><em className={`${bottle}`}>Région</em> : {region}</li>
              <li><em className={`${bottle}`}>Appellation</em> : {appel}</li>
              <li><em className={`${bottle}`}>Cépage</em> : {cepage}</li>
              <li><em className={`${bottle}`}>Conditionnement</em> : {conditionnement}</li>
              <li><em className={`${bottle}`}>Garde</em> : {garde}</li>
              <li><em className={`${bottle}`}>Caracterisque du Vin</em> : 
                <ul>
                  {dots}
                </ul>              
              </li>
            </ul>
          </aside>
      
          <div className={`winespage__bottles--info-hve winespage__bottles--info-hve-${bottle}`}>
          La Haute Valeur <br />Environnementale
          </div>
          
        </article>
      
      </div>

    </div>
    </>
  )

}

export default BottleWiew;