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

  setImages: ['index', 'source'],    // SET IMAGEEEEEEEEEEEEEEEEEEEEEEE
  setQuestions: ['questions'],
  setAmuletType: ['amuletType'],

  addQuestion: null,     //  ADD QUESTION in SendImageScreen
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

  deleteImage: ['index'],   // DELETEEEEEEEEEEEEEEEEEEEEEEEEEEE
  clearImage: null,
  setUri: ['data', 'index'],

  deleteQuestion: ['q_id'],
  deleteQuestionSuccess: ['data'],
  deleteQuestionFailure: null,

  clearProfile: null,

  setStartQuestion: ['index', 'num'],

  clearDataQuestion: null,
  clearAll: null,
  clearGetHistory: null,
  setRequestType: null,
  editHistory: ['data'],
  editProfile: ['data'],
  editProfile2: ['data'],

  updateProfileFollow: ['data'],

  editRedDotData: ['id', 'status', 'type_id'],
  addRedDotData: ['data'],
  deleteRedDotData: ['type_id'],
  editRedDotData2: ['last_id', 'type_id'],
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
  // checkHistory: null,
  answer: null,

  profile: null,
  request_profile: null,

  // -------- For Submittion
  images: [],
  questions: [],
  amuletID: 0,
  uri: {},

  request: false,  // for add Question
  data_question: null,  // response addQuestion

  request2: false,  //for get History
  request3: false,  // for cancel Question

  dataDeleteq: [],

  data_follow: null,  // save red dot data
})

/* ------------- Selectors ------------- */

export const QuestionSelectors = {
  // getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const addRedDotData = (state, { data }) => {
  console.log(data)
  console.log('++++++++++++++ DATA FOLLOWER +++++++++++++++')
  let tmp = JSON.parse(JSON.stringify(state.data_follow))
  if (!tmp || tmp == null || tmp == undefined) {  // ฟอลครั้งแรก
    tmp = data
  } else {  // ฟอลคครั้งต่อมา
    // tmp.splice(0, 0, data)
    tmp.splice(0, 0, data[data.length - 1]) 
    // or
    // build two loop check
  }

  console.log(tmp)
  console.log('+++++++++++ FOLLOW TMP +++++++++++')

  return state.merge({ data_follow: tmp })
}

export const deleteRedDotData = (state, { type_id }) => {
  console.log(type_id)
  console.log('++++++++++++++ DATA UNFOLLOW +++++++++++++++')
  let tmp = JSON.parse(JSON.stringify(state.data_follow))
  if (tmp && tmp != null) {  // Unfollow
    tmp.map((e, i) => {
      if (e.type_id == type_id) {
        tmp.splice(i, 1)
      }
    })
  }
  console.log(tmp)
  console.log('++++++++++++ UNFOLLOW TMP +++++++++++++')
  return state.merge({ data_follow: tmp })
}

export const editRedDotData2 = (state, { last_id, type_id }) => {
  console.log(last_id)
  console.log(type_id)
  console.log('++++++++++++++ DATA UPDATE LAST ID +++++++++++++++')
  let tmp = JSON.parse(JSON.stringify(state.data_follow))
  if (tmp && tmp != null) {
    tmp.forEach((e, i) => {
      if (e.type_id == type_id) {
        e.last_id = last_id,
          e.status = false
      }
    })
  }
  console.log(tmp)
  console.log('+++++++++++++ UPDATE LAST ID TMP +++++++++++++')
  return state.merge({ data_follow: tmp })
}

export const editRedDotData = (state, { id, status, type_id }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_follow))
  // let tmp2 = tmp
  if (tmp != null) {
    tmp.forEach(((e, i) => {
      if (e.type_id == type_id) {
        e.last_id = id
        e.status = status
      }
      if (e.last_id == null) {
        e.status = true
      }
    }))
  }
  console.log(tmp)
  console.log('++++++++++++++ TMP IN REDUX EDIT RED DOT +++++++++++++')
  return state.merge({ data_follow: tmp })
}

export const updateProfileFollow = (state, { data }) => state.merge({ data_follow: data })

export const editProfile = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.profile))
  tmp.store = data
  return state.merge({ profile: tmp })
}

export const editHistory = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.history))
  tmp.forEach((e, i) => {
    if (e.id == data.qid && e.market_status == null) {
      e.market_status = 10
    }
  })

  return state.merge({ history: tmp })
}

export const setRequestType = state => state.merge({ request_type: null })

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
    if ((element.name == "พระแท้ / ไม่แท้" || element.name == "พระแท้/ไม่แท้" || element.name == "Real amulet / Fake amulet" || element.name == "Real amulet/Fake amulet") && element.isChecked == false) {
      q.push(element.id)
    } else if ((element.name == "พระแท้ / ไม่แท้" || element.name == "พระแท้/ไม่แท้" || element.name == "Real amulet / Fake amulet" || element.name == "Real amulet/Fake amulet") && element.isChecked) {
      q.push(element.id)
    } else {
      if (element.isChecked) {
        q.push(element.id)
      }
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
    q = JSON.parse(JSON.stringify(chk))
    if (q.indexOf(1) == -1) {
      q.splice(0, 0, 1)
    }
    // q[index] = num
    console.log(q)
  }
  // console.log(q)
  // console.log('CHECK BOX BEFORE SEND TO SAGA')
  return state.merge({ questions: q })
}

export const requestGetHistory = (state) => state.merge({ request2: true })
export const clearGetHistory = state => state.merge({ request2: false })
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
  request2: false,
})


export const answerSuccess = (state, action) => {

  const { answer } = action
  console.log(answer)
  return state.merge({ answer })
}

export const getProfile = state => state.merge({ request_profile: true })

export const profileSuccess = (state, action) => {

  const { profile } = action
  // console.log(profile)
  return state.merge({ profile, request_profile: false })
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

export const clearAll = state => INITIAL_STATE

export const editProfile2 = (state, { data }) => state.merge({ profile: data })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_QUESTION_TYPE]: questionRequest,
  [Types.GET_QUESTION_TYPE_SUCCESS]: questionSuccess,
  [Types.GET_QUESTION_TYPE_FAILURE]: questionFailure,

  [Types.EDIT_RED_DOT_DATA]: editRedDotData,
  [Types.UPDATE_PROFILE_FOLLOW]: updateProfileFollow,

  [Types.EDIT_HISTORY]: editHistory,
  [Types.EDIT_PROFILE]: editProfile,
  [Types.EDIT_PROFILE2]: editProfile2,

  [Types.GET_AMULET_TYPE]: amuletRequest,
  [Types.GET_AMULET_TYPE_SUCCESS]: amuletSuccess,
  [Types.GET_AMULET_TYPE_FAILURE]: amuletFailure,

  [Types.SET_AMULET_TYPE]: setAmuletType,
  [Types.SET_IMAGES]: setImages,               /// SETTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
  [Types.SET_QUESTIONS]: setQuestions,

  [Types.GET_HISTORY]: requestGetHistory,
  [Types.GET_HISTORY_SUCCESS]: historySuccess,
  [Types.GET_HISTORY_FAILURE]: historyFailure,
  [Types.GET_HISTORY_SUCCESS2]: historySuccess2,
  [Types.GET_HISTORY_FAILURE2]: historyFailure2,
  [Types.CLEAR_GET_HISTORY]: clearGetHistory,

  [Types.CLEAR_FORM]: clearForm,
  [Types.CLEAR_ALL]: clearAll,

  [Types.GET_ANSWER_SUCCESS]: answerSuccess,
  [Types.GET_PROFILE]: getProfile,
  [Types.GET_PROFILE_SUCCESS]: profileSuccess,

  [Types.DELETE_IMAGE]: deleteImage,  // DELETEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
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
  [Types.SET_REQUEST_TYPE]: setRequestType,

  [Types.ADD_RED_DOT_DATA]: addRedDotData,
  [Types.DELETE_RED_DOT_DATA]: deleteRedDotData,
  [Types.EDIT_RED_DOT_DATA2]: editRedDotData2,
})
