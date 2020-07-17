import axios from 'axios'
import cookie from './cookie'
import Md5 from './md5'
import Alert from '../../components/bx-ui/alert/index'
import Config from '../../config/api.config'
import { aesEncrypy } from './aes.js'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
class AxiosClass {
  constructor(url, isInternal = true) {
    this.service = axios.create({ baseURL: url })
    this.isInternal = isInternal
    this.intercept()
    this.error()
    return this.service
  }
  intercept() {
    // 拦截器
    this.service.interceptors.request.use(config => {
      // post方法并且数据不是formData，序列化参数
      // if (config.method === 'post' && config.headers['Content-Type'] !== 'multipart/form-data') {
      //   config.data = qs.stringify(config.data)
      // }
      let body = ''
      if (config.method === 'post') {
        body = config.data || ''
      }
      let timestamp = new Date().valueOf()
      let nonce = timestamp + '000'
      config.headers.common['EX-Ver'] = '1.0'
      config.headers.common['EX-Dev'] = 'web'
      config.headers.common['EX-Ts'] = nonce
      config.headers.common['Content-Type'] = 'application/json'
      // config.headers.common['Access-Control-Max-Age'] = '60'
      try {
        // cookie.setCookie('token', '141c5bddd6904df9a0d17f5bd73e5b80', '', '/', Config.domain)
        // cookie.setCookie('expired_ts', '1766924225438000', '', '/', Config.domain)
        // cookie.setCookie('access_key', '827af68c-1c48-41b1-bceb-c1626b47ebcc', '', '/', Config.domain)

        // let ssid = cookie.getCookie('ssid')  cookie.getCookie('token') ||
        let token = cookie.getCookie('token') // secret
        // let locale = cookie.getCookie('lang')
        let expired_ts = cookie.getCookie('expired_ts') // expired_ts 超时时间
        let access_key = cookie.getCookie('access_key')// api_key
        // if (!locale || ~locale.indexOf('en')) {
        //   locale = 'en'
        // }
        // 需要第三方服务器生成 m = md5(sercet_key + 商家唯一标识 + 时间戳)
        if (token) {
          // token = new Md5(token + 'ginfex' + nonce)
          let _body = body && JSON.stringify(body)
          config.headers.common['EX-Sign'] = (new Md5(_body + token + nonce)).hash()
          // config.headers.common['EX-Sign'] = (new Md5(token + nonce)).hash()
        }
        if (expired_ts) {
          config.headers.common['EX-ExpiredTs'] = expired_ts
        }
        if (access_key) {
          config.headers.common['EX-Accesskey'] = access_key
        }
        // config.headers.common['TMEX-Language'] = locale
      } catch (err) {
      }
      // if (~config.url.indexOf('?')) {
      //   config.url = config.url + '&t=' + Date.now()
      // } else {
      //   config.url = config.url + '?t=' + Date.now()
      // }
      return config
    }, error => {
      return Promise.reject(error)
    })
  }
  error() {
    this.service.interceptors.response.use(res => {
      // let token = res.headers['TMEX-token']
      // let uid = res.headers['TMEX-uid']
      // if (token) {
      //   cookie.setCookie('token', token, 1, '/', config.domain)
      // }
      // if (uid) {
      //   cookie.setCookie('uid', uid, 1, '/', config.domain)
      // }
      if (this.isInternal) {
        if (parseInt(res.status) === 204) { return res }
        if (parseInt(res.status) !== 200) return Promise.reject(res)
      /*
       * 状态码0判断，成功返回，失败则根据error.status判断是请求成功还是请求失败
       * error.status为true，则表示请求成功，此时根据后台返回状态码编写回调逻辑
       * error.status不存在，则表示请求失败（网络原因、请求状态不为200等原因）
       */
        if (res.data.errno === 'OK') return res.data
        if (process.client && !~['FORBIDDEN', 'ACCESS_TOO_OFTEN'].indexOf(res.data.errno)) {
          Alert(res.data.message)
        } else {
          console.log(res.data.message)
        }
        return Promise.reject(res.data)
      } else {
        if (parseInt(res.status) !== 200) return Promise.reject(res)
        return res.data
      }
    }, error => {
      return Promise.reject(error)
    })
  }
}

export default AxiosClass
