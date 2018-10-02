import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // questionRequest: ['data'],
  // questionSuccess: ['payload'],
  // questionFailure: null
  getQuestionType: null,
  getQuestionTypeSuccess: ['questionType'],
  getQuestionTypeFailure: null
})

export const QuestionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // data: null,
  // fetching: null,
  // payload: null,
  // error: null
  questionType: []
})

/* ------------- Selectors ------------- */

export const QuestionSelectors = {
  // getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, questionType: [] })

// successful api lookup
export const success = (state, action) => {
  const { questionType } = action
  return state.merge({ fetching: false, error: null, questionType })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, questionType: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_QUESTION_TYPE]: request,
  [Types.GET_QUESTION_TYPE_SUCCESS]: success,
  [Types.GET_QUESTION_TYPE_FAILURE]: failure
})
