import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  showRoomRequest: ['data'],
  showRoomSuccess: ['payload'],
  showRoomFailure: null,

  setAmuletType: ['data'],

})

export const ShowRoomTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,

  data_amulet: null,
})

/* ------------- Selectors ------------- */

export const ShowRoomSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const setAmuletType = (state, { data }) => state.merge({ data_amulet: data })

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
  [Types.SHOW_ROOM_REQUEST]: request,
  [Types.SHOW_ROOM_SUCCESS]: success,
  [Types.SHOW_ROOM_FAILURE]: failure,

  [Types.SET_AMULET_TYPE]: setAmuletType,
})
