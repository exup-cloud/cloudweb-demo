<template>
  <div class='entrust-list'>
      <h3>{{ $t('newsDeal.entrustList') }}</h3>
       <div class="entrust-list-centent">
        <st-row class="entrust-list-title">
         <h6>{{ $t('newsDeal.price') }} ({{ productInfo.quote_coin }})</h6>
         <h6>{{ $t('newsDeal.number') }} ({{ coinUnit ? $t('common.pieces') : productInfo.base_coin }})</h6>
         <h6>{{ $t('newsDeal.sumNumber') }} ({{ coinUnit ? $t('common.pieces') : productInfo.base_coin }})</h6>
       </st-row>
       <ul class="red">
         <li :key="index" v-for="(item, index) in askOrder" :class="item.color">
           <st-row class="background red" :class="{yellow: item.oid && !item.isBlowing, pink: item.isBlowing && !item.blowQty, pinkme: item.blowQty}">
             <div class="item_hover"></div>
             <div class="item_bg" :style="{width: item.qty / askMax * 100 + '%'}"></div>
              <st-row class="price-vol">
                <p @click="setPrice(item.px)">{{ item.px | splitFormat(com.pxUnit - 1) }}</p>
                <p @click="setVol(item.qty)">{{ item.qty|addCommom(coinUnit ? com.qtyUnit : com.valueUnit) }}</p>
                <p @click="setVol(item.sumVol)">{{ item.sumVol|addCommom(coinUnit ? com.qtyUnit : com.valueUnit) }}</p>
                <div class="hint" >
                  <p v-if="item.oid && !item.isBlowing">{{ $t('newsDeal.ordereSellHover', {price: item.px, vol: item.oqty, unit: coinUnit ? $t('common.pieces') : productInfo.base_coin}) }}</p>
                  <p v-if="item.isBlowing && !item.blowQty">{{$t('newsDeal.blowHint', {price: item.px})}}</p>
                  <p v-if="item.blowQty">{{$t('newsDeal.blowHintMe', {price: item.px})}}</p>
                </div>
              </st-row>
             <div class="cancel" @click="cancelOrders(item.oid)">
                <div class="hint">
                 <p>{{ $t('newsDeal.cancelHover') }}</p>
               </div>
             </div>
           </st-row>
         </li>
       </ul>
       <st-row align="center" justify="center" class="entrust-list-price">
        <div>
         <h4 :class="isRose || 'red'">{{ ticker.last_px | splitFormat(com.pxUnit - 1) }} <span></span> </h4>
         <st-row align="center">
           <st-row class="price" align="center">
             <div class="hint-father hover">
               <nuxt-link target="_blank" :to="`/information/index/${productInfo.index_id}`"><p>{{ ticker.index_px | splitFormat(com.pxUnit) }}</p></nuxt-link>
                <div class="hint">
                  <p>{{ $t('newsDeal.indexPriceOne') }}</p>
                  <p>{{ $t('newsDeal.indexPriceTwo', {name: productInfo.name}) }}</p>
                  <p>{{ $t('common.seeMore') }}</p>
                </div>
             </div>
              <div>&nbsp; / &nbsp;</div>
             <div class="hint-father">
                <p><a target="_blank" style="font-weight: 700;text-decoration: underline;">{{ ticker.fair_px | splitFormat(com.pxUnit) }}</a></p>
                 <div class="hint">
                    <p>{{ $t('newsDeal.fairPriceOne') }}</p>
                    <p>{{ $t('common.seeMore') }}</p>
                    <!-- <p>{{ $t('newsDeal.fairPriceTwo') }}</p> -->
                </div>
             </div>
           </st-row>
           <div class="hint-father">
            <a target="_blank">
             <div class="warning">
             <span :class="{active: bl}" :key="index" v-for="(bl, index) in getPnls()"></span>
             <!-- <span class="active"></span>
             <span class="active"></span>
             <span class="active"></span>
             <span class="active"></span> -->
             </div>
             </a>
             <div class="hint">
                     <p>{{ $t('newsDeal.ADLHoverOne') }}</p>
                    <p>{{ $t('newsDeal.ADLHoverTwo') }}</p>
                    <p>{{ $t('common.seeMore') }}</p>
                    <!-- <p>{{ $t('newsDeal.fairPriceTwo') }}</p> -->
                </div>
          </div>
        </st-row>
        </div>
       </st-row>
       <ul>
         <li :key="index" v-for="(item, index) in bidOrder" :class="item.color">
           <st-row class="background" :class="{yellow: item.oid}">
             <div class="item_hover"></div>
             <div class="item_bg" :style="{width:  item.qty / bidMax * 100 + '%'}"></div>
             <st-row class="price-vol">
                <p @click="setPrice(item.px)">{{ item.px|splitFormat(com.pxUnit - 1) }}</p>
                <p @click="setVol(item.qty)">{{ item.qty|addCommom(coinUnit ? com.qtyUnit : com.valueUnit) }}</p>
                <p @click="setVol(item.sumVol)">{{ item.sumVol|addCommom(coinUnit ? com.qtyUnit : com.valueUnit) }}</p>
                <div class="hint"><p> {{ $t('newsDeal.orderBuyHover', {price: item.px, vol: item.oqty, unit: coinUnit ? $t('common.pieces') : productInfo.base_coin}) }}</p></div>
             </st-row>
              <div class="cancel" @click="cancelOrders(item.oid)">
                <div class="hint">
                 <p>{{ $t('newsDeal.cancelHover') }}</p>
               </div>
             </div>
           </st-row>
         </li>
       </ul>
       </div>
  </div>
</template>
<script>
  import Formula from '../../assets/js/formula/index.js'
  import Utils from '../../assets/js/util.js'
  export default {
    name: 'entrust-list',
    data() {
      return {
        isRose: true,
        bidMax: 0,
        askMax: 0,
        bidOrder: [],
        askOrder: [],
        bidOld: [],
        askOld: [],
        askTime: null,
        bidTime: null
      }
    },
    computed: {
      locale() {
        return this.$store.state.auth.locale
      },
      coinUnit() {
        return this.$store.state.market.coinUnit
      },
      pnls() {
        return this.$store.state.market.pnls
      },
      com() {
        return this.$store.state.com
      },
      cabinList() {
        return this.$store.state.market.cabinList
      },
      curryEntrustList() {
        return this.$store.state.market.curryEntrustList ? this.$store.state.market.curryEntrustList : []
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      ticker() {
        return this.$store.state.market.ticker
      },
      asks() {
        return this.$store.state.market[this.productInfo.instrument_id + '_Order'] ? (this.$store.state.market[this.productInfo.instrument_id + '_Order'].asks || []) : []
      },
      bids() {
        return this.$store.state.market[this.productInfo.instrument_id + '_Order'] ? (this.$store.state.market[this.productInfo.instrument_id + '_Order'].bids || []) : []
      }
    },
    watch: {
      ticker(value, oldValue) {
        if (value.last_px && oldValue.last_px && (value.last_px !== oldValue.last_px)) {
          this.isRose = Number(value.last_px) > Number(oldValue.last_px)
        }
      },
      curryEntrustList(value, oldValue) {
        // this.getDate()
        // 如果用户委托没有变化就不更新深度
        let value_len = value.length
        let oldValue_len = oldValue.length
        if (value_len === 0 && oldValue_len === 0) {
          return false
        }
        let bl = false
        if (value_len === oldValue_len) {
          bl = true
          for (; value_len--;) {
            if (value[value_len].oid !== oldValue[value_len].oid) {
              bl = false
              break
            }
          }
        }
        if (bl) {
          return false
        }
        this.getBit()
        this.getAsk()
      },
      bids() {
        // this.getDate()
        clearTimeout(this.bidTime)
        this.bidTime = setTimeout(() => {
          this.getBit(true)
        }, 100)
      },
      asks() {
        clearTimeout(this.askTime)
        this.askTime = setTimeout(() => {
          this.getAsk(true)
        }, 100)
      },
      coinUnit() {
        this.getBit()
        this.getAsk()
        // this.getDate()
      }
    },
    methods: {
      getAsk(bl) {
        let obj = this.getShowData(this.asks)
        // bl 为true表示深度推送过来的数据变化了
        if (bl) {
          this.compare(obj.newList, this.askOld)
        }
        this.askOld = JSON.parse(JSON.stringify(obj.newList))
        this.askMax = obj.max
        this.askOrder = obj.newList.reverse()
      },
      getBit(bl) {
        let obj = this.getShowData(this.bids, true)
        if (bl) {
          this.compare(obj.newList, this.bidOld)
        }
        this.bidOld = JSON.parse(JSON.stringify(obj.newList))
        this.bidMax = obj.max
        this.bidOrder = obj.newList
      },
      // 对比价格和量的变化
      compare(list, oldList) {
        let list_len = list.length
        let odlList_len = oldList.length
        let i, bl, item, info
        if (!list_len || !odlList_len || list_len !== odlList_len) {
          return false
        }
        for (; list_len--;) {
          i = odlList_len
          bl = false
          item = list[list_len]
          for (; i--;) {
            info = oldList[i]
            if (Number(item.px) === Number(info.px)) {
              if (Number(item.qty) !== Number(info.qty)) {
                if (Number(item.qty) > Number(info.qty)) {
                  list[list_len].color = oldList[i].color === 'am_green_1' ? 'am_green_2' : 'am_green_1'
                } else {
                  list[list_len].color = oldList[i].color === 'am_red_1' ? 'am_red_2' : 'am_red_1'
                }
              }
              bl = true
              odlList_len = i
              break
            }
          }
          if (!bl) {
            if (Number(oldList[list_len].px) > Number(item.px)) {
              list[list_len].color = oldList[list_len].color === 'am_red_1' ? 'am_red_2' : 'am_red_1'
            } else {
              list[list_len].color = oldList[list_len].color === 'am_green_1' ? 'am_green_2' : 'am_green_1'
            }
          }
        }
      },
      // 获取展示数据
      getShowData(list, way) {
        // 叠加总量
        let total = 0
        // 需要多少条
        let len = Math.min(list.length, 7)
        // 7条数据中量最大的
        let max = 0
        // 转换后的集合
        let newList = []
        // 当前索引
        let index = 0
        // 当前委托长度
        let curryEntrustLen = this.curryEntrustList.length
        let obj, item, lenTwo
        for (;index < len; index++) {
          // obj = {...list[index]}
          obj = {
            'key': list[index][0],
            'px': list[index][1],
            'qty': list[index][2],
            'type': list[index][3]
          }
          obj.qty = Number(this.coinUnit ? obj.qty : this.changUnitGetVol(obj.qty, obj.qx))
          max < Number(obj.qty) && (max = Number(obj.qty))
          total = Utils.precision.plus(total, Number(obj.qty))
          obj['sumVol'] = total
          lenTwo = curryEntrustLen
          // 爆仓单，不包含自己的
          if (obj.type) {
            obj.isBlowing = 1
          }
          if (lenTwo) {
            for (;lenTwo--;) {
              item = this.curryEntrustList[lenTwo]
              // && [3, 4].indexOf(item.category)
              // if (this.isBlowing(item.category, item.make_fee) || this.getType(item.category) === 2) {
              //   obj.isBlowing = 1
              // }
              if (obj.px === item.px && item.origin !== 'SYSTEM') {
                if (obj.oid) {
                  obj.oid.push(item.oid)
                } else {
                  obj.oid = [item.oid]
                  obj.oqty = 0
                }
                let qty = item.qty - item.cum_qty
                obj.oqty += Number(this.coinUnit ? qty : this.changUnitGetVol(qty, obj.px))

                //  爆仓单，且在这个价格有自己的挂单
                if (obj.type) {
                  obj.isBlowing = 1
                  obj.blowQty = item.qty
                }
              }

              // 爆仓单，且有自己的爆仓
              if (obj.px === item.px && item.origin === 'SYSTEM') {
                //  是否是爆仓单
                if (this.isBlowing(item.category, item.make_fee) || this.getType(item.category) === 2) {
                  obj.isBlowing = 1
                }
              }
            }
          }
          newList.push(obj)
        }
        return {newList, max}
      },
      // 是否是爆仓
      isBlowing(category, make_fee) {
        let n = Math.pow(2, 7)
        let m = Math.pow(2, 8)
        let l = Math.pow(2, 9)
        return ((n & category) === n) || ((m & category) === m) || (((l & category) === l) && !Number(make_fee))
      },
      // 获取订单的基本类型
      getType(category) {
        return parseInt(category.toString(2).slice(-5), 2)
      },
      // 张和base_coin单位的切换
      changUnitGetVol(vol, price) {
        return Formula.CalculateContractBasicValue(vol, price, Formula.contractObj.getContract(this.productInfo))
      },
      cancelOrders(oid) {
        let nonce = parseInt(Date.now() / 1000)
        this.swapsApi.cancelOrders({orders: [{instrument_id: this.productInfo.instrument_id, orders: oid}], nonce})
        .then(res => {
          if (res.errno === 'OK') {
            this.$alert('s', this.$t('common.cancelSuccess'))
          }
        })
      },
      setPrice(price) {
        this.$store.commit('market/SET_MARKET', {
          key: 'price',
          data: price
        })
        this.$store.commit('market/SET_MARKET', {
          key: 'priceTwo',
          data: price
        })
      },
      setVol(vol) {
        this.$store.commit('market/SET_MARKET', {
          key: 'vol',
          data: this.coinUnit ? vol : Utils.retainDecimals(vol, {decimal: this.com.valueUnit})
        })
      },
      // 获取合约对象
      getContractInfo() {
        return {
          FeeConfig: {TakerFee: Number(this.productInfo.taker_fee_ratio)},
          Contract: Formula.contractObj.getContract(this.productInfo),
          RiskLimit: Formula.contractObj.getRiskLimit(this.productInfo)
        }
      },
      // 获取单一方向的仓位
      positionFn(longOrSort) {
        let position
        position = this.cabinList.filter(item => {
          return item.side === (longOrSort ? 1 : 2) // 仓位类型,1:开多,2:开空
        })[0]
        if (position) {
          // position = {HoldVol: position.cur_qty, HoldAvgPrice: position.avg_open_px, position_id: position.pid, FreezeVol: position.freeze_qty, IM: Number(position.im)}
          position = {HoldVol: position.cur_qty, HoldAvgPrice: position.avg_cost_px, position_id: position.pid, FreezeVol: position.freeze_qty, IM: Number(position.im)}
        }
        return position
      },
      // 获取亮灯
      getPnls() {
        let Pnls = Array(5)
        if (!this.cabinList.length || !this.pnls) {
          return Pnls
        }
        let longPosition = this.positionFn(true)
        let sortPosition = this.positionFn(false)
        let longValue = 0
        if (longPosition) {
          longValue = this.getPnlsPositions(true, longPosition) || 0
        }
        let sortValue = 0
        if (sortPosition) {
          sortValue = this.getPnlsPositions(false, sortPosition) || 0
        }
        if (!longValue && !sortValue) {
          return Pnls
        }
        let len = 0
        let i = 0
        len = longValue > sortValue ? longValue : sortValue
        // if (longValue > sortValue) {
        //   len = Formula.CalculateQuantile(longValue, this.pnls.long_pnls.length)
        // } else {
        //   len = Formula.CalculateQuantile(sortValue, this.pnls.short_pnls.length)
        // }
        if (len < 0) {
          len = 0
        } else if (len > 100) {
          len = 100
        }
        for (; len;) {
          len -= 20
          Pnls[i++] = true
          if (len <= 0) {
            break
          }
        }
        return Pnls
      },
          // 获取开多或者开空方向的Pnls
      getPnlsPositions(bl, position) {
        let long = Formula.CalculatePNL(position, Number(this.com.haveAssert), Number(this.ticker.fair_px), this.getContractInfo(), bl)
        let list = this.pnls[bl ? 'long_pnls' : 'short_pnls']
        let len = list.length
        let info, value
        for (; len--;) {
          info = list[len]
          if (long >= Number(info.min_pnl) && long < Number(info.max_pnl)) {
            value = info.quan_tile
            break
          }
        }
        return value
      }
      // getOrder(list, len) {
      //   let total = list[index].number
      //   for (;index--;) {
      //     total += list[index].number
      //   }
      //   return total
      // }
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.entrust-list{
  margin-right: 10px;
  width: 256px;
  height: 480px;
  background-color: @L2;
  border-radius: 2px;
  h3 {
    padding-left: 12px;
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    font-weight: 300;
    background-color:  rgba(33,42,48, 0.2);
    color: @L9;
  }
  .entrust-list-centent {
    .entrust-list-title {
      padding: 8px;
      h6 {
       width: 80px;
       font-size: 12px;
       color:  @L8;
        &:nth-child(n+2) {
         text-align: right;
       }
      }
    }
  }
  ul {
    margin-bottom: 0px;
    min-height: 161px;
    p {
          font-weight: 500;
    }
    &.red li {
      border-right: 4px solid rgba(184, 58, 58, .1);
      .price-vol {
        &>p:first-child {
          margin-left: 8px;
          color: @demoRed;
        }
      }
    }
    li {
      padding: 2px 0;
      border-right: 4px solid @L3;
      cursor: pointer;
       &:hover {
         border-color: @L3;
        .background {
         .item_bg {
           display: none;
         }
         .item_hover {
          background-color: @L3;
        }
       }
      }
      &.am_red_1,&.am_red_2 {
        .item_hover {
          animation: changeColor_red .5s linear 0s 1;
        }
      }
      &.am_green_1,&.am_green_2 {
       .item_hover {
          animation: changeColor_green .5s linear 0s 1;
        }
      }
      .price-vol {
         &>p {
             position: relative;
             margin-bottom: 0px;
             height: 19px;
             width: 80px;
             line-height: 19px;
             font-size: 12px;
             color: @L9;
             &:nth-child(n+2) {
               text-align: right;
             }
             &:first-child {
               margin-left: 8px;
               color: @demoGreen;
             }
            }
      }
      .yellow {
        .price-vol>p {
           &:nth-child(n+2) {
            color: #d9a959;
          }
        }
        .price-vol:hover {
           .hint {
             display: block;
            //  color: @L9;
             font-size: 12px;
           }
         }
        &:hover {
          .price-vol p:nth-child(2) {
            width: 66px;
          }
          .cancel {
            display: block;
            // position: relative;
            &:hover .hint {
              display: block;
              font-size: 12px;
            }
          }
        }
      }

      .pink {
        .price-vol>p {
           &:nth-child(n+2) {
            color: #E250B1;
          }
        }
        .price-vol:hover {
           .hint {
             display: block;
            //  color: @L9;
             font-size: 12px;
           }
         }
        &:hover {
          .price-vol p:nth-child(2) {
            width: 66px;
          }
          // .cancel {
          //   display: block;
          //   // position: relative;
          //   &:hover .hint {
          //     display: block;
          //     font-size: 12px;
          //   }
          // }
        }
      }
      .pinkme {
        .price-vol>p {
           &:nth-child(n+2) {
            color: #E250B1;
          }
        }
        .price-vol:hover {
           .hint {
             display: block;
            //  color: @L9;
             font-size: 12px;
             width: 220px;
             p {
               white-space: normal;
               height: auto!important;
             }
           }
         }
        &:hover {
          .price-vol p:nth-child(2) {
            width: 66px;
          }
          .cancel {
            display: block;
            // position: relative;
            &:hover .hint {
              display: block;
              font-size: 12px;
            }
          }
        }
      }

      .background {
        .cancel {
          position: relative;
          display: none;
          flex: 1;
          height: 19px;
          background: url('../../assets/img/icon-close_nor.png') no-repeat center center;
          &:hover {
            background-image: url('../../assets/img/icon-close_sel.png');
          }
        }
      }
    }
  }
  .entrust-list-price {
    margin: 10px 8px;
    height: 48px;
    background-color: @L3;
    h4 {
      font-size: 16px;
      color: @demoGreen;
      margin-bottom: 0px;
      text-align: center;
      font-weight: 600;
      margin-bottom: -6px;
      &.red {
        color: @demoRed;
      }
      span {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: text-top;
        background: url("../../assets/img/up.png") left center no-repeat;
      }
      &.red span{
        background: url("../../assets/img/down.png") left center no-repeat;
      }
    }
    p {
      margin-bottom: 0px;
      font-size: 12px;
      color: @L9;
    }
    .warning {
      margin: 2px 0 0 10px;
      span{
        display: inline-block;
        margin-right: 3px;
        width: 4px;
        height: 10px;
        background-color: @L4;
        border-radius: 1px;
        &.active {
          &:nth-child(1) {
            background-color: #319e5c;
          }
           &:nth-child(2) {
            background-color: #319E39;
          }
           &:nth-child(3) {
            background-color: #5b9e31;
          }
           &:nth-child(4) {
            background-color: #adb941;
          }
           &:nth-child(5) {
            background-color: #bb763c;
          }
        }
      }
    }
  }
  .background {
    position: relative;
    .item_bg {
      position: absolute;
      right: 0;
      height: 19px;
      width: 100%;
      background-color: rgba(49, 158, 92, .1);
    }
    &.red {
      .item_bg {
        background-color: rgba(184, 58, 58, .1);
      }
    }
    .item_hover {
      position: absolute;
      right: 0;
      height: 19px;
      width: 100%;
    }
  }
}
.price {
  div,a {
    color: @L9;
  }
}
@keyframes changeColor_red {
  0% {
    background-color: rgba(184, 58, 58, 0);
  }
  50% {
    background-color: rgba(184, 58, 58, .3);
  }
  100% {
    background-color: rgba(184, 58, 58, 0);
  }
}
@keyframes changeColor_green {
  0% {
    background-color: rgba(49, 158, 92, 0);
  }
  50% {
    background-color: rgba(49, 158, 92, .3);
  }
  100% {
    background-color: rgba(49, 158, 92, 0);
  }
}
</style>
