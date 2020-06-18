// import { aesEncrypy } from '../assets/js/aes.js'
// import { baseAxios } from '../assets/js/axiosConfig'
import SwapsApi from '~/assets/js/api/swapsApi'
import Formula from '../assets/js/formula/index.js'
import { MarginCoin } from '../assets/js/formula/common'
import Cookie from '../assets/js/cookie'
import ApiConfig from '../config/api.config'
import { aesEncrypy } from '../assets/js/aes.js'
import Md5 from '../assets/js/md5'
import { quickSort, quickSortTime } from '../assets/js/quickSort.js' // 快速排序，在最新成交处用

let orderBook = {}
let buys_start_time = 0
let sells_start_time = 0
function setOrderBook(key, val) {
  orderBook[key] = val
}
let isError = true;  // 第一次进来或者ws链接出错为true


export const actions = {
  // 初始化配置
  async nuxtServerInit(store, { req }) {
    if (req.token) {
      store.commit("auth/SET_TOKEN", {
        token: req.token
      });
    }
      // store.commit("auth/SET_TOKEN", {
      //   token: '3e0b5935-6e67-4b55-b345-6f0ed43fafa8'
      // });
      // let nonce = new Date().valueOf() + '000'
      // baseAxios.defaults.headers['TMEX-Ts'] = nonce
      // req.ssid && (baseAxios.defaults.headers['TMEX-Ssid'] = req.ssid)
      // req.uid && (baseAxios.defaults.headers['TMEX-Uid'] = req.uid)
      // req.locale && (baseAxios.defaults.headers['TMEX-Language'] = req.locale)
      // req.token && (baseAxios.defaults.headers['TMEX-Sign'] = aesEncrypy(req.token, nonce))
    // if (req.locale) {
    //   store.commit('auth/SET_LOCALE', {
    //     locale: req.locale
    //   })
    // }
    let initData = [
      store.dispatch('getProductList', req)
    ]
    await Promise.all(initData).catch(err => { console.log(err, 22) })
  },
  // 获取合约集合
  getProductList({commit, dispatch, state}, req) {
    if (productList.length && !req.news) {
      return dispatch('setContracts', {productList, id: req.instrument_id})
    } else {
      return dispatch('getContracts', req.instrument_id)
    }
  },
  getContracts({dispatch}, instrument_id) {
    return SwapsApi.getContracts().then(res => {
      let dt = res.data.instruments
      productList = dt
      dispatch('setContracts', {productList: dt, id: instrument_id})
    })
  },
  setContracts({commit, dispatch}, obj) {
    commit('market/SET_PRODUCTLIST', {
      data: obj.productList
    })
    dispatch('setProductInfo', obj.id)
    for (let i = 0; i < obj.productList.length; i++) {
      commit('market/SAVE_DEEP', {
        key: obj.productList[i].instrument_id + '_Order',
        data: []
      })
      setOrderBook(obj.productList[i].instrument_id + '_Order', [])
    }
  },
  // 修改合约类型
  setProductInfo({commit, state}, instrument_id) {
    let productList = state.market.productList
    if (!productList) {
      return false
    }

    // 防止模拟交易显示合约交易数据
    let simulationInfo = {}
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].area === 4) {
        simulationInfo = productList[i]
        break
      }
    }

    let info = productList[0]

    if (this.$router.history.current.name === 'game-trade') {
      info = simulationInfo
    }
    let len = productList.length
    if (instrument_id) {
      for (;len--;) {
        if (productList[len].instrument_id === Number(instrument_id)) {
          info = productList[len]
          simulationInfo = info
          break
        }
      }
    }
    commit('com/SET_COMMON', {
      pxUnit: info.px_unit.length - info.px_unit.indexOf('.') - 1,
      qtyUnit: info.qty_unit.length - info.qty_unit.indexOf('.') - 1,
      valueUnit: info.value_unit.length - info.value_unit.indexOf('.') - 1,
      // marginUnit: MarginCoin(info.base_coin, info.quote_coin, info.px_coin)
      marginUnit: MarginCoin(info.base_coin, info.quote_coin, info.is_reverse ? info.quote_coin : info.base_coin)
    })

    // 设置price_coin(正常合约)
    info['price_coin'] = info.is_reverse ? info.quote_coin : info.base_coin
    commit('market/SET_PRODUCT', {
      data: info
    })

    // 设置price_coin(模拟合约)
    simulationInfo['price_coin'] = simulationInfo.is_reverse ? simulationInfo.quote_coin : simulationInfo.base_coin;
    commit('market/SET_SIMULATION_PRODUCT', {
      data: simulationInfo
    })
  },
  // 获取所有数据
  getMarketDate({commit, dispatch, state}, is_change, is_reconnect) {
    if (is_change) {
      dispatch('clearDateTime')
    }
    let instrumentID = state.market.productInfo.instrument_id;
    // 获取深度
    let arr = [SwapsApi.depth({instrumentID, count: 100}), SwapsApi.getTickers(), SwapsApi.trades(instrumentID), SwapsApi.pnls(instrumentID)]
    Promise.all(arr)
    .then(res => {
      let instrumentID2 = state.market.productInfo.instrument_id
      if (instrumentID === instrumentID2) {
        let result = {asks: [], bids: []}
        let asks, bids
        if (res[0] && res[0].data) {
          asks = res[0].data.asks || []
          bids = res[0].data.bids || []
        }

        asks.forEach(item => {
          if (item[2] !== '0') {
            result.asks.push(item);
          }
        })
        bids.forEach(item => {
          if (item[2] !== '0') {
            result.bids.push(item);
          }
        })

        commit('market/SAVE_DEEP', {
          key: instrumentID2 + '_Order',
          // data: res[0].data
          data: result
        })
        // setOrderBook(instrumentID2 + '_Order', res[0].data)
        setOrderBook(instrumentID2 + '_Order', result)
      }

      let tickerList = res[1].data.tickers; //ticker列表
      commit('market/SET_TICKER', {
        data: tickerList ? tickerList.filter(item => item.instrument_id === instrumentID2)[0] : []
      })
      commit('market/SET_MARKET', {
        key: 'tickerList',
        data: tickerList || [],
      })
      if (instrumentID === instrumentID2) {
        commit('market/SET_MARKET', {
          key: 'trades',
          data: res[2].data.trades
        })
      }
      commit('market/SET_MARKET', {
        key: 'pnls',
        data: res[3].data.pnls && res[3].data.pnls[0]
      })
      let ticker_arr = [] //订阅websocket ticker数组
      tickerList.forEach((item) => {
        ticker_arr.push('Ticker:' + item.instrument_id)
      })
      let action_arr = [...ticker_arr,`OrderBook:${instrumentID2}`, `Trade:${instrumentID2}`, `PNL:${instrumentID2}`]
      let action_json = JSON.stringify(action_arr)

      // let action = `"OrderBook:${instrumentID2}","Trade:${instrumentID2}","Ticker:${instrumentID2}","PNL:${instrumentID2}"`
      let errorFn = () => {
        isError = true;
        clearTimeout(timeOut)
        if (window.webSocket_base.isConnection()) {
          window.webSocket_base.webSocketSend(`{"action":"subscribe","args":${action_json}}`)
        } else {
          let instrumentID = state.market.productInfo.instrument_id
          timeOut = setTimeout(() => {
            // dispatch('getMarketDate', instrumentID)
            dispatch('getMarketDate', false, true)
          }, 2000)
        }
      }

      ticker_arr.forEach((item) => {
        window.webSocket_base.errorCallBackFunObj[item] = errorFn

        window.webSocket_base.successFn[item] = res => {
          isError = false
          if (!res || !res.data) return;
          let id = res.data.instrument_id;
          if (instrumentID2 === id) {
            if (res.action === 1) { // 全量
              commit('market/SET_TICKER', {
                data: res.data,
              });
            }
            if (res.action === 2) { // 更新
              let ticker = {...state.market.ticker, ...res.data}
              commit('market/SET_TICKER', {
                data: ticker
              })
            }

          }
          let tickerList = state.market.tickerList.map(item => {
            // return item.instrument_id === id ? res.data : item;
            if (item.instrument_id === id) {
              if (res.action === 1) { // 全量
                return res.data
              }
              if (res.action === 2) { // 更新
                return {...item, ...res.data}
              }
            } else {
              return item
            }

          });
          commit('market/SET_MARKET', {
            key: 'tickerList',
            data: tickerList,
          });
        };
      })

      for (let item in window.webSocket_base.successFn) {
        if (~item.indexOf('Trade')) {
          delete window.webSocket_base.successFn[item]
        }
      }

      let tradesList, tradesRank
      window.webSocket_base.successFn[`Trade:${instrumentID2}`] = (res) => {
        if (res && res.data) {
          if (res.action === 1) { // 全量
            tradesList = res.data
          }
          if (res.action === 4) { // 插入
            tradesList = [...res.data, ...state.market.trades]
            tradesList.pop()
          }
        }
        commit('market/SET_MARKET', {
          key: 'trades',
          data: tradesList
        })
      }

      window.webSocket_base.successFn[`OrderBook:${instrumentID2}`] = (res) => {
        if (!res || !res.data) return
        // let obj = {...state.market[instrumentID2 + '_Order']}
        let obj = orderBook[instrumentID2 + '_Order']
        obj = JSON.parse(JSON.stringify(obj))
        let depth_asks = []
        let depth_bids = []
        // obj[res.data.way === 1 ? 'buys' : 'sells'] = res.data.depths
        if (res.action === 1) { // 全量
          if (res.data.asks) {
            obj['asks'] = [];
            for (let i = 0; i < res.data.asks.length; i++) {
              // if (res.data.asks[i][2] !== '0') {
              //   obj['asks'].push(res.data.asks[i]);
              // }
              if (res.data.bids && res.data.bids.length > 0) {
                if (res.data.asks[i][2] !== '0' && Number(res.data.asks[i][1]) > Number(res.data.bids[0][1])) {
                  obj['asks'].push(res.data.asks[i]);
                }
              } else {
                if (res.data.asks[i][2] !== '0') {
                  obj['asks'].push(res.data.asks[i]);
                }
              }
            }
            // obj['asks'] = res.data.asks
          }
          if (res.data.bids) {
            obj['bids'] = [];
            for (let i = 0; i < res.data.bids.length; i++) {
              // if (res.data.bids[i][2] !== '0') {
              //   obj['bids'].push(res.data.bids[i]);
              // }
              if (res.data.asks && res.data.asks.length > 0) {
                if (res.data.bids[i][2] !== '0' && Number(res.data.bids[i][1]) < Number(res.data.asks[0][1])) {
                  obj['bids'].push(res.data.bids[i]);
                }
              } else {
                if (res.data.bids[i][2] !== "0") {
                  obj["bids"].push(res.data.bids[i]);
                }
              }
            }
            // obj['bids'] = res.data.bids
          }
        }
        if (res.action === 2) { // 更新
          depth_asks = obj['asks'] ? [...obj['asks']] : []
          depth_bids = obj['bids'] ? [...obj['bids']] : []
          if (res.data.asks) { // 卖
            // depth_asks = obj['asks'] ? [...obj['asks']] : []
            if (depth_asks.length === 0) {
              for (let i = 0; i < res.data.asks.length; i++) {
                // if (res.data.asks[i][2] !== "0") {
                //   depth_asks.push(res.data.asks[i]);
                // }
                if (res.data.asks[i][2] !== '0') {
                  if (depth_bids.length > 0) {
                    if (Number(res.data.asks[i][1]) > Number(depth_bids[0][1])) {
                      if (res.data.bids && res.data.bids.length > 0) {
                        if (Number(res.data.asks[i][1]) > Number(res.data.bids[0][1])) {
                          depth_asks.push(res.data.asks[i]);
                        }
                      } else {
                        depth_asks.push(res.data.asks[i]);
                      }
                    }
                  } else {
                    if (res.data.bids && res.data.bids.length > 0) {
                      if (Number(res.data.asks[i][1]) > Number(res.data.bids[0][1])) {
                        depth_asks.push(res.data.asks[i]);
                      }
                    } else {
                      depth_asks.push(res.data.asks[i]);
                    }
                  }
                }
              }
            } else {
              for (let i = 0; i < res.data.asks.length; i++) {
                for (let j = 0; j < depth_asks.length; j++) {
                  if (
                    res.data.asks[i][0] < depth_asks[j][0] &&
                    res.data.asks[i][2] !== '0'
                  ) {
                    depth_asks.splice(j, 0, res.data.asks[i]);
                    break;
                  } else if (res.data.asks[i][0] === depth_asks[j][0]) {
                    // 看key是否相同
                    if (res.data.asks[i][2] === '0') {
                      // 如果qty为0就删除，否则就替换
                      depth_asks.splice(j, 1);
                    } else {
                      depth_asks[j] = [...res.data.asks[i]];
                    }
                    break;
                  } else if (res.data.asks[i][0] > depth_asks[j][0]) {
                    if ( j === depth_asks.length - 1 && res.data.asks[i][2] !== '0') {
                      // depth_asks.push(res.data.asks[i]);
                      if (depth_bids.length > 0) {
                        if (Number(res.data.asks[i][1]) > Number(depth_bids[0][1])) {
                          if (res.data.bids && res.data.bids.length > 0) {
                            if (Number(res.data.asks[i][1]) > Number(res.data.bids[0][1])) {
                              depth_asks.push(res.data.asks[i]);
                            }
                          } else {
                            depth_asks.push(res.data.asks[i]);
                          }
                        }
                      } else {
                        if (res.data.bids && res.data.bids.length > 0) {
                          if (Number(res.data.asks[i][1]) > Number(res.data.bids[0][1])) {
                            depth_asks.push(res.data.asks[i]);
                          }
                        } else {
                          depth_asks.push(res.data.asks[i]);
                        }
                      }
                      break;
                    }
                  }
                }
              }
            }
            obj['asks'] = depth_asks
            // let now = new Date().getTime()
            // if (now - sells_start_time > 1000) {
            //   sells_start_time = now
            //   commit('market/SAVE_DEEP', {
            //     key: instrumentID2 + '_Order',
            //     data: obj
            //   })
            // }
          }

          if (res.data.bids) { // 买
            // depth_bids = obj['bids'] ? [...obj['bids']] : []
            if (depth_bids.length === 0) {
              // depth_bids = res.data.bids
              // for (let i = 0; i < depth_bids.length; i++) {
              //   if (depth_bids[i][2] === '0') {
              //     depth_bids.splice(i, 1)
              //   }
              // }
              for (let i = 0; i < res.data.bids.length; i++) {
                // if (res.data.bids[i][2] !== "0") {
                //   depth_bids.push(res.data.bids[i])
                // }
                if (res.data.bids[i][2] !== '0') {
                  if (depth_asks.length > 0) {
                    if (Number(res.data.bids[i][1]) < Number(depth_asks[0][1])) {
                      if (res.data.asks && res.data.asks.length > 0) {
                        if (Number(res.data.bids[i][1]) < Number(res.data.asks[0][1])) {
                          depth_bids.push(res.data.bids[i]);
                        }
                      } else {
                        depth_bids.push(res.data.bids[i]);
                      }
                    }
                  } else {
                    if (res.data.asks && res.data.asks.length > 0) {
                      if (Number(res.data.bids[i][1]) < Number(res.data.asks[0][1])) {
                        depth_bids.push(res.data.bids[i]);
                      }
                    } else {
                      depth_bids.push(res.data.bids[i]);
                    }
                  }
                }
              }
            } else {
              for (let i = 0; i < res.data.bids.length; i++) {
                for (let j = 0; j < depth_bids.length; j++) {
                  if (
                    res.data.bids[i][0] > depth_bids[j][0] &&
                    res.data.bids[i][2] !== '0'
                  ) {
                    depth_bids.splice(j, 0, res.data.bids[i]);
                    break;
                  } else if (res.data.bids[i][0] === depth_bids[j][0]) {
                    // 看key是否相同
                    if (res.data.bids[i][2] === '0') {
                      // 如果qty为0就删除，否则就替换
                      depth_bids.splice(j, 1);
                    } else {
                      depth_bids[j] = [...res.data.bids[i]];
                    }
                    break;
                  } else if (res.data.bids[i][0] < depth_bids[j][0]) {
                    if (j === depth_bids.length - 1 && res.data.bids[i][2] !== '0') {
                      // depth_bids.push(res.data.bids[i]);
                      if (depth_asks.length > 0) {
                        if (Number(res.data.bids[i][1]) < Number(depth_asks[0][1])) {
                          if (res.data.asks && res.data.asks.length > 0) {
                            if (Number(res.data.bids[i][1]) < Number(res.data.asks[0][1])) {
                              depth_bids.push(res.data.bids[i]);
                            }
                          } else {
                            depth_bids.push(res.data.bids[i]);
                          }
                        }
                      } else {
                        if (res.data.asks && res.data.asks.length > 0) {
                          if (Number(res.data.bids[i][1]) < Number(res.data.asks[0][1])) {
                            depth_bids.push(res.data.bids[i]);
                          }
                        } else {
                          depth_bids.push(res.data.bids[i]);
                        }
                      }
                      break;
                    }
                  }
                }
              }
            }
            obj['bids'] =  depth_bids
            // 1秒内更新一次dom
            // let now = new Date().getTime();
            // if (now - buys_start_time > 1000) {
            //   buys_start_time = now
            //   commit('market/SAVE_DEEP', {
            //     key: instrumentID2 + '_Order',
            //     data: obj
            //   })
            // }
          }
        }
        setOrderBook(instrumentID2 + '_Order', obj)
        commit('market/SAVE_DEEP', {
          key: instrumentID2 + '_Order',
          data: obj
        })
      }
      window.webSocket_base.successFn[`PNL:${instrumentID2}`] = (res) => {
        commit('market/SET_MARKET', {
          key: 'pnls',
          data: res.data
        })
      }
      themeOut = `{"action":"unsubscribe","args":${action_json}}`
      if (isError || is_change) {
        window.webSocket_base.webSocketSend(`{"action":"subscribe","args":${action_json}}`)
      }
    }).catch(e => {
      if (!is_reconnect) {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
          let instrumentID = state.market.productInfo.instrument_id
          // dispatch('getMarketDate', instrumentID)
          dispatch('getMarketDate')
        }, 2000)
      }
    })
  },
  getUser({commit, state}) {
    if (!state.auth.token) {
      return false
    }
    if (ApiConfig.isYun) {
      // 处理用户信息
      commit('auth/SAVE_USERINFO', { data: {
        phone: 123,
        user_assets: [{
          coin_code: 'USDT',
          available_vol: '100'
        }]
      } })
    } else {
      SwapsApi.getAssets().then(res => {
        commit('auth/SAVE_USERINFO', { data: res.data })
      }).catch(e => {
        if (e.errno === 'FORBIDDEN') {
          commit('auth/SET_TOKEN', {
            token: null
          })
          Cookie.clearCookie('token', ApiConfig.domain)
          Cookie.clearCookie('uid', ApiConfig.domain)
          window.location.href = `${ApiConfig.mainDomain}/login?lang=${state.auth.locale}&path=${escape(window.location.href)}`
        }
      })
    }
  },
  // 获取用户相关数据
  getUserDate({commit, state, dispatch}, is_reconnect) {
    if (!state.auth.token) {
      return false
    }
    let instrumentID = state.market.productInfo.instrument_id
    // 获取用户资产 获取用户仓位 获取用户订单
    let productList = state.market.productList
    if (!productList) {
      return false
    }
    let len = productList.length
    let contract = state.market.productInfo
    let valueUnit = state.com.marginUnit
    // SwapsApi.getAssets(),
    // return;
    let arr = [SwapsApi.accounts(valueUnit), SwapsApi.getUserOrders(instrumentID, 3), SwapsApi.getUserPositions(instrumentID, 3)]
    let info
    for (;len--;) {
      info = productList[len]
      if (valueUnit === Formula.MarginCoin(info.base_coin, info.quote_coin, info.px_coin) && info.instrument_id !== contract.instrument_id) {
        arr.push(SwapsApi.getUserPositions(info.instrument_id, 3));
        // break
      }
    }
    Promise.all(arr)
    .then(res => {
      // commit('auth/SAVE_USERINFO', { data: res[0].data })
      let account = res[0].data.accounts[0]
      commit('auth/SET_ACCOUNTS', {
        data: account
      })
      commit('com/SET_COMMON', {
        showOpenAccount: !account
      })
      commit('market/SET_CURRYENTRUSTLIST', {
        data: res[1].data.orders
      })
      commit('market/SET_CABINLIST', {
        data: res[2].data.positions || []
      })
      let list = []
      res.filter((item, index) => {
        return index > 2
      }).forEach(item => {
        if (item && item.data && item.data.positions) {
          list.push(...item.data.positions)
        }
      })
      commit('market/SET_CABINLIST_OTHER', {
        data: list
      })
      dispatch('positionCalculate')
    }).catch(e => {
      if (e.errno === 'FORBIDDEN') {
        commit('auth/SET_TOKEN', {
          token: null
        })
        Cookie.clearCookie('token', ApiConfig.domain)
        Cookie.clearCookie('uid', ApiConfig.domain)
        window.location.href = `${ApiConfig.mainDomain}/login?lang=${state.auth.locale}&path=${escape(window.location.href)}`
      } else if (e.errno === 'BAD_REQUEST') {
        Cookie.clearCookie('token', ApiConfig.domain)
        Cookie.clearCookie('uid', ApiConfig.domain)
        window.location.reload()
      } else {
        if (!is_reconnect) {
          setTimeout(() => {
            // dispatch("getUserDate", instrumentID);
            dispatch('getUserDate')
          }, 2000);
        }
      }
    })
  },
  positionCalculate({commit, state}) {
    let instrumentID = state.market.productInfo.instrument_id
    // 所有全仓的亏损
    let positionLoss = 0
    // 除本仓位的全仓亏损
    let otherLoss = 0 // 除了当前合约以外的相同保证金币的全仓亏损
    let PNL = 0
    let imTotal = 0
    let fair_px, contract, tickerItem
    // return 0
    let haveAssert = state.auth.accounts ? Number(state.auth.accounts.available_vol) : 0
    let liquidateAssert = haveAssert;
    let list = [...state.market.cabinListOther, ...state.market.cabinList]
    let len = list.length
    if (!state.market.tickerList || state.market.tickerList.length < 1) return;
    for (;len--;) {
    // while(len) {
      let item = list[len]
      if (item) {
        tickerItem = state.market.tickerList.filter(info => info.instrument_id === item.instrument_id)
        if (!tickerItem || !tickerItem[0]) break;
        fair_px = Number(tickerItem[0].fair_px)
        contract = state.market.productList.filter(info => info.instrument_id === item.instrument_id)[0]
        item.loss = (Number(Formula.LongOrSort(item.cur_qty, item.avg_cost_px, fair_px, Formula.contractObj.getContract(contract), item.side === 1)) || 0)
        // 计算所有的未实现盈亏和
        PNL += item.loss
        // 计算所有的开仓保证金和
        imTotal += Number(item.im)
        // 处理全仓情况下仓位亏损
        if (item.position_type === 2) {
          if (Number(item.loss) < 0) {
            positionLoss += item.loss
          }
          if (item.instrument_id === instrumentID) {
          } else {
            if (Number(item.loss) < 0) {
              otherLoss += item.loss
            }
          }
        }
      }
    }

    positionLoss = positionLoss > 0 ? 0 : positionLoss
    otherLoss = otherLoss > 0 ? 0 : otherLoss
    // 计算开仓可用余额
    haveAssert += Number(positionLoss)
    haveAssert = haveAssert < 0 ? 0 : haveAssert

    // 计算强平价格的可用余额
    liquidateAssert += Number(otherLoss)

    commit('com/SET_COMMON', { positionLoss, PNL, haveAssert, imTotal, liquidateAssert })
  },
  userWebSocket({state, dispatch}) {
    if (!state.auth.token) {
      return false
    }
    dispatch('userSend')
    let instrumentID = state.market.productInfo.instrument_id
    let userErrorFn = () => {
      clearTimeout(userTimeOut)
      if (window.webSocket_base.isConnection()) {
        dispatch('userWebSocket')
      } else {
        userTimeOut = setTimeout(() => {
          // dispatch('getUserDate', instrumentID)
          dispatch('getUserDate', true)
        }, 2000)
      }
    }
    window.webSocket_base.errorCallBackFunObj['userErrorFn'] = userErrorFn
  },
  userSend({state, dispatch}) {
    let timestamp = new Date().valueOf()
    let nonce = timestamp + '000'
    if (ApiConfig.isYun) {
      let token = (new Md5(Cookie.getCookie('token') + nonce)).hash()
      let expired_ts = Cookie.getCookie('expired_ts') // expired_ts 超时时间
      let access_key = Cookie.getCookie('access_key')
      window.webSocket_base.webSocketSend(`{"action":"cloud_access","args":["${access_key}","web","1.0","${token}","${nonce}", "${expired_ts}"]}`)
    } else {
      let token = aesEncrypy(Cookie.getCookie('token'), nonce)
      window.webSocket_base.webSocketSend(`{"action":"authenticate","args":["${Cookie.getCookie('uid')}","web","1.0","${token}","${nonce}"]}`)
    }
    window.webSocket_base.successFn[ApiConfig.isYun ? 'cloud_access' : 'authenticate'] = (res) => {
      // window.webSocket_base.webSocketSend(`{"action":"subscribe","args":["unicast"]}`)
      window.webSocket_base.webSocketSend(`{"action":"subscribe","args":["UserProperty"]}`)
      window.webSocket_base.successFn['UserProperty'] = (res) => {
        dispatch('userMessageDispose', res.data)
      }
    }
  },
  userMessageDispose({state, commit, dispatch}, data) {
    let data_len = data && data.length || 0
    let i = data_len
    if (data_len) {
      let instrumentID = state.market.productInfo.instrument_id
      let cabinList = [...state.market.cabinList]
      let curryEntrustList = [...state.market.curryEntrustList]
      let cabinListOther = [...state.market.cabinListOther]
      // 保证金不同不处理
      if (data[data_len - 1].c_assets && state.auth.accounts && data[data_len - 1].c_assets.coin_code !== state.auth.accounts.coin_code) {
        return
      }
      let c_assets, s_assets
      for (;i--;) {
        if (!c_assets && data[i].c_assets) {
          c_assets = data[i].c_assets
        }
        if (!s_assets && data[i] && data[i].s_assets) {
          s_assets = data[i].s_assets
        }

        // 订单
        if (data[i].order && instrumentID === data[i].order.instrument_id) {
          curryEntrustList = curryEntrustList.filter(item => {
            return item.oid !== data[i].order.oid
          })
          if (~[1, 2].indexOf(data[i].order.status)) { // 1:申报中 4.委托记录先不处理
            // curryEntrustList.push(data[i].order)
            curryEntrustList.unshift(data[i].order)
          }
          commit('market/SET_CURRYENTRUSTLIST', {
            data: curryEntrustList
          })
        }

        // 仓位
        if (data[i].position) {
          // "status": 1, // 状态,1:持仓中,2:系统托管中,4:已平仓
          if (data[i].position.instrument_id === instrumentID) {
            cabinList = cabinList.filter(item => {
              return item.pid !== data[i].position.pid
            })
            if (data[i].position.status === 1) { // 1:申报中
              cabinList.push(data[i].position)
            }
            commit('market/SET_CABINLIST', {
              data: cabinList
            })
          } else {
            let bl = true
            // 判断同保证金币下其他合约变化
            cabinListOther = cabinListOther.map(item => {
              let it = [...item]
              it = it.map(info => {
                if (info.instrument_id === data[i].position.instrument_id && info.pid === data[i].position.pid) {
                  bl = false
                  if (data[i].position.status === 1) {
                    return data[i].position
                  } else {
                    return
                  }
                }
                return info
              }).filter(info => info)
              return it
            })
            if (bl) {
              cabinListOther.push([data[i].position])
            }
            commit('market/SET_CABINLIST_OTHER', {
              data: cabinListOther
            })
          }
        }
      }
      // 合约资产
      if (c_assets) {
        commit('auth/SET_ACCOUNTS', {
          data: c_assets
        })
      }
      // 现货资产
      if (s_assets) {
        let ui = {...state.auth.userInfo}
        ui.user_assets = ui.user_assets.map(item => {
          return s_assets.coin_code === item.coin_code ? s_assets : item
        })
        commit('auth/SAVE_USERINFO', {
          data: ui
        })
      }
      dispatch('positionCalculate')
    }
  },
  clearDateTime() {
    clearTimeout(timeOut)
    clearTimeout(userTimeOut)
    if (themeOut) {
      window.webSocket_base.webSocketSend(themeOut)
      delete window.webSocket_base.errorCallBackFunObj['Ticker']
    }
  }
}
let productList = []
let timeOut = null
let userTimeOut = null
let themeOut = null
