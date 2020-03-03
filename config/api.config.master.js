let domain, mainDomain, swapsDomain
try {
  domain = 'tigermex.com' // 生产环境主域名
  mainDomain = 'https://www.tigermex.com' // 主站成产环境网址
  swapsDomain = 'https://swap.tigermex.com' // 合约站生产环境网站
} catch (err) { }
export default {
  domain: domain,
  mainDomain: mainDomain,
  swapsDomain: swapsDomain,
  baseUrl: 'https://api.tigermex.com/', // 主站生产环境api
  swapsUrl: 'https://api.tigermex.com/', // 合约站生产环境api
  webSocketUrl: 'wss://api.tigermex.com/wsswap/realTime', // 合约站生产环境websocket地址
  // 如果是合约云则为true
  isYun: true
};
