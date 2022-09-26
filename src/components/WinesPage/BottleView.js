// -- IMPORT NPM

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';

const BottleWiew = ( { 
  bottle, 
  desc, 
  assoc, 
  conserv, 
  year, 
  region, 
  appel, 
  degree, 
  grape, 
  ground, 
  aging,
  recompenses
} ) => {

  return (

    <>

    <div className="winespage__bottles--container">

      <div className={`winespage__bottles`}>
      
        <div className={`winespage__bottles--bottle-container winespage__bottles--bottle-container-${bottle}`}>
      
          <div className={`winespage__bottles--bottle-name winespage__bottles--bottle-name-${bottle}`}></div>
          
        </div>
      
        <article className={`winespage__bottles--info-container winespage__bottles--info-container-${bottle}`}>
      
          <div className={`winespage__bottles--info-title winespage__bottles--info-title-${bottle}`}></div>
      
          <p className={`${bottle}`}>
          {desc}
          </p>
          
          <p className={`${bottle}`}>
            <em>ASSOCIATION METS ET VINS</em> 
            <br /> 
            {assoc}
          </p> 
          
          <p className={`${bottle}`}>
            <em>CONSERVATION ET CONSEIL DE SERVICE </em> 
            <br /> 
            {conserv}
          </p>
      
          <h3 className={`${bottle}`}>Information sur le vin</h3>
      
          <aside>
            <ul className={`${bottle}`}>
              <li><em className={`${bottle}`}>Domaine</em> : Domaine des Fournelles</li>
              <li><em className={`${bottle}`}>Millésime</em> : {year}</li>
              <li><em className={`${bottle}`}>Région</em> : {region}</li>
              <li><em className={`${bottle}`}>Appellation</em> : {appel}</li>
              <li><em className={`${bottle}`}>Degré</em> : {degree}&deg;</li>
              <li><em className={`${bottle}`}>Cépage</em> : {grape}</li>
              <li><em className={`${bottle}`}>Nature du sol</em> : {ground}</li>
              <li><em className={`${bottle}`}>Elevage</em> : {aging}</li>
              <li><em className={`${bottle}`}>Récompense</em> : 
                <ul>
                  {
                    recompenses.map((rec, i) => (
                      <>
                      <li key={bottle+i}>- {rec}</li>
                      </>
                    ))
                  }
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