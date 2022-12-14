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
import AuthActions from '../Redux/AuthRedux'
// import { AuthSelectors } from '../Redux/AuthRedux'
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
const auth = state => state.auth
I18n.locale = auth.language
// const firebase = state => state.firebase
// const auth = state => state.auth   // go to firebase to signup and get access token

export function* signin(api, action) {
  const { email, password } = action

  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api


  let data = { email, password }
  console.log(data)
  console.log('start signin')

  console.log(data)
  const response = yield call(api.signin, data)
  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.

    console.log("SIGNIN COMPLETE")
    console.log(response.data)
    yield put(AuthActions.signinSuccess(response.data))

  } else {
    console.log("SIGNIN FAIL")
    console.log(response)

    // alert(response.data.message)
    if (response.data) {
      yield put(AuthActions.signinFailure(response.data.message))
    } else {
      yield put(AuthActions.signinFailure(response.problem))
    }

  }
}

export function* signinWithCredential(api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  console.log(action)
  console.log(data.providerData[0].uid)
  console.log('----------------------HERE LOGIN WITH CREDENTIAL----------------------')

  const name = data.displayName.split(' ')
  const fname = name[0] ? name[0] : ''
  const lname = name[1] ? name[1] : ''
  let d = null
  if (!data.email || data.email == null || data.email == undefined) {
    d = {
      email: data.uid + "@facebook.com",
      uid: data.uid,
      firstname: fname,
      lastname: lname,
      project: 'check-phra',
      fbid: data.providerData[0].uid
    }
  } else {
    d = {
      email: data.email,
      uid: data.uid,
      firstname: fname,
      lastname: lname,
      project: 'check-phra',
      fbid: data.providerData[0].uid
    }
  }

  const response = yield call(api.signin, d)
  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(AuthActions.signinSuccess(response.data))
  } else {
    yield put(AuthActions.signinFailure())
  }
}

export function* signup(api, { id, password }) {


  const data = {
    email: id,
    password: password,
  }
  console.log(data)
  console.log('==================== DATA EMAIL ==========================')
  const response = yield call(api.signup, data)
  console.log(response)
  if (response.ok) {
    yield put(AuthActions.signupSuccess(response.data))
    yield put(AuthActions.clearRequest())
    // yield* signupAtFirebase(api, getFirebase, id, response.data.access_token)
  } else {

    if ((response.data.message).indexOf("has already been taken") != -1) {
      yield put(AuthActions.signupFailure(response.problem))
      yield put(AuthActions.clearRequest())
      alert(I18n.t('emailUsed'))
    } else if (response.problem == 'NETWORK_ERROR') {
      yield put(AuthActions.signupFailure(response.problem))
      yield put(AuthActions.clearRequest())
      alert(I18n.t('networkError'))
    } else {
      yield put(AuthActions.signupFailure(response.problem))
      yield put(AuthActions.clearRequest())
      alert(I18n.t('verifyData'))
    }

  }
}

export function* createUser(api, { email, uid }) {
  console.log(email)
  console.log(uid)
  console.log('SEND TO CREATE CHECK PHRA USER')

  if (!uid) { return }

  const data = {
    email: email,
    access_token: uid,
  }

  const response = yield call(api.savedata, data)
  console.log(response)

  if (response.ok) {
    alert(I18n.t('registerComplete'))
    yield put(AuthActions.createSuccess(response.data))
    yield put(AuthActions.clearRequest2())
  } else {
    alert(I18n.t('registerFailure'))
    yield put(AuthActions.createFailure())
    yield put(AuthActions.clearRequest2())
  }
}

export function* changePassword(api, { email, oldp, newp }) {

  console.log(email, oldp, newp)
  console.log('HERE DATA CHANGE')
  const data = {
    email: email,
    old_password: oldp,
    new_password: newp
  }
  console.log(data)

  const response = yield call(api.changePassword, data)
  console.log(response)

  if (response.ok) {
    alert(I18n.t('passSuccess'))
    yield put(AuthActions.changeSuccess(response.data))
  } else {
    alert(I18n.t('passFailure'))
    yield put(AuthActions.changeFailure())
  }
}

export function* forgetPassword(api, { email }) {

  console.log(email)
  console.log('HERE DATA FORGET EMAIL')

  const data = {
    email: email
  }

  const response = yield call(api.forgetPassword, data)
  console.log(response)

  if (response.ok) {
    alert(I18n.t('sendPass'))
    yield put(AuthActions.forgetSuccess(response.data))
  } else {
    alert(I18n.t('sendPassFailure'))
    yield put(AuthActions.forgetFailure())
  }
}

export function* saveDeviceToken(api, { token }) {

  // console.log(token)
  const a = yield select(auth)
  const data = {
    user_id: a.user_id,
    registration_token: token
  }

  const response = yield call(api.saveDeviceToken, data)
  console.log(response)
}

export function* changeProfileRequest(api, { firstname, lastname, file }) {
  const aut = yield select(auth)

  let body = new FormData()

  body.append('user_id', aut.user_id)
  if (firstname)
    body.append('firstname', firstname ? firstname : aut.profile.firstname)
  if (lastname)
    body.append('lastname', lastname ? lastname : aut.profile.lastname)
  // body.append('display_name', '')
  body.append('project_name', 'check-phra')
  if (file)
    body.append('file', file ? file : aut.image)

  const response = yield call(api.changeProfile, body)
  console.log(response)
  console.log('===================== CHANGE PROFILE ======================')
  if (response.ok) {
    yield put(AuthActions.changeProfileSuccess(response.data))
  } else {
    yield put(AuthActions.changeProfileFailure())
  }
}


