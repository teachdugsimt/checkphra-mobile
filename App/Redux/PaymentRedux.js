import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // paymentRequest: ['money', 'type'],
  paymentRequest: ['data'],
  paymentSuccess: ['data'],
  paymentFailure: null,

  historyAddpointRequest: ['page'],
  historyAddpointSuccess: ['data_history'],
  historyAddpointFailure: null,

  sendSlipRequest: ['item'],
  sendSlipSuccess: ['data'],
  sendSlipFailure: null,

  setDetailPoint: ['data'],
  setImage: ['data'],
  deleteImage: null,

  setForm: ['data'],

  cardRequest: ['token'],
  cardSuccess: ['data'],
  cardFailure: null,

  clearRequest: null,
  clearCardRequest: null,
})

export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,       // data when add point
  fetching: null,  // for plus money

  request: null,   // history  point
  data_history: null,  // for history point

  request2: null,   // send slip
  data_slip: null,

  data_point: [],  // tmp data for detailPoint
  img_slip: null,  // slip image

  form: null,

  data_credit: [],
  request3: null,   // credit card request
})

/* ------------- Selectors ------------- */

export const PaymentSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) => {
  return state.merge({ fetching: true })
}

// successful api lookup
export const success = (state, action) => {
  const { data } = action
  return state.merge({ fetching: false, data })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, data: null })

export const historyAddpointRequest = state => {
  return state.merge({ request: true })
}

// export const historyAddpointSuccess = (state, data) => {
//   if (!state.data_history) {
//     history = data.data_history
//   } else {
//     history = [...state.data_history, data.data_history]
//   }
//   // console.log(history)
//   // console.log('REDUX')
//   return state.merge({ request: false, data_history: history })
// }
export const historyAddpointSuccess = (state, data) => {
  console.log(data.data_history)
  // console.log(history)
  // console.log('REDUX')
  return state.merge({ request: false, data_history: data.data_history })
}

export const historyAddpointFailure = state => {
  return state.merge({ request: false })
}

export const setDetailPoint = (state, { data }) => {
  return state.merge({ data_point: data })
}


export const setImage = (state, { data }) => {
  console.log('REDUX')
  console.log(data)
  return state.merge({ img_slip: data })
}

export const deleteImage = state => state.merge({ img_slip: null })

export const sendSlipRequest = state => state.merge({ request2: true })
export const sendSlipSuccess = (state, { data }) => {
  return state.merge({ request2: false, data_slip: data })
}
export const sendSlipFailure = state => state.merge({ request2: false })

export const setForm = (state, { data }) => state.merge({ form: data })

export const creditRequest = (state) => state.merge({ request3: true })
export const creditSuccess = (state, { data }) => state.merge({ request3: false, data_credit: data })
export const creditFailure = state => state.merge({ request3: false })


export const clearRequest = state => state.merge({ request2: null })

export const clearCardRequest = state => state.merge({ request3: null })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENT_REQUEST]: request,
  [Types.PAYMENT_SUCCESS]: success,
  [Types.PAYMENT_FAILURE]: failure,

  [Types.HISTORY_ADDPOINT_REQUEST]: historyAddpointRequest,
  [Types.HISTORY_ADDPOINT_SUCCESS]: historyAddpointSuccess,
  [Types.HISTORY_ADDPOINT_FAILURE]: historyAddpointFailure,

  [Types.SEND_SLIP_REQUEST]: sendSlipRequest,
  [Types.SEND_SLIP_SUCCESS]: sendSlipSuccess,
  [Types.SEND_SLIP_FAILURE]: sendSlipFailure,

  [Types.SET_DETAIL_POINT]: setDetailPoint,
  [Types.SET_IMAGE]: setImage,
  [Types.DELETE_IMAGE]: deleteImage,
  [Types.SET_FORM]: setForm,
  [Types.CLEAR_REQUEST]: clearRequest,
  [Types.CLEAR_CARD_REQUEST]: clearCardRequest,

  [Types.CARD_REQUEST]: creditRequest,
  [Types.CARD_SUCCESS]: creditSuccess,
  [Types.CARD_FAILURE]: creditFailure
})
