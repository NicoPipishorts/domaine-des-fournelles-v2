import elixir from './elixir.json';
import godefroy from './godefroy.json';
import brouilly from './brouilly.json';
import cdb from './cdb.json';
import sansArtifice from './sans-artifice.json';
import passion from './passion.json';

export const wines = [
  elixir,
  godefroy,
  brouilly,
  cdb,
  sansArtifice,
  passion,
].map((wine, index) => ({
  ...wine,
  order: index,
}));

export const winesByBottle = wines.reduce((accumulator, wine) => {
  accumulator[wine.bottle] = wine;
  return accumulator;
}, {});
