let domain, mainDomain, swapsDomain
try {
  domain = 'tigermex.com' // 测试环境主域名
  mainDomain = 'https://www.tigermex.com' // 主站测试环境网址
  swapsDomain = 'https://swap.tigermex.com' // 合约站测试环境网址
} catch (err) { }
export default {
  domain: domain,
  mainDomain: mainDomain,
  swapsDomain: swapsDomain,
  baseUrl: 'https://api.tigermex.com/', // 主站测试环境api
  swapsUrl: 'https://api.tigermex.com/', // 合约站测试环境api
  webSocketUrl: 'wss://api.tigermex.com/wsswap/realTime', // 合约站websocket地址
  // 如果是合约云则为true
  isYun: true
};
