// import cookie from '../assets/js/cookie.js'
let domain, mainDomain, swapsDomain
try {
  // host = cookie.getCookie('host')
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
  baseUrl: 'https://api.tigermex.com/',
  swapsUrl: 'https://api.tigermex.com/',
  webSocketUrl: 'wss://api.tigermex.com/wsswap/realTime'
};
