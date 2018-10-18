import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  paymentRequest: ['money', 'type'],
  paymentSuccess: ['data'],
  paymentFailure: null,
})

export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,  // for plus money

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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENT_REQUEST]: request,
  [Types.PAYMENT_SUCCESS]: success,
  [Types.PAYMENT_FAILURE]: failure
})
