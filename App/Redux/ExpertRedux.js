import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  expertRequest: ['pack', 'q_id'],
  expertSuccess: ['data'],
  expertFailure: null,

  getProfileRequest: ['page'],
  verifySuccess: ['data'],
  verifyFailure: null,
  verifySuccess2: ['data'],
  verifyFailure2: null,

  acceptRequest: ['id'],
  acceptSuccess: ['data'],
  acceptFailure: null,

  setDataPhra: ['data'],
  setDataPoint: ['data', 'index'],

  clearAcceptRequest: null,

  setFullData: ['data'],
  editFullData: ['id'],
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
  index_row: null,

  fetch3: null,   // accept transfer point
  data_accept: null,

  full_data: null,

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

export const verifySuccess2 = (state, { data }) => {
  let tmp = [...state.data_verify]
  data.forEach(e => {
    if (tmp.find(b => b.id == e.id)) {
      console.log('SAME VALUE')
    } else { tmp.push(e) }
  })
  return state.merge({ data_verify: tmp, fetch2: false })
}

export const verifyFailure2 = state => state.merge({ fetch2: false })


export const setDataPoint = (state, { data, index }) => {
  return state.merge({ data_point: data, index_row: index })
}

export const acceptRequest = state => state.merge({ fetch3: true })
export const acceptSuccess = (state, { data }) => state.merge({ fetch3: false, data_accept: data })
export const acceptFailure = state => state.merge({ fetch3: false })

export const clearAcceptRequest = state => state.merge({ fetch3: null })

export const setFullData = (state, { data }) => {
  return state.merge({ full_data: data })
}

export const editFullData = (state, { id }) => {
  let tmp = [...state.full_data]
  let index = state.index_row
  // console.log(tmp)
  // console.log('TMP BEFORE CHANGE')

  let data = {
    id: id,
    status: 10
  }
  tmp[index] = data
  // if (tmp[index].id = id) {  // can't
  //   tmp[index].status = 10
  // }
  // console.log(tmp)
  // console.log('TMP AFTER CHANGE')
  return state.merge({ full_data: tmp })

}

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
  [Types.VERIFY_SUCCESS2]: verifySuccess2,
  [Types.VERIFY_FAILURE2]: verifyFailure2,

  [Types.ACCEPT_REQUEST]: acceptRequest,
  [Types.ACCEPT_SUCCESS]: acceptSuccess,
  [Types.ACCEPT_FAILURE]: acceptFailure,

  [Types.CLEAR_ACCEPT_REQUEST]: clearAcceptRequest,
  [Types.SET_FULL_DATA]: setFullData,
  [Types.EDIT_FULL_DATA]: editFullData,
})
