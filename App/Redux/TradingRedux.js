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
})

/* ------------- Selectors ------------- */

export const TradingSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
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
  console.log('REDUX TEST DATA -------------------')
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
  return state.merge({ data_tradelist: tmp, request2: false })
}
export const listTradingFailure2 = state => state.merge({ request2: false })

export const updateStatus = state => state.merge({ request3: true })
export const updateSuccess = (state, { data }) => state.merge({ request3: false, data_status: data })
export const updateFailure = (state) => state.merge({ request3: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRADING_REQUEST]: request,
  [Types.TRADING_SUCCESS]: success,
  [Types.TRADING_FAILURE]: failure,

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

  [Types.GET_LEASING_ADMIN]: getLeasingAdmin,
  [Types.GET_LEASING_SUCCESS]: getLeasingSuccess,
  [Types.GET_LEASING_FAILURE]: getLeasingFailure,
  [Types.GET_LEASING_SUCCESS2]: getLeasingSuccess2,
  [Types.GET_LEASING_FAILURE2]: getLeasingFailure2,

  [Types.SET_DATA]: setData,
  [Types.SET_FULL_DATA2]: setFullData2,
  [Types.EDIT_FULL_DATA2]: editFullData2,
})
