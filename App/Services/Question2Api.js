// a library to wrap and simplify api calls
import apisauce from 'apisauce'

let b
if (process.env.NODE_ENV === 'production') {
  b = 'https://infiltech.org/checkphra-api/web/index.php/'
} else {
  b = 'https://infiltech.org/checkphra-api/web/index.php/'   //true
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
  const addQuestion2 = (images, questions, amuletID, user_id) => {

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
    return api.post('v2/question/add', body, { headers: { 'Content-Type': 'multipart/form-data' } })
  }

  const getHistory = (data) => api.get('v2/question/list', data)
  const getAnswer = (data) => api.get('v2/answer/detail', data)
  const getAmuletType = (data) => api.get('v3/type/list', data)
  const getQuestionType = () => api.get('v2/manage-question/list')
  const editGroupQuestion = (data) => api.post('v2/type/update-type', data)
  const getAnswerGroup = (data) => api.get('v2/answer/sort-by-answer', data)
  const answerAdmin = (data) => api.get('v2/answer/sort-by-answer', data)  // new Edition
  const getDetailAmuletChecked = (data) => api.get('v2/answer/detail', data)

  //**** CERTIFICATE ZONE */
  const addDetailCertificate = (data) => api.post('v2/permit/add', data)
  const getListCerFromUser = (data) => api.get('v2/permit/list-all', data)
  const activeCertificate = (data) => api.post('v2/permit/update-permit', data)

  //**** MARKET PLACE ZONE */
  // const getTypeMarket = (user_id) => api.get('type/market-type', user_id)
  const getTypeMarket = (data) => api.get('v2/type/market-type', data)   // here api get group amulet
  const sendDataAmuletMarket = (name, temple, price, owner, contact, type, user_id, data_image) => {
    console.log('COME To APIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
    let body = new FormData()
    body.append('user_id', user_id)
    // body.append('type', type)
    // body.append('zone_id', zone)
    data_image.forEach((element, i) => {
      body.append('images[' + i + ']', element)
    });
    body.append('price', price)
    body.append('owner', owner)
    body.append('contact', contact)
    body.append('amuletName', name)
    body.append('temple', temple)

    return api.post('v2/market/add', body, { headers: { 'Content-Type': 'multipart/form-data' } })
  }

  const sendDataAmuletMarket2 = (data) => api.post('v2/market/add', data)
  const getListAreaAmulet = (data) => api.get('v2/market/list-all', data)
  const pushAmuletMarket = (data) => api.post('v2/market/push-amulet', data)

  const openStore = (data) => api.post('v2/shop/add', data)
  const deleteAmuletMarket = (data) => api.post('v2/shop/delete-amulet', data)
  const getListStore = (data) => api.get('v2/shop/list-all', data)
  const getAmuletStore = (data) => api.get('v2/shop/amulet-store', data)
  const search = (data) => api.post('v2/market/search', data)
  const followRoom = (data) => api.post('v2/market/follow-room', data)

  const sharedAnswer = (data) => api.post('v2/share-history/add', data)
  const getText = (data) => api.get('v2/automatic-text/list', data)

  // ***************************** Versatile Zone **************************** //
  const getVersatile = (data) => api.get('v2/versatile/list', data)

  // ***************************** ADMIN ZONE ***************************** //
  const getListExpertBid = (data) => api.get('v2/trading/expert-list', data)
  const getDetailExpertBid = (data) => api.get('v2/trading/expert-trading-list', data)

  return {
    // a list of the API functions from step 2
    addQuestion2,
    sharedAnswer,
    getHistory,  // new
    getAnswer, // new

    getAmuletType,
    getQuestionType,
    editGroupQuestion,
    getAnswerGroup,
    answerAdmin,
    getDetailAmuletChecked,

    addDetailCertificate,
    getListCerFromUser,
    activeCertificate,

    getTypeMarket,
    sendDataAmuletMarket,
    getListAreaAmulet,
    sendDataAmuletMarket2,
    openStore,
    pushAmuletMarket,
    deleteAmuletMarket,
    getListStore,
    getAmuletStore,
    search,
    followRoom,
    getText,

    getVersatile,
    getListExpertBid,
    getDetailExpertBid,
  }
}

// let's return back our create method as the default.
export default {
  create
}
