// a library to wrap and simplify api calls
import apisauce from 'apisauce'

let b = 'https://graph.facebook.com/v2.6/me/messages?access_token='
  //  let b = 'https://graph.facebook.com/v2.6/me/messages?'

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

  const fbmessage = (data) => api.post('541100422998912|YicGjkjNUUvnQwHBcUSCnSJw5XY', data)  // can't
  // const fbmessage = (data) => api.post('541100422998912', data)   // can't
  // const fbmessage = (data) => api.post('YicGjkjNUUvnQwHBcUSCnSJw5XY', data)  // can't
  // const fbmessage = (data) => api.post('Gr4ZemIdAGMKh3R8xv5t9jp4EFN2', data) // can't
  // const fbmessage = (data) => api.post(data)
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
    fbmessage
  }
}

// let's return back our create method as the default.
export default {
  create
}
