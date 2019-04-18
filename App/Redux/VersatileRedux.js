import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  versatileRequest: ['data'],
  versatileSuccess: ['payload'],
  versatileFailure: null,

  getNormalData: null,
  getNormalDataSuccess: ['data'],
  getNormalDataFailure: null,
})

export const VersatileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,

  request: null,  // request for get versatile data
  data_versatile: null,  // store versatile data
})

/* ------------- Selectors ------------- */

export const VersatileSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const getNormalData = state => state.merge({ request: true })
export const getNormalDataSuccess = (state, { data }) => state.merge({ request: false, data_versatile: data })
export const getNormalDataFailure = (state) => state.merge({ request: false })

export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VERSATILE_REQUEST]: request,
  [Types.VERSATILE_SUCCESS]: success,
  [Types.VERSATILE_FAILURE]: failure,

  [Types.GET_NORMAL_DATA]: getNormalData,
  [Types.GET_NORMAL_DATA_SUCCESS]: getNormalDataSuccess,
  [Types.GET_NORMAL_DATA_FAILURE]: getNormalDataFailure,
})
