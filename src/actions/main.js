// ACTION TYPE SET_HERO_PAGE
export const SET_HERO_PAGE = 'SET_HERO_PAGE';
// ACTION CREATOR setHeroPage
export const setHeroPage = (value) => ({
  type: SET_HERO_PAGE,
  value,
});

// ACTION TYPE SET_LANG
export const SET_LANG = 'SET_LANG';
// ACTION CREATOR setLang
export const setLang = (value) => ({
  type: SET_LANG,
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

// ACTION TYPE SET_FORM_FIELD
export const SET_FORM_FIELD = 'SET_FORM_FIELD';
// ACTION CREATOR setFormField
export const setFormField = (field, value) => ({
  type: SET_FORM_FIELD,
  field,
  value,
});

// ACTION TYPE SEND_CONTACT_FORM
export const SEND_CONTACT_FORM = 'SEND_CONTACT_FORM';
// ACTION CREATOR sendContactForm
export const sendContactForm = () => ({
  type: SEND_CONTACT_FORM,
});

// ACTION TYPE RESET_FORM_SENT
export const RESET_FORM_SENT = 'RESET_FORM_SENT';
// ACTION CREATOR resetFormSent
export const resetFormSent = (errors) => ({
  type: RESET_FORM_SENT,
  errors,
});

// ACTION TYPE SET_FORM_ERRORS
export const SET_FORM_ERRORS = 'SET_FORM_ERRORS';
// ACTION CREATOR setFormErrors
export const setFormErrors = (errors) => ({
  type: SET_FORM_ERRORS,
  errors,
});