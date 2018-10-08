// a library to wrap and simplify api calls
import apisauce from 'apisauce'

let b
if (process.env.NODE_ENV === 'production') {
  b = 'https://infiltech.org/checkphra-api/web/index.php/v1/'
} else {
  // b = 'http://localhost:10000/web/index.php/v1/'
  // b = 'https://infiltech.org/checkphra-api/web/index.php/v1/'   //true
  b = 'http://192.168.1.45/CheckPhraApi/web/index.php/v1/'
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

  const getAmuletType = () => api.get('type/list')
  const getQuestionType = () => api.get('manage-question/list')

  const addQuestion = (images, questions, amuletType, user_id) => {

    console.log(images)
    console.log(questions)
    console.log(amuletType)
    console.log(user_id)

    let body = new FormData()
    images.forEach((element, i) => {
      body.append('files[' + i + ']', element)
    });
    body.append('type', amuletType)
    body.append('user_id', user_id)

    questions.forEach((element, i) => {
      body.append('question[' + i + ']', element)
    })
    // body.append('question', questions)

    console.log(body)

    return api.post('question/add', body, { headers: { 'Content-Type': 'multipart/form-data' } })
  }

  const getHistory = (data) => api.get('question/list', data)
  const getAnswer = (data) => api.get('answer/detail', data)

  const getProfile = (data) => api.get('user/profile', data)
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
    getQuestionType,
    getAmuletType,

    addQuestion,
    getHistory,
    getAnswer,

    getProfile
  }
}

// let's return back our create method as the default.
export default {
  create
}
