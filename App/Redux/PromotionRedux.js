import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  promotionRequest: ['platform'],
  promotionSuccess: ['data'],
  promotionFailure: null,

  publishRequest: null,
  publishSuccess: ['data'],
  publishFailure: null,

  sharedAnswer: ['qid'],
  sharedSuccess: ['data'],
  sharedFailure: null,

  getLoginPro: null,
  getLoginProSuccess: ['data'],
  getLoginProFailure: null,

  setTimeShared: ['time'],
  setStatus: ['status'],

  setMoney: ['data'],
  addBonus: null,
  addBonusSuccess: null
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

  request2: null, // shared answer
  data_shared: null,

  request3: null,  // get promotion login complete X days
  data_login: null, // data promotion login complete

  time_shared: null, // store time when we shared application reset 6.00 นาฬิกา
  status: true,  // store shared status

  addBonus: false
})

/* ------------- Selectors ------------- */

export const PromotionSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api

export const setStatus = (state, { status }) => state.merge({ status })

export const setTimeShared = (state, { time }) => {
  return state.merge({ time_shared: time, status: false })
}

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

export const sharedAnswer = state => state.merge({ request2: true })
export const sharedSuccess = (state, { data }) => state.merge({ request2: false, data_shared: data })
export const sharedFailure = state => state.merge({ request2: false })

export const getLoginPro = state => state.merge({ request3: true })
export const getLoginProSuccess = (state, { data }) => state.merge({ request3: false, data_login: data })
export const getLoginProFailure = state => state.merge({ request3: false })


export const addBonus = (state) => state.merge({ addBonus: false })
export const addBonusSuccess = (state) => state.merge({ addBonus: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROMOTION_REQUEST]: request,
  [Types.PROMOTION_SUCCESS]: success,
  [Types.PROMOTION_FAILURE]: failure,

  [Types.PUBLISH_REQUEST]: publishRequest,
  [Types.PUBLISH_SUCCESS]: publishSuccess,
  [Types.PUBLISH_FAILURE]: publishFailure,

  [Types.SHARED_ANSWER]: sharedAnswer,
  [Types.SHARED_SUCCESS]: sharedSuccess,
  [Types.SHARED_FAILURE]: sharedFailure,

  [Types.GET_LOGIN_PRO]: getLoginPro,
  [Types.GET_LOGIN_PRO_SUCCESS]: getLoginProSuccess,
  [Types.GET_LOGIN_PRO_FAILURE]: getLoginProFailure,

  [Types.SET_MONEY]: setMoney,

  [Types.ADD_BONUS]: addBonus,
  [Types.ADD_BONUS_SUCCESS]: addBonusSuccess,

  [Types.SET_TIME_SHARED]: setTimeShared,
  [Types.SET_STATUS]: setStatus,

})
