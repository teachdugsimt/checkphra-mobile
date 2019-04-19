import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-native'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendMessageAdmin: ['message'],
  sendMessageSuccess: ['data'],
  sendMessageFailure: null,

  getMessageAdmin: ['page'],
  getMessageSuccess: ['data'],
  getMessageFailure: null,

  getListUserContact: ['page'],
  getListUserContactSuccess: ['data'],
  getListUserContactFailure: null,

  setGroupChatAdmin: ['data'],
  clearDataListUser: null,

  editDataMessage: ['data'],

  editRedDotAtoU: ['data'],
  clearCacheGetData: null,
})

export const ChatTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  request: null,  // request for send message to admin
  data_sendMessage: null,  // data for store send message to admin

  request2: null,  // request for get message  contact admin
  data_message: null,  // data for store message contact admin


  request3: null, // request for get list user contact
  data_listUser: null,  //  store list user contact

  data_gChatAdmin: null, // data set to Admin to chat with user
})

/* ------------- Selectors ------------- */

export const ChatSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */
export const editRedDotAtoU = (state, { data }) => {
  Reactotron.display({
    name: "data come to Redux",
    preview: "Edit Red dot in Redux",
    value: data
  })
  let tmp = JSON.parse(JSON.stringify(state.data_listUser))
  if (tmp && tmp != null) {
    tmp.forEach((e, i) => {
      if (e.id == data.id) {
        e.is_new = false
      }
    })
  }
  Reactotron.display({
    name: "Tmp After Edit Red Dot",
    preview: "Edit Red dot in Redux",
    value: tmp
  })
  return state.merge({ data_listUser: tmp })
}
export const clearDataListUser = state => state.merge({ data_listUser: null })

export const clearCacheGetData = state => state.merge({ data_message: null, data_sendMessage: null })
export const setGroupChatAdmin = (state, { data }) => state.merge({ data_gChatAdmin: data })
export const editDataMessage = (state, { data }) => {  // new data
  console.log('DATA ABOUT COME TO REDUX BEFORE EDIT')
  console.log(data)

  let tmp  // old data 

  if (state.data_message && state.data_message != null && state.data_message.length > 0) {
    tmp = JSON.parse(JSON.stringify(state.data_message))
    // 1. redux state has "id" same "id new send data" ****************************************
    if (tmp.find(c => c.id == data.id) || tmp.find(c => c.id == data.id) != undefined) {
      console.log('FUCK YEAH DO NOT COME THIS IF')
      tmp.forEach((e, i) => {
        if (e.id == data.id && tmp.find(c => c.id == data.id) != -1) {
          // console.log(e) // เจอ id ที่ตรงกัน ระหว่าง old data(tmp) และ new data(data)แล้ว 
          console.log('E.MESSAGE => data.messages')
          console.log(e)
          console.log(data)
          e.messages = data.messages
          // e = data  // can't
          // e[i] = data  // can't
          // e.messages = data.messages  // tmp2 มีช่องที่ 0 กับ 1 must be loop for check index again  // can't
        }
      })
    }
    // 2. redux state has not "id" same "id new send data" ****************************************
    else if (!tmp.find(c => c.id == data.id) || tmp.find(c => c.id == data.id) == undefined) {
      console.log('More Than 10 Messages')
      tmp.push(data)
    }
    console.log('AFTER EDIT ARRAY IN FIRST IF')
    console.log(tmp)

  } else {
    // 3. Opening first chat in chat room ****************************************
    tmp = []
    tmp.push(data)
    console.log('NEW TMP IN HAVE NOT DATA FROM FIRST TIME')
    console.log(tmp)
  }

  return state.merge({ data_message: tmp })
}

export const getListUserContact = state => state.merge({ request3: true })
export const getListUserContactSuccess = (state, { data }) => {
  let tmp
  if (state.data_listUser && state.data_listUser != null && state.data_listUser.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_listUser))
    data.forEach(e => {
      if (tmp.find(b => b.id == e.id)) {
        console.log('SAME VALUE')
      } else { tmp.push(e) }
    })
    // main algorithm
  } else {
    tmp = data
  }

  return state.merge({ data_listUser: tmp, request3: false })
}
export const getListUserContactFailure = state => state.merge({ request3: false })

export const sendMessageAdmin = state => state.merge({ request: true })
export const sendMessageSuccess = (state, { data }) => state.merge({ request: false, data_sendMessage: data })
export const sendMessageFailure = state => state.merge({ request: false })

export const getMessageAdmin = state => state.merge({ request2: true })
export const getMessageSuccess = (state, { data }) => {
  let tmp
  if (state.data_message && state.data_message != null && state.data_message.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_message))
    data.forEach(e => {
      if (tmp.find(b => b.id == e.id)) {
        console.log('SAME VALUE')
        if (tmp.find(b => b.id == e.id).messages != e.messages && tmp.find(b => b.id == e.id).messages.length != e.messages.length) {  // มี message ใหม่เข้ามาใน new data
          tmp.find(b => b.id == e.id).messages.splice(tmp.find(b => b.id == e.id).messages.length, 0, e.messages[e.messages.length - 1])
        }
      } else { tmp.push(e) }
    })
    // main algorithm
  } else {
    tmp = data
  }

  tmp.sort(function (a, b) {
    return a.id - b.id;
  })

  return state.merge({ data_message: tmp, request2: false })
}
export const getMessageFailure = state => state.merge({ request2: false })
// request the data from an api


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_MESSAGE_ADMIN]: sendMessageAdmin,
  [Types.SEND_MESSAGE_SUCCESS]: sendMessageSuccess,
  [Types.SEND_MESSAGE_FAILURE]: sendMessageFailure,

  [Types.GET_MESSAGE_ADMIN]: getMessageAdmin,
  [Types.GET_MESSAGE_SUCCESS]: getMessageSuccess,
  [Types.GET_MESSAGE_FAILURE]: getMessageFailure,

  [Types.GET_LIST_USER_CONTACT]: getListUserContact,
  [Types.GET_LIST_USER_CONTACT_SUCCESS]: getListUserContactSuccess,
  [Types.GET_LIST_USER_CONTACT_FAILURE]: getListUserContactFailure,

  [Types.EDIT_DATA_MESSAGE]: editDataMessage,
  [Types.SET_GROUP_CHAT_ADMIN]: setGroupChatAdmin,
  [Types.CLEAR_CACHE_GET_DATA]: clearCacheGetData,

  [Types.CLEAR_DATA_LIST_USER]: clearDataListUser,
  [Types.EDIT_RED_DOT_ATO_U]: editRedDotAtoU,
})
