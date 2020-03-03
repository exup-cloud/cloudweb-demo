<template>
  <div class="swap-title">
   <div class="swap-title-web">
      <div class="swap-title-top" v-if="!simulation">
        <st-row class="swap-title-top-contract">
            <st-row class="title" align="center">
              <h4>USDT</h4>
            </st-row>
          <st-row class="swap-title-top-contract-info">
            <!-- !isMian(item.contract.contract_id) && MarginCoin(item.contract.base_coin, item.contract.quote_coin, item.contract.price_coin) === 'USDT' -->
              <div class="info" v-if="item.contract.block === 1" :key="item.contract.contract_id"  v-for="item in productTicker" :class="item.contract.contract_id === productInfo.instrument_id ? 'active' : '' " @click="changeContract(item.contract.contract_id)">
              <st-row class="price" justify="between">
                <h6>{{item.contract.name}}</h6>
                <p :class="item.ticker.rise_fall_rate < 0 ? 'red' : 'green'">{{ item.ticker.last_price | splitFormat(item.priceUnit - 1)  }}<span></span></p>
                <!-- <p :class="item.ticker.rise_fall_rate < 0 ? 'red' : 'green'">{{ item.ticker.rise_fall_rate * 100|retainDecimals({decimal: 2}) }}%<span></span></p> -->
              </st-row>
            </div>
          </st-row>
        </st-row>
      <!-- <st-row> -->
        <st-row class="swap-title-top-contract">
            <st-row class="title" align="center">
              <h4>{{ $t('typeTitle.main') }}</h4>
            </st-row>
            <!-- !isMian(item.contract.contract_id) && MarginCoin(item.contract.base_coin, item.contract.quote_coin, item.contract.price_coin) !== 'USDT' -->
            <div class="info" v-if="item.contract.block === 2" :key="item.contract.contract_id"  v-for="item in productTicker" :class="item.contract.contract_id === productInfo.instrument_id ? 'active' : '' " @click="changeContract(item.contract.contract_id)">

              <st-row class="price" justify="between">
                <h6>{{item.contract.name}}</h6>
                <p :class="item.ticker.rise_fall_rate < 0 ? 'red' : 'green'">{{ item.ticker.last_price | splitFormat(item.priceUnit - 1)  }}<span></span></p>
                <!-- <p :class="item.ticker.rise_fall_rate < 0 ? 'red' : 'green'">{{ item.ticker.rise_fall_rate * 100|retainDecimals({decimal: 2}) }}%<span></span></p> -->
              </st-row>
            </div>
        </st-row>
        <st-row class="swap-title-top-contract">
          <st-row class="title" align="center">
            <h4>{{ $t('typeTitle.news') }}</h4>
          </st-row>
          <!-- isMian(item.contract.contract_id) -->
          <div class="info" v-if="item.contract.block === 3" :key="item.contract.contract_id"  v-for="item in productTicker" :class="item.contract.contract_id === productInfo.instrument_id ? 'active' : '' " @click="changeContract(item.contract.contract_id)">

            <st-row class="price" justify="between">
              <h6>{{item.contract.name}}</h6>
              <p :class="item.ticker.rise_fall_rate < 0 ? 'red' : 'green'">{{ item.ticker.last_price | splitFormat(item.priceUnit - 1)  }}<span></span></p>
              <!-- <p :class="item.ticker.rise_fall_rate < 0 ? 'red' : 'green'">{{ item.ticker.rise_fall_rate * 100|retainDecimals({decimal: 2}) }}%<span></span></p> -->
            </st-row>
          </div>
        </st-row>
      <!-- </st-row> -->
    </div>
    <div class="swap-title-top" v-else>
        <st-row class="swap-title-top-contract">
          <st-row class="title" align="center">
            <h4>模拟区</h4>
          </st-row>
          <!-- isMian(item.contract.contract_id) -->
          <div class="info" v-if="item.contract.block === 4" :key="item.contract.contract_id"  v-for="item in productTicker" :class="item.contract.contract_id === productInfo.instrument_id ? 'active' : '' " @click="changeContract(item.contract.contract_id)">

            <st-row class="price" justify="between">
              <h6>{{item.contract.name}}</h6>
              <p :class="item.ticker.rise_fall_rate < 0 ? 'red' : 'green'">{{ item.ticker.last_price | splitFormat(item.priceUnit - 1)  }}<span></span></p>
              <!-- <p :class="item.ticker.rise_fall_rate < 0 ? 'red' : 'green'">{{ item.ticker.rise_fall_rate * 100|retainDecimals({decimal: 2}) }}%<span></span></p> -->
            </st-row>
          </div>
      </st-row>
     </div>
    <st-row align="center" class='swap-title-bottom'>
         <div class="swap-title-name">
             <!-- {{ productInfo.name_zh }} -->
             <!-- {{ $t('typeTitle.sustainableContract', {type: 'XBTUSD'}) }} -->
                <div class="Sel-mask" v-if="contractShow" @click="contractShow = false"></div>
                 <!-- @click="contractShow = !contractShow" -->
                 <span class="Sel-name" >
                   <span>{{ productInfo[locale === 'zh-cn' ? 'name_zh' : 'name_en'] }}</span>
                 </span>
                 <!-- <div class="Sel-list" v-if="contractShow">
                   <st-row class="contract-title">
                     <a href="javascript:void(0)" class="active">{{ $t('typeTitle.main') }}</a>
                     <a href="javascript:void(0)">{{ $t('typeTitle.news') }}</a>
                   </st-row>
                    <div class="contract-content">
                      <div class="contract-content-over">
                        <table>
                        <tr>
                          <th>{{ $t('typeTitle.tradeType') }}</th>
                          <th>{{ $t('typeTitle.newsPrice') }}</th>
                          <th>{{ $t('typeTitle.change') }}</th>
                        </tr>
                        <tr :key="item.contract.contract_id"  v-for="item in productTicker" :class="item.contract.contract_id === productInfo.instrument_id ? 'active' : '' " @click="changeContract(item.contract.contract_id)">
                          <td>{{item.contract[locale === 'zh-cn' ? 'display_name' : 'display_name_en']}}</td>
                          <td :class="item.ticker.rise_fall_rate < 0 ? 'red' : 'green'">{{ item.ticker.last_price | splitFormat(com.pxUnit - 1)  }} <span>{{ item.contract.quote_coin }}</span></td>
                          <td :class="item.ticker.rise_fall_rate < 0 ? 'red' : 'green'">{{ item.ticker.rise_fall_rate * 100|retainDecimals({decimal: 2}) }}%</td>
                        </tr>
                      </table>
                      </div>
                    </div>
                 </div> -->
         </div>
         <st-row align="end" class='swap-title-right' justify="between">
             <st-row align="center" justify="between" class='swap-title-number'>
                     <div>
                         <h6>{{ $t('typeTitle.newsPrice') }}: <span :class="'applies ' + (ticker.rise_fall_rate < 0 ? 'red' : '')">{{ ticker.last_price | splitFormat(com.pxUnit - 1) }}</span></h6>
                         <h6>{{ $t('typeTitle.fairPrice') }}: <span>{{ ticker.fair_price | splitFormat(com.pxUnit) }} </span></h6>
                     </div>
                      <div>
                         <h6>{{ $t('typeTitle.applies') }}: <span :class="'applies ' + (ticker.rise_fall_rate < 0 ? 'red' : '')">{{ ticker.rise_fall_rate * 100|retainDecimals({decimal: 2}) }}%</span></h6>
                         <h6>{{ $t('typeTitle.appliesE') }}: <span :class="'applies ' + (ticker.rise_fall_rate < 0 ? 'red' : '')">{{ ticker.rise_fall_value | splitFormat(com.pxUnit)}}</span></h6>
                     </div>
                      <div>
                         <h6>{{ ticker.funding_rate * 100 | retainDecimals({decimal: 4}) }}%</h6>
                         <st-row align="center" class="wen">
                             <nuxt-link target="_blank" :to="'/information/funding?id=' + productInfo.instrument_id">
                             <p>{{ timeOne }} </p>
                             <st-row justify="center" >
                                 <div class="hint">
                                     <div class="triangle"></div>
                                     <p>{{ $t('typeTitle.nextExchange') }}</p>
                                     <P>{{ timeTwo }}</P>
                                         <p>{{ ticker.funding_rate < 0 ? $t('typeTitle.needValue', {value: Util.retainDecimals(-ticker.funding_rate * 100, {decimal: 4}) + '%'}) : $t('typeTitle.needValueTwo', {value: Util.retainDecimals(ticker.funding_rate * 100, {decimal: 4}) + '%'}) }}</p>
                                     <p>{{ $t('common.seeMore') }}</p>
                                 </div>
                            </st-row>
                            </nuxt-link>
                         </st-row>
                     </div>
                      <div>
                         <h6>{{ $t('typeTitle.deal') }}: {{ ticker.total_volume|retainDecimals({decimal: 0}) }} {{ $t('common.pieces') }}</h6>
                         <p>≈ {{ sumValue(ticker.total_volume)|retainDecimals({decimal: com.valueUnit}) }} {{com.marginUnit}}</p>
                     </div>
                       <div>
                         <h6>{{ $t('typeTitle.contractValue') }}: {{ticker.position_size}} {{ $t('common.pieces') }}</h6>
                         <p>≈ {{ sumValue(ticker.position_size)|retainDecimals({decimal: com.valueUnit}) }} {{com.marginUnit}}</p>
                     </div>
                     <div style="margin-right: 30px">
                        <!-- <p class="swap-title-lx">
                          <a target="_blank" :href="`https://k.chainfor.com/?k=249-${productInfo.symbol}`">{{ $t('typeTitle.lxcj') }}</a>
                          </p> -->
                      <div class='swap-title-dw' >
                        <a @click="calculatorShow = true"><span></span>{{ $t('typeTitle.calculator') }}</a>
                        <a @click="setUpShow = true"><span></span>{{ $t('typeTitle.contractSet') }}</a>

                <!-- @click="changCoinUnit"
                {{ $t('typeTitle.unit') }}<span>{{ coinUnit ? $t('common.pieces') : productInfo.base_coin }}</span> <i></i> -->
                      </div>

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
         <div class="swap-title-name">
             <!-- {{ productInfo.name_zh }} -->
             <!-- {{ $t('typeTitle.sustainableContract', {type: 'XBTUSD'}) }} -->
                <div class="Sel-mask" v-if="contractShow" @click="contractShow = false"></div>
                 <span class="Sel-name" @click="contractShow = !contractShow">
                   <span>{{ productInfo[locale === 'zh-cn' ? 'name_zh' : 'name_en'] }}</span>
                 </span>
                 <div class="Sel-list" v-if="contractShow">
                   <st-row class="contract-title">
                     <a @click="isMianOrNews = true" :class="{active: isMianOrNews}">{{ $t('typeTitle.main') }}</a>
                     <a @click="isMianOrNews = false" :class="{active: !isMianOrNews}">{{ $t('typeTitle.news') }}</a>
                   </st-row>
                    <div class="contract-content">
                      <div class="contract-content-over">
                        <table>
                        <tr>
                          <th>{{ $t('typeTitle.tradeType') }}</th>
                          <th>{{ $t('typeTitle.newsPrice') }}</th>
                          <th class="width-560">{{ $t('typeTitle.change') }}</th>
                        </tr>
                        <tr v-if="isMianOrNews ? !isMian(item.contract.contract_id) : isMian(item.contract.contract_id)" :key="item.contract.contract_id"  v-for="item in productTicker" :class="item.contract.contract_id === productInfo.instrument_id ? 'active' : '' " @click="changeContract(item.contract.contract_id)">
                          <td>{{item.contract[locale === 'zh-cn' ? 'display_name' : 'display_name_en']}}</td>
                          <td :class="item.ticker.rise_fall_rate < 0 ? 'red' : 'green'">{{ item.ticker.last_price | splitFormat(com.pxUnit - 1)  }} <span>{{ item.contract.quote_coin }}</span></td>
                          <td class="width-560" :class="item.ticker.rise_fall_rate < 0 ? 'red' : 'green'">{{ item.ticker.rise_fall_rate * 100|retainDecimals({decimal: 2}) }}%</td>
                        </tr>
                      </table>
                      </div>
                    </div>
                 </div>
         </div>
         <st-row align="end" class='swap-title-right' justify="between">
             <st-row align="center" justify="between" class='swap-title-number'>
                       <div>
                         <h6>{{ sumValue(ticker.position_size)|retainDecimals({decimal: com.valueUnit}) }} {{com.marginUnit}}</h6>
                         <p>{{ $t('typeTitle.contractValue') }}</p>
                     </div>
                      <div>
                         <h6>{{ ticker.total_volume|retainDecimals({decimal: 0}) }} {{ $t('common.pieces') }}</h6>
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
  props: ['simulation'],
  data() {
    return {
      timeOne: '',
      timeTwo: '',
      contractShow: false,
      Util: Util,
      productTicker: null,
      setUpShow: false,
      calculatorShow: false,
      int16: Math.pow(2, 15),
      isMianOrNews: true,
      MarginCoin: Formula.MarginCoin
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
    }
    // coinUnit() {
    //   return this.$store.state.market.coinUnit
    // }
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
      let len, info
      this.productTicker = []
      this.productList.forEach(item => {
        len = this.tickerList.length
        info = {}
        for (; len--;) {
          if (this.tickerList[len].contract_id === item.contract.contract_id) {
            info.ticker = this.tickerList[len]
            info.priceUnit = item.contract.price_unit.length - item.contract.price_unit.indexOf('.') - 1
            break
          }
        }
        info.contract = item.contract
        this.productTicker.push(info)
      })
    }
  },
  methods: {
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
      this.$emit('submitEntrustInit')
      for (let item in window.webSocket_base.successFn) {
        if (item !== 'UserProperty') {
          delete window.webSocket_base.successFn[item]
        }
      }
      this.$store.commit('market/SET_TICKER', { data: [] })
      this.$store.dispatch('setProductInfo', id)
      this.$store.dispatch('getMarketDate')
      if (this.token) {
        this.$store.commit('market/SET_CABINLIST', {data: []})
        this.$store.dispatch('getUserDate')
      }
      window.localStorage.setItem(this.simulation ? 'simulationId' : 'contractId', id)
      this.$router.push({
        query: {id}
      })
    },
    // 未平仓合约价值
    sumValue(vol) {
      return Formula.CalculateContractBasicValueTwo(vol, this.ticker.fair_price, Formula.contractObj.getContract(this.productInfo))
    },
    isMian(id) {
      return (this.int16 & id) === this.int16
    },
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
      this.timeOne = once.getHours() - time.getHours()
      this.timeTwo = this.singleFormat(once.getHours()) + ':00:00'
      if (this.timeOne < 0) {
        this.timeOne += 24
      }
      if (this.timeOne === 1) {
        let tm = parseInt((Date.parse(once) - Date.parse(time)) / 1000)
        this.timeOne = this.$t('typeTitle.fundsRateTwo', {
          time: this.singleFormat(parseInt(tm / 60)) + ':' + this.singleFormat(tm % 60)
        })
      } else {
        this.timeOne = this.$t('typeTitle.fundsRate', { time: this.timeOne })
      }
      this.timeTwo = this.$t('typeTitle.moneyTimeTwo', {
        m: time.getMonth() + 1,
        d: once.getDate(),
        h: this.timeTwo
      })
    },
    // 记录用户偏好
    setUserLike() {
      let contractId = Number(window.localStorage[this.simulation ? 'simulationId' : 'contractId'])
      let coinUnit = window.localStorage['coinUnit']
      let pnlPriceUnit = window.localStorage['pnlPriceUnit']
      if (!this.$route.query.id && contractId) {
        this.changeContract(contractId)
      }
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
    // 防止模拟交易显示合约交易数据
    //  this.$store.dispatch('setProductInfo', '')
    let contractId = Number(window.localStorage['simulationId'])
    if (!this.id && !contractId) {
      this.$store.dispatch('setProductInfo', '')
    }
    this.setUserLike()
  }
}
</script>

<style lang="less" scoped>
 @import "../../assets/css/base";
 .swap-title {
   min-width: 320px;
  //  margin-top: 10px;
   .swap-title-m {
     display: none;
   }
   .swap-title-top {
    //  height: 50px;
    //  overflow: auto;
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
            margin: 10px 10px 0 20px;
            // width: 14px;
            text-align: center;
            width: 50px;
            color: @L9;
          }
       }
       .info {
         padding: 0 6px;
         margin-top: 6px;
         margin-right: 6px;
         height: 30px;
        //  width: 162px;
         min-width: 154px;
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
             span{
               color: @demoRed;
                background: url("../../assets/img/down.png")
              }
            }
            &.green {
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
.swap-title-bottom {
    // margin-top: 10px;
    height: 70px;
    width: 100%;
    background-color: @L2;
    border-radius: 2px;
    .swap-title-name {
        margin-left: 33px;
        width: 270px;
        font-size: 20px;
        position: relative;
        // padding-right: 20px;
        color: @L9;
        cursor: pointer;
    }
    .swap-title-right {
        flex: 1;
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
                height: 20px;
                line-height: 20px;
                &:first-child span {
                    background-image: url("../../assets/img/icon-counter_nor.png");
                    background-size: 100% 100%;
                 }
                 &:last-child span{
                    background-image: url("../../assets/img/icon-Setup_nor.png");
                    background-size: 100% 100%;
                 }
                 &:hover {
                   color: @main-2a;
                   &:first-child span {
                    background-image: url("../../assets/img/icon-counter_sel.png");
                    background-size: 100% 100%;
                   }
                   &:last-child span {
                    background-image: url("../../assets/img/icon-Setup_sel.png");
                    background-size: 100% 100%;
                   }
                 }
                 &:last-child {
                   margin-left: 20px;
                 }
             }
        }
    }
    .swap-title-number {
      flex: 1;
      padding-right: 20px;
      .wen {
        a {
          border-bottom: 1px dotted @L8;
        }
        position: relative;
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
             .wen {
                //  position: relative;
                // width: 16px;
                // height: 16px;
                // margin-left: 6px;
                // //    display: inline-block;
                // cursor: pointer;
                // background-image: url('../../assets/img/icon-Q_nor.png');
                // &:hover {
                //     background-image: url('../../assets/img/icon-Q_sel.png');

                // }
             }
        }
    }
}

  .Sel-name{
        position: relative;
        display: inline-block;
        padding-right: 4px;
        cursor: pointer;
        // &::after{
        //     content: '';
        //     position: absolute;
        //     margin-left: 8px;
        //     top: 50%;
        //     right: -14px;
        //     margin-top: -2px;
        //     display: block;
        //     border-width:6px 6px 0;
        //     border-style:solid;
        //     border-color:#cad2dc transparent transparent;/*灰 透明 透明 */
        // }
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
              border-bottom: 1px solid #2c354d;
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
              &:hover,&.active {
                background: rgba(49,58,86,.3);
              }
              td.green {
                 color: @demoGreen;
              }
              td.red {
                color: @demoRed;
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
        margin-top: 10px;
        .swap-title-web {
          display: none;
        }
        .swap-title-m {
          display: block;
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
      }
      .width-560 {
        display: none;
      }
    }
</style>
