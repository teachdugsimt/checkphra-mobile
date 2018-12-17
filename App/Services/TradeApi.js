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

  const trading = (data) => api.post('trading/add', data)
  const getDetail = (data) => api.get('trading/detail', data)
  const getListTrade = (data) => api.get('trading/list', data)
  const updateStatus = (data) => api.post('trading/update-status', data)
  const sharedLeasing = (data) => api.post('share-history/add', data)
  const getListLeasing = (data) => api.get('trading/list-to-day', data)
  const getPriceLeasing = (data) => api.get('trading/total-price', data)
  const wantToBuy = (data) => api.post('trading/to-buy', data)

  return {
    // a list of the API functions from step 2
    trading,
    getDetail,
    getListTrade,
    updateStatus,
    sharedLeasing,
    getListLeasing,
    getPriceLeasing,
    wantToBuy
  }
}

export default {
  create
}
