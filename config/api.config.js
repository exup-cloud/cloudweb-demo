let domain, mainDomain, swapsDomain
try {
  domain = 'tigermex.com' // 本地环境主域名
  mainDomain = 'http://local.tigermex.com' // 主站本地环境地址
  swapsDomain = 'http://localdevswap.tigermex.com' // 合约站本地环境地址
} catch (err) { }
export default {
  domain: domain,
  mainDomain: mainDomain,
  swapsDomain: swapsDomain,
  baseUrl: 'https://api.tigermex.com/', // 主站本地环境api
  swapsUrl: 'https://api.tigermex.com/', // 合约站本地环境api
  webSocketUrl: 'wss://api.tigermex.com/wsswap/realTime', // websocket本地环境地址
  // 如果是合约云则为true
  isYun: true
};
