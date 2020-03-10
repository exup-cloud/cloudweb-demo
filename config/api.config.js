let domain, mainDomain, swapsDomain
try {
  domain = 'mybts.info' // 本地环境主域名
  mainDomain = 'http://local.mybts.info' // 主站本地环境地址
  swapsDomain = 'http://localswap.mybts.info' // 合约站本地环境地址
} catch (err) { }
export default {
  domain: domain,
  mainDomain: mainDomain,
  swapsDomain: swapsDomain,
  baseUrl: "/api/", // 主站本地环境api
  swapsUrl: "/api/", // 合约站本地环境api
  webSocketUrl: "ws://ws3.mybts.info/wsswap/realTime", // websocket本地环境地址
  // 如果是合约云则为true
  isYun: true
};
