// a library to wrap and simplify api calls
import apisauce from 'apisauce'

let b
if (process.env.NODE_ENV === 'production') {
  b = 'https://infiltech.org/checkphra-api/web/index.php/v2/'
} else {
  b = 'https://infiltech.org/checkphra-api/web/index.php/v2/'   //true
  // b = 'http://192.168.1.45/CheckPhraApi/web/index.php/v2/'

  // b = 'http://172.20.10.2/CheckPhraApi/web/index.php/v2/'
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
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data'
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

  const getListAll1 = (data) => api.get('post/list', data)
  const getListMe1 = (data) => api.get('post/list-me', data)
  const postContent = (data) => api.post('post/add', data)
  // const getComment = (data) => api.get('post/detail', data)
  const getComment = (data) => api.get('comment/list-item', data)

  const addPost = (data) => api.post('post/add', data)
  const addComment = (data) => api.post('comment/add', data)

  const like = (data) => api.post('post/update-feeling', data)


  return {
    // a list of the API functions from step 2
    getListAll1,
    getListMe1,
    postContent,
    getComment,
    addPost,
    addComment,
    like
  }
}

// let's return back our create method as the default.
export default {
  create
}
