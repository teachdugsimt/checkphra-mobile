import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  expertRequest: ['pack', 'q_id', 'argument', 'interested', 'permit'],
  expertSuccess: ['data'],
  expertFailure: null,

  updateAnswer: ['pack', 'q_id', 'argument'],
  updateSuccess: ['data'],
  updateFailure: null,

  cancelCoin: ['id', 'argument'],
  cancelCoinSuccess: ['data'],
  cancelCoinFailure: null,

  getProfileRequest: ['page'],
  verifySuccess: ['data'],
  verifyFailure: null,
  verifySuccess2: ['data'],
  verifyFailure2: null,

  acceptRequest: ['id'],
  acceptSuccess: ['data'],
  acceptFailure: null,

  answerList: ['page'],
  answerSuccess: ['data'],
  answerFailure: null,
  answerSuccess2: ['data'],
  answerFailure2: null,

  setDataPhra: ['data'],
  setDataPoint: ['data', 'index'],

  clearAcceptRequest: null,

  setFullData: ['data'],
  setAnswerDetail: ['data'],
  setTypeAnswer: ['data'],
  editFullData: ['id'],
  // editFullData: ['id', 'status'],

  getAutoText: null,
  getAutoTextSuccess: ['data'],
  getAutoTextFailure: null,

  editGroup: ['type_id', 'qid'],
  editGroupSuccess: ['data'],
  editGroupFailure: null,

  getListStore: ['page'],
  getListStoreSuccess: ['data'],
  getListStoreFailure: null,

  setStoreTmp: ['data'],
  editVerifyStore: ['data'],

  verifyStore: ['shop_id', 'status'],
  verifyStoreSuccess: ['data'],
  verifyStoreFailure: null,

  clearVerifyStore: null,
  clearSendAnswer: null,
  clearGetAnswer: null,
  clearUpdateRequest: null,
  clearEditData: null,
  clearDataAnswer: null,

  editListBankPayment: ['data'],
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

  fetch4: null,  // for get answer admin 
  data_answer: null,

  fetch5: null, //for update answer
  data_updateAnswer: null,

  fetch6: null, //for cancel verify coin
  data_cancel: null,

  answer_detail: null,

  fetch7: null, // for request automatic text
  data_text: null,

  fetch8: null,  // for edit type of question
  data_group: null,  // for store edit type data

  data_storetmp: null,  // store tmp data to verify shop2

  fetch9: null,  // request for verify store in admin
  data_shop: null, // store verify shop for admin

  fetch10: null,  // request for get list verify store
  data_listStore: null,  // store list shop for verify

  type_answer: 1

})

/* ------------- Selectors ------------- */

export const ExpertSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */
export const editListBankPayment = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_verify))
  // console.log(data)
  // // console.log(tmp)
  // console.log('+++++++++++ data come redux +++++++++++')
  if (tmp && tmp != null)
    tmp.map((e, i) => {
      if (e.id == data.id) {
        tmp.splice(i, 1, data)
      }
    })
  // console.log(tmp)
  // console.log('++++++++++++++++++ TMP AFter EDIT ++++++++++++++++++++')
  return state.merge({ data_verify: tmp })
}

export const clearVerifyStore = state => state.merge({ data_shop: null })
export const editVerifyStore = (state, { data }) => {
  let tmp
  let tmp2
  if (state.data_listStore && state.data_listStore != null) {
    tmp = JSON.parse(JSON.stringify(state.data_listStore))
    tmp2 = tmp
    tmp.forEach((e, i) => {
      if (e.id == data.id) {
        // console.log('Come to IF')
        tmp2[i] = data
      }
    })

  }

  return state.merge({ data_listStore: tmp2 })
}
export const clearDataAnswer = state => state.merge({ data_answer: null })
export const setTypeAnswer = (state, { data }) => state.merge({ type_answer: data })
export const setStoreTmp = (state, { data }) => state.merge({ data_storetmp: data })

export const verifyStore = state => state.merge({ fetch9: true })
export const verifyStoreSuccess = (state, { data }) => state.merge({ data_shop: data, fetch9: false })
export const verifyStoreFailure = state => state.merge({ fetch9: false })

export const getListStore = state => state.merge({ fetch10: true })
export const getListStoreSuccess = (state, { data }) => {
  let tmp
  if (state.data_listStore && state.data_listStore != null && state.data_listStore.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = [...state.data_listStore]
    data.forEach(e => {
      if (tmp.find(b => b.id == e.id)) {
        console.log('SAME VALUE')
      } else { tmp.push(e) }
    })
    // main algorithm
  } else {
    tmp = data
  }

  return state.merge({ fetch10: false, data_listStore: tmp })
}
export const getListStoreFailure = state => state.merge({ fetch10: false })

export const getAutoText = state => state.merge({ fetch7: true })
export const getAutoTextSuccess = (state, { data }) => state.merge({ fetch7: false, data_text: data })
export const getAutoTextFailure = state => state.merge({ fetch7: false })

export const clearSendAnswer = state => state.merge({ fetch: null })
export const requestAnswer = (state) => state.merge({ fetch: true })
// request the data from an api
export const requestAnswerSuccess = (state, { data }) => state.merge({ fetch: false, data_answer: data })

export const requestAnswerFailure = (state) => state.merge({ fetch: false })

export const clearGetAnswer = state => state.merge({ fetch4: null })
export const clearUpdateRequest = state => state.merge({ fetch5: null })

export const updateAnswer = state => state.merge({ fetch5: true })
export const updateSuccess = (state, { data }) => state.merge({ fetch5: false, data_updateAnswer: data })
export const updateFailure = state => state.merge({ fetch5: false })

export const setDataPhra = (state, { data }) => {
  // console.log(data, 'REDUX')
  return state.merge({ data_phra: data })
}

export const verifyRequest = state => state.merge({ fetch2: true })
export const verifySuccess = (state, { data }) => {
  // let tmp = state.data_verify  // can use
  // let tmp = [...state.data_verify]  // can use

  let tmp
  if (state.data_verify && state.data_verify != null && state.data_verify.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = [...state.data_verify]
    data.forEach(e => {
      if (tmp.find(b => b.id == e.id)) {
        console.log('SAME VALUE')
      } else { tmp.push(e) }
    })
    // main algorithm
  } else {
    tmp = data
  }

  return state.merge({ fetch2: false, data_verify: tmp })
}
export const verifyFailure = state => state.merge({ fetch2: false })

export const setDataPoint = (state, { data, index }) => {
  return state.merge({ data_point: data, index_row: index })
}

export const acceptRequest = state => state.merge({ fetch3: true })
export const acceptSuccess = (state, { data }) => state.merge({ fetch3: false, data_accept: data })
export const acceptFailure = state => state.merge({ fetch3: false })

export const cancelCoin = state => state.merge({ fetch6: true })
export const cancelCoinSuccess = (state, { data }) => state.merge({ fetch6: false, data_cancel: data })
export const cancelCoinFailure = state => state.merge({ fetch6: false })

export const answerList = state => state.merge({ fetch4: true })
export const answerSuccess = (state, { data }) => state.merge({ fetch4: false, data_answer: data })
export const answerFailure = state => state.merge({ fetch4: false })
export const answerSuccess2 = (state, { data }) => {
  let tmp = [...state.data_answer]
  data.forEach(e => {
    if (tmp.find(b => b.id == e.id)) {
      console.log('SAME VALUE')
    } else { tmp.push(e) }
  })
  return state.merge({ data_answer: tmp, fetch4: false })
}
export const answerFailure2 = state => state.merge({ fetch4: false })

export const editGroup = state => state.merge({ fetch8: true })
export const editGroupSuccess = (state, { data }) => state.merge({ fetch8: false, data_group: data })
export const editGroupFailure = state => state.merge({ fetch8: false })


export const clearAcceptRequest = state => state.merge({ fetch3: null })

export const setFullData = (state, { data }) => {
  return state.merge({ full_data: data })
}

export const editFullData = (state, { id }) => {
  let tmp = [...state.full_data]
  let index = state.index_row
  // console.log(tmp[index])
  // console.log('HERE TMP IN REDUX')
  let data = {
    id: id,
    status: 10
  }
  tmp[index] = data
  return state.merge({ full_data: tmp })
}

export const clearEditData = state => state.merge({ data_group: null })

export const setAnswerDetail = (state, { data }) => {
  return state.merge({ answer_detail: data })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EXPERT_REQUEST]: requestAnswer,
  [Types.EXPERT_SUCCESS]: requestAnswerSuccess,
  [Types.EXPERT_FAILURE]: requestAnswerFailure,

  [Types.UPDATE_ANSWER]: updateAnswer,
  [Types.UPDATE_SUCCESS]: updateSuccess,
  [Types.UPDATE_FAILURE]: updateFailure,

  [Types.CANCEL_COIN]: cancelCoin,
  [Types.CANCEL_COIN_SUCCESS]: cancelCoinSuccess,
  [Types.CANCEL_COIN_FAILURE]: cancelCoinFailure,

  [Types.SET_DATA_PHRA]: setDataPhra,
  [Types.SET_DATA_POINT]: setDataPoint,

  [Types.GET_PROFILE_REQUEST]: verifyRequest,
  [Types.VERIFY_SUCCESS]: verifySuccess,
  [Types.VERIFY_FAILURE]: verifyFailure,
  // [Types.VERIFY_SUCCESS2]: verifySuccess2,
  // [Types.VERIFY_FAILURE2]: verifyFailure2,

  [Types.ACCEPT_REQUEST]: acceptRequest,
  [Types.ACCEPT_SUCCESS]: acceptSuccess,
  [Types.ACCEPT_FAILURE]: acceptFailure,

  [Types.ANSWER_LIST]: answerList,
  [Types.ANSWER_SUCCESS]: answerSuccess,
  [Types.ANSWER_FAILURE]: answerFailure,
  [Types.ANSWER_SUCCESS2]: answerSuccess2,
  [Types.ANSWER_FAILURE2]: answerFailure2,

  [Types.GET_AUTO_TEXT]: getAutoText,
  [Types.GET_AUTO_TEXT_SUCCESS]: getAutoTextSuccess,
  [Types.GET_AUTO_TEXT_FAILURE]: getAutoTextFailure,

  [Types.EDIT_GROUP]: editGroup,
  [Types.EDIT_GROUP_SUCCESS]: editGroupSuccess,
  [Types.EDIT_GROUP_FAILURE]: editGroupFailure,

  [Types.SET_STORE_TMP]: setStoreTmp,
  [Types.GET_LIST_STORE]: getListStore,
  [Types.GET_LIST_STORE_SUCCESS]: getListStoreSuccess,
  [Types.GET_LIST_STORE_FAILURE]: getListStoreFailure,
  [Types.VERIFY_STORE]: verifyStore,
  [Types.VERIFY_STORE_SUCCESS]: verifyStoreSuccess,
  [Types.VERIFY_STORE_FAILURE]: verifyStoreFailure,
  [Types.CLEAR_VERIFY_STORE]: clearVerifyStore,
  [Types.EDIT_VERIFY_STORE]: editVerifyStore,

  [Types.CLEAR_EDIT_DATA]: clearEditData,

  [Types.CLEAR_ACCEPT_REQUEST]: clearAcceptRequest,
  [Types.SET_FULL_DATA]: setFullData,
  [Types.EDIT_FULL_DATA]: editFullData,
  [Types.SET_ANSWER_DETAIL]: setAnswerDetail,
  [Types.CLEAR_SEND_ANSWER]: clearSendAnswer,
  [Types.CLEAR_GET_ANSWER]: clearGetAnswer,
  [Types.CLEAR_UPDATE_REQUEST]: clearUpdateRequest,

  [Types.SET_TYPE_ANSWER]: setTypeAnswer,
  [Types.CLEAR_DATA_ANSWER]: clearDataAnswer,
  [Types.EDIT_LIST_BANK_PAYMENT]: editListBankPayment,
})
