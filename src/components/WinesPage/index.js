// -- IMPORT NPM
import { useState, useEffect } from 'react';

// --  IMPORT COMPONENTS
import NavBar from '../NavBar';

// -- IMPORT ASSETS
import './styles.scss';

const DomainePage = () => {

  const [value, setValue] = useState(0);

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(randomNumberInRange(0, 9));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (

    <>

      <NavBar />
      
      <main className={`homepage-container homepage-container__bg${value}`}>

        <section className="homepage__section-text">
          
            <h1>Nos Vins</h1>
        </section>

        <section className="homepage__section-images">
        </section>

      </main>

    </>

  )

}

export default DomainePage;