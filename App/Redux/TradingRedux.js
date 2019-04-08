import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // tradingRequest: ['data'],
  // tradingSuccess: ['payload'],
  // tradingFailure: null
  tradingRequest: ['qid', 'message'],
  tradingSuccess: ['data'],
  tradingFailure: null,

  getDetail: ['id'],
  getDetailSuccess: ['data'],
  getDetailFailure: null,

  setFullData2: ['data'],
  editFullData2: ['qid'],
  setData: ['data'],

  listTrading: ['page'],
  listTradingSuccess: ['data'],
  listTradingFailure: null,
  listTradingSuccess2: ['data'],
  listTradingFailure2: null,

  updateStatus: ['qid', 'status'],
  updateSuccess: ['data'],
  updateFailure: null,

  sendMessage: ['text'],
  sendMessageSuccess: ['data'],
  sendMessageFailure: null,

  sharedLeasing: ['qid', 'status'],
  sharedSuccess: ['data'],
  sharedFailure: null,

  getPriceLeasing: null,
  getPriceSuccess: ['data'],
  getPriceFailure: null,

  wantBuy: ['qid', 'interest'],
  wantSuccess: ['data'],
  wantFailure: null,

  setImage: ['data'],
  deleteImage: null,

  addDetailCertificate: ['qid', 'amuletName', 'temple', 'image', 'ownerName'],
  addDetailCertificateSuccess: ['data'],
  addDetailCertificateFailure: null,

  getListCerFromUser: ['page'],
  getListCerFromUserSuccess: ['data'],
  getListCerFromUserFailure: null,

  activeCertificate: ['qid', 'amuletName', 'temple'],
  activeCertificateSuccess: ['data'],
  activeCertificateFailure: null,

  setDataCer: ['data'],
  editDataListCer: ['data'],

  clearDataBid: null,
  clearDataCer: null,
  clearDataActiveCer: null,

  getLeasingAdmin: ['page'],
  getLeasingSuccess: ['data'],
  getLeasingFailure: null,
  getLeasingSuccess2: ['data'],
  getLeasingFailure2: null,
})

export const TradingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],  // data trading
  fetching: null,  // for trading api

  data_answer: null, // set data to bit2

  request: null,  // for get Detail each of list trading
  data_detail: null,  // data from top value

  full_data2: null,

  request2: null,  // request list of trading
  data_tradelist: null,  // data from list of trading

  request3: null,  // request update status amulet 
  data_status: null,  // data update status

  request4: null,  // request to facebook messenger
  data_fbmsg: null,  // data facebook messenger

  request5: null,   // request for shared leasing amulet
  data_shared: null,   // data when shared amulet leasing

  request6: null,  // for get admin leasing amulet
  data_admin: null, // data when request6 true

  request7: null,    // for get Price leasing all this day for admin
  data_price: null,  // data when request7

  request8: null,  // want to buy api
  data_want: null,  // data want to buy

  request9: null,  // request for add detail of certificate
  data_certificate: null,  // store certificate detail data
  image: null,  // set picture of certificate

  request10: null,  // get List certificate from user ( Admin Only !!)
  data_getListCer: null,  // store list certificate from user

  request11: null,  // request for active certificate data
  data_activeCer: null,  // store data when active certificate by admin

  data_setCer: null,  // set for pass to admin edit certificate from user data
})

/* ------------- Selectors ------------- */

export const TradingSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */
export const clearDataActiveCer = state => state.merge({ data_activeCer: null })
export const clearDataCer = state => state.merge({ data_certificate: null })
export const clearDataBid = state => state.merge({ data: [] })
export const setDataCer = (state, { data }) => state.merge({ data_setCer: data })
// request the data from an api

export const editDataListCer = (state, { data }) => {

  let tmp
  let tmp2
  if (state.data_getListCer && state.data_getListCer != null) {
    tmp = JSON.parse(JSON.stringify(state.data_getListCer))
    tmp2 = tmp
    tmp.forEach((e, i) => {
      if (e.qid == data.qid) {
        console.log('Come to IF')
        tmp2[i] = data
      }
    })

  }
  console.log(tmp2)
  console.log('+++++ TMP2 AFTER ADAP +++++')
  return state.merge({ data_getListCer: tmp2 })
}

export const activeCertificate = state => state.merge({ request11: true })
export const activeCertificateSuccess = (state, { data }) => state.merge({ request11: false, data_activeCer: data })
export const activeCertificateFailure = state => state.merge({ request11: false })

export const getListCerFromUser = state => state.merge({ request10: true })
export const getListCerFromUserSuccess = (state, { data }) => {
  let tmp
  if (state.data_getListCer && state.data_getListCer != null && state.data_getListCer.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_getListCer))
    data.forEach(e => {
      if (tmp.find(b => b.id == e.id)) {
        console.log('SAME VALUE')
      } else { tmp.push(e) }
    })
    // main algorithm
  } else {
    tmp = data
  }

  tmp.sort(function (a, b) {
    return b.id - a.id;
  })

  return state.merge({ data_getListCer: tmp, request10: false })
}
export const getListCerFromUserFailure = state => state.merge({ request10: false })

export const setImage = (state, { data }) => state.merge({ image: data })
export const deleteImage = state => state.merge({ image: null })
export const addDetailCertificate = state => state.merge({ request9: true })
export const addDetailCertificateSuccess = (state, { data }) => state.merge({ request9: false, data_certificate: data })
export const addDetailCertificateFailure = state => state.merge({ request9: false })

export const getDetailRequest = (state) => state.merge({ request: true })
export const getDetailSuccess = (state, { data }) => state.merge({ request: false, data_detail: data })
export const getDetailFailure = (state) => state.merge({ request: false })

export const sendMessage = state => state.merge({ request4: true })
export const sendMessageSuccess = (state, { data }) => state.merge({ request4: false, data_fbmsg: data })
export const sendMessageFailure = state => state.merge({ request4: null })

export const sharedLeasing = state => state.merge({ request5: true })
export const sharedSuccess = (state, { data }) => state.merge({ request5: false, data_shared: data })
export const sharedFailure = state => state.merge({ request5: false })

export const getLeasingAdmin = state => state.merge({ request6: true })
export const getLeasingSuccess = (state, { data }) => state.merge({ request6: false, data_admin: data })
export const getLeasingFailure = state => state.merge({ request6: false })
export const getLeasingSuccess2 = (state, { data }) => {
  let tmp = [...state.data_admin]
  data.forEach(e => {
    if (tmp.find(b => b.id == e.id)) {
      console.log('SAME VALUE')
    } else { tmp.push(e) }
  })
  return state.merge({ data_admin: tmp, request6: false })
}
export const getLeasingFailure2 = state => state.merge({ request6: false })

export const getPriceLeasing = state => state.merge({ request7: true })
export const getPriceSuccess = (state, { data }) => state.merge({ request7: false, data_price: data })
export const getPriceFailure = state => state.merge({ request7: false })


export const request = (state) => state.merge({ fetching: true })

// successful api lookup
// export const success = (state, action) => {
//   return state.merge({ fetching: false, data: [...state.data, action.data] })
// }

export const success = (state, action) => {
  console.log(action.data)
  console.log('------------------- REDUX TEST BID DATA FROM TUM -------------------')
  return state.merge({ fetching: false, data: action.data })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false })


export const setData = (state, { data }) => {
  return state.merge({ data_answer: data })
}

export const setFullData2 = (state, { data }) => {
  return state.merge({ full_data2: data })
}

export const editFullData2 = (state, { qid }) => {
  let tmp = JSON.parse(JSON.stringify(state.full_data2))
  // console.log('FUCKKKKKKKKKKKKKKKKKKKKKKKKKK   BEFORE')
  // console.log(tmp)
  if (tmp && tmp.length > 0) {
    tmp.forEach((e, i) => {
      if (e.qid == qid) {
        let data = {
          qid,
          bid_status: 'not'
        }
        tmp.splice(i, 1, data)
        // e.bid_status = 'not'
      }
    })
  }
  // console.log(tmp)
  // console.log('HERE TMP REDUX ****************** AFTER  ********************')
  // tmp.filter(e => e.qid != qid)

  return state.merge({ full_data2: tmp })
}

export const listTrading = state => state.merge({ request2: true })
export const listTradingSuccess = (state, { data }) => state.merge({ request2: false, data_tradelist: data })
export const listTradingFailure = (state) => state.merge({ request2: false })
export const listTradingSuccess2 = (state, { data }) => {
  let tmp = [...state.data_tradelist]
  data.forEach(e => {
    if (tmp.find(b => b.id == e.id)) {
      console.log('SAME VALUE')
    } else { tmp.push(e) }
  })
  // tmp.sort(function (a, b) {  // (b.id - a.id;) id มากไปน้อย 
  //   return b.id - a.id;       // (a.id - b.id;) id น้อยไปมาก 
  // })
  return state.merge({ data_tradelist: tmp, request2: false })
}
export const listTradingFailure2 = state => state.merge({ request2: false })

export const updateStatus = state => state.merge({ request3: true })
export const updateSuccess = (state, { data }) => state.merge({ request3: false, data_status: data })
export const updateFailure = (state) => state.merge({ request3: false })

export const wantRequest = state => state.merge({ request8: true })
export const wantSuccess = (state, { data }) => state.merge({ request8: false, data_want: data })
export const wantFailure = state => state.merge({ request8: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRADING_REQUEST]: request,
  [Types.TRADING_SUCCESS]: success,
  [Types.TRADING_FAILURE]: failure,

  [Types.WANT_BUY]: wantRequest,
  [Types.WANT_SUCCESS]: wantSuccess,
  [Types.WANT_FAILURE]: wantFailure,

  [Types.GET_DETAIL]: getDetailRequest,
  [Types.GET_DETAIL_SUCCESS]: getDetailSuccess,
  [Types.GET_DETAIL_FAILURE]: getDetailFailure,

  [Types.LIST_TRADING]: listTrading,
  [Types.LIST_TRADING_SUCCESS]: listTradingSuccess,
  [Types.LIST_TRADING_FAILURE]: listTradingFailure,
  [Types.LIST_TRADING_SUCCESS2]: listTradingSuccess2,
  [Types.LIST_TRADING_FAILURE2]: listTradingFailure2,

  [Types.UPDATE_STATUS]: updateStatus,
  [Types.UPDATE_SUCCESS]: updateSuccess,
  [Types.UPDATE_FAILURE]: updateFailure,

  [Types.SEND_MESSAGE]: sendMessage,
  [Types.SEND_MESSAGE_SUCCESS]: sendMessageSuccess,
  [Types.SEND_MESSAGE_FAILURE]: sendMessageFailure,

  [Types.SHARED_LEASING]: sharedLeasing,
  [Types.SHARED_SUCCESS]: sharedSuccess,
  [Types.SHARED_FAILURE]: sharedFailure,

  [Types.GET_PRICE_LEASING]: getPriceLeasing,
  [Types.GET_PRICE_SUCCESS]: getPriceSuccess,
  [Types.GET_PRICE_FAILURE]: getPriceFailure,

  [Types.ADD_DETAIL_CERTIFICATE]: addDetailCertificate,
  [Types.ADD_DETAIL_CERTIFICATE_SUCCESS]: addDetailCertificateSuccess,
  [Types.ADD_DETAIL_CERTIFICATE_FAILURE]: addDetailCertificateFailure,

  [Types.GET_LIST_CER_FROM_USER]: getListCerFromUser,
  [Types.GET_LIST_CER_FROM_USER_SUCCESS]: getListCerFromUserSuccess,
  [Types.GET_LIST_CER_FROM_USER_FAILURE]: getListCerFromUserFailure,

  [Types.ACTIVE_CERTIFICATE]: activeCertificate,
  [Types.ACTIVE_CERTIFICATE_SUCCESS]: activeCertificateSuccess,
  [Types.ACTIVE_CERTIFICATE_FAILURE]: activeCertificateFailure,

  [Types.GET_LEASING_ADMIN]: getLeasingAdmin,
  [Types.GET_LEASING_SUCCESS]: getLeasingSuccess,
  [Types.GET_LEASING_FAILURE]: getLeasingFailure,
  [Types.GET_LEASING_SUCCESS2]: getLeasingSuccess2,
  [Types.GET_LEASING_FAILURE2]: getLeasingFailure2,

  [Types.SET_DATA_CER]: setDataCer,
  [Types.SET_DATA]: setData,
  [Types.SET_IMAGE]: setImage,
  [Types.DELETE_IMAGE]: deleteImage,
  [Types.SET_FULL_DATA2]: setFullData2,
  [Types.EDIT_FULL_DATA2]: editFullData2,
  [Types.CLEAR_DATA_BID]: clearDataBid,
  [Types.CLEAR_DATA_CER]: clearDataCer,
  [Types.CLEAR_DATA_ACTIVE_CER]: clearDataActiveCer,
  [Types.EDIT_DATA_LIST_CER]: editDataListCer,
})
