// a library to wrap and simplify api calls
import apisauce from 'apisauce'

let b
if (process.env.NODE_ENV === 'production') {
  b = 'https://infiltech.org/core-profile/web/index.php/v1/'
} else {
  b = 'https://infiltech.org/core-profile/web/index.php/v1/'   //true
  // b = 'http://192.168.1.45/core-profile/web/index.php/v1/'

  // b = 'http://172.20.10.2/core-profile/web/index.php/v1/'
}

// our "constructor"
const create = (baseURL = b) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const signin = (data) => api.post('user/signin', data)

  const signup = (data) => api.post('user/signup', data)

  const savedata = (data) => api.post('user/create-check-phra-user', data)

  const senddataRealTime = (data) => api.get('user/real-time-list', data)

  const changePassword = (data) => api.post('user/reset-password', data)

  const forgetPassword = (data) => api.post('user/forgot-password', data)

  const saveDeviceToken = (data) => api.post('user/add-registration-token', data)

  const changeProfile = (data) => api.post('user/update-profile', data)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    signin,
    signup,
    savedata,
    senddataRealTime,
    changePassword,
    forgetPassword,
    saveDeviceToken,
    changeProfile,
  }
}

// let's return back our create method as the default.
export default {
  create
}
