const YurticiKargo = require('../services/YurticiServices')
const cargoApiKey = {
    wsUserName: 'your_api_username',
    wsPassword: 'you_api_password',
    wsLanguage: 'TR'
  }
const testMode = false

async function queryKargo(key){
    const kargoEntegrasyon = new YurticiKargo(cargoApiKey, testMode)
    // eslint-disable-next-line no-shadow
    const response = await kargoEntegrasyon.queryShipment(key, 0)
    return response
}
async function createKargo(data){
    const kargoEntegrasyon = new YurticiKargo(cargoApiKey, testMode)
    const response = await kargoEntegrasyon.createShipment(data)
    return response
}
async function cancelKargo(key){
    const kargoEntegrasyon = new YurticiKargo(cargoApiKey, testMode)
    const response = await kargoEntegrasyon.cancelShipment(key)
    return response
}
module.exports={
    queryKargo,
    createKargo,
    cancelKargo
}