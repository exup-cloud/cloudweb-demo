<template>
<div>
       <st-row justify="between" align="center" class='risk'>
         <div class="hint-father">
           <h6>{{ $t('risk.risk') }}</h6>
            <div class="hint">
                <p>{{ $t('risk.riskHoverOne', {im: util.precision.times(longInfo.maintenance, 100)}) }}</p>
                <p>{{ $t('risk.riskHoverTwo', {mm: longInfo.initial * 100}) }}</p>
            </div>
         </div>
         <!--@click="showAdjust = true" <i></i> -->
          <div >
            <div class="hint-father">
              <p class="right">{{longInfo.totalValue|addCommom(0)}}/{{longInfo.sum}} {{com.marginUnit}} ({{ $t('common.position_type_1') }})</p>
               <div class="hint">
                <p>{{ $t('risk.riskOne', {im: util.precision.times(longInfo.maintenance, 100)}) }}</p>
                <p>{{ $t('risk.riskTwo', {mm:  util.precision.times(longInfo.initial, 100)}) }}</p>
            </div>
            </div>
            <div class="hint-father">
              <p class="right">{{sortInfo.totalValue|addCommom(0)}}/{{sortInfo.sum}} {{com.marginUnit}} ({{ $t('common.position_type_2') }})</p>
               <div class="hint">
                <p>{{ $t('risk.riskOne', {im: util.precision.times(sortInfo.maintenance, 100)}) }}</p>
                <p>{{ $t('risk.riskTwo', {mm: util.precision.times(sortInfo.initial, 100)}) }}</p>
            </div>
            </div>
          </div>
       </st-row>
       <popup :title="$t('risk.adjustRisk', { type: 'XBTUSD'})"  width="600" :callback="adjusClose" v-if="showAdjust">
           <adjust-risk-window :close="adjusClose"></adjust-risk-window>
       </popup>
</div>
</template>
<script>
  import Popup from '../bx-ui/popup'
  import AdjustRiskWindow from './risk-cp/adjust-risk-window'
  import Formula from '../../assets/js/formula/index.js'
  import Util from '../../assets/js/util.js'
  export default {
    name: 'deal-record',
    components: {
      Popup,
      AdjustRiskWindow
    },
    data() {
      return {
        MarginCoin: Formula.MarginCoin,
        showAdjust: false,
        longInfo: {},
        sortInfo: {},
        util: Util
      }
    },
    computed: {
      com() {
        return this.$store.state.com
      },
      cabinList() {
        return this.$store.state.market.cabinList
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      token() {
        return this.$store.state.auth.token
      },
      curryEntrustList() {
        return this.$store.state.market.curryEntrustList
      }
    },
    watch: {
      cabinList() {
        this.getDate()
      },
      curryEntrustList() {
        this.getDate()
      }
    },
    methods: {
      adjusClose() {
        this.showAdjust = false
      },
      // 获取用户仓位和委托的价值
      getDate() {
        if (!this.productInfo) {
          return false
        }
        this.longInfo = this.getLimit(true)
        this.sortInfo = this.getLimit(false)
      },
      // 获取单一方向的价值
      getValue(bl) {
        let order = this.openOrderSizeFn(bl)
        let position = this.positionFn(bl)
        let holdVol = 0
        let holdAvgPrice = 0
        let advanceVol = 0
        let advancePrice = 0
        if (order && order.Vol > 0) {
          advanceVol = order.Vol
          advancePrice = order.Amount / order.Vol
        }
        if (position) {
          holdVol = position.HoldVol
          holdAvgPrice = position.HoldAvgPrice
        }
        let advanceValue = Formula.CalculateContractValue(advanceVol, advancePrice, Formula.contractObj.getContract(this.productInfo))
        let holdValue = Formula.CalculateContractValue(holdVol, holdAvgPrice, Formula.contractObj.getContract(this.productInfo))
        return advanceValue + holdValue
      },
      // 获取单一方向的风险限额
      getLimit(bl) {
        let totalValue = 0
        if (this.token) {
          totalValue = this.getValue(bl)
        }
        let steps = 0
        let base_limit = Number(this.productInfo.risk_limit_base) // 风险限额基础
        let step = Number(this.productInfo.risk_limit_step) // 步长
        let sum = base_limit
        let initial = Number(this.productInfo.imr)  // 基本开仓保证金率
        let maintenance = Number(this.productInfo.mmr)  // 基本维持保证金率
        if (totalValue > base_limit) {
          steps = Math.ceil((totalValue - base_limit) / step)
          sum += step * steps
          initial = Util.precision.times(steps + 1, initial)
          maintenance = Util.precision.times(steps + 1, maintenance)
        }
        return {totalValue, sum, initial, maintenance}
      },
      // 获取单一方向的仓位
      positionFn(longOrSort) {
        let position
        if (!this.token || !this.cabinList) {
          return position
        }
        position = this.cabinList.filter(item => {
          return item.side === (longOrSort ? 1 : 2) // 仓位类型,1:开多,2:开空
        })[0]
        if (position) {
          // position = {HoldVol: position.cur_qty, HoldAvgPrice: position.avg_open_px, position_id: position.pid, FreezeVol: position.freeze_qty}
          position = {HoldVol: position.cur_qty, HoldAvgPrice: position.avg_cost_px, position_id: position.pid, FreezeVol: position.freeze_qty}
        }
        return position
      },
      // 获取单一方向的委托
      openOrderSizeFn(longOrSort) {
        let openOrderSize
        if (!this.token) {
          return openOrderSize
        }
        // 只算委托中开多或开空单一方向
        let that = this.$store.state.market
        let way = longOrSort ? 1 : 4
        let entrustInfo = that.curryEntrustList.filter(item => {
          return item.side === way    // 1:开多,2:平空,3:平多,4:开空
        })
        if (entrustInfo.length) {
          let Vol = 0
          let Amount = 0
          entrustInfo.forEach(item => {
            Amount += item.px * (item.qty - item.cum_qty)
            Vol += Number(item.qty)
          })
          openOrderSize = {Amount, Vol}
        }
        return openOrderSize
      }
    },
    mounted() {
      this.getDate()
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.risk {
    // margin: 0 10px;
    // width: 280px;
    padding: 0 16px;
    height: 76px;
    background-color: @L2;
    border-radius: 2px;
    h6, p {
      margin-bottom: 0px;
      font-size: 14px;
    }
    h6 {
     color: @L8;
    }
    p.right {
      height: 30px;
      line-height: 30px;
      color: @L9;
      cursor: pointer;
      text-align: right;

      i {
        display: inline-block;
        cursor: pointer;
        margin-left: 6px;
        width: 16px;
        height: 16px;
        vertical-align: sub;
        background-image: url("../../assets/img/icon-edit-L_nor.png");
        &:hover {
          background-image: url("../../assets/img/icon-edit-L_sel.png");
        }
      }
    }
}
.hint-father:last-child {
  border-top: 1px solid @L3;
}
</style>
