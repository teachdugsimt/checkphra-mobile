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

  const response = yield call(api.signin, data)

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
    alert(response.data.message)
    yield put(AuthActions.signinFailure())
  }
}

export function* signinWithCredential(api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api

  const name = data.displayName.split(' ')
  const fname = name[0] ? name[0] : ''
  const lname = name[1] ? name[1] : ''

  const d = {
    email: data.email,
    uid: data.uid,
    firstname: fname,
    lastname: lname,
    project: 'check-phra'
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

  const response = yield call(api.signup, data)
  console.log(response)

  if (response.ok) {
    yield put(AuthActions.signupSuccess(response.data))

    // yield* signupAtFirebase(api, getFirebase, id, response.data.access_token)
  } else {

    if ((response.data.message).indexOf("has already been taken") != -1) {
      yield put(AuthActions.signupFailure())
      alert("อีเมลนี้ถูกใช้งานแล้ว")
    } else if (response.problem == 'NETWORK_ERROR') {
      yield put(AuthActions.signupFailure())
      alert('การเชื่อมต่ออินเตอร์เน็ตผิดพลาด')
    } else {
      yield put(AuthActions.signupFailure())
      alert('กรุณาตรวจสอบ อีเมลและรหัสผ่าน')
    }

  }
}

export function* createUser(api, { email, uid }) {
  console.log(email)
  console.log(uid)
  console.log('SEND TO CREATE CHECK PHRA USER')

  const data = {
    email: email,
    access_token: uid,
  }

  const response = yield call(api.savedata, data)
  console.log(response)

  if(response.ok){
    yield put(AuthActions.createSuccess(response.data))
  } else {
    yield put(AuthActions.createFailure())
  }
}