import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // questionRequest: ['data'],
  // questionSuccess: ['payload'],
  // questionFailure: null

  getAmuletType: null,
  getAmuletTypeSuccess: ['amuletType'],
  getAmuletTypeFailure: null,

  getQuestionType: null,
  getQuestionTypeSuccess: ['questionType'],
  getQuestionTypeFailure: null,

  setImages: ['index', 'source'],
  setQuestions: ['questions'],
  setAmuletType: ['amuletType'],

  addQuestion: null,

  getHistory: null,
  getHistorySuccess: ['history'],
  getHistoryFailure: null,

  getProfile: null,
  getProfileSuccess: ['profile'],

  clearForm: null,

  getAnswer: ['qid'],
  getAnswerSuccess: ['answer']
})

export const QuestionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  // payload: null,
  error: null,
  amuletType: [],
  questionType: [],

  history: [],
  answer: null,

  profile: null,

  // -------- For Submittion
  images: [],
  questions: [],
  amuletType: 0
})

/* ------------- Selectors ------------- */

export const QuestionSelectors = {
  // getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const questionRequest = (state, { data }) =>
  state.merge({ fetching: true, data, questionType: [] })

// successful api lookup
export const questionSuccess = (state, action) => {
  const { questionType } = action
  return state.merge({ fetching: false, error: null, questionType })
}

// Something went wrong somewhere.
export const questionFailure = state =>
  state.merge({ fetching: false, error: true, questionType: [] })



// request the data from an api
export const amuletRequest = (state) => state

// successful api lookup
export const amuletSuccess = (state, action) => {
  const { amuletType } = action
  return state.merge({ amuletType })
}

// Something went wrong somewhere.
export const amuletFailure = state => state

export const setAmuletType = (state, { amuletType }) => {
  console.log(amuletType)
  return state.merge({ amuletType })
}

export const setImages = (state, { index, source }) => {
  let images
  if (state.images) {
    images = [...state.images]
  } else {
    images = []
  }

  images[index] = source
  return state.merge({ images })
}

export const setQuestions = (state, { questions }) => {
  console.log(questions)
  let q = []
  questions.forEach(element => {
    if (element.isChecked) {
      q.push(element.id)
    }
  });
  console.log(q)
  return state.merge({ questions: q })
}

// successful api lookup
export const historySuccess = (state, action) => {
  const { history } = action
  return state.merge({ history })
}

// Something went wrong somewhere.
export const historyFailure = state => state

export const clearForm = state => state.merge({
  images: [],
  questions: [],
  amuletType: 0
})


export const answerSuccess = (state, action) => {

  const { answer } = action
  console.log(answer)
  return state.merge({ answer })
}

export const profileSuccess = (state, action) => {

  const { profile } = action
  console.log(profile)
  return state.merge({ profile })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_QUESTION_TYPE]: questionRequest,
  [Types.GET_QUESTION_TYPE_SUCCESS]: questionSuccess,
  [Types.GET_QUESTION_TYPE_FAILURE]: questionFailure,

  [Types.GET_AMULET_TYPE]: amuletRequest,
  [Types.GET_AMULET_TYPE_SUCCESS]: amuletSuccess,
  [Types.GET_AMULET_TYPE_FAILURE]: amuletFailure,

  [Types.SET_AMULET_TYPE]: setAmuletType,
  [Types.SET_IMAGES]: setImages,
  [Types.SET_QUESTIONS]: setQuestions,

  [Types.GET_HISTORY_SUCCESS]: historySuccess,
  [Types.GET_HISTORY_FAILURE]: historyFailure,

  [Types.CLEAR_FORM]: clearForm,

  [Types.GET_ANSWER_SUCCESS]: answerSuccess,
  [Types.GET_PROFILE_SUCCESS]: profileSuccess
})
