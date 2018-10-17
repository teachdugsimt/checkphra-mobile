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
  getAnswerSuccess: ['answer'],

  deleteImage: ['index'],
  clearImage: null,
  setUri: ['data', 'index'],

  deleteQuestion: ['q_id'],
  deleteQuestionSuccess: ['data'],
  deleteQuestionFailure: null,
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
  amuletType: 0,
  uri: {},

  request: null,  // for add Question
  request2: null,  //for get History
  request3: null,  // for cancel Question

  dataDeleteq: []
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

export const requestAddQuestion = (state) => state.merge({ request: true })

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

export const setQuestions = (state, { questions }) => {
  // console.log(questions)
  let q = []
  questions.forEach(element => {
    if (element.isChecked) {
      q.push(element.id)
    }
  });
  // console.log(q)
  return state.merge({ questions: q })
}

export const requestGetHistory = (state) => state.merge({ request2: true })

// successful api lookup
export const historySuccess = (state, action) => {
  const { history } = action
  return state.merge({ history, request2: false })
}

// Something went wrong somewhere.
export const historyFailure = state => state.merge({ request2: false })

export const clearForm = state => state.merge({
  images: [],
  questions: [],
  amuletType: 0,
  request: null,
  request2: null,
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

// export const deleteImage = (state, { index }) => {
//   let tmp = [...state.images]
//   tmp[index] = undefined
//   let tmp2 = [...state.uri]
//   tmp2[index] = undefined
//   return state.merge({ images: tmp, uri: tmp2 })
// }

// export const clearImage = (state) => state.merge({ images: [], uri: [] })

export const clearImage = (state) => state.merge({ images: [] })

export const deleteImage = (state, { index }) => {
  let tmp = [...state.images]
  tmp[index] = undefined
  return state.merge({ images: tmp })
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


export const setUri = (state, { data, index }) => {
  let tmp
  if (state.tmp) {
    tmp = [...state.tmp]
  } else {
    tmp = []
  }

  tmp[index] = data
  return state.merge({ uri: tmp })
}

export const requestDeleteQuestion = state => state.merge({ request3: true })

export const deleteQuestionSuccess = (state, { data }) => {
  return state.merge({ dataDeleteq: data, request3: false })
}

export const deleteQuestionFailure = state => state.merge({ request3: false})
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

  [Types.GET_HISTORY]: requestGetHistory,
  [Types.GET_HISTORY_SUCCESS]: historySuccess,
  [Types.GET_HISTORY_FAILURE]: historyFailure,

  [Types.CLEAR_FORM]: clearForm,

  [Types.GET_ANSWER_SUCCESS]: answerSuccess,
  [Types.GET_PROFILE_SUCCESS]: profileSuccess,

  [Types.DELETE_IMAGE]: deleteImage,
  [Types.CLEAR_IMAGE]: clearImage,
  [Types.SET_URI]: setUri,

  [Types.ADD_QUESTION]: requestAddQuestion,

  [Types.DELETE_QUESTION]: requestDeleteQuestion,
  [Types.DELETE_QUESTION_SUCCESS]: deleteQuestionSuccess,
  [Types.DELETE_QUESTION_FAILURE]: deleteQuestionFailure,
})
