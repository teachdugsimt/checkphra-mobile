/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import ShowRoomActions from '../Redux/ShowRoomRedux'
import WebboardActions from '../Redux/WebboardRedux'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;

// import { ShowRoomSelectors } from '../Redux/ShowRoomRedux'
const auth = state => state.auth
const type = state => state.showroom.data_amulet
const idDataAmulet = state => state.showroom.data_their
const dataChat = state => state.showroom.data_groupChat
const show = state => state.showroom
const webboard = state => state.webboard
I18n.locale = auth.language

export function* getShowRoom(api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ShowRoomSelectors.getData)
  // make the call to the api
  const response = yield call(api.getshowRoom, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ShowRoomActions.showRoomSuccess(response.data))
  } else {
    yield put(ShowRoomActions.showRoomFailure())
  }
}

export function* getListAmulet(api, { page }) {
  const aut = yield select(auth)
  const typ = yield select(type)

  const data = {
    user_id: aut.user_id,
    page_number: page,
    type_id: typ.id
  }

  const response = yield call(api.getListReal, data)
  console.log('================= GET LIST THEIR REAL AMULET ==================')
  console.log(response)
  if (response.ok) {
    yield put(ShowRoomActions.getListSuccess(response.data))
  } else {
    yield put(ShowRoomActions.getListFailure())
  }
}

export function* sendMessageTheirAmulet55(api, { qid, message }) {  // don't have name duplicate with redux
  const aut = yield select(auth)
  console.log(qid)
  console.log(message)

  const data = {
    user_id: aut.user_id,
    // qid,  //older
    market_id: qid,
    message
  }
  // console.log(data)
  console.log('====================== SEND Chat ALL in Their Amulet ======================')
  const response = yield call(api.sendMessageChatAllTheirAmulet, data)  // 'discuss/public-amulets-message'
  console.log(response)
  console.log('======================= SEND MESSAGE DURATION =======================')
  if (response.ok) {
    yield put(ShowRoomActions.sendMessageTheirAmuletSuccess(response.data))
  } else {
    yield put(ShowRoomActions.sendMessageTheirAmuletFailure())
  }
}


export function* getMessageFromTheirAmulet(api, { page }) {
  const aut = yield select(auth)
  const id = yield select(idDataAmulet)
  const data = {
    user_id: aut.user_id,
    // qid: id.id, // older
    market_id: id.id,
    page_number: page
  }
  console.log('====================== GET Chat ALL in Their Amulet ======================')
  const response = yield call(api.getMessageTheirAmulet, data)  // 'discuss/list-amulets-message'
  console.log(response)
  console.log('====================== GET MESSAGE FROM THEIR AMULET =============================')
  if (response.ok) {
    yield put(ShowRoomActions.getMessageTheirAmuletSuccess(response.data))
  } else {
    yield put(ShowRoomActions.getMessageTheirAmuletFailure())
  }
}

export function* sendMessageToOwner(api, { message }) {   // *****************************************************************************
  const aut = yield select(auth)
  const their = yield select(idDataAmulet)
  const dgroup = yield select(dataChat)
  const data = {
    user_id: aut.user_id,
    message,
    // qid: their.id,  // older
    market_id: their.id,
    uid_contact: their.user_id == aut.user_id ? dgroup.user_id : their.user_id  // other person
    //               เจ้าของ  =  ไอดีในอีมูนี้             me                 003
  }
  // console.log(data)
  console.log('============== SEND MESSAGE IN ROOM OWNER ===============')
  const response = yield call(api.sendMessageChatOwner, data)  // 'discuss/private-message'
  console.log(response)
  console.log('=================== SEND MESSAGE TO OWNER ====================')
  if (response.ok) {
    yield put(ShowRoomActions.sendMessageOwnerSuccess(response.data))
  } else {
    yield put(ShowRoomActions.sendMessageOwnerFailure())
  }
}

export function* getMessageFromOwner(api, { page }) {   // FOCUS NOW !!!!!!!!!!**********************************************************************
  const aut = yield select(auth)
  const their = yield select(idDataAmulet)  // data_their
  const dgroup = yield select(dataChat)

  const data = {
    market_id: their.id,
    user_id: aut.user_id == their.user_id ? dgroup.user_id : aut.user_id,
    uid_owner: their.user_id,  // other person or Owner amulet only 
    page_number: page,

  }
  console.log('============== GET MESSAGE IN ROOM OWNER ===============')
  const response = yield call(api.getMessageOwner, data)  // 'discuss/contact-owner'
  console.log(response)
  console.log('======================= GET MESSAGE FROM OWNER =====================')
  if (response.ok) {
    yield put(ShowRoomActions.getMessageOwnerSuccess(response.data))
  } else {
    yield put(ShowRoomActions.getMessageOwnerFailure())
  }
}
//********************************* FOCUS NOW !!!!!!!!!!*************************************




export function* getMessageOtherContactMyAmuletRequest(api, { page }) {   // 22 FOCUS NOW 22 !!!!!!!!!!**********************************************************************
  const aut = yield select(auth)
  const their = yield select(idDataAmulet)  // data_their
  // const dgroup = yield select(dataChat)
 const sho = yield select(show)
  const data = {
    user_id: aut.user_id,
    discuss_id: sho.discuss_id,
    page_number: page,
  }
  console.log(data)
  console.log('===================HERE PAGE SAGA===================')

  const response = yield call(api.getMessageOtherToMy, data)
  console.log(response)
  console.log('============== GET MESSAGE Other Chat My Amulet ===============')
  if (response.ok) {
    yield put(ShowRoomActions.getMessageOtherContactMyAmuletSuccess(response.data))
  } else {
    yield put(ShowRoomActions.getMessageOtherContactMyAmuletFailure())
  }
}
//********************************* 22 FOCUS NOW 22 !!!!!!!!!!*************************************





export function* getMyRealAmulet(api, { page }) {
  const aut = yield select(auth)

  const data = {
    user_id: aut.user_id,
    page_number: page
  }
  const response = yield call(api.getMyRealAmulet, data)
  console.log(response)
  console.log('====================== GET MY REAL AMULET =======================')
  if (response.ok) {
    yield put(ShowRoomActions.getMyRealAmuletSuccess(response.data))
  } else {
    yield put(ShowRoomActions.getMyRealAmuletFailure())
  }
}

export function* getMyMessageFromOtherPerson(api, { page }) {
  const aut = yield select(auth)
  const id = yield select(idDataAmulet)

  const data = {
    user_id: aut.user_id,
    // qid: id.id,  // older
    market_id: id.id,
    page_number: page
  }

  const response = yield call(api.getMyMessageFromOther, data)  //'discuss/my-amulet-contacter'
  console.log(response)
  console.log('===================== GET MY MESSAGE FROM OTHER PERSON =====================')
  if (response.ok) {
    yield put(ShowRoomActions.getMyMessageFromOtherSuccess(response.data))
  } else {
    yield put(ShowRoomActions.getMyMessageFromOtherFailure())
  }
}

export function* getListOwnerContactWithUser(api, { page }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    page_number: page
  }

  const response = yield call(api.getMyContact, data)


  console.log(response)
  console.log('======================  GET LIST USER CONTACT TO OWNER ========================')

  if (response.ok) {
    yield put(ShowRoomActions.getListOwnerContactSuccess(response.data))
  } else {
    yield put(ShowRoomActions.getListOwnerContactFailure())
  }
}

export function* getListAllBoard555(api, { page }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    page_number: page
  }

  const response = yield call(api.getListAll1, data)
  console.log(response)
  console.log('================ GET LIST ALL BOARD ================')
  if (response.ok) {
    yield put(WebboardActions.getListAllSuccess(response.data))
  } else {
    yield put(WebboardActions.getListAllFailure())
  }
}

export function* getListMyBoard555(api, { page }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    page_number: page
  }

  const response = yield call(api.getListMe1, data)

  console.log(response)
  console.log('================== GET LIST ME BOARD ===================')

  if (response.ok) {
    yield put(WebboardActions.getListMeSuccess(response.data))
  } else {
    yield put(WebboardActions.getListMeFailure())
  }
}

export function* getCommentRequest(api) {
  const web = yield select(webboard)
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    post_id: web.data_webboard.id
  }
  const response = yield call(api.getComment, data)
  console.log(response)
  console.log('================== GET COMMENT ===================')
  if (response.ok) {
    yield put(WebboardActions.getCommentSuccess(response.data))
  } else {
    yield put(WebboardActions.getCommentFailure())
  }
}

export function* addPostRequest(api, { topic, content }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    topic,
    content
  }
  const response = yield call(api.addPost, data)
  console.log(response)
  console.log('================= POST ADD ==================')
  if (response.ok) {
    yield put(WebboardActions.addPostSuccess(response.data))
  } else {
    yield put(WebboardActions.addPostFailure())
  }
}

export function* addCommentRequest(api, { comment }) {
  const aut = yield select(auth)
  const web = yield select(webboard)

  const data = {
    user_id: aut.user_id,
    post_id: web.data_webboard.id,
    text: comment
  }

  const response = yield call(api.addComment, data)
  console.log(response)
  console.log('================== ADD COMMENT ===================')
  if (response.ok) {
    yield put(WebboardActions.addCommentSuccess(response.data))
  } else {
    yield put(WebboardActions.addCommentFailure)
  }
}

export function* addLike(api, { id, from, status }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    id,
    from,
    status
  }

  const response = yield call(api.like, data)
  console.log(response)
  console.log('============ LIKE POST & COMMENT ============')
  if (response.ok) {
    yield put(WebboardActions.likeSuccess(response.data))
  } else {
    yield put(WebboardActions.likeFailure())
  }
}