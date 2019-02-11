// a library to wrap and simplify api calls
import apisauce from 'apisauce'

let b
if (process.env.NODE_ENV === 'production') {
  b = 'https://infiltech.org/checkphra-api/web/index.php/v2/'
} else {
  // b = 'https://infiltech.org/checkphra-api/web/index.php/v2/'   //true
  b = 'http://192.168.1.45/CheckPhraApi/web/index.php/v2/'

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

  const getAmuletType = (data) => api.get('type/list', data)
  const getQuestionType = () => api.get('manage-question/list')
  const editGroupQuestion = (data) => api.post('type/update-type', data)
  const getAnswerGroup = (data) => api.get('answer/sort-by-answer', data)
  const answerAdmin = (data) => api.get('answer/sort-by-answer', data)  // new Edition

  //**** CERTIFICATE ZONE */
  const addDetailCertificate = (data) => api.post('permit/add', data)
  const getListCerFromUser = (data) => api.get('permit/list-all', data)
  const activeCertificate = (data) => api.post('permit/update-permit', data)

  //**** MARKET PLACE ZONE */
  const getTypeMarket = (user_id) => api.get('type/market-type', user_id)
  const sendDataAmuletMarket = (name, temple, price, owner, contact, type, user_id, data_image) => {
    console.log('COME To APIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
    let body = new FormData()
    body.append('user_id', user_id)
    body.append('type', type)
    // body.append('zone_id', zone)
    data_image.forEach((element, i) => {
      body.append('images[' + i + ']', element)
    });
    body.append('price', price)
    body.append('owner', owner)
    body.append('contact', contact)
    body.append('amuletName', name)
    body.append('temple', temple)

    return api.post('market/add', body, { headers: { 'Content-Type': 'multipart/form-data' } })
  }

  const sendDataAmuletMarket2 = (data) => api.post('market/add', data)
  const getListAreaAmulet = (data) => api.get('market/list-all', data)
  const pushAmuletMarket = (data) => api.post('market/push-amulet', data)

  const openStore = (data) => api.post('shop/add', data)
  const deleteAmuletMarket = (data) => api.post('shop/delete-amulet', data)
  const getListStore = (data) => api.get('shop/list-all', data)

  return {
    // a list of the API functions from step 2
    getAmuletType,
    getQuestionType,
    editGroupQuestion,
    getAnswerGroup,
    answerAdmin,

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
    getListStore
  }
}

// let's return back our create method as the default.
export default {
  create
}
