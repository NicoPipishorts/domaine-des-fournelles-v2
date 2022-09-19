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
              
              <p>
                <em>ASSOCIATION METS ET VINS</em> 
                <br /> 
                Il se boit en toute circonstance. Autour d'un plateau de charcuterie ou de fromage ou lors d'un repas de tous les jours.
              </p>
              
              <p>
                <em>COMMENTAIRE DE DEGUSTATION</em> 
                <br /> 
                Le Brouilly est le plus méridionale des crus de Beaujolais. A la robe rouge pourpre, vive et profonde, le nez est fruité aux arômes de fruits rouges (groseilles, framboises). C'est un vin convivial et harmonieux.
              </p>
              
              <p>
                <em>CONSERVATION ET CONSEIL DE SERVICE </em> 
                <br /> 
                A boire jeune à 14°C pour son côté fruité ou à conserver plus longtemps pour retrouver son côté minéral. Le millésime 2015 est exceptionnel et est un véritable vin de garde (jusqu’à 10 ans).
              </p>

              <h3>Information sur le vin</h3>

              <aside>
                <ul>
                  <li><em>Domaine</em> : Domaine des Fournelles</li>
                  <li><em>Millésime</em> : 2020</li>
                  <li><em>Région</em> : Beaujolais</li>
                  <li><em>Appéllation</em> : Côtes de Brouilly</li>
                  <li><em>Degré</em> : 13&deg;</li>
                  <li><em>Cépage</em> : Gamay Noir à Jus Blanc</li>
                  <li><em>Nature du sol</em> : Schistes porphyres</li>
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