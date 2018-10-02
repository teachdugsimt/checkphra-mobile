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

import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
// import { AuthSelectors } from '../Redux/AuthRedux'

export function * signin (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api

  console.log('start signin')

  const response = yield call(api.signin, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(AuthActions.signinSuccess(response.data))
  } else {
    yield put(AuthActions.signinFailure())
  }
}

export function * signinWithCredential (api, action) {
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
