import requestIp from 'request-ip'
import Mutations from '~/store/mutations.type'

export default async ({ store, req }) => {
  if (process.server) {
    const ip = requestIp.getClientIp(req)
    const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`)
    const data = await response.json()
    console.log('ClientIp:', ip, data)
    console.log(
      'Test2:',
      req.headers,
      req.headers['x-forwarded-for'],
      req.socket.remoteAddress
    )
    store.commit(
      'UserModule/' + Mutations.SET_COUNTRY,
      ['127.0.0.1', '192.168.1.220', '192.168.43.1'].includes(ip)
        ? 'RU'
        : data.geoplugin_countryCode
    )
  }
}
