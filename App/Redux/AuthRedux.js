import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signinWithCredential: ['data'],
  signinRequest: ['data'],
  signinSuccess: ['profile'],
  signinFailure: null,

  setUserId: ['user_id']
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  profile: null,
  user_id: null,
  error: null
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, profile: null })

// successful api lookup
export const success = (state, action) => {
  const { profile } = action
  return state.merge({ fetching: false, error: null, profile })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, profile: null })

export const setUserId = (state, { user_id }) => state.merge({ user_id })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNIN_REQUEST]: request,
  [Types.SIGNIN_WITH_CREDENTIAL]: request,
  [Types.SIGNIN_SUCCESS]: success,
  [Types.SIGNIN_FAILURE]: failure,

  [Types.SET_USER_ID]: setUserId
})
