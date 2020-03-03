<template>
    <div class='information'>
       <st-row class="information-market-title" justify="between" align="center">
          <h3 >{{ $t('information.information') }}</h3>
       <a class="little" target="_blank" href="https://support.tigermex.com/hc/zh-cn/categories/360002440291">{{ $t('information.little') }}<i></i></a>
       </st-row>
       <ul>
         <li>
           <st-row justify="between" align="center">
                <nuxt-link target="_blank" :to="`/information/index/${productInfo.index_id}`">{{ $t('information.indexSource') }}</nuxt-link>
                <p :title="memberString">{{ memberString }}</p>
           </st-row>
         </li>
         <li>
           <st-row justify="between" align="center">
             <p >
                {{ $t('information.constructorSize') }}
             </p>
             <p>
               <!-- face_value 合约大小 -->
               {{ productInfo.face_value + productInfo.price_coin }}
             </p>
           </st-row>
           <!-- <nuxt-link target="_blank" :to="`/information/index/${productInfo.index_id}`">{{ $t('information.trade') }}</nuxt-link> -->
        </li>
         <li>
           <st-row justify="between" align="center">
              <nuxt-link target="_blank" :to="'/information/funding?id=' + productInfo.instrument_id">
                <div class="capital-rate">
                    <span>{{ timeOne }}</span>
                    <st-row justify="center" >
                      <div class="capital-rate-hint hint">
                        <p>{{ $t('typeTitle.nextExchange') }}</p>
                        <p>{{ timeTwo }}</p>
                        <p>{{ ticker.funding_rate < 0 ? $t('typeTitle.needValue', {value: Util.retainDecimals(-ticker.funding_rate * 100, {decimal: 4}) + '%'}) : $t('typeTitle.needValueTwo', {value: Util.retainDecimals(ticker.funding_rate * 100, {decimal: 4}) + '%'}) }}</p>
                        <p>{{ $t('typeTitle.minAndMaxRate', {max: Util.retainDecimals(Number(productInfo.max_funding_rate) * 100, {decimal: 4}) + '%', min: Util.retainDecimals(Number(productInfo.min_funding_rate) * 100, {decimal: 4}) + '%'})}}</p>
                        <span class="the-more">{{ $t('common.seeMore') }}</span>
                      </div>
                    </st-row>
                </div>
              </nuxt-link>
             <p>
               {{ ticker.funding_rate * 100 | retainDecimals({decimal: 4}) }}%
             </p>
           </st-row>
           <!-- <nuxt-link target="_blank" :to="`/information/index/${productInfo.index_id}`">{{ $t('information.trade') }}</nuxt-link> -->
        </li>
        <li>
           <st-row justify="between" align="center">
             <p>
                {{ $t('information.maxLeverage') }}
             </p>
             <p>
               {{ productInfo.max_leverage }}X
             </p>
           </st-row>
           <!-- <nuxt-link target="_blank" :to="`/information/index/${productInfo.index_id}`">{{ $t('information.trade') }}</nuxt-link> -->
        </li>
        <!-- <li>
          <st-row justify="between" align="center">
            <nuxt-link target="_blank" :to="`/information/explosion?id=${productInfo.instrument_id}`">{{ $t('informationPage.explosion.title') }}</nuxt-link>
            <p :title="memberString"><nuxt-link target="_blank" :to="`/information/explosion?id=${productInfo.instrument_id}`">{{ $t('informationPage.explosion.view') }}</nuxt-link></p>
          </st-row>
        </li> -->
       </ul>
     </div>
</template>
<script>
  import Util from '../../assets/js/util.js'
  export default {
    data() {
      return {
        // 指数集合
        indexList: [],
        // 当前指数数据源
        memberString: '',
        timeOne: '',
        timeTwo: '',
        Util: Util
      }
    },
    computed: {
      ticker() {
        return this.$store.state.market.ticker
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      locale() {
        return this.$store.state.auth.locale
      }
    },
    watch: {
      productInfo() {
        this.getInfo()
      },
      ticker() {
        let time = new Date() // new Date(this.ticker.timestamp * 1000)// this.getTimeZone(this.ticker.next_funding_at)
        this.getTime(time)
      },
      locale() {
        let time = new Date() // new Date(this.ticker.timestamp * 1000)// this.getTimeZone(this.ticker.next_funding_at)
        this.getTime(time)
      }
    },
    methods: {
      getIndex() {
        this.swapsApi.getIndexList()
        .then(res => {
          this.indexList = res.data
          this.getInfo()
        })
      },
      getInfo() {
        let info = this.indexList.filter(item => {
          return item.index_id === this.productInfo.index_id
        })[0] || {}
        if (info.members) {
          let member = info.members.filter(item => info.base_coin.indexOf(item.coin_code) > -1)[0]
          let memberList = member ? member.market : []
          this.memberString = memberList.map(item => {
            return item.market_name
          }).join(',')
        }
      },
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
      getTimeZone(time) {
        let GTM_8 = 480  // -480
        let date = new Date(time)
        let subMin = date.getTimezoneOffset() + GTM_8
        date.setMinutes(date.getMinutes() + subMin)
        return date
      },
      singleFormat(str) {
        return str.toString().length === 1 ? ('0' + str) : str
      }
    },
    mounted() {
      this.getIndex()
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
  .information {
      // margin: 0 10px;
      width: 280px;
      min-height: 264px;
      margin-top: 6px;
      height: 264px;
      background-color: @L2;
      border-radius: 2px;
      .information-market-title {
            padding: 0 12px;
            height: 42px;
            font-weight: 300;
            background-color:  rgba(33,42,48, 0.2);
            h3 {
               margin-bottom: 0px;
               color: @L9;
               font-size: 16px;
            }
            a {
              &.little {
                i {
                  margin-left: 4px;
                  width: 10px;
                  height: 11px;
                  display: inline-block;
                  background-image: url("../../assets/img/more_nor.svg");
                  background-size: 100% 100%;
                }
                color: @main-2;
                &:hover {
                  color: @mainHover;
                  i {
                    background-image: url("../../assets/img/more_sel.svg");
                    background-size: 100% 100%;
                  }
                }
              }
            }
        }
        ul li {
          padding-left: 18px;
          padding-right: 10px;
          padding-top: 10px;
          height: 30px;
          p {
            color: @L9;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            max-width: 180px;
             &:first-child {
              color: @L8;
            }
          }
          a {
            // padding-left: 10px;
            position: relative;
            font-size: 14px;
            // line-height: 30px;
            color: @L8;
            border-bottom: 1px dotted @L8;
            &:hover {
              color: @mainHover;
            }
            // &:after {
            //   content: '';
            //   display: block;
            //   position: absolute;
            //   left: 0px;
            //   top: 50%;
            //   margin-top: -2px;
            //   width: 4px;
            //   height: 4px;
            //   background-color: @L8;
            //   border-radius: 50%;
            // }
          }
          .capital-rate {
            position: relative;
            // >a {
            //   &:hover {
            //     +.capital-rate-hint {
            //       display: block;
            //     }
            //   }
            // }
            &:hover {
              .capital-rate-hint {
                display: block;
              }
            }
            .capital-rate-hint {
              // display: none;
              position: absolute;
              // background: red;
              top: 25px;
              left: 50%;
              margin-left: -56px;
              p {
                max-width: 100%;
              }
              &::after {
                content: "";
                width: 10px;
                height: 10px;
                background: @hintBack;
                position: absolute;
                top: -5px;
                left: 50%;
                margin-left: -100px;
                transform: rotate(45deg);
                border-left: 1px solid @main-2a;
                border-top: 1px solid @main-2a;
              }
              &::before {
                content: "";
                width: 100%;
                height: 10px;
                background: none;
                position: absolute;
                left: 0px;
                top: -8px;
              }
              .the-more {
                color: @main-2;
                border-bottom: 1px dotted @main-2;
                &:hover {
                  color: @mainHover;
                  border-bottom: 1px dotted @mainHover;
                }
              }
            }
          }
        }
    }
    @media screen and (max-width:750px) and (min-width: 560px){
      .information {
        height: 394px;
      }
    }
</style>
