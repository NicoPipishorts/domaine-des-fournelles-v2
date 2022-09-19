// -- IMPORT NPM

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';

// -- IMPORT ASSETS
import './styles.scss';

const DomainePage = () => {

  return (

    <>

      <NavBar />
      
      <main className="winespage-container">

        <div className="winespage__logo"></div>

          <div className="winespage__bottles">

            <div className="winespage__bottles--bottle-container winespage__bottles--bottle-container-Elixir">

              <div className="winespage__bottles--bottle-name winespage__bottles--bottle-name-Elixir"></div>
              
            </div>

            <article className="winespage__bottles--info-container">

              <div className="winespage__bottles--info-title winespage__bottles--info-title-Elixir"></div>

              <p>
              Ce vin a été élaboré avec des raisins sélectionnés, issus d'une vieille vigne à très faible rendement.Vendangé manuellement en grappes entières, élevé une année en fûts de chêne, il a été choyé, surveillé, dégusté avec la plus grande attention. Charpenté et puissant, ses arômes de fruits noirs aux tanins élégants font de ce vin une bouteille d'Exception. (Cuvée spéciale en très petite quantité).
              </p>

              <h3>Information sur le vin</h3>

              <aside>
                <ul>
                  <li><strong>Domaine</strong> : Domaine des Fournelles</li>
                  <li><strong>Millésime</strong> : 2020</li>
                  <li><strong>Région</strong> : Beaujolais</li>
                  <li><strong>Appéllation</strong> : Côtes de Brouilly</li>
                  <li><strong>Degré</strong> : 13&deg;</li>
                  <li><strong>Cépage</strong> : Gamay Noir à Jus Blanc</li>
                  <li><strong>Nature du sol</strong> : Schistes porphyres</li>
                </ul>
              </aside>

              <div className="winespage__bottles--info-hve">
              La Haute Valeur <br />Environnementale
              </div>
              
            </article>

          </div>

      </main>

    </>

  )

}

export default DomainePage;