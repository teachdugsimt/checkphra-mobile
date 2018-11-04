import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  promotionRequest: null,
  promotionSuccess: ['data'],
  promotionFailure: null,

  publishRequest: null,
  publishSuccess: ['data'],
  publishFailure: null,

  setMoney: ['data'],

})

export const PromotionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // data: null,
  fetching: null,
  data: [],
  error: null,

  money: null,

  request: null,  //for publish
  data_publish: null,
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

export const failure = state =>
  state.merge({ fetching: false })

export const publishRequest = state => state.merge({ request: true })
export const publishSuccess = (state, { data }) => state.merge({ request: false, data_publish: data })
export const publishFailure = state => state.merge({ request: false })

export const setMoney = (state, { data }) => {
  return state.merge({ money: data })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROMOTION_REQUEST]: request,
  [Types.PROMOTION_SUCCESS]: success,
  [Types.PROMOTION_FAILURE]: failure,

  [Types.PUBLISH_REQUEST]: publishRequest,
  [Types.PUBLISH_SUCCESS]: publishSuccess,
  [Types.PUBLISH_FAILURE]: publishFailure,

  [Types.SET_MONEY]: setMoney,

})
