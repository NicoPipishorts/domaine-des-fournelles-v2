import elixir from './elixir.json';
import godefroy from './godefroy.json';
import brouilly from './brouilly.json';
import cdb from './cdb.json';
import sansArtifice from './sans-artifice.json';
import blancDeGamay from './blanc-de-gamay.json';
import passion from './passion.json';

export const wines = [
  elixir,
  godefroy,
  brouilly,
  cdb,
  sansArtifice,
  blancDeGamay,
  passion,
].map((wine, index) => ({
  ...wine,
  order: index,
}));

export const winesByBottle = wines.reduce((accumulator, wine) => {
  accumulator[wine.bottle] = wine;
  return accumulator;
}, {});
