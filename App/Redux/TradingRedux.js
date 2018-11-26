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

  [Types.SET_DATA]: setData,
  [Types.SET_FULL_DATA2]: setFullData2,
  [Types.EDIT_FULL_DATA2]: editFullData2,
})