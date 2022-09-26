// ACTION TYPE SET_HERO_PAGE
export const SET_HERO_PAGE = 'SET_HERO_PAGE';
// ACTION CREATOR setHeroPage
export const setHeroPage = (value) => ({
  type: SET_HERO_PAGE,
  value,
});

// ACTION TYPE GET_WINES
export const GET_WINES = 'GET_WINES';
// ACTION CREATOR setHeroPage
export const getWines = () => ({
  type: GET_WINES,
});

// ACTION TYPE SET_WINES
export const SET_WINES = 'SET_WINES';
// ACTION CREATOR setHeroPage
export const setWines = (value) => ({
  type: SET_WINES,
  value,
});