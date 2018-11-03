import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import I18n from '../I18n/i18n'

I18n.fallbacks = true;
// I18n.currentLocale();

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signinWithCredential: ['data'],
  signinRequest: ['email', 'password'],
  signinSuccess: ['profile'],
  signinFailure: null,

  setUserId: ['user_id'],

  signup: ['id', 'password'],
  signupSuccess: ['data'],
  signupFailure: null,

  createUser: ['email', 'uid'],
  createSuccess: ['data'],
  createFailure: null,

  signout: null,
  // setPicture: ['data'],
  setLanguage: ['language'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  profile: null,
  user_id: null,  // access token login facebook
  error: null,

  request: null,
  dataRegister: [],

  request2: null,  // create user check phra with access token form FIREBASE
  data_create: null,  // data create user

  language: I18n.currentLocale(),
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { email, password }) => {
  let data = { email, password }
  return state.merge({ fetching: true, data, profile: null })
}

// successful api lookup
export const success = (state, action) => {
  const { profile } = action
  return state.merge({ fetching: false, error: null, profile, user_id: profile.user_id })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, profile: null })

export const setUserId = (state, { user_id }) => {
  console.log(user_id)
  return state.merge({ user_id })
}



export const startRequest = (state) => state.merge({ request: true })

export const failureRequestSignup = (state) => state.merge({ request: false })

export const successRequestSignup = (state, { data }) => {
  return state.merge({ dataRegister: data, request: false })
}

export const signout = state => INITIAL_STATE

export const createUser = state => state.merge({ request2: true })
export const createSuccess = (state, { data }) => {
  return state.merge({ request2: false, data_create: data })
}
export const createFailure = state => state.merge({ request2: false })

export const setLanguage = (state, { language }) => {
  return state.merge({ language })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNIN_REQUEST]: request,
  [Types.SIGNIN_WITH_CREDENTIAL]: request,
  [Types.SIGNIN_SUCCESS]: success,
  [Types.SIGNIN_FAILURE]: failure,

  [Types.SET_USER_ID]: setUserId,

  [Types.SIGNUP]: startRequest,
  [Types.SIGNUP_SUCCESS]: successRequestSignup,
  [Types.SIGNUP_FAILURE]: failureRequestSignup,

  [Types.CREATE_USER]: createUser,
  [Types.CREATE_SUCCESS]: createSuccess,
  [Types.CREATE_FAILURE]: createFailure,

  [Types.SIGNOUT]: signout,
  [Types.SET_LANGUAGE]: setLanguage,
})
