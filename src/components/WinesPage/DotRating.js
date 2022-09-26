// -- IMPORT NPM

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';

const DotRating = ( { caracts, bottle } ) => {  

console.log(caracts);

return(
  <>

    {[...Array(5)].map((i, index) => {
      index += 1;
      return (
        <span key={index} className={index <= caracts ? bottle : `empty${bottle}`}></span>
      );
    })}

  </>
  );

}

export default DotRating;