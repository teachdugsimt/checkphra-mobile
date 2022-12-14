import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import I18n from '../I18n/i18n'
import moment from 'moment'
I18n.fallbacks = true;
// I18n.currentLocale();

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signinWithCredential: ['data'],
  signinRequest: ['email', 'password'],
  signinSuccess: ['profile'],
  signinFailure: ['error'],

  setUserId: ['user_id'],

  signup: ['id', 'password'],
  signupSuccess: ['data'],
  signupFailure: null,

  createUser: ['email', 'uid'],
  createSuccess: ['data'],
  createFailure: null,

  changePassword: ['email', 'oldp', 'newp'],
  changeSuccess: ['data'],
  changeFailure: null,

  forgetPassword: ['email'],
  forgetSuccess: ['data'],
  forgetFailure: null,

  signout: null,
  // setPicture: ['data'],
  setLanguage: ['language'],
  clearError: null,

  setCoin: ['coin'],
  clearRequest2: null,
  clearRequest: null,

  setImg: ['data'],
  setTime: ['day'],
  setModal: ['check'],

  changeProfile: ['firstname', 'lastname', 'file'],
  changeProfileSuccess: ['data'],
  changeProfileFailure: null,

  saveDeviceToken: ['token'],
  setCredentialData: ['data'],

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
  error_signup: null,
  coin: null,
  picProfile: null,

  request: null,
  dataRegister: [],

  request2: null,  // create user check phra with access token form FIREBASE
  data_create: null,  // data create user

  // language: I18n.currentLocale(),
  language: "th",

  request3: null, // change password request
  data_changepass: null,

  request4: null, // forget password
  data_forget: null,

  day: moment(new Date()).format().slice(0, 10),
  modal: true,

  credential_data: null,

  request5: null,  // request change profile (firstname, lastname, picture)
  data_changeProfile: null, // store change profile data

  // day: null,
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const changeProfile = state => state.merge({ request5: true })
export const changeProfileSuccess = (state, { data }) => state.merge({ request5: false, data_changeProfile: data })
export const changeProfileFailure = state => state.merge({ request5: false })

export const setCredentialData = (state, { data }) => state.merge({ credential_data: data })

export const setModal = (state, { check }) => {
  return state.merge({ modal: check })
}
// request the data from an api
export const clearRequest2 = state => state.merge({ request2: null })

export const request = (state, { email, password }) => {
  let data = { email, password }
  return state.merge({ fetching: true, data, profile: null, error: null })
}

// successful api lookup
export const success = (state, action) => {
  const { profile } = action
  // console.log('ccccc')
  return state.merge({ fetching: false, error: null, profile, user_id: profile.user_id })
}

// Something went wrong somewhere.
export const failure = (state, { error }) => {
  // console.log('bbbbb')
  return state.merge({ fetching: false, error, profile: null })
}

export const setUserId = (state, { user_id }) => {
  console.log(user_id)
  return state.merge({ user_id })
}


export const clearRequest = state => state.merge({ request: null })
export const startRequest = (state) => state.merge({ request: true })

export const failureRequestSignup = (state, error) => {
  return state.merge({ request: false, error_signup: error.type })
}

export const successRequestSignup = (state, { data }) => {
  return state.merge({ dataRegister: data, request: false, error_signup: null })
}

export const signout = state => INITIAL_STATE

export const createUser = state => state.merge({ request2: true })
export const createSuccess = (state, { data }) => {
  return state.merge({ request2: false, data_create: data })
}
export const createFailure = state => state.merge({ request2: false })

export const changePassword = state => state.merge({ request3: true })
export const changeSuccess = (state, { data }) => state.merge({ request3: false, data_changepass: data })
export const changeFailure = state => state.merge({ request3: false })

export const forgetPassword = state => state.merge({ request4: true })
export const forgetSuccess = (state, { data }) => state.merge({ request4: false, data_forget: data })
export const forgetFailure = state => state.merge({ request4: false })

export const clearError = state => state.merge({ error: null, error_signup: null })

export const setLanguage = (state, { language }) => {
  return state.merge({ language })
}

export const setCoin = (state, { coin }) => {
  return state.merge({ coin })
}

export const setImg = (state, { data }) => state.merge({ picProfile: data })

export const setTime = (state, { day }) => {
  return state.merge({ day })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNIN_REQUEST]: request,
  [Types.SIGNIN_WITH_CREDENTIAL]: request,
  [Types.SIGNIN_SUCCESS]: success,
  [Types.SIGNIN_FAILURE]: failure,

  [Types.SET_CREDENTIAL_DATA]: setCredentialData,
  [Types.SET_USER_ID]: setUserId,

  [Types.SIGNUP]: startRequest,
  [Types.SIGNUP_SUCCESS]: successRequestSignup,
  [Types.SIGNUP_FAILURE]: failureRequestSignup,

  [Types.CREATE_USER]: createUser,
  [Types.CREATE_SUCCESS]: createSuccess,
  [Types.CREATE_FAILURE]: createFailure,

  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.CHANGE_SUCCESS]: changeSuccess,
  [Types.CHANGE_FAILURE]: changeFailure,

  [Types.FORGET_PASSWORD]: forgetPassword,
  [Types.FORGET_SUCCESS]: forgetSuccess,
  [Types.FORGET_FAILURE]: forgetFailure,
  
  [Types.CHANGE_PROFILE]: changeProfile,
  [Types.CHANGE_PROFILE_FAILURE]: changeProfileFailure,
  [Types.CHANGE_PROFILE_SUCCESS]: changeProfileSuccess,

  [Types.SIGNOUT]: signout,
  [Types.SET_LANGUAGE]: setLanguage,

  [Types.CLEAR_ERROR]: clearError,
  [Types.SET_COIN]: setCoin,
  [Types.CLEAR_REQUEST2]: clearRequest2,
  [Types.CLEAR_REQUEST]: clearRequest,
  [Types.SET_IMG]: setImg,
  [Types.SET_TIME]: setTime,
  [Types.SET_MODAL]: setModal,
})
