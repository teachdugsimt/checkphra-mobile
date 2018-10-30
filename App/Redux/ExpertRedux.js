import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  expertRequest: ['pack', 'q_id'],
  expertSuccess: ['data'],
  expertFailure: null,

  getProfileRequest: null,
  verifySuccess: ['data'],
  verifyFailure: null,

  acceptRequest: ['id'],
  acceptSuccess: ['data'],
  acceptFailure: null,

  setDataPhra: ['data'],
  setDataPoint: ['data'],
})

export const ExpertTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetch: null,            //add answer

  data_answer: null, 

  data_phra: [],

  fetch2: null,           //get list verify point
  data_verify: [],

  data_point: [],

  fetch3: null,   // accept transfer point
  data_accept: null
})

/* ------------- Selectors ------------- */

export const ExpertSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */
export const requestAnswer = (state) => state.merge({ fetch: true })
// request the data from an api
export const requestAnswerSuccess = (state, { data }) => state.merge({ fetch: false, data_answer: data })

export const requestAnswerFailure = (state) => state.merge({ fetch: false })

export const setDataPhra = (state, { data }) => {
  // console.log(data, 'REDUX')
  return state.merge({ data_phra: data })
}

export const verifyRequest = state => state.merge({ fetch2: true })
export const verifySuccess = (state, { data }) => {
  return state.merge({ fetch2: false, data_verify: data })
}
export const verifyFailure = state => state.merge({ fetch2: false })

export const setDataPoint = (state, { data }) => {
  return state.merge({ data_point: data })
}

export const acceptRequest = state => state.merge({ fetch3: true })
export const acceptSuccess = (state, { data }) => state.merge({ fetch3: false, data_accept: data })
export const acceptFailure = state => state.merge({ fetch3: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EXPERT_REQUEST]: requestAnswer,
  [Types.EXPERT_SUCCESS]: requestAnswerSuccess,
  [Types.EXPERT_FAILURE]: requestAnswerFailure,

  [Types.SET_DATA_PHRA]: setDataPhra,
  [Types.SET_DATA_POINT]: setDataPoint,

  [Types.GET_PROFILE_REQUEST]: verifyRequest,
  [Types.VERIFY_SUCCESS]: verifySuccess,
  [Types.VERIFY_FAILURE]: verifyFailure,

  [Types.ACCEPT_REQUEST]: acceptRequest,
  [Types.ACCEPT_SUCCESS]: acceptSuccess,
  [Types.ACCEPT_FAILURE]: acceptFailure
})
