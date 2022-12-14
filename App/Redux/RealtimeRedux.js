import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  realtimeRequest: ['data'],
  realtimeSuccess: ['payload'],
  realtimeFailure: null,

  setDataMessage: ['data'],
  updateDataMessage: ['data'],

  clearDataMessage: null,

  setDataMessage2: ['data'],
  clearDataMessage2: null,

  setListMyContact: ['data'],
  setTmpListMyContact: ['data'],
  setListMyContact2: ['data'],

  setAdminMessage: ['data', 'id'],  // for user save message from admin

  setListUser: ['data'],  // for admin get list user

  setTmpAdminData: ['data'],  // for store tmp user before go next screen
  setUserMessage: ['data'], // set user tmp message to admin
})

export const RealtimeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,

  data_message: null,  // store messages from firebase database
  data_message2: null,  // store messages from firebase database ( Private Chat )

  data_listMyContact: null,  // store List My contact
  tmp_listMyContact: null, // set tmp list my contact for list my contact 2
  data_listMyContact2: null, // store data message my contact 2

  data_messageAdmin: null,  // store message of admin

  data_listuser: null,  // store list user contact to admin
  tmp_user: null,  // store tmp user before go next screen (for admin!!)
  data_adminmessage: null,  // stoer data admin = user messages
})

/* ------------- Selectors ------------- */

export const RealtimeSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const setUserMessage = (state, {data}) => {
  data.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return state.merge({ data_adminmessage: data })
}

export const setTmpAdminData = (state, { data }) => state.merge({ tmp_user: data })

export const setListUser = (state, { data }) => {
  data.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return state.merge({ data_listuser: data })
}

export const setAdminMessage = (state, { data, id }) => {
  data.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  data.forEach((e, i) => {
    if(e.user._id != id){
      e.user.avatar = "https://sv1.picz.in.th/images/2019/06/11/19Sk9k.png"
    }
  })
  return state.merge({ data_messageAdmin: data })
}

export const setTmpListMyContact = (state, { data }) => state.merge({ tmp_listMyContact: data })

export const setListMyContact2 = (state, { data }) => {
  data.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return state.merge({ data_listMyContact2: data })
}

export const setListMyContact = (state, { data }) => {
  return state.merge({ data_listMyContact: data })
}

export const clearDataMessage = state => {
  return state.merge({ data_message: null })
}

export const clearDataMessage2 = state => {
  return state.merge({ data_message2: null })
}

export const updateDataMessage = (state, { data }) => {
  console.log(data)
  console.log("++++++++++++++ DATA COME TO REDUX ++++++++++++++++")
  let tmp = JSON.parse(JSON.stringify(state.data_message))
  if (tmp && tmp != null) {
    tmp.splice(tmp.length, 0, data)
  }

  // tmp.sort(function (a, b) {  // (b.id - a.id;) id ??????????????????????????? 
  //   return a.createdAt - b.createdAt;       // (a.id - b.id;) id ??????????????????????????? 
  // })
  console.log(tmp)
  console.log("++++++++++++++ TMP AFTER ADD NEW MESSAGE ++++++++++++++++++")
  return state.merge({ data_message: tmp })
}

export const setDataMessage2 = (state, { data }) => {
  data.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return state.merge({ data_message2: data })
}

export const setDataMessage = (state, { data }) => {
  data.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return state.merge({ data_message: data })
}

export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REALTIME_REQUEST]: request,
  [Types.REALTIME_SUCCESS]: success,
  [Types.REALTIME_FAILURE]: failure,

  [Types.SET_DATA_MESSAGE]: setDataMessage,
  [Types.UPDATE_DATA_MESSAGE]: updateDataMessage,
  [Types.CLEAR_DATA_MESSAGE]: clearDataMessage,

  [Types.SET_DATA_MESSAGE2]: setDataMessage2,
  [Types.CLEAR_DATA_MESSAGE2]: clearDataMessage2,

  [Types.SET_LIST_MY_CONTACT]: setListMyContact,
  [Types.SET_LIST_MY_CONTACT2]: setListMyContact2,
  [Types.SET_TMP_LIST_MY_CONTACT]: setTmpListMyContact,

  [Types.SET_ADMIN_MESSAGE]: setAdminMessage,
  [Types.SET_LIST_USER]: setListUser,
  [Types.SET_TMP_ADMIN_DATA]: setTmpAdminData,
  [Types.SET_USER_MESSAGE]: setUserMessage,
})
