<!--按照USDT合约，币本位分类-->
<template>
  <div class="swap-title">
   <div class="swap-title-web">
    <!-- <transition name="warning">
      <div class="warning" v-if="isWarningShow">
        <img src="../../assets/img/icon-Caution.svg" />
        <span v-if="id !== 23">{{this.productInfo && $t('typeTitle.warning', {name: this.productInfo.symbol})}}</span>
        <span v-else>{{this.productInfo && $t('typeTitle.warning2', {name: this.productInfo.symbol})}}</span>
        <a class="close" @click="closeWarning()"></a>
      </div>
    </transition> -->
    <st-row align="center" class='swap-title-bottom'>
         <div class="assert">
               <st-row justify="between">
                 <h4>{{ $t('typeTitle.totalAssert', {coin: com.marginUnit}) }}</h4>
                 <p class="eye" :class="isAssertShow || 'no-see'" @click="assertShow"></p>
               </st-row>
               <div class="assert-detail">
                 <span v-if="isAssertShow">{{ getUserSumAssert()|retainDecimals({decimal: com.valueUnit}) }} {{ com.marginUnit }}</span>
                 <span v-else>---- {{ com.marginUnit }}</span>
               </div>
          </div>
         <st-row align="center" class='swap-title-right' justify="between">
            <div class="swap-title-name">
                <div class="Sel-mask" v-if="contractShow" @click="contractShow = false"></div>
                 <span class="Sel-name" @click="contractShow = !contractShow" :class="{'active': contractShow}">
                   <span>{{ productInfo[locale === 'zh-cn' ? 'name_zh' : 'name_en'] }}</span>
                 </span>
                 <div class="Sel-list" v-if="contractShow">
                   <st-row class="contract-title">
                     <a @click="currentType = 1" :class="{active: currentType === 1}">{{ $t('typeTitle.isSwap') }}</a>
                     <a @click="currentType = 2" :class="{active: currentType === 2}">{{ $t('typeTitle.theSwap') }}</a>
                     <a @click="currentType = 4" :class="{active: currentType === 4}">{{ $t('typeTitle.simulation') }}</a>
                   </st-row>
                    <div class="contract-content">
                      <div class="contract-content-over">
                        <table>
                        <tr>
                          <th>{{ $t('typeTitle.tradeType') }}</th>
                          <th>{{ $t('typeTitle.newsPrice') }}</th>
                          <th class="width-560">{{ $t('typeTitle.change') }}</th>
                        </tr>
                        <tr v-if="currentType === 2 ? (item.contract.area === 2 || item.contract.area === 3) : item.contract.area === currentType" :key="item.contract.instrument_id"  v-for="item in productTicker" :class="item.contract.instrument_id === productInfo.instrument_id ? 'active' : '' " @click="changeContract(item.contract.instrument_id)">
                          <td>{{item.contract[locale === 'zh-cn' ? 'name_zh' : 'name_en']}}</td>
                          <td :class="item.ticker.change_rate < 0 ? 'red' : 'green'">{{ item.ticker.last_px | splitFormat(com.pxUnit - 1)  }} <span>{{ item.contract.quote_coin }}</span></td>
                          <td class="width-560" :class="item.ticker.change_rate < 0 ? 'red' : 'green'">{{ item.ticker.change_rate * 100|retainDecimals({decimal: 2}) }}%</td>
                        </tr>
                      </table>
                      </div>
                    </div>
                 </div>
         </div>
             <st-row align="center" justify="between" class='swap-title-number'>
                     <div>
                         <h6>{{ $t('typeTitle.newsPrice') }}: <span :class="'applies ' + (ticker.change_rate < 0 ? 'red' : '')">{{ ticker.last_px | splitFormat(com.pxUnit - 1) }}</span></h6>
                         <h6>{{ $t('typeTitle.fairPrice') }}: <span>{{ ticker.fair_px | splitFormat(com.pxUnit) }} </span></h6>
                     </div>
                      <div>
                         <h6>{{ $t('typeTitle.applies') }}: <span :class="'applies ' + (ticker.change_rate < 0 ? 'red' : '')">{{ ticker.change_rate * 100|retainDecimals({decimal: 2}) }}%</span></h6>
                         <h6>{{ $t('typeTitle.appliesE') }}: <span :class="'applies ' + (ticker.change_rate < 0 ? 'red' : '')">{{ ticker.change_value | splitFormat(com.pxUnit) }}</span></h6>
                     </div>
                      <div>
                         <h6>{{ ticker.funding_rate * 100 | retainDecimals({decimal: 4}) }}%</h6>
                         <st-row align="center" class="wen">
                             <nuxt-link target="_blank" :to="'/information/funding?id=' + productInfo.instrument_id">
                              <p>{{ timeOne }} </p>
                              <st-row justify="center" >
                                  <div class="hint">
                                      <div class="triangle"></div>
                                      <div class="opcity-rect"></div>
                                      <p>{{ $t('typeTitle.nextExchange') }}</p>
                                      <p>{{ timeTwo }}</p>
                                      <!-- <p>{{ nextTime }}</p> -->
                                      <p>{{ ticker.funding_rate < 0 ? $t('typeTitle.needValue', {value: Util.retainDecimals(-ticker.funding_rate * 100, {decimal: 4}) + '%'}) : $t('typeTitle.needValueTwo', {value: Util.retainDecimals(ticker.funding_rate * 100, {decimal: 4}) + '%'}) }}</p>
                                      <p>{{ $t('typeTitle.minAndMaxRate', {max: Util.retainDecimals(Number(productInfo.max_funding_rate) * 100, {decimal: 4}) + '%', min: Util.retainDecimals(Number(productInfo.min_funding_rate) * 100, {decimal: 4}) + '%'})}}</p>
                                      <span class="the-more">{{ $t('common.seeMore') }}</span>
                                  </div>
                              </st-row>
                            </nuxt-link>
                         </st-row>
                     </div>
                      <div>
                         <h6>{{ $t('typeTitle.deal') }}: {{ ticker.qty24|retainDecimals({decimal: 0}) }} {{ $t('common.pieces') }}</h6>
                         <!-- <p>≈ {{ sumValue(ticker.qty24)|retainDecimals({decimal: com.valueUnit}) }} {{com.marginUnit}}</p> -->
                         <p>≈ {{ getCoinQty24|retainDecimals({decimal: com.valueUnit}) }} {{com.marginUnit}}</p>
                     </div>
                     <div>
                        <h6>{{ $t('typeTitle.contractValue') }}: {{ticker.position_size}} {{ $t('common.pieces') }}</h6>
                        <p>≈ {{ sumValue(ticker.position_size)|retainDecimals({decimal: com.valueUnit}) }} {{com.marginUnit}}</p>
                     </div>
                     <div>
                         <h6 class='counter-box'>
                             <a @click="calculatorShow = true" class="counter"><span></span></a>
                             <p>{{$t('typeTitle.calculator')}}</p>
                        </h6>

                         <h6 class='setup-box'>
                             <a @click="setUpShow = true" class="setup"><span></span></a>
                             <p>{{$t('typeTitle.contractSet')}}</p>
                        </h6>
                        <!-- <div class='swap-title-dw' >
                            <a @click="calculatorShow = true"><span></span></a>
                            <a @click="setUpShow = true"><span></span></a>
                        </div> -->
                     </div>
             </st-row>

         </st-row>
        <popup :title="$t('typeTitle.contractSet')"  width="440" :callback="closeSetUp" v-if="setUpShow">
           <set-up-window :close="closeSetUp"></set-up-window>
       </popup>
        <popup :title="$t('typeTitle.contractCalculator')"   width="660" :callback="clsoeCalculator" v-if="calculatorShow">
            <calculator-window :close="clsoeCalculator"></calculator-window>
       </popup>
    </st-row>
   </div>
   <div class="swap-title-m">
    <st-row align="center" class='swap-title-bottom'>

         <st-row align="center" class='swap-title-right' justify="between">
            <div class="swap-title-name">
                <div class="Sel-mask" v-if="contractShow" @click="contractShow = false"></div>
                 <span class="Sel-name" @click="contractShow = !contractShow" :class="{'active': contractShow}">
                   <span>{{ productInfo[locale === 'zh-cn' ? 'name_zh' : 'name_en'] }}</span>
                 </span>
                 <div class="Sel-list" v-if="contractShow">
                   <st-row class="contract-title">
                     <a @click="currentType = 1" :class="{active: currentType === 1}">{{ $t('typeTitle.isSwap') }}</a>
                     <a @click="currentType = 2" :class="{active: currentType === 2}">{{ $t('typeTitle.theSwap') }}</a>
                     <a @click="currentType = 4" :class="{active: currentType === 4}">{{ $t('typeTitle.simulation') }}</a>
                   </st-row>
                    <div class="contract-content">
                      <div class="contract-content-over">
                        <table>
                        <tr>
                          <th>{{ $t('typeTitle.tradeType') }}</th>
                          <th>{{ $t('typeTitle.newsPrice') }}</th>
                          <th class="width-560">{{ $t('typeTitle.change') }}</th>
                        </tr>
                        <!-- <tr v-if="item.contract.area === currentType" :key="item.contract.instrument_id"  v-for="item in productTicker" :class="item.contract.instrument_id === productInfo.instrument_id ? 'active' : '' " @click="changeContract(item.contract.instrument_id)"> -->
                        <tr v-if="currentType === 2 ? (item.contract.area === 2 || item.contract.area === 3) : item.contract.area === currentType" :key="item.contract.instrument_id"  v-for="item in productTicker" :class="item.contract.instrument_id === productInfo.instrument_id ? 'active' : '' " @click="changeContract(item.contract.instrument_id)">
                          <td>{{item.contract[locale === 'zh-cn' ? 'name_zh' : 'name_en']}}</td>
                          <td :class="item.ticker.change_rate < 0 ? 'red' : 'green'">{{ item.ticker.last_px | splitFormat(com.pxUnit - 1)  }} <span>{{ item.contract.quote_coin }}</span></td>
                          <td class="width-560" :class="item.ticker.change_rate < 0 ? 'red' : 'green'">{{ item.ticker.change_rate * 100|retainDecimals({decimal: 2}) }}%</td>
                        </tr>
                      </table>
                      </div>
                    </div>
                 </div>
            </div>
             <st-row align="center" justify="between" class='swap-title-number'>
                       <div>
                         <h6>{{ sumValue(ticker.position_size)|retainDecimals({decimal: com.valueUnit}) }} {{com.marginUnit}}</h6>
                         <p>{{ $t('typeTitle.contractValue') }}</p>
                     </div>
                      <div>
                         <h6>{{ ticker.qty24|retainDecimals({decimal: 0}) }} {{ $t('common.pieces') }}</h6>
                         <p>{{ $t('typeTitle.deal') }}</p>
                     </div>
             </st-row>
         </st-row>
    </st-row>
   </div>
  </div>
</template>
<script>
import Formula from '../../assets/js/formula/index.js'
import Util from '../../assets/js/util.js'
import CalculatorWindow from './type-title-cp/calculator-window'
import SetUpWindow from './type-title-cp/set-up-window'
export default {
  components: {
    CalculatorWindow,
    SetUpWindow
  },
  data() {
    return {
      timeOne: '',
      timeTwo: '',
      nextTime: '',
      contractShow: false,
      Util: Util,
      productTicker: null,
      setUpShow: false,
      calculatorShow: false,
      int16: Math.pow(2, 15),
      // isMianOrNews: true,
      MarginCoin: Formula.MarginCoin,
      // reduceList: null,
      // reduceList2: null,
      // 当前选中币种
      // coinName: '',
      // 主区和创新区默认的币种
      // curryCoin: [],
      // 币种前置
      // mainList: null,
      // newsList: null,
      isAssertShow: true,
      // isWarningShow: false,
      currentType: 1 // 1 USDT  3 币本位  4 模拟区
    }
  },
  computed: {
    com() {
      return this.$store.state.com
    },
    locale() {
      return this.$store.state.auth.locale
    },
    token() {
      return this.$store.state.auth.token
    },
    ticker() {
      return this.$store.state.market.ticker
    },
    tickerList() {
      return this.$store.state.market.tickerList
    },
    productInfo() {
      return this.$store.state.market.productInfo
    },
    productList() {
      return this.$store.state.market.productList
    },
    accounts() {
      return this.$store.state.auth.accounts || {}
    },
    id() {
      return Number(this.$route.query.id)
    },
    getCoinQty24() {
      if (this.productInfo.margin_coin === this.productInfo.base_coin) {
        return this.ticker.base_coin_qty
      } else if (this.productInfo.margin_coin === this.productInfo.quote_coin) {
        return this.ticker.quote_coin_qty
      }
    }
  },
  filters: {
    // 获取小数位数
    retainDecimalsWithSymbol(value, obj = {}) {
      if (!value) return '+' + 0
      value = value.toString()
      if (~value.indexOf('e')) {
        return '+' + 0
      }
      let decimals = ''
      if (value.indexOf('.') > 0 && obj.decimal !== 0) {
        let decimalsRe = new RegExp('[.]{1}[0-9]{0,' + (obj.decimal || 8) + '}')
        let decimalsExec = decimalsRe.exec(value)
        decimalsExec && (decimals = decimalsExec[0])
      }
      let v = 0
      let re = new RegExp('^-?[0-9]{1}[0-9]{0,' + (obj.integer - 1 || 8) + '}')
      v = re.exec(value)
      let n = ''
      if (v) {
        n = v[0]
      }
      let result = n + decimals
      if (Number(result) < 0) {
        return n + decimals
      } else {
        return '+' + n + decimals
      }
    }
  },
  watch: {
    ticker() {
      let time = new Date() // new Date(this.ticker.timestamp * 1000)// this.getTimeZone(this.ticker.next_funding_at)
      this.getTime(time)
    },
    locale() {
      let time = new Date() // new Date(this.ticker.timestamp * 1000)// this.getTimeZone(this.ticker.next_funding_at)
      this.getTime(time)
    },
    tickerList() {
      window.requestAnimationFrame(() => {
        // this.mainList = this.reduceProduct(false) // 主区
        // this.newsList = this.reduceProduct(true) // 创新区
        this.moveReduceProduct()
        // 移动端归化
        // if (document.documentElement.clientWidth <= 750) {
        //   // this.moveReduceProduct()
        // } else {
        //   this.reduceList = this.newsTicker(this.mainList)
        //   this.reduceList2 = this.newsTicker(this.newsList)
        // }
      })
    }
  },
  methods: {
    // 关闭提醒
    // closeWarning() {
    //   let now = new Date()
    //   let warningShowObj = JSON.parse(localStorage.getItem('warningShowObj'))
    //   warningShowObj[String(this.id)] = now.valueOf()
    //   warningShowObj = JSON.stringify(warningShowObj)
    //   localStorage.setItem('warningShowObj', warningShowObj)
    //   this.isWarningShow = false
    // },
    // 获取币种介绍链接
    // coinBrief() {
    //   this.swapsApi.coinBrief(this.productInfo.base_coin).then(res => {
    //     this.coinBriefUrl = res.data && res.data.link
    //   })
    // },
    assertShow() {
      this.isAssertShow = !this.isAssertShow
      window.localStorage.setItem('isAssertShow', this.isAssertShow)
    },
    // 获取账户权益
    getUserSumAssert() {
      // 可用 + 冻结 + 仓位保证金总数 + 未实现盈亏
      return Number(this.accounts.available_vol) + Number(this.accounts.freeze_vol) + this.com.imTotal + this.com.PNL
    },
    // 切换主区与创新区
    // changeArea(isMianOrNews) {
    //   this.isMianOrNews = isMianOrNews
    //   this.coinName = this.curryCoin[+!this.isMianOrNews]
    //   this.reduceList = this.newsTicker(this.mainList)
    //   this.reduceList2 = this.newsTicker(this.newsList)
    //   this.changeContract(this.coinName)
    // },
    // 判断当前选中
    // curry(info) {
    //   if (this.coinName) {
    //     return this.coinName === info.base_coin
    //   } else {
    //     return ~info.contract_list.indexOf(this.productInfo.instrument_id)
    //   }
    // },
    // 移动端归化
    moveReduceProduct() {
      let len, info
      this.productTicker = []
      this.productList.forEach(item => {
        len = this.tickerList.length
        info = {}
        for (; len--;) {
          if (this.tickerList[len].instrument_id === item.instrument_id) {
            info.ticker = this.tickerList[len]
            info.priceUnit = item.px_unit.length - item.px_unit.indexOf('.') - 1
            break
          }
        }
        info.contract = item
        this.productTicker.push(info)
      })
    },
    // 归化字段
    // reduceProduct(isReverse) { // 是否是反向合约
    //   let info, list, info_one
    //   list = []
    //   this.productList.forEach(item => {
    //     // 过滤掉主区或者创新区
    //     let isUSDT = Formula.MarginCoin(item.base_coin, item.quote_coin, item.price_coin) === 'USDT'
    //     if (isReverse) { // 币本位合约
    //       if (!item.is_reverse) {
    //         return
    //       }
    //       this.curryCoin[1] || (this.curryCoin[1] = item.instrument_id)
    //     } else { // USDT合约
    //       if (item.is_reverse || !isUSDT) {
    //         return
    //       }
    //       this.curryCoin[0] || (this.curryCoin[0] = item.instrument_id)
    //     }

    //     info = {
    //       margin_coin: this.MarginCoin(item.base_coin, item.quote_coin, item.price_coin),
    //       IsReverse: Formula.IsReverse(item.quote_coin, item.price_coin),
    //       instrument_id: item.instrument_id,
    //       priceUnit: item.px_unit.length - item.px_unit.indexOf('.') - 1
    //     }

    //     info_one = {
    //       base_coin: item.base_coin,
    //       base_coin_en: item.base_coin_en,
    //       base_coin_zh: item.base_coin_zh,
    //       contract_list: [item.instrument_id],
    //       product: [info],
    //       symbol: item.symbol
    //     }
    //     list.push(info_one)
    //   })
    //   return list
    // },

    // 测试是否是反向合约（币本位）
    // testReverse(quote_coin, price_coin) {
    //   return Formula.IsReverse(quote_coin, price_coin)
    // },
    // 即使更新行情
    newsTicker(list) {
      let len = this.tickerList.length
      list.forEach(item_one => {
        item_one.product.forEach(info => {
          for (let i = len; i--;) {
            if (this.tickerList[i].instrument_id === info.instrument_id) {
              info.ticker = this.tickerList[i]
              break
            }
          }
        })
      })
      return list
    },
    // 关闭设置弹窗
    closeSetUp() {
      this.setUpShow = false
    },
    // 关闭计算器弹窗
    clsoeCalculator() {
      this.calculatorShow = false
    },
    // 改变合约
    changeContract(id) {
      this.contractShow = false
      // this.coinName = ''
      this.$emit('submitEntrustInit')
      for (let item in window.webSocket_base.successFn) {
        if (item !== 'UserProperty') {
          delete window.webSocket_base.successFn[item]
        }
      }
      this.$store.commit('market/SET_TICKER', { data: [] })
      this.$store.commit('market/SET_MARKET', {
        key: 'trades',
        data: []
      })
      this.$store.dispatch('setProductInfo', id)
      this.$store.dispatch('getMarketDate', true); // isChange  true:切换合约触发
      if (this.token) {
        this.$store.commit('market/SET_CABINLIST', {data: []})
        this.$store.dispatch('getUserDate')
      }
      window.localStorage.setItem('instrumentID', id)
      this.$router.push({
        query: {id}
      })
      // this.coinBrief()

      // this.setWarningTime(id)
    },
    // 设置warning时间
    // setWarningTime(id) {
    //   let warningShowObj = JSON.parse(localStorage.getItem('warningShowObj'))
    //   if (!warningShowObj || !warningShowObj[String(id)]) {
    //     this.isWarningShow = false
    //     return false
    //   }
    //   let now = new Date().valueOf()

    //   if (Number(now) - Number(warningShowObj[String(id)]) > 3600000) {
    //     this.isWarningShow = true
    //   } else {
    //     this.isWarningShow = false
    //   }
    // },
    // 未平仓合约价值
    sumValue(vol) {
      return Formula.CalculateContractBasicValueTwo(vol, this.ticker.fair_px, Formula.contractObj.getContract(this.productInfo))
    },
    // isMian(id) {
    //   let item, info
    //   for (let i = 0; i < this.productList.length; i++) {
    //     item = this.productList[i]
    //     if (item.instrument_id === id) {
    //       info = item
    //       break
    //     }
    //   }

    //   if (info && info.contract) {
    //     // let test_reverse = this.testReverse(info.contract.quote_coin, info.contract.price_coin)
    //     let isUSDT = Formula.MarginCoin(info.contract.base_coin, info.contract.quote_coin, info.contract.price_coin) === 'USDT'
    //     if (info.is_reverse) {
    //       return false
    //     } else {
    //       if (isUSDT) {
    //         return true
    //       }
    //     }
    //   }
    //   // return (this.int16 & id) === this.int16
    // },
    getTimeZone(time) {
      let GTM_8 = 480  // -480
      let date = new Date(time)
      let subMin = date.getTimezoneOffset() + GTM_8
      date.setMinutes(date.getMinutes() + subMin)
      return date
    },
    singleFormat(str) {
      return str.toString().length === 1 ? ('0' + str) : str
    },
    // changCoinUnit() {
    //   window.localStorage.setItem('coinUnit', !this.coinUnit)
    //   this.$store.commit('market/SET_COINUNIT', {
    //     data: !this.coinUnit
    //   })
    // },
    getTime(time) {
      let once = this.getTimeZone(this.ticker.next_funding_at)
      let timeOne = once.getHours() - time.getHours()
      this.timeTwo = this.singleFormat(once.getHours()) + ':00:00'
      if (timeOne < 0) {
        timeOne += 24
      }
      if (timeOne === 1) {
        let tm = parseInt((Date.parse(once) - Date.parse(time)) / 1000)
        this.timeOne = this.$t('typeTitle.fundsRateTwo', {
          time: this.singleFormat(parseInt(tm / 60)) + ':' + this.singleFormat(tm % 60)
        })
        this.nextTime = this.$t('typeTitle.distanceNextFundsRate2', {
          time: this.singleFormat(parseInt(tm / 60)) + ':' + this.singleFormat(tm % 60)
        })
      } else {
        this.timeOne = this.$t('typeTitle.fundsRate', { time: timeOne })
        this.nextTime = this.$t('typeTitle.distanceNextFundsRate1', {time: timeOne})
      }
      this.timeTwo = this.$t('typeTitle.moneyTimeTwo', {
        m: time.getMonth() + 1,
        d: once.getDate(),
        h: this.timeTwo
      })

      // let distance = parseInt((Date.parse(once) - Date.parse(time)) / 1000)
      // this.nextTime = this.$t('typeTitle.distanceNextFundsRate', {
      //   h: this.singleFormat(parseInt(distance / 3600)),
      //   m: this.singleFormat(parseInt((distance % (60 * 60)) / 60)),
      //   s: this.singleFormat(parseInt(distance % 60))
      // })
    },
    // 记录用户偏好
    setUserLike() {
      let contractId = Number(window.localStorage['contractId'])
      let coinUnit = window.localStorage['coinUnit']
      let pnlPriceUnit = window.localStorage['pnlPriceUnit']
      if (!this.$route.query.id && contractId) {
        this.changeContract(contractId)
        // this.isMianOrNews = this.isMian(contractId)
      }
      // else {
      //   this.changeContract(this.$route.query.id)
      // }
      if (coinUnit !== undefined) {
        this.$store.commit('market/SET_COINUNIT', {
          data: coinUnit !== 'false'
        })
      }
      if (pnlPriceUnit !== undefined) {
        this.$store.commit('market/SET_MARKET', {
          key: 'pnlPriceUnit',
          data: pnlPriceUnit !== 'false'
        })
      }
    }
  },
  mounted() {
    let isAssertShow = window.localStorage.getItem('isAssertShow')
    if (isAssertShow) {
      this.isAssertShow = isAssertShow === 'true'
    }
    // this.coinBrief()
    // this.isMianOrNews = this.isMian(this.productInfo.instrument_id)

    // this.mainList = this.reduceProduct(false)  // USDT合约
    // this.newsList = this.reduceProduct(true) // 币本位合约

    let instrumentID = Number(window.localStorage['instrumentID'])
    if (!this.id && !instrumentID) {
      this.$store.dispatch('setProductInfo', '')
      // console.log('进来了')
      // this.changeArea(true)
      // this.$store.dispatch('auth/SET_ACCOUNTS', {data: null})
    }
    this.$store.commit('auth/SET_ACCOUNTS', {data: null})
    this.setUserLike() // 记录用户偏好
    // 设置warning时间
    // let warningShowObj = JSON.parse(localStorage.getItem('warningShowObj'))
    // if (!warningShowObj) {
    //   let obj = {
    //     '32775': '1',
    //     '20': '1',
    //     '32774': '1',
    //     '22': '1',
    //     '23': '1'
    //   }
    //   localStorage.setItem('warningShowObj', JSON.stringify(obj))
    // }
    // this.setWarningTime(this.id)
  }
}
</script>

<style lang="less" scoped>
 @import "../../assets/css/base";
 .swap-title {
   min-width: 320px;
//    margin-top: 10px;
   .swap-title-m {
     display: none;
   }
   .swap-title-top {
    //  height: 50px;
    //  overflow: auto;
    display: none;
     margin-bottom: 6px;
      &>div:nth-child(n+2) {
        //  margin-top: 10px;
       }
     .swap-title-top-contract {
       .swap-title-top-contract-info {
         flex-wrap: wrap;
       }
       .title {
         height: 30px;
          h4 {
            margin: 6px 6px 0 20px;
            margin-left: 12px;
            // width: 14px;
            text-align: center;
            width: 72px;
            color: @L9;
            font-size: 12px;
            padding-top: 5px;
          }
       }
       .list {
         flex: 1;
         flex-wrap: wrap;
        .info {
            padding: 0 6px;
            margin-top: 6px;
            margin-right: 6px;
            height: 30px;
            //  width: 162px;
            min-width: 130px;
            background-color: @L2;
            border-radius: 2px;
            cursor: pointer;
            &:last-child {
              margin-right: 0px;
            }
            h6 {
              //  line-height: 24px;
              margin-right: 6px;
              line-height: 30px;
              font-size: 12px;
            //    color: @L8;
                color: #fff;
            }
            &.active {
              border: 1px solid fade(@main-2a, 60%);
              background: fade(@main-2a, 20%);
              color: #fff;
            }
            .price {
              p {
                line-height: 30px;
                font-size: 14px;
                color: @L9;
                span {
                  width: 12px;
                  height: 16px;
                  display: inline-block;
                  vertical-align: text-top;
                  background: url("../../assets/img/up.png")
                }
                &.red {
                  color: @demoRed;
                  span{
                    color: @demoRed;
                        background: url("../../assets/img/down.png")
                    }
                }
                &.green {
                    color: @demoGreen;
                    span {
                    color: @demoGreen;
                    }
                }
              }
            }
          }
       }

     }
   }
 }
 .warning-enter-active {
    animation:warning 0.5s;
 }
 .warning-leave-active {
    animation:warning 0.5s reverse;
 }
.warning {
    display: none;
    height: 26px;
    // line-height: 26px;
    background: #313339;
    border: 1px solid #413e3c;
    color: #cb9f56;
    padding: 0px 15px;
    font-size: 12px;
    margin: 6px;
    text-align: center;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    img {
      width: 16px;
      margin-right: 4px;
    }
    .close {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: url("../../assets/img/icon-close3.svg")left top no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 6px;
      top: 6px;
      cursor: pointer;
    }
}
.warning-animate {
  // display: block;
  // animation:warning 0.5s;
}
.swap-title-bottom {
    margin-top: 6px;
    // height: 70px;
    width: 100%;
    .assert {
      margin-left: 6px;
      padding: 12px;
      width: 280px;
      height: 70px;
      background-color: @L2;
      border-radius: 2px;
      color: @L9;
      .eye {
        width: 20px;
        height: 20px;
        background-image: url('../../assets/img/eye-open.svg');
        background-size: 100% 100%;
        &.no-see {
          background-image: url('../../assets/img/eye-close.svg');
          background-size: 100% 100%;
        }
      }
      .assert-detail {
        margin-top: 4px;
        font-size: 16px;
      }
    }
    .swap-title-name {
        margin-left: 33px;
        width: 230px;
        font-size: 20px;
        position: relative;
        // padding-right: 20px;
        color: @L9;
        cursor: pointer;
    }
    .swap-title-right {
        margin: 0 6px;
        flex: 1;
        height: 70px;
        background-color: @L2;
        border-radius: 2px;
    }
    .swap-title-number {
      flex: 1;
      padding-right: 20px;
      .wen {
        a {
          border-bottom: 1px dotted @L8;
        }
        position: relative;
        .hint {
          top: 24px;
          // display: block;
          .the-more {
            color: @main-2;
            border-bottom: 1px dotted @main-2;
            &:hover {
              color: @mainHover;
              border-bottom: 1px dotted @mainHover;
            }
          }
          .opcity-rect {
            width: 100%;
            height: 8px;
            background: none;
            position: absolute;
            left: 0px;
            top: -8px;
          }
          // display: block;
        }
          &:hover {
              .hint {
                  display: block;
              }
          }
      }
        &>div {
            // &:nth-child(-n+4){
            //     margin-right: 75px;
            // }
            h6 {
              color: @L9;
              font-size: 14px;
              margin-bottom: 0px;
              .applies {
                color: @demoGreen;
                &.red {
                  color: @demoRed;
                }
              }
            }
            p {
               font-size: 12px;
               margin-bottom: 0px;
               color: @L8;
                   &.swap-title-lx {
                  text-align: right;
                  a {
                    color: @L8;
                    border-bottom: 1px dotted @L8;
                   }
               }
            }
        }

        .counter-box {
            position: relative;
            >p {
                position: absolute;
                display: none;
                background: @hintBack;
                border: 1px solid @main-2a;
                padding: 4px;
                white-space:nowrap;
                z-index: 10011;
                width: 50px;
                left: 50%;
                margin-left: -22px;
                top: -28px;
                text-align: center;
                color: #fff;
            }
            .counter {
                span {
                    display: inline-block;
                    margin-left: 4px;
                    width: 18px;
                    height: 18px;
                    vertical-align: middle;
                    background: url("../../assets/img/icon-counter_nor.png") left top no-repeat;
                    background-size: 100% 100%;
                    &:hover {
                      background: url("../../assets/img/icon-counter_sel.png") left top no-repeat;
                      background-size: 100% 100%;
                    }
                }
                &:hover {
                    &+p {
                        display: block;
                    }
                }
            }
        }
        .setup-box {
            position: relative;
            >p {
                position: absolute;
                display: none;
                background: @hintBack;
                border: 1px solid @main-2a;
                padding: 4px;
                white-space:nowrap;
                z-index: 10011;
                width: 50px;
                left: 50%;
                margin-left: -22px;
                top: 25px;
                text-align: center;
                color: #fff;
            }
            .setup {
                span {
                    display: inline-block;
                    margin-left: 4px;
                    width: 18px;
                    height: 18px;
                    vertical-align: middle;
                    background: url("../../assets/img/icon-Setup_nor.png") left top no-repeat;
                    background-size: 100% 100%;
                    &:hover {
                        background: url("../../assets/img/icon-Setup_sel.png") left top no-repeat;
                        background-size: 100% 100%;
                    }
                }

                &:hover {
                    &+p {
                        display: block;
                    }
                }

            }
        }


        .swap-title-dw {
                // margin-right: 30px;
                font-size: 14px;
                span {
                    display: inline-block;
                    margin-left: 4px;
                    width: 22px;
                    height: 22px;
                    vertical-align: middle;
                }
                a {
                    color: @L9;
                    &:first-child span {
                        background-image: url("../../assets/img/icon-counter_nor.png");

                    }
                    &:last-child span{
                        background-image: url("../../assets/img/icon-Setup_nor.png");
                    }
                    &:hover {
                      color: @main-2a;
                      &:first-child span {
                        background-image: url("../../assets/img/icon-counter_sel.png");
                      }
                      &:last-child span {
                        background-image: url("../../assets/img/icon-Setup_sel.png");
                      }
                    }
                    &:last-child {
                      margin-left: 20px;
                    }
                }
            }
    }
}
  .Sel-name{
        position: relative;
        display: inline-block;
        padding-right: 4px;
        cursor: pointer;
        &::after{
            content: '';
            position: absolute;
            margin-left: 8px;
            top: 50%;
            right: -25px;
            margin-top: -1px;
            display: block;
            border-width:5px 5px 0;
            border-style:solid;
            border-color:#cad2dc transparent transparent;/*灰 透明 透明 */
        }
        &::before {
          content: '';
          width: 20px;
          height: 20px;
          border-radius: 2px;
          position: absolute;
          margin-left: 8px;
          top: 50%;
          right: -30px;
          margin-top: -9px;
          display: block;
          border: 1px solid #fff;
        }
        &.active {
          &::after{
              content: '';
              position: absolute;
              margin-left: 8px;
              top: 50%;
              right: -25px;
              margin-top: -2px;
              display: block;
              border-width:0 5px 5px;
              border-style:solid;
              border-color: transparent transparent #cad2dc;/*灰 透明 透明 */
          }
        }
    }
    .Sel-list {
        display: inline-block;
        position: absolute;
        // padding: 10px 0;
        border: 1px solid @L2;
        background: @L1;
        width: 440px;
        // text-align: center;
        left: 50%;
        margin-left: -180px;
        top: 40px;
        // font-size: 12px;
        z-index: 1000;
        border-radius: 2px;
        padding-bottom: 20px;
        .contract-title {
          padding: 10px 20px;
          background: rgba(33,42,48,.2);
          // border-bottom: 2px solid @L4;
          a {
            padding: 5px 10px;
            color: @L9;
            font-size: 16px;
            &.active {
              color: @main-2a;
              border-bottom: 2px solid @main-2a;
            }
          }
        }
        .contract-content {
          // padding: 0 20px;
          font-size: 12px;
          p {
            padding: 0 20px;
            height: 40px;
            line-height: 40px;
          }
          .contract-content-over {
            overflow-y: auto;
            max-height: 300px;
            padding: 0 10px;
            margin: 0 10px;
            table {
            width: 100%;
            tr {
              border-bottom: 1px solid @L3;
              height: 40px;
              font-weight: 300;
              padding: 0 10px;
              td, th {
                &:last-child {
                  padding-right: 10px;
                }
                &:first-child {
                  padding-left: 10px;
                }
              }
              &:first-child {
                &:hover {
                  background: @L1;
                }
                th:last-child {
                    text-align: right;
                }
              }
              span {
                font-size: 12px;
              }
              td:last-child {
                text-align: right;
              }
              &.active {
                background: @L3;
              }
              &:hover {
                background: fade(@L3, 50%);
              }
              td.green {
                 color: @sub-4;
              }
              td.red {
                color: @sub-1;
              }
            }
          }
          }
        }
    }
    .Sel-mask {
        position: fixed;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
    }
    @media screen and (max-width:750px) {
      .swap-title {
        .swap-title-web {
          display: none;
        }
        .swap-title-m {
          display: block;
             .assert {
          display: none;
        }
           .Sel-name {
            &::after{
              content: '';
              position: absolute;
              margin-left: 8px;
              top: 50%;
              right: -14px;
              margin-top: -2px;
              display: block;
              border-width:6px 6px 0;
              border-style:solid;
              border-color:#cad2dc transparent transparent;/*灰 透明 透明 */
            }
            &::before {
              display: none;
            }
           }
        }
      }
    }
    @media screen and (max-width:560px) {
      .swap-title .swap-title-number {
        display: none;
      }
      .Sel-list {
        width: 320px;
        left: 0px;
        margin-left: 0px;
      }
      .width-560 {
        display: none;
      }
    }

    @media screen and (max-width:1400px) {
      .swap-title-bottom {
        .swap-title-name {
          width: 230px;
        }
      }
    }


    @keyframes warning{
      0% {
        height:0px;
        opacity: 0;
        color: rgba(0,0,0,0);
      }
      70% {
        height:26px;
        opacity: 1;
        color: rgba(0,0,0,0);
      }
      100% {
        opacity: 1;
        color: #cb9f56;
      }
    }

</style>
