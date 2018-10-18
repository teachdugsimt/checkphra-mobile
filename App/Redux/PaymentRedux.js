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
})

export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,       // data when add point
  fetching: null,  // for plus money

  request: null,
  data_history: null
  
})

/* ------------- Selectors ------------- */

export const PaymentSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>{
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

export const historyAddpointRequest = state =>{
  return state.merge({ request: true })
}

export const historyAddpointSuccess = (state, data ) => {
  if(!state.data_history){
    history = data.data_history
  } else {
    history = [...state.data_history, data.data_history]
  }
  // console.log(history)
  // console.log('REDUX')
  return state.merge({ request: false, data_history: history})
}

export const historyAddpointFailure = state =>{
  return state.merge({ request: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENT_REQUEST]: request,
  [Types.PAYMENT_SUCCESS]: success,
  [Types.PAYMENT_FAILURE]: failure,

  [Types.HISTORY_ADDPOINT_REQUEST]: historyAddpointRequest,
  [Types.HISTORY_ADDPOINT_SUCCESS]: historyAddpointSuccess,
  [Types.HISTORY_ADDPOINT_FAILURE]: historyAddpointFailure,

})
