let domain, mainDomain, swapsDomain
try {
  domain = 'tigermex.com'
  mainDomain = 'https://www.tigermex.com'
  swapsDomain = 'https://swap.tigermex.com'
} catch (err) { }
export default {
  domain: domain,
  mainDomain: mainDomain,
  swapsDomain: swapsDomain,
  baseUrl: 'https://api.tigermex.com/',
  swapsUrl: 'https://api.tigermex.com/',
  webSocketUrl: 'wss://api.tigermex.com/wsswap/realTime',
  // 如果是合约云则为true
  isYun: true
};
