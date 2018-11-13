import apisauce from 'apisauce'

let b
if (process.env.NODE_ENV === 'production') {
  b = 'https://infiltech.org/checkphra-api/web/index.php/v1/'
} else {
  b = 'https://infiltech.org/checkphra-api/web/index.php/v1/'   //true
  // b = 'http://192.168.1.45/CheckPhraApi/web/index.php/v1/'
}

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

  const getPromotion = () => api.get('package/list')

  const payment = (data) => api.post('payment-history/add', data)

  const getHistoryPoint = (data) => api.get('payment-history/list', data)

  const sendSlip = (data) => api.post('transfer/add', data)

  const getVerify = (data) => api.get('transfer/list', data)

  const acceptPoint = (data) => api.get('transfer/accept', data)

  const creditCard = (data) => api.post('payment-history/checkout', data)

  const getPublish = (data) => api.get('publish/list', data)

  const sharedAnswer = (data) => api.post('share-history/add', data)

  return {
    // a list of the API functions from step 2
    getPromotion,
    payment,
    getHistoryPoint,
    sendSlip,
    getVerify,
    acceptPoint,
    creditCard,
    getPublish,
    sharedAnswer
  }
}

export default {
  create
}
  // let's return back our create method as the default.

