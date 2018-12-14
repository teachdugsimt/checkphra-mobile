// a library to wrap and simplify api calls
import apisauce from 'apisauce'

let b
if (process.env.NODE_ENV === 'production') {
  b = 'https://infiltech.org/checkphra-api/web/index.php/v1/'
} else {
  b = 'https://infiltech.org/checkphra-api/web/index.php/v1/'   //true
  // b = 'http://192.168.1.45/CheckPhraApi/web/index.php/v1/'
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

  const getAmuletType = (data) => api.get('type/list', data)
  const getQuestionType = () => api.get('manage-question/list')

  const addQuestion = (images, questions, amuletID, user_id) => {

    let body = new FormData()
    images.forEach((element, i) => {
      body.append('files[' + i + ']', element)
    });
    body.append('type', amuletID)
    body.append('user_id', user_id)

    questions.forEach((element, i) => {
      body.append('question[' + i + ']', element)
    })
    // body.append('question', questions)

    // console.log(body)
    // console.log('HERE ADD QUESTION BODY')
    // api.setHeaders({ 'Content-Type': 'multipart/form-data' })
    return api.post('question/add', body, { headers: { 'Content-Type': 'multipart/form-data' } })
  }

  const getHistory = (data) => api.get('question/list', data)
  const getAnswer = (data) => api.get('answer/detail', data)

  const getProfile = (data) => api.get('user/profile', data)
  const cancelQuestion = (data) => api.get('question/cancel', data)

  const addAnswer = (pack, q_id, user_id, argument, interested) => api.post('answer/check', { answer: pack, question_id: q_id, user_id, argument, interested })
  const updateAnswer = (pack, q_id, user_id, argument) => api.post('answer/update-answer', { answer: pack, qid: q_id, user_id, argument })

  // const moneyTransfer = (user_id, price, bank, date, file, types) => {
  //   let body = new FormData()

  //   body.append('user_id', user_id)
  //   body.append('price', price)
  //   body.append('bank', bank)
  //   body.append('date', date)
  //   // file.forEach((element, i)=>{
  //   //   body.append('file', element)
  //   // })
  //   body.append('file', file)
  //   body.append('types', types)

  //   return api.post('transfer/add', body, { headers: { 'Content-Type': 'multipart/from-data'}})
  // }

  const answerAdmin = (data) => api.get('answer/list', data)

  const getText = (data) => api.get('automatic-text/list', data)

  return {
    // a list of the API functions from step 2
    getQuestionType,
    getAmuletType,

    addQuestion,
    getHistory,
    getAnswer,

    getProfile,
    cancelQuestion,

    addAnswer,
    answerAdmin,

    updateAnswer,
    getText,

    // moneyTransfer
  }
}

// let's return back our create method as the default.
export default {
  create
}
