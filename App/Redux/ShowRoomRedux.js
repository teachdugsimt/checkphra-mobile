import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  showRoomRequest: ['data'],
  showRoomSuccess: ['payload'],
  showRoomFailure: null,

  setAmuletType: ['data'],
  setDetailPhra: ['data'],
  setTheirAmuletData: ['data'],
  setDataGroupChat: ['data'],

  setDisscuss: ['id'],

  getListAmulet: ['page'],
  getListSuccess: ['data'],
  getListFailure: null,

  getMyRealAmulet: ['page'],
  getMyRealAmuletSuccess: ['data'],
  getMyRealAmuletFailure: null,
  // getListSuccess2: ['data'],
  // getListFailure2: null,
  sendMessageTheirAmulet: ['qid', 'message'],
  sendMessageTheirAmuletSuccess: ['data'],
  sendMessageTheirAmuletFailure: null,

  sendMessageOwner: ['message'],
  sendMessageOwnerSuccess: ['data'],
  sendMessageOwnerFailure: null,

  getMessageOwner: ['page'],
  getMessageOwnerSuccess: ['data'],
  getMessageOwnerFailure: null,


  getMessageTheirAmulet: ['page'],
  getMessageTheirAmuletSuccess: ['data'],
  getMessageTheirAmuletFailure: null,

  clearDataTheir: null,  // clear data_their
  clearTheirAmuletMessage: null,
  clearOwnerAmuletMessage: null,
  clearDataListTheirAmulet: null,
  clearDataMyRealAmulet: null,
  editTheirAmuletMessage: ['data'],
  editOwnerAmuletMessage: ['data'],

  getMyMessageFromOther: ['page'],
  getMyMessageFromOtherSuccess: ['data'],
  getMyMessageFromOtherFailure: null,

  getListOwnerContact: ['page'],
  getListOwnerContactSuccess: ['data'],
  getListOwnerContactFailure: null,

  syncVoteData: ['data'],

  clearDataListMyMessageFromOtherPerson: null, // clear list ที่โชว์ว่ามีคน x คน ทักมาหาเรา 
  clearDataListContactOwner: null,

  updateIsNewUserContactOwner: ['id'],

  getMessageOtherContactMyAmulet: ['page'],
  getMessageOtherContactMyAmuletSuccess: ['data'],
  getMessageOtherContactMyAmuletFailure: null,

  updateUserContactOwnerList: ['old_id', 'new_id'],
  clearDataGroupChat: null,
})

export const ShowRoomTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,

  data_amulet: null,  // they real amulet data  
  data_detail: null,  // data my real amulet, set from List of my real amulet 
  data_their: null,   // data their real amulet, set from List of their real amulet  (Forget to ChatMyAmulet please!! ^-^)
  data_groupChat: null, // group uid of api when owner => other & other => owner

  data_list: null,  // show phra real other person
  request: null,  // request for get list of real phra other person

  request2: null, // request for send message of their amulet
  data_sendMessageTheirAmulet: null,  // data for send message of their amulet

  request3: null,  // request for get message their amulet
  data_messageTheirAmulet: null,  // request for get their amulet message

  request4: null, //  send message to owner amulet
  data_sendMessageOwner: null,  // data send message to owner amulet

  request5: null,  // request for get message owner
  data_messageOwner: null,  // data for get message owner

  request6: null,   // request for get my real amulet
  data_myRealAmulet: null,  // data for store my real amulet

  request7: null,  // request for get data my real amulet message from other person ( Chat Solo )
  data_myMessageFromOther: null,  // data for store my message from other person ( Chat Solo )

  request8: null,  // request for get list contact with user => owner
  data_listOwner: null, // store list user => owner

  request9: null,  // request other chat with my amulet
  data_other_chat_my: null,  // เก็บข้อมูลที่ คนอื่นทักมาคุย 1-1 กับพระของเรา

  discuss_id: null,  // discuss id

})

/* ------------- Selectors ------------- */

export const ShowRoomSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */


export const setDisscuss = (state, { id }) => {
  return state.merge({ discuss_id: id })
}

export const updateUserContactOwnerList = (state, { old_id, new_id }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_listOwner))
  if (tmp && tmp != null) {
    tmp.forEach((e, i) => {
      if (e.id == old_id) {
        e.id = new_id
      }
    })
  }
  console.log(tmp)
  console.log('++++++++++++++++++ TMP DATA_LISTOWNER +++++++++++++++++++')
  return state.merge({ data_listOwner: tmp })
}

export const getMessageOtherContactMyAmulet = state => state.merge({ request5: true })
export const getMessageOtherContactMyAmuletSuccess = (state, { data }) => {
  let tmp
  if (state.data_messageOwner && state.data_messageOwner != null && state.data_messageOwner.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_messageOwner))
    data.forEach(e => {
      if (tmp.find(b => b.id == e.id)) {
        console.log('SAME VALUE')
        if (tmp.find(b => b.id == e.id).messages != e.messages && tmp.find(b => b.id == e.id).messages.length != e.messages.length) {  // มี message ใหม่เข้ามาใน new data
          tmp.find(b => b.id == e.id).messages.splice(tmp.find(b => b.id == e.id).messages.length, 0, e.messages[e.messages.length - 1])
        }
      } else {
        tmp.push(e)
      }
    })
    // main algorithm
  } else {
    tmp = data
  }

  tmp.sort(function (a, b) {
    return a.id - b.id;
  })
  console.log(tmp)
  console.log("++++++++++++++++++== TMP PRIVATE CHAT ++++++++++++++++++++++")
  return state.merge({ data_messageOwner: tmp, request5: false })
}
export const getMessageOtherContactMyAmuletFailure = state => state.merge({ request5: false })




export const updateIsNewUserContactOwner = (state, { id }) => {
  console.log(id)
  console.log('+++++++++++++ ID REDUX ++++++++++++++++++')
  let tmp = JSON.parse(JSON.stringify(state.data_listOwner))
  console.log(tmp)
  if (tmp && tmp != null) {
    tmp.forEach((e, i) => {
      if (e.id == id) {
        e.is_new = false
        // console.log(e.id)
        // console.log('FUCKKKKKKKKKKERRRRRRRRRRRR')
      }
    })
  }
  console.log(tmp)
  console.log('+++++++++++++++++++ TMP AFTER EDIT RED DOT 55 +++++++++++++++++++++')
  return state.merge({ data_listOwner: tmp })
}

export const syncVoteData = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_listOwner))

  tmp.forEach((e, i) => {
    if (e.amulet && e.amulet != null && e.amulet.id) {
      if (data.id == e.amulet.id) {
        e.amulet = data
      }
    }
  })

  return state.merge({ data_listOwner: tmp })
}

export const clearDataListContactOwner = state => state.merge({ data_listOwner: null })
// request the data from an api
export const clearDataTheir = state => state.merge({ data_their: null })
export const clearDataListMyMessageFromOtherPerson = state => state.merge({ data_myMessageFromOther: null })
export const clearDataMyRealAmulet = state => state.merge({ data_myRealAmulet: null })
export const setDataGroupChat = (state, { data }) => state.merge({ data_groupChat: data })
export const clearDataGroupChat = (state) => state.merge({ data_groupChat: null })

export const getMyMessageFromOther = state => state.merge({ request7: true })
export const getMyMessageFromOtherSuccess = (state, { data }) => {
  let tmp
  if (state.data_myMessageFromOther && state.data_myMessageFromOther != null && state.data_myMessageFromOther.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_myMessageFromOther))
    data.forEach(e => {
      if (tmp.find(b => b.id == e.id)) {
        console.log('SAME VALUE')
      } else { tmp.push(e) }
    })
    // main algorithm
  } else {
    tmp = data
  }

  return state.merge({ data_myMessageFromOther: tmp, request7: false })
}
export const getMyMessageFromOtherFailure = state => state.merge({ request7: false })

export const getListOwnerContact = state => state.merge({ request8: true })
export const getListOwnerContactSuccess = (state, { data }) => {

  let tmp
  if (state.data_listOwner && state.data_listOwner != null && state.data_listOwner.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_listOwner))
    data.forEach(e => {
      if (tmp.find(b => b.id == e.id)) {
        console.log('SAME VALUE')
        if (tmp.find(b => b.id == e.id) != e) {  // id ใน redux state = id ใน new data แต่ข้อมูลข้างในไม่เท่ากัน
          console.log('ID in redux = ID in new data, but data in redux do not same new data')
        }
      }
      else {
        tmp.map((el, ind) => {
          if (e.amulet && el.amulet && e.amulet.id == el.amulet.id) {
            if (e != el) {
              tmp.splice(ind, 1, e)
            }
          } else {
            tmp.push(e)
          }
        })

      }
    })
    // main algorithm
  } else {
    tmp = data
  }

  return state.merge({ data_listOwner: tmp, request8: false })
}
export const getListOwnerContactFailure = state => state.merge({ request8: false })

export const getMyRealAmulet = state => state.merge({ request6: true })
export const getMyRealAmuletSuccess = (state, { data }) => {
  let tmp
  if (state.data_myRealAmulet && state.data_myRealAmulet != null && state.data_myRealAmulet.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_myRealAmulet))
    data.forEach(e => {
      if (tmp.find(b => b.id == e.id)) {
        console.log('SAME VALUE')
      } else { tmp.push(e) }
    })
    // main algorithm
  } else {
    tmp = data
  }

  return state.merge({ data_myRealAmulet: tmp, request6: false })
}
export const getMyRealAmuletFailure = state => state.merge({ request6: false })

export const clearOwnerAmuletMessage = state => state.merge({ data_sendMessageOwner: null, data_messageOwner: null })
export const clearDataListTheirAmulet = state => state.merge({ data_list: null })
export const clearTheirAmuletMessage = state => state.merge({ data_messageTheirAmulet: null, data_sendMessageTheirAmulet: null })
export const editTheirAmuletMessage = (state, { data }) => {  // new data
  console.log('DATA ABOUT COME TO REDUX BEFORE EDIT')
  console.log(data)

  let tmp  // old data 

  if (state.data_messageTheirAmulet && state.data_messageTheirAmulet != null && state.data_messageTheirAmulet.length > 0) {
    tmp = JSON.parse(JSON.stringify(state.data_messageTheirAmulet))
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

  return state.merge({ data_messageTheirAmulet: tmp })
}

export const editOwnerAmuletMessage = (state, { data }) => {
  console.log('DATA ABOUT COME TO REDUX BEFORE EDIT+++++++++++ OWNER')
  console.log(data)

  let tmp  // old data 

  if (state.data_messageOwner && state.data_messageOwner != null && state.data_messageOwner.length > 0) {
    tmp = JSON.parse(JSON.stringify(state.data_messageOwner))
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

  return state.merge({ data_messageOwner: tmp })
}

export const setAmuletType = (state, { data }) => state.merge({ data_amulet: data })
export const setDetailPhra = (state, { data }) => state.merge({ data_detail: data })
export const setTheirAmuletData = (state, { data }) => state.merge({ data_their: data })

export const getMessageTheirAmulet = state => state.merge({ request3: true })
export const getMessageTheirAmuletSuccess = (state, { data }) => {
  // let tmp = [...state.data_list] // if don't have value it ERROR!!
  console.log(data)
  console.log('++++++++++++++++++ DATA MESSAGE %% +++++++++++++++++')
  let tmp
  if (state.data_messageTheirAmulet && state.data_messageTheirAmulet != null && state.data_messageTheirAmulet.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_messageTheirAmulet))
    data.forEach((e, i) => {
      if (tmp.find(b => b.id == e.id)) {   // กรณีมี discuss id ใน new data == discuss id ใน old data
        console.log('SAME VALUE')
        if (tmp.find(b => b.id == e.id).messages != e.messages && tmp.find(b => b.id == e.id).messages.length != e.messages.length) {  // มี message ใหม่เข้ามาใน new data
          tmp.find(b => b.id == e.id).messages.splice(tmp.find(b => b.id == e.id).messages.length, 0, e.messages[e.messages.length - 1])
        }
      } else {
        tmp.push(e)
      }  // กรณี มี discuss id อันใหม่เข้ามาให้พุชใส่เรย
    })
    // main algorithm
  } else {
    tmp = data
  }

  tmp.sort(function (a, b) {
    return a.id - b.id;
  })
  console.log(tmp)
  console.log('++++++++++++++++++++ TMP DATA MESSAGES #@#@#@#@#@#@#@#@ +++++++++++++++++++++++')
  return state.merge({ data_messageTheirAmulet: tmp, request3: false })
}
export const getMessageTheirAmuletFailure = state => state.merge({ request3: false })

export const getMessageOwner = state => state.merge({ request5: true })
export const getMessageOwnerSuccess = (state, { data }) => {
  let tmp
  if (state.data_messageOwner && state.data_messageOwner != null && state.data_messageOwner.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_messageOwner))
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

  return state.merge({ data_messageOwner: tmp, request5: false })
}
export const getMessageOwnerFailure = state => state.merge({ request5: false })

export const sendMessageOwner = state => state.merge({ request4: true })
export const sendMessageOwnerSuccess = (state, { data }) => state.merge({ request4: false, data_sendMessageOwner: data })
export const sendMessageOwnerFailure = state => state.merge({ request4: false })

export const sendMessageTheirAmulet = state => state.merge({ request2: true })
export const sendMessageTheirAmuletSuccess = (state, { data }) => state.merge({ request2: false, data_sendMessageTheirAmulet: data })
export const sendMessageTheirAmuletFailure = state => state.merge({ request2: false })

export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state => state.merge({ fetching: false, error: true, payload: null })

export const getListAmulet = state => state.merge({ request: true })
export const getListSuccess = (state, { data }) => {
  // let tmp = [...state.data_list] // if don't have value it ERROR!!
  let tmp
  if (state.data_list && state.data_list != null && state.data_list.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = [...state.data_list]
    data.forEach(e => {
      if (tmp.find(b => b.id == e.id)) {
        console.log('SAME VALUE')
      } else { tmp.push(e) }
    })
    // main algorithm
  } else {
    tmp = data
  }

  return state.merge({ data_list: tmp, request: false })
}
export const getListFailure = state => state.merge({ request: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHOW_ROOM_REQUEST]: request,
  [Types.SHOW_ROOM_SUCCESS]: success,
  [Types.SHOW_ROOM_FAILURE]: failure,

  [Types.CLEAR_DATA_LIST_CONTACT_OWNER]: clearDataListContactOwner,

  [Types.SET_AMULET_TYPE]: setAmuletType,
  [Types.SET_DETAIL_PHRA]: setDetailPhra,
  [Types.SET_THEIR_AMULET_DATA]: setTheirAmuletData,
  [Types.SET_DATA_GROUP_CHAT]: setDataGroupChat,
  [Types.CLEAR_DATA_GROUP_CHAT]: clearDataGroupChat,

  [Types.GET_LIST_AMULET]: getListAmulet,
  [Types.GET_LIST_SUCCESS]: getListSuccess,
  [Types.GET_LIST_FAILURE]: getListFailure,

  [Types.GET_MESSAGE_THEIR_AMULET]: getMessageTheirAmulet,
  [Types.GET_MESSAGE_THEIR_AMULET_SUCCESS]: getMessageTheirAmuletSuccess,
  [Types.GET_MESSAGE_THEIR_AMULET_FAILURE]: getMessageTheirAmuletFailure,

  [Types.SEND_MESSAGE_THEIR_AMULET]: sendMessageTheirAmulet,
  [Types.SEND_MESSAGE_THEIR_AMULET_SUCCESS]: sendMessageTheirAmuletSuccess,
  [Types.SEND_MESSAGE_THEIR_AMULET_FAILURE]: sendMessageTheirAmuletFailure,

  [Types.SEND_MESSAGE_OWNER]: sendMessageOwner,
  [Types.SEND_MESSAGE_OWNER_SUCCESS]: sendMessageOwnerSuccess,
  [Types.SEND_MESSAGE_OWNER_FAILURE]: sendMessageOwnerFailure,

  [Types.GET_MESSAGE_OWNER]: getMessageOwner,
  [Types.GET_MESSAGE_OWNER_SUCCESS]: getMessageOwnerSuccess,
  [Types.GET_MESSAGE_OWNER_FAILURE]: getMessageOwnerFailure,

  [Types.GET_MY_REAL_AMULET]: getMyRealAmulet,
  [Types.GET_MY_REAL_AMULET_SUCCESS]: getMyRealAmuletSuccess,
  [Types.GET_MY_REAL_AMULET_FAILURE]: getMyRealAmuletFailure,

  [Types.GET_MY_MESSAGE_FROM_OTHER]: getMyMessageFromOther,
  [Types.GET_MY_MESSAGE_FROM_OTHER_SUCCESS]: getMyMessageFromOtherSuccess,
  [Types.GET_MY_MESSAGE_FROM_OTHER_FAILURE]: getMyMessageFromOtherFailure,

  [Types.GET_LIST_OWNER_CONTACT]: getListOwnerContact,
  [Types.GET_LIST_OWNER_CONTACT_SUCCESS]: getListOwnerContactSuccess,
  [Types.GET_LIST_OWNER_CONTACT_FAILURE]: getListOwnerContactFailure,

  [Types.CLEAR_THEIR_AMULET_MESSAGE]: clearTheirAmuletMessage,
  [Types.EDIT_THEIR_AMULET_MESSAGE]: editTheirAmuletMessage,
  [Types.EDIT_OWNER_AMULET_MESSAGE]: editOwnerAmuletMessage,
  [Types.CLEAR_DATA_LIST_THEIR_AMULET]: clearDataListTheirAmulet,
  [Types.CLEAR_OWNER_AMULET_MESSAGE]: clearOwnerAmuletMessage,
  [Types.CLEAR_DATA_MY_REAL_AMULET]: clearDataMyRealAmulet,
  [Types.CLEAR_DATA_LIST_MY_MESSAGE_FROM_OTHER_PERSON]: clearDataListMyMessageFromOtherPerson,
  [Types.CLEAR_DATA_THEIR]: clearDataTheir,
  [Types.SYNC_VOTE_DATA]: syncVoteData,
  [Types.UPDATE_IS_NEW_USER_CONTACT_OWNER]: updateIsNewUserContactOwner,
  // [Types.GET_LIST_SUCCESS2]: getListSuccess2,
  // [Types.GET_LIST_FAILURE2]: getListFailure2,

  [Types.GET_MESSAGE_OTHER_CONTACT_MY_AMULET]: getMessageOtherContactMyAmulet,
  [Types.GET_MESSAGE_OTHER_CONTACT_MY_AMULET_SUCCESS]: getMessageOtherContactMyAmuletSuccess,
  [Types.GET_MESSAGE_OTHER_CONTACT_MY_AMULET_FAILURE]: getMessageOtherContactMyAmuletFailure,

  [Types.SET_DISSCUSS]: setDisscuss,
  [Types.UPDATE_USER_CONTACT_OWNER_LIST]: updateUserContactOwnerList,
})
