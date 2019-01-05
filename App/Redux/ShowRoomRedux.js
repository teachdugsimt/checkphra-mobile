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

  getListAmulet: ['page'],
  getListSuccess: ['data'],
  getListFailure: null,
  // getListSuccess2: ['data'],
  // getListFailure2: null,
  sendMessageTheirAmulet: ['qid', 'message'],
  sendMessageTheirAmuletSuccess: ['data'],
  sendMessageTheirAmuletFailure: null,

  getMessageTheirAmulet: ['qid'],
  getMessageTheirAmuletSuccess: ['data'],
  getMessageTheirAmuletFailure: null,

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
  data_detail: null,  // data my real amulet
  data_their: null,   // data their real amulet

  data_list: null,  // show phra real other person
  request: null,  // request for get list of real phra other person

  request2: null, // request for send message of their amulet
  data_sendMessageTheirAmulet: null,  // data for send message of their amulet

  request3: null,  // request for get message their amulet
  data_messageTheirAmulet: null,  // request for get their amulet message

})

/* ------------- Selectors ------------- */

export const ShowRoomSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const setAmuletType = (state, { data }) => state.merge({ data_amulet: data })
export const setDetailPhra = (state, { data }) => state.merge({ data_detail: data })
export const setTheirAmuletData = (state, { data }) => state.merge({ data_their: data })

export const getMessageTheirAmulet = state => state.merge({ request3: true })
export const getMessageTheirAmuletSuccess = (state, { data }) => state.merge({ request3: false, data_messageTheirAmulet: data })
export const getMessageTheirAmuletFailure = state => state.merge({ request3: false })

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
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })


// export const getListAmulet = state => state.merge({ request: true })
// export const getListSuccess = (state, { data }) => state.merge({ request: false, data_list: data })
// export const getListFailure = state => state.merge({ request: false })
// export const getListSuccess2 = (state, { data }) => {
//   let tmp = [...state.data_list]
//   // data.forEach(e => tmp.push(e))
//   data.forEach(e => {
//     if (tmp.find(b => b.id == e.id)) {
//       console.log('SAME VALUE')
//     } else { tmp.push(e) }
//   })
//   return state.merge({ data_list: tmp, request: false })
// }
// export const getListFailure2 = state => state.merge({ request: false })

export const getListAmulet = state => state.merge({ request: true })
export const getListSuccess = (state, { data }) => {
  // let tmp = [...state.data_list] // if don't have value it ERROR!!
  let tmp
  if (state.data_list && state.data_list != null) {
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

  [Types.SET_AMULET_TYPE]: setAmuletType,
  [Types.SET_DETAIL_PHRA]: setDetailPhra,
  [Types.SET_THEIR_AMULET_DATA]: setTheirAmuletData,

  [Types.GET_LIST_AMULET]: getListAmulet,
  [Types.GET_LIST_SUCCESS]: getListSuccess,
  [Types.GET_LIST_FAILURE]: getListFailure,

  [Types.GET_MESSAGE_THEIR_AMULET]: getMessageTheirAmulet,
  [Types.GET_MESSAGE_THEIR_AMULET_SUCCESS]: getMessageTheirAmuletSuccess,
  [Types.GET_MESSAGE_THEIR_AMULET_FAILURE]: getMessageTheirAmuletFailure,

  [Types.SEND_MESSAGE_THEIR_AMULET]: sendMessageTheirAmulet,
  [Types.SEND_MESSAGE_THEIR_AMULET_SUCCESS]: sendMessageTheirAmuletSuccess,
  [Types.SEND_MESSAGE_THEIR_AMULET_FAILURE]: sendMessageTheirAmuletFailure,
  // [Types.GET_LIST_SUCCESS2]: getListSuccess2,
  // [Types.GET_LIST_FAILURE2]: getListFailure2,
})
