import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  promotionRequest: null,
  promotionSuccess: ['data'],
  promotionFailure: null
})

export const PromotionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // data: null,
  fetching: null,
  data: [],
  error: null
})

/* ------------- Selectors ------------- */

export const PromotionSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, { data }) => {
  // console.log(data, 'Pro Redux')
  return state.merge({ fetching: false, data })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROMOTION_REQUEST]: request,
  [Types.PROMOTION_SUCCESS]: success,
  [Types.PROMOTION_FAILURE]: failure
})
