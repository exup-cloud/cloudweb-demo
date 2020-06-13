
<template>
  <st-row class="calculator-window">
    <ul class="silder">
      <li @click="type = 1" :class="{active: type === 1}">{{ $t('typeTitle.calculatorPage.plCalculator') }}</li>
      <li @click="type = 2" :class="{active: type === 2}">{{ $t('typeTitle.calculatorPage.flatPrice') }}</li>
      <li @click="type = 3" :class="{active: type === 3}">{{ $t('typeTitle.calculatorPage.earningsRate') }}</li>
    </ul>
    <div>
    <st-row class="calculator-window-centent">
      <div class="calculator-window-centent-left">
        <st-row class="item">
          <p>{{ $t('typeTitle.calculatorPage.way') }}</p>
          <div class="item-tab">
            <a @click="options = true" :class="{active: options}" >{{ $t('typeTitle.calculatorPage.long') }}</a>
            <a  @click="options = false" :class="{active: !options}" >{{ $t('typeTitle.calculatorPage.sort') }}</a>
          </div>
        </st-row>
        <st-row v-if="type === 3" class="item">
          <p>{{ $t('typeTitle.calculatorPage.calculatorType') }}</p>
          <div class="item-tab">
            <a @click="calculatorType = true" :class="{active: calculatorType}" >{{ $t('typeTitle.calculatorPage.earningsValue') }}</a>
            <a @click="calculatorType = false" :class="{active: !calculatorType}" >{{ $t('typeTitle.calculatorPage.earningsRate') }}</a>
          </div>
        </st-row>
        <st-row class="item">
          <p>{{ $t('typeTitle.calculatorPage.leverage') }}</p>
          <div class="item-sel">
              <div class="leverage-sel">
              <div class="Sel-mask" v-if="leverageShow" @click="leverageShow = false"></div>
                 <span class="Sel-name"  @click="leverageShow = !leverageShow">
                   <span>{{ leverageInfo.name}}</span>
                 </span>
                 <ul class="Sel-list" v-if="leverageShow">
                    <li v-if="item.name !== 'allCabin'" :key="item.name" v-for="item in leverageList" :class="item.name === leverageInfo.name ? 'active' : '' " @click="changeLeverage(item.name)">
                       {{ item.name}}
                    </li>
                 </ul>
            </div>
          </div>
        </st-row>
        <st-row class="item">
          <p>{{ $t('typeTitle.calculatorPage.positions') }}</p>
          <div class="item-input">
            <input  @input="postionsChange" v-model="postions" type="text">
            <span>{{ $t('common.pieces') }}</span>
          </div>
        </st-row>
        <st-row class="item">
          <p>{{ $t('typeTitle.calculatorPage.openPrice') }}</p>
          <div class="item-input">
            <input @input="openPriceChange" v-model="openPrice" type="text">
            <span>{{ productInfo.quote_coin }}</span>
          </div>
        </st-row>
        <st-row v-if="type === 1" class="item">
          <p>{{ $t('typeTitle.calculatorPage.closePrice') }}</p>
          <div  class="item-input">
            <input @input="closePriceChange" v-model="closePrice" type="text">
            <span>{{ productInfo.quote_coin }}</span>
          </div>
        </st-row>
        <st-row v-if="type === 3" class="item">
          <p>{{ calculatorType ? $t('typeTitle.calculatorPage.earningsValue') : $t('typeTitle.calculatorPage.earningsRate') }}</p>
          <div class="item-input">
            <input @input="earningsChange" v-model="earnings" type="text">
            <span>{{ calculatorType ? com.marginUnit : '%'}}</span>
          </div>
        </st-row>
        <a class="btn" @click="calculator" target="_blank">{{ $t('typeTitle.calculatorPage.openCalculator') }}</a>
      </div >
      <div class="calculator-window-centent-rigth">
        <h6>{{ $t('typeTitle.calculatorPage.calculatorValue') }}</h6>
        <div v-if="type === 1">
          <div class="result">
            <p>{{ $t('typeTitle.calculatorPage.im') }}</p>
            <p>{{ profitAndLoss.im | addCommom(com.valueUnit) }} {{ com.marginUnit }}</p>
          </div>
          <div class="result" >
            <p>{{ $t('typeTitle.calculatorPage.positionValue') }}</p>
            <p>{{ profitAndLoss.value | addCommom(com.valueUnit) }} {{ com.marginUnit }}</p>
          </div>
          <div class="result">
            <p>{{ $t('typeTitle.calculatorPage.pl') }}</p>
            <p>{{ profitAndLoss.pl | addCommom(com.valueUnit) }} {{ com.marginUnit }}</p>
          </div>
         <div class="result" >
            <p>{{ $t('typeTitle.calculatorPage.rate') }}</p>
            <p>{{ profitAndLoss.rate | addCommom(2) }}%</p>
          </div>
        </div>
        <div v-else-if="type === 2">
           <div class="result" >
            <p>{{ $t('typeTitle.calculatorPage.flatPriceTwo') }}</p>
            <p>{{ flatPrice.flatPrice | addCommom(com.pxUnit - 1)}} {{ productInfo.quote_coin }}</p>
          </div>
           <div class="result">
            <p>{{ $t('typeTitle.calculatorPage.positionValue') }}</p>
            <p>{{ flatPrice.value | addCommom(com.valueUnit) }} {{ productInfo.quote_coin }}</p>
          </div>
           <div class="result" >
            <p>{{ $t('typeTitle.calculatorPage.imRate') }}</p>
            <p>{{ flatPrice.im }}</p>
          </div>
           <div class="result" >
            <p>{{ $t('typeTitle.calculatorPage.mmRate') }}</p>
            <p>{{ flatPrice.mm }}</p>
          <!-- </st-row> -->
           </div>
        </div>
         <div v-else-if="type === 3">
          <div class="result">
            <p>{{ $t('typeTitle.calculatorPage.im') }}</p>
            <p>{{ targetClose.im | addCommom(com.valueUnit) }} {{ com.marginUnit }}</p>
          </div>
          <div class="result" >
            <p>{{ $t('typeTitle.calculatorPage.targetClosePrice') }}</p>
            <p v-if="targetClose.price">{{ targetClose.price | addCommom(com.pxUnit - 1) }} {{ productInfo.quote_coin }}</p>
            <p v-else>
              --
            </p>
          </div>
          <div class="result" >
            <p>{{ calculatorType ? $t('typeTitle.calculatorPage.Rate') : $t('typeTitle.calculatorPage.Value')}}</p>
            <p v-if="calculatorType">{{ targetClose.valueOrRote | addCommom(2) +'%' }}</p>
            <p v-else>{{ targetClose.valueOrRote | addCommom(com.valueUnit) }}{{ com.marginUnit }}</p>
          </div>
         </div>
      </div>
    </st-row>
    <st-row class="calculator-window-centent-bottom" align="center"><p>{{ $t('typeTitle.calculatorPage.message') }}</p></st-row>
    </div>
  </st-row>
</template>

<script>
  import Utils from '../../../assets/js/util.js'
  import Formula from '../../../assets/js/formula/index.js'
  export default {
    name: 'calculator-window',
    props: ['close'],
    data() {
      return {
        // 计算方案 1： 盈亏计算  2. 强平价格 3.目标价收益率
        type: 1,
        // true 为开多
        options: true,
        // true 为目标收益额
        calculatorType: true,
        leverageShow: false,
        leverageInfo: {},
        // 开仓价格
        openPrice: '',
        // 平仓价格
        closePrice: '',
        // 仓位
        postions: '',
        // 收益额或者收益率
        earnings: '',
        // 盈亏计算
        profitAndLoss: {
          im: 0, // 占用保证金
          value: 0, // 仓位价值
          pl: 0, // 盈亏
          rate: 0 // 收益率
        },
        // 强平价格
        flatPrice: {
          flatPrice: 0, // 强平价格
          value: 0, // 仓位价值
          im: 0, // 实际起始保证金率
          mm: 0   // 实际维持保证金率
        },
        // 目标价收益率
        targetClose: {
          price: 0,
          im: 0,
          valueOrRote: 0
        }
      }
    },
    computed: {
      com() {
        return this.$store.state.com
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      leverageList() {
        return this.$store.state.com.leverageList
      }
    },
    watch: {
      calculatorType(newVol, oldVol) {
        if (newVol !== oldVol) {
          this.targetClose.price = '--'
          this.targetClose.valueOrRote = '--'
        }
      },
      options(newVol, oldVol) {
        if (newVol !== oldVol) {
          this.profitAndLoss.pl = '--'
          this.profitAndLoss.rate = '--'
          this.flatPrice.flatPrice = '--'
          this.targetClose.price = '--'
        }
      }
    },
    methods: {
      // 算仓位价值
      CalculateContractValue(vol, price) {
        return Formula.CalculateContractValue(vol, price, Formula.contractObj.getContract(this.productInfo))
      },
      earningsChange() {
        this.earnings = Utils.retainDecimals(this.earnings, {decimal: this.calculatorType ? this.com.valueUnit : 2}) || ''
      },
      postionsChange() {
        this.postions = Utils.retainDecimals(this.postions, {decimal: 0}) || ''
      },
      openPriceChange() {
        this.openPrice = Utils.retainDecimals(this.openPrice, {decimal: this.com.pxUnit - 1}) || ''
      },
      closePriceChange() {
        this.closePrice = Utils.retainDecimals(this.closePrice, {decimal: this.com.pxUnit - 1}) || ''
      },
      // 开始计算
      calculator() {
        if (this.type === 1) { // 盈亏计算
          if (!this.postions || !this.openPrice || !this.closePrice) {
            this.$alert(this.$t('typeTitle.calculatorPage.a1'))
            return false
          }
          // 仓位价值
          this.profitAndLoss.value = this.CalculateContractValue(Number(this.postions), Number(this.openPrice))
          let margin = this.marginRate(this.profitAndLoss.value)
          // 占用保证金
          this.profitAndLoss.im = this.profitAndLoss.value * Math.max(margin.initial, 1 / this.leverageInfo.value)
          // 盈亏
          this.profitAndLoss.pl = this.plFn(this.openPrice, this.closePrice, Number(this.postions), this.options)
          // 收益率
          this.profitAndLoss.rate = this.profitAndLoss.pl / this.profitAndLoss.im * 100
        } else if (this.type === 2) { // 强平价格计算
          if (!this.postions || !this.openPrice) {
            this.$alert(this.$t('typeTitle.calculatorPage.a1'))
            return false
          }
          this.flatPrice.value = this.CalculateContractValue(Number(this.postions), Number(this.openPrice))
          let margin = this.marginRate(this.flatPrice.value)
          this.flatPrice.im = Math.max(margin.initial, 1 / this.leverageInfo.value)
          this.flatPrice.mm = margin.maintenance
          // let fee = Number(this.productInfo.taker_fee_ratio)
          // let position = {HoldVol: Number(this.postions), HoldAvgPrice: Number(this.openPrice), IM: this.flatPrice.im, MM: this.flatPrice.mm}
          // this.flatPrice.flatPrice = Formula.CalculatePositionLiquidatePrice(position, 0, this.getContractInfo(), !this.options)
          // let pl = this.flatPrice.value * (margin.initial - margin.maintenance) * (this.options ? 1 + fee : 1 - fee)
          this.flatPrice.flatPrice = this.liquidatePrice(Number(this.postions), Number(this.openPrice), this.leverageInfo.value)
        } else { // 目标收益率计算
          if (!this.postions || !this.openPrice || !this.earnings) {
            this.$alert(this.$t('typeTitle.calculatorPage.a1'))
            return false
          }
          let value = this.CalculateContractValue(Number(this.postions), Number(this.openPrice))
          let margin = this.marginRate(value)
          this.targetClose.im = value * Math.max(margin.initial, 1 / this.leverageInfo.value)
          let isR = Formula.IsReverse(this.productInfo.quote_coin, this.productInfo.price_coin)
          if (this.calculatorType) {
            // this.options true 多 false 空
            if ((this.options && !isR) || (!this.options && isR)) {
              value += Number(this.earnings)
            } else {
              value -= Number(this.earnings)
            }
            this.targetClose.valueOrRote = this.earnings / this.targetClose.im * 100
          } else {
            this.targetClose.valueOrRote = this.earnings * this.targetClose.im / 100
            if ((this.options && !isR) || (!this.options && isR)) {
              value += this.targetClose.valueOrRote
            } else {
              value -= this.targetClose.valueOrRote
            }
          }
          this.targetClose.price = this.targetClosePriceFn(value, Number(this.postions))
        }
      },
      // 获取合约对象
      getContractInfo() {
        return {
          FeeConfig: {TakerFee: Number(this.productInfo.taker_fee_ratio)},
          Contract: Formula.contractObj.getContract(this.productInfo),
          RiskLimit: Formula.contractObj.getRiskLimit(this.productInfo)
        }
      },
      // 盈亏计算
      plFn(open, close, postions, way) {
        return Formula.LongOrSort(postions, open, close, Formula.contractObj.getContract(this.productInfo), way) || 0
      },
      // 计算起始和维持保证金率
      marginRate(totalValue) {
        let risk = this.productInfo
        let initial = Number(risk.imr)
        let maintenance = Number(risk.mmr)
        if (totalValue > risk.risk_limit_base) {
          let steps = Math.ceil((totalValue - risk.risk_limit_base) / risk.risk_limit_step)
          initial = Utils.precision.times(steps + 1, initial)
          maintenance = Utils.precision.times(steps + 1, maintenance)
        }
        if (initial > 1) {
          initial = 1
        }
        if (maintenance > 0.5) {
          maintenance = 0.5
        }
        return {initial, maintenance}
      },
      // 计算目标平仓价格
      targetClosePriceFn(value, vol) {
        return Formula.CalculateQuotePrice(value, vol, Formula.contractObj.getContract(this.productInfo))
      },
      // 计算目标平仓价格
      liquidatePrice(Vol, Price, Leverage) {
        return Formula.CalculateOrderLiquidatePrice({Vol, Price, Leverage}, 0, this.getContractInfo(), this.options)
      },
      changeLeverage(name) {
        this.leverageShow = false
        this.leverageInfo = this.leverageList.filter(item => { return item.name === name })[0]
      }
    },
    created() {
      this.leverageInfo = this.leverageList[1] || {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
 @import "../../../assets/css/base";
.calculator-window {
  // padding: 10px 20px;
  margin-bottom: -30px;
  background-color: #E5ECF2;
  ul.silder {
    height: 460px;
    background-color: #ECF2F7;
    margin-bottom: 0px;
    li {
      width: 160px;
      height: 46px;
      padding-left: 20px;
      line-height: 46px;
      cursor: pointer;
      color: #81898f;
      font-size: 16px;
      &.active {
        border-left: 4px solid @main-2a;
        padding-left: 16px;
        background-color: #E5ECF2;
        color: #3e4450;
      }
    }
  }
  .calculator-window-centent {
    margin-top: 26px;
    .calculator-window-centent-left {
      position: relative;
      height: 362px;
      width: 314px;
      .item {
        height: 34px;
        margin-bottom: 20px;
        &>p {
          width: 96px;
          padding-right: 14px;
          line-height: 34px;
          text-align: right;
          color: #45494c;
          font-weight: 400;
        }
        .item-tab {
          a {
            display: inline-block;
            height: 34px;
            width: 100px;
            border: 1px solid @i-main-2a;
            text-align: center;
            line-height: 34px;
            font-weight: 400;
            color: @i-main-2a;
            &.active{
              background-color:  @i-main-2a;
              color: @L10;
            }
            &:first-child {
              border-radius: 2px 0 0 2px;
            }
             &:last-child {
              border-radius: 0 2px 2px 0;
            }
          }
        }
        .item-input {
          position: relative;
          input {
            padding-left: 10px;
            border: 1px solid #a2acb4;
            width: 200px;
            height: 34px;
            color: #a2acb4;
            background-color: #E5ECF2;
            border-radius: 2px;
            outline: none;
            &:focus {

            }
          }
          span {
            position: absolute;
            right: 10px;
            line-height: 34px;
            color: #a2acb4;
            font-weight: 400;
          }
        }
        .item-sel {
          .Sel-name {
            position: relative;
            display: block;
            width: 200px;
            height: 34px;
            padding-left: 10px;
            border: 1px solid #a2acb4;
            line-height: 34px;
            color: #a2acb4;
            &::after {
              position: absolute;
              content: '';
              right: 10px;
              top: 50%;
              margin-top: -5px;
              border-top:8px solid #a2acb4;
              border-right:6px solid  rgba(0,0,0,0);;
              border-bottom:6px solid rgba(0,0,0,0);;
              border-left:6px solid  rgba(0,0,0,0);;
            }
          }
          .leverage-sel {
            position: relative;
            .Sel-mask {
              position: fixed;
              left: 0px;
              top: 0px;
              right: 0px;
              bottom: 0px;
            }
            .Sel-list {
              position: absolute;
              z-index: 1;
              width: 100%;
              color: #81898f;
              background: #ECF2F7;
               border: 1px solid #b6c8e2;
              cursor: pointer;
              li {
                padding-left: 10px;
              }
              li.active, li:hover {
                background:  #E5ECF2;
              }
            }
          }
        }
      }
      .btn {
        position: absolute;
        bottom: 0px;
        margin-left: 32px;
        display: block;
        width: 264px;
        height: 38px;
        background-color: @i-main-2;
        font-size: 18px;
        text-align: center;
        line-height: 38px;
        color: @L10;
        border-radius: 2px;
        &:hover {
            background-color: @mainHover;
        }
      }
    }
    .calculator-window-centent-rigth {
      width: 170px;
      height: 362px;
      padding: 20px 10px;
      background-color: #ECF2F7;
      h6 {
        color: #45494c;
        font-size: 12px;
        font-weight: 400;
        line-height: 36px;
      }
      .result {
        margin: 6px 0;
        p {
          font-size: 12px;
          font-weight: 400;
          // text-align: left;
          color: #a2acb4;
          line-height: 26px;
          &:last-child {
            color: #45494c;
          }
        }
      }
    }
  }
   .calculator-window-centent-bottom {
      margin: 20px 20px 0;
      height: 56px;
      border-top: 1px solid rgba(151, 176, 214, .5);
      p {
        // height: 50px;
        font-weight: 400;
        // line-height: 50px;
        font-size: 12px;
        color: rgba(95,109,152, .8)
      }
    }
}
</style>
