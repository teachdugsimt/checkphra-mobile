import apisauce from 'apisauce'

let b
if (process.env.NODE_ENV === 'production') {
  b = 'https://infiltech.org/checkphra-api/web/index.php/v2/'
} else {
  b = 'https://infiltech.org/checkphra-api/web/index.php/v2/'   //true
  // b = 'http://192.168.1.45/CheckPhraApi/web/index.php/v2/'

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

  const getListReal = (data) => api.get('amulets/list-all', data)

  const sendMessageChatAllTheirAmulet = (data) => api.post('discuss/public-amulets-message', data)

  const getMessageTheirAmulet = (data) => api.get('discuss/list-amulets-message', data)

  const sendMessageChatOwner = (data) => api.post('discuss/private-message', data)

  const getMessageOwner = (data) => api.get('discuss/contact-owner', data)

  const getMyRealAmulet = (data) => api.get('amulets/list-me', data)

  const getMyMessageFromOther = (data) => api.get('discuss/my-amulet-contacter', data)


  //********************** Chat Api Zone ***********************/
  const chatToAdmin = (data) => api.post('discuss/contact-officer', data)

  const getMessageAdmin = (data) => api.get('discuss/detail', data)

  const adminContactUser = (data) => api.get('discuss/contact-list', data)

  const getMyContact = (data) => api.get('discuss/my-contact-list', data)

  const voteAmulet = (data) => api.post('market/update-fact', data)

  //********************** Chat Api Zone ***********************/

  //********************** Admin Verify Store *****************/
  const getListShop = (data) => api.get('shop/list', data)
  const verifyStore = (data) => api.post('shop/confirm', data)

  const getListMarketMyAmulet = (data) => api.get('market/list-me', data)
  //********************** Admin Verify Store *****************/


  return {
    // a list of the API functions from step 2
    getListReal,
    sendMessageChatAllTheirAmulet,
    getMessageTheirAmulet,
    sendMessageChatOwner,
    getMessageOwner,
    getMyRealAmulet,
    getMyMessageFromOther,
    chatToAdmin,
    getMessageAdmin,
    adminContactUser,
    getMyContact,
    verifyStore,
    getListShop,
    getListMarketMyAmulet,
    voteAmulet

  }
}

export default {
  create
}
