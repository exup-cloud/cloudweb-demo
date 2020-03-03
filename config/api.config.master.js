import cookie from '../assets/js/cookie.js'
let host, domain, mainDomain, swapsDomain
try {
  host = cookie.getCookie('host')
  // domain = window.location.host.slice(-8)
  domain = 'tigermex.com'
  mainDomain = 'https://www.tigermex.com'
  swapsDomain = 'https://swap.tigermex.com'
} catch (err) { }
export default {
  // cookie domain,change this to save cookie
  domain: domain,
  mainDomain: mainDomain,
  swapsDomain: swapsDomain,
  // api URL,change this to get Data
  // baseUrl: 'https://api.ginfexapp.vip/v1/',
  // swapsUrl: 'https://api.ginfexapp.vip/v1/',
  // webSocketUrl: 'wss://api.ginfexapp.vip/v1/ifcontract/realTime'
  // baseUrl: host ? 'https://' + host + '/v1/' : 'https://api.ginfexapp.vip/v1/',
  // swapsUrl: host ? 'https://' + host + '/v1' : 'https://api.ginfexapp.vip/v1/',
  // webSocketUrl: host ? 'wss://' + host + '/v1/ifcontract/realTime' : 'wss://api.ginfexapp.vip/v1/ifcontract/realTime'
  baseUrl: 'https://api.tigermex.com/',
  swapsUrl: 'https://api.tigermex.com/',
  webSocketUrl: 'wss://api.tigermex.com/wsswap/realTime'
  // swapsUrl: 'http://192.168.3.216:9095/'
};
