import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'


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

})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  profile: null,
  user_id: null,
  error: null,

  request: null,
  dataRegister: [],
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
  return state.merge({ fetching: false, error: null, profile })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, profile: null })

export const setUserId = (state, { user_id }) => state.merge({ user_id })



export const startRequest = (state) => state.merge({ request: true })

export const failureRequestSignup = (state) => state.merge({ request: false })

export const successRequestSignup = (state, { data }) => {
  return state.merge({ dataRegister: data, request: false })
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
})
