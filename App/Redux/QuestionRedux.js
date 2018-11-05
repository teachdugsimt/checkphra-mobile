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
  addQuestionSuccess: ['data'],
  addQuestionFailure: null,

  getHistory: ['count'],
  getHistorySuccess: ['history'],
  getHistoryFailure: null,
  getHistorySuccess2: ['history'],
  getHistoryFailure2: null,

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

  clearProfile: null,

  setStartQuestion: ['index', 'num'],

  clearDataQuestion: null,
})

export const QuestionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  request_type: null,
  // payload: null,
  error: null,
  amuletType: null,
  questionType: [],

  history: [],
  answer: null,

  profile: null,

  // -------- For Submittion
  images: [],
  questions: [],
  amuletID: 0,
  uri: {},

  request: null,  // for add Question
  data_question: null,  // response addQuestion

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
export const addQuestionSuccess = (state, { data }) => state.merge({ request: false, data_question: data })
export const addQuestionFailure = state => state.merge({ request: false })

// request the data from an api
export const amuletRequest = (state) => state.merge({ request_type: true })

// successful api lookup
export const amuletSuccess = (state, action) => {
  const { amuletType } = action
  return state.merge({ amuletType, request_type: false })
}

// Something went wrong somewhere.
export const amuletFailure = state => state.merge({ request_type: false })

export const setAmuletType = (state, { amuletType }) => {
  console.log(amuletType)
  return state.merge({ amuletID: amuletType })
}

export const setQuestions = (state, { questions }) => {
  let q = []
  questions.forEach(element => {
    if (element.name == "พระแท้ / ไม่แท้" && element.isChecked == false) {
      q.push(element.id)
    }
    if (element.isChecked) {
      q.push(element.id)
    }

  });
  console.log(q)
  console.log('REDUX')
  return state.merge({ questions: q })
}

export const setStartQuestion = (state, { index, num }) => {
  let chk = state.questions
  console.log(chk)
  console.log('REDUX2')
  let q = []
  if (chk.length == 0) {  // กรณีส่งโดยไม่ติ๊ก ผ่าน
    console.log('SUCCESS')
    q[index] = num
  } else {    // กรณีส่งแล้วไม่ติ๊กข้อแรก
    console.log('not have first')
    q = chk
    console.log(q)
  }

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

export const historySuccess2 = (state, action) => {
  const { history } = action
  let tmp = [...state.history]
  history.forEach(e => {
    if (tmp.find(b => b.id == e.id)) {
      console.log('SAME VALUE')
    } else { tmp.push(e) }
  })
  // history.forEach(e => tmp.push(e))
  return state.merge({ history: tmp, request2: false })
}

// Something went wrong somewhere.
export const historyFailure2 = state => state.merge({ request2: false })

export const clearForm = state => state.merge({
  images: [],
  questions: [],
  amuletID: 0,
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

export const deleteQuestionFailure = state => state.merge({ request3: false })

export const clearProfile = state => state.merge({ profile: null })
export const clearDataQuestion = state => state.merge({ data_question: null })
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
  [Types.GET_HISTORY_SUCCESS2]: historySuccess2,
  [Types.GET_HISTORY_FAILURE2]: historyFailure2,

  [Types.CLEAR_FORM]: clearForm,

  [Types.GET_ANSWER_SUCCESS]: answerSuccess,
  [Types.GET_PROFILE_SUCCESS]: profileSuccess,

  [Types.DELETE_IMAGE]: deleteImage,
  [Types.CLEAR_IMAGE]: clearImage,
  [Types.SET_URI]: setUri,

  [Types.ADD_QUESTION]: requestAddQuestion,
  [Types.ADD_QUESTION_SUCCESS]: addQuestionSuccess,
  [Types.ADD_QUESTION_FAILURE]: addQuestionFailure,

  [Types.DELETE_QUESTION]: requestDeleteQuestion,
  [Types.DELETE_QUESTION_SUCCESS]: deleteQuestionSuccess,
  [Types.DELETE_QUESTION_FAILURE]: deleteQuestionFailure,

  [Types.CLEAR_PROFILE]: clearProfile,
  [Types.CLEAR_DATA_QUESTION]: clearDataQuestion,

  [Types.SET_START_QUESTION]: setStartQuestion,
})
