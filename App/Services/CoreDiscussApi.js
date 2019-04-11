import apisauce from 'apisauce'

let b
if (process.env.NODE_ENV === 'production') {
  b = 'https://infiltech.org/checkphra-api/web/index.php/v1/'
} else {
  b = 'https://infiltech.org/core-discuss/web/index.php/v1/'   //true
  // b = 'http://192.168.1.45/core-discuss/web/index.php/v1/'

  // b = 'http://172.20.10.2/CheckPhraApi/web/index.php/v2/'
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

  //   const getListReal = (data) => api.get('amulets/list-all', data)
  const getMessageOtherToMy = (data) => api.get('discuss/views', data)


  return {
    // a list of the API functions from step 2
    // getListReal,
    getMessageOtherToMy

  }
}

export default {
  create
}
