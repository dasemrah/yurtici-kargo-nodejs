const axios = require('axios')
const convert = require('xml-js')


class YurticiKargo {
  constructor(apiKey, testMode = false) {
    this.url = 'https://ws.yurticikargo.com/KOPSWebServices/ShippingOrderDispatcherServices?wsdl'

    this.oAuth = `<wsUserName>${apiKey.wsUserName}</wsUserName>
                   <wsPassword>${apiKey.wsPassword}</wsPassword>
                   <wsLanguage>TR</wsLanguage>
                 <userLanguage>${apiKey.wsLanguage}</userLanguage>`
    this.cleanResult = true
  }

  async createShipment(data) {
    const acceptedParameters = [
      'cargoKey',
      'invoiceKey',
      'receiverCustName',
      'receiverAddress',
      'receiverPhone1',
      'receiverPhone2',
      'receiverPhone3',
      'cityName',
      'townName',
      'custProdId',
      'desi',
      'desiSpecified',
      'kg',
      'cargoCount',
      'waybillNo',
      'taxOfficeId',
      'ttDocumentId',
      'dcSelectedCredit',
      'dcCreditRule',
      'emailAddress',
      'orgReceiverCustId'
    ]

    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ship="http://yurticikargo.com.tr/ShippingOrderDispatcherServices">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <ship:createShipment>${this.oAuth}
                                <ShippingOrderVO>
                                    ${Object.entries(data)
      .filter(([param]) => acceptedParameters.includes(param))
      .map(([param, value]) => `<${param}>${value}</${param}>`)
      .join('')}
                                </ShippingOrderVO>
                            </ship:createShipment>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    let result
    try {
      console.log('crete shipment')
      const response = await axios.post(this.url, xml, {
        headers: { 'Content-Type': 'text/xml' }
      })

      console.log('servis response', response)

      if (this.cleanResult) {
        const soapResponse = convert.xml2json(response.data, { compact: true, spaces: 4 })
        result = JSON.parse(soapResponse)['env:Envelope']['env:Body']['ns1:createShipmentResponse'].ShippingOrderResultVO
      } else {
        result = response.data
      }
    } catch (error) {
      result = { error: error.message }
    }

    return result
  }

  // Diğer işlemler (queryShipment, cancelShipment) için benzer yöntemler ekleyebilirsiniz.
  async queryShipment(keys, keyType, addHistoricalData = true, onlyTracking = false) {
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ship="http://yurticikargo.com.tr/ShippingOrderDispatcherServices">
           <soapenv:Header/>
           <soapenv:Body>
              <ship:queryShipment>
                 ${this.oAuth}
                 <keys>${keys}</keys>
                 <keyType>${keyType}</keyType>
                 <addHistoricalData>${addHistoricalData}</addHistoricalData>
                 <onlyTracking>${onlyTracking}</onlyTracking>
              </ship:queryShipment>
           </soapenv:Body>
        </soapenv:Envelope>`

    let result
    try {
      const response = await axios.post(this.url, xml, {
        headers: { 'Content-Type': 'text/xml' }
      })
      console.log('response', response.data)
      if (this.cleanResult) {
        const soapResponse = convert.xml2json(response.data, { compact: true, spaces: 4 })
        result = JSON.parse(soapResponse)['env:Envelope']['env:Body']['ns1:queryShipmentResponse'].ShippingDeliveryVO
      } else {
        result = response.data
      }
    } catch (error) {
      console.log('query err', error)
      result = { error: error.message }
    }

    return result
  }

  async cancelShipment(cargoKeys) {
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ship="http://yurticikargo.com.tr/ShippingOrderDispatcherServices">
           <soapenv:Header/>
           <soapenv:Body>
              <ship:cancelShipment>
                 ${this.oAuth}
                 <cargoKeys>${cargoKeys}</cargoKeys>
              </ship:cancelShipment>
           </soapenv:Body>
        </soapenv:Envelope>`

    let result
    try {
      const response = await axios.post(this.url, xml, {
        headers: { 'Content-Type': 'text/xml' }
      })

      if (this.cleanResult) {
        const soapResponse = convert.xml2json(response.data, { compact: true, spaces: 4 })
        result = JSON.parse(soapResponse)['env:Envelope']['env:Body']['ns1:cancelShipmentResponse'].ShippingOrderResultVO
      } else {
        result = response.data
      }
    } catch (error) {
      result = { error: error.message }
    }

    return result
  }
}
module.exports = YurticiKargo
