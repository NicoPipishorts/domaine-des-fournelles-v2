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

          </div>

          <div className="winespage__bottles">

            <div className="winespage__bottles--bottle-container winespage__bottles--bottle-container-Elixir">

              <div className="winespage__bottles--bottle-name winespage__bottles--bottle-name-Elixir"></div>
              
            </div>

          </div>

      </main>

    </>

  )

}

export default DomainePage;