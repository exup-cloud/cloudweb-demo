<template>
  <div class="stop-profit-and-loss">
    <!-- <ul class="trigger-type">
      <li @click="selectTriggerType(1)" :class="currentTriggerType===1?'active':''">{{$t('submitEntrust.priceType_1')}}</li>
      <li @click="selectTriggerType(2)" :class="currentTriggerType===2?'active':''">{{$t('submitEntrust.priceType_2')}}</li>
      <li @click="selectTriggerType(4)" :class="currentTriggerType===4?'active':''">{{$t('submitEntrust.priceType_4')}}</li>
    </ul> -->
    <div class="how-to-set">
      <a>如何设置</a>
    </div>
    <div class="title">
      <label>
        <svg class="icon" aria-hidden="true" v-if="!isProfit">
          <use xlink:href="#iconcheckbox_default1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-if="isProfit">
          <use xlink:href="#iconcheckbox_focus"></use>
        </svg>
        <input class="checkbox-hidden" type="checkbox" v-model="isProfit"/>
        <!-- 止盈 -->
        <span>{{$t('stopProfitLoss.takeProfit')}}</span>
      </label>
    </div>
    <div class="trigger-price">
      <!-- 触发价格 -->
      <input :disabled="!isProfit" v-model="triggerPriceP" :placeholder="$t('common.table.setPrice')"/>
      <span>{{productInfo.quote_coin}}</span>
    </div>
    <div class="order-price">
      <div class="input" v-if="!isMarketP">
        <!-- 执行价格 -->
        <input :disabled="!isProfit" v-model="orderPriceP" :placeholder="$t('submitEntrust.orderPrice')"/>
        <span>{{productInfo.quote_coin}}</span>
      </div>
      <!-- 当前市场价 -->
      <div class="market-price" v-if="isMarketP">{{$t('submitEntrust.curryMarket')}}</div>
      <!-- 市价 -->
      <a class="market-btn" :class="isMarketP ? 'active' : ''" @click="isMarketP = !isMarketP">{{$t('submitEntrust.price2')}}</a>
    </div>
    <div class="h-20"></div>
    <div class="title">
      <label>
        <svg class="icon" aria-hidden="true" v-if="!isLoss">
          <use xlink:href="#iconcheckbox_default1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-if="isLoss">
          <use xlink:href="#iconcheckbox_focus"></use>
        </svg>
        <input class="checkbox-hidden" type="checkbox" v-model="isLoss"/>
        <!-- 止损 -->
        <span>{{$t('stopProfitLoss.stopLoss')}}</span>
      </label>
    </div>
    <div class="trigger-price">
      <!-- 触发价格 -->
      <input :disabled="!isLoss" v-model="triggerPriceL" :placeholder="$t('common.table.setPrice')"/>
      <span>{{productInfo.quote_coin}}</span>
    </div>
    <div class="order-price">
      <div class="input" v-if="!isMarketL">
        <!-- 执行价格 -->
        <input :disabled="!isLoss" v-model="orderPriceL" :placeholder="$t('submitEntrust.orderPrice')"/>
        <span>{{productInfo.quote_coin}}</span>
      </div>
      <!-- 当前市场价 -->
      <div class="market-price" v-if="isMarketL">{{this.$t('submitEntrust.curryMarket')}}</div>
      <!-- 市价 -->
      <a class="market-btn" :class="isMarketL ? 'active' : ''" @click="isMarketL = !isMarketL">{{$t('submitEntrust.price2')}}</a>
    </div>

    <div class="btn-box">
      <button class="cancel" @click="close">{{$t('common.cancel')}}</button>
      <button class="confirm" @click="submitOrder">{{$t('record.cp.confirm')}}</button>
    </div>

    <popup title="提示" v-if="warningConfirm" :callback="closeWarningConfirm">
      <StopAndLossWarningConfirm :content="warningConfirmCon" :close="closeWarningConfirm" :confirm="continueSubmit"></StopAndLossWarningConfirm>
    </popup>
  </div>
</template>
<script>
import Utils from '../../../assets/js/util.js'
import StopAndLossWarningConfirm from './stop-and-loss-warning-confirm.vue';

export default {
  name: 'stop-profit-and-stop-loss',
  components: {
    StopAndLossWarningConfirm
  },
  // props: ['isShow', 'close'],
  props: {
    isShow: {
      default: false,
      type: Boolean
    },
    close: {
      default: function() {
        return;
      },
      type: Function
    },
    refreshProfitAndLoss: {
      default: function() {
        return;
      },
      type: Function
    },
    info: {
      default: function () {
        return {
          triggerPricePO: '',
          orderPricePO: '',
          triggerPriceLO: '',
          orderPriceLO: '',
          triggerTypeO: '',
          positionQty: '',
          side: '',
          liquidatePrice: '',
          pid: '',
          plofitPlanOid: '',
          lossPlanOid: '',
          categoryP: '',
          categoryL: '',
        }
      } ,
      type: Object
    }
  },
  data() {
    return {
      dialogConfirmLoading: false,
      dialogConfirmDisabled: false,
      isProfit: false, // 止盈
      isLoss: false, // 止损
      isProfitO: false,
      isLossO: false,
      isMarketP: true,
      isMarketL: true,
      isMarketPO: true,
      isMarketLO: true,
      triggerPriceP: '',
      orderPriceP: '',
      triggerPriceL: '',
      orderPriceL: '',
      currentTriggerType: 1,
      successTips: '',
      cancelTips: '',
      warningConfirmCon: '',
      needtoConsiderWarning: true, // 需要判断预警价格
      warningConfirm: false, // 是否打开预警价格弹框
    }
  },
  computed: {
    productInfo() {
      return this.$store.state.market.productInfo
    },
    ticker() {
      return this.$store.state.market.ticker
    },
    liquidationWarnRatio() {
      return this.$store.state.market.productInfo.liquidation_warn_ratio;
    },
    com() {
      return this.$store.state.com
    },
  },
  watch: {
    isProfit(val) {
      if (!val) {
        this.triggerPriceP = '';
        this.orderPriceP = '';
      }
    },
    isLoss(val) {
      if (!val) {
        this.triggerPriceL = '';
        this.orderPriceL = '';
      }
    }
  },
  mounted() {
    this.triggerPriceP = this.info.triggerPricePO
    this.orderPriceP = this.info.orderPricePO
    this.triggerPriceL = this.info.triggerPriceLO
    this.orderPriceL = this.info.orderPriceLO
    this.currentTriggerType = Number(this.info.triggerTypeO) || 1
    // this.isMarketP = this.info.categoryP === 2 ? true : false
    // this.isMarketPO = this.info.categoryP === 2 ? true : false
    // this.isMarketL = this.info.categoryL === 2 ? true : false
    // this.isMarketLO = this.info.categoryL === 2 ? true : false

    if (this.info.triggerPricePO) {
      this.isProfit = true
      this.isProfitO = true
    }
    if (this.info.triggerPriceLO) {
      this.isLoss = true
      this.isLossO = true
    }
    this.successTips = this.$t('submitEntrust.message.a7')
    this.cancelTips = this.$t('common.cancelSuccess')

    let warningPrice = Number(this.info.liquidatePrice) * Number(this.liquidationWarnRatio) + Number(this.info.avgCostPx) * (1 - Number(this.liquidationWarnRatio));
  },
  methods: {
    continueSubmit() {
      this.needtoConsiderWarning = false;
      this.warningConfirm = false;
      this.submitOrder();
    },
    closeWarningConfirm() {
      this.warningConfirm = false;
    },
    openWarningConfirm() {
      this.warningConfirm = true;
    },
    selectTriggerType(type) {
      this.currentTriggerType = type
    },
    submitOrder() {
      let price_way;
      let cancel_orders = [];
      let haveOption = false;
      switch (this.currentTriggerType) {
        case 1:
          price_way = this.ticker.last_px;
          break;
        case 2:
          price_way = this.ticker.fair_px;
          break;
        case 4:
          price_way = this.ticker.index_px;
          break;
      };

      if (this.isProfit && this.validateProfit(price_way)) { // 止盈
        this.submitPlan(true, price_way);
        haveOption = true;
      }

      if (!this.isProfit && this.isProfit !== this.isProfitO) { // 撤销止盈
        cancel_orders.push(this.info.plofitPlanOid);
      }

      if (this.isLoss && this.validateLoss(price_way)) { // 止损
        this.submitPlan(false, price_way);
        haveOption = true;
      }

      if (!this.isLoss && this.isLoss !== this.isLossO) { // 撤销止损
        cancel_orders.push(this.info.lossPlanOid);
      }

      if (cancel_orders.length > 0) {
        this.cancelOrders(cancel_orders);
        haveOption = true;
      }
      if (!this.warningConfirm) {
        if (!this.isProfit && !this.isLoss && !haveOption) {
          this.close();
        } else {
          if (haveOption) {
            setTimeout(() => {
              this.close();
            }, 100);
          }
        }
      }
    },
    // 验证止盈订单
    validateProfit(price_way) {
      if (this.info.triggerPricePO == this.triggerPriceP && this.info.orderPricePO == this.orderPriceP && this.info.triggerTypeO == this.currentTriggerType && this.isMarketPO == this.isMarketP) {
        return false
      }
      if (!this.triggerPriceP) {
        // 请输入触发价格
        this.$alert(this.$t('stopProfitLoss.placeInputPOrderPrice'))
        return false
      }
      if(!this.orderPriceP  && !this.isMarketP) {
        // 请输入执行价格
        this.$alert(this.$t('stopProfitLoss.placeInputPTriggerPrice'))
        return false
      }

      if (this.info.side === 1) { // 开多
        if (Number(this.triggerPriceP) < Number(price_way)) {
          // 止盈价格需要高于当前最新价格
          this.$alert(this.$t('stopProfitLoss.stop_profit_long', {price: this.$t('submitEntrust.priceType_' + this.currentTriggerType)}))
          return false
        }

      } else { // 开空
        if (Number(this.triggerPriceP) > Number(price_way)) {
          // 止盈价格需要低于当前最新价格
          this.$alert(this.$t('stopProfitLoss.stop_profit_short', {price: this.$t('submitEntrust.priceType_' + this.currentTriggerType)}))
          return false
        }
      }
      return true
    },
    // 验证止损订单
    validateLoss(price_way) {
      if (this.info.triggerPriceLO == this.triggerPriceL && this.info.orderPriceLO == this.orderPriceL && this.info.triggerTypeO == this.currentTriggerType && this.isMarketLO == this.isMarketL) {
        return false
      }
      if (!this.triggerPriceL) {
        // 请输入触发价格
        this.$alert(this.$t('stopProfitLoss.placeInputLOrderPrice'))
        return false
      }
      if(!this.orderPriceL && !this.isMarketL) {
        // 请输入执行价格
        this.$alert(this.$t('stopProfitLoss.placeInputLTriggerPrice'))
        return false
      }


      // 预警价格 = 强平价格 * 预警系数 + 持仓均价 * (1 - 预警系数)
      let warningPrice = Number(this.info.liquidatePrice) * Number(this.liquidationWarnRatio) + Number(this.info.avgCostPx) * (1 - Number(this.liquidationWarnRatio));
      if (this.info.side === 1) { // 开多
        if (Number(this.triggerPriceL) > Number(price_way) || Number(this.triggerPriceL) <= Number(this.info.liquidatePrice)) {
          // 止损价格需要低于当前最新价格且高于强平价格
          this.$alert(this.$t('stopProfitLoss.stop_loss_long', {price: this.$t('submitEntrust.priceType_' + this.currentTriggerType)}))
          return false
        }

        // 判断预警价格
        if (this.needtoConsiderWarning) {
          if (Number(this.triggerPriceL) < Number(warningPrice) || (!this.isMarketL && Number(this.orderPriceL) < Number(warningPrice))) {
            warningPrice = Utils.retainDecimals(warningPrice, {decimal: this.com.pxUnit - 1})
            this.warningConfirmCon = `止损价格触发价格或执行价格低于预警价格${warningPrice}，可能会导致止损失败，是否继续提交?`
            this.openWarningConfirm()
            return false
          }
        }
      } else { // 开空
        if (Number(this.triggerPriceL) < Number(price_way) || Number(this.triggerPriceL) >= Number(this.info.liquidatePrice)) {
          // 止损价格需要高于当前最新价格且低于强平价格
          this.$alert(this.$t('stopProfitLoss.stop_loss_short', {price: this.$t('submitEntrust.priceType_' + this.currentTriggerType)}))
          return false
        }

         // 判断预警价格
         if (this.needtoConsiderWarning) {
            if (Number(this.triggerPriceL) > Number(warningPrice) || (!this.isMarketL && Number(this.orderPriceL) > Number(warningPrice))) {
              warningPrice = Utils.retainDecimals(warningPrice, {decimal: this.com.pxUnit - 1})
              this.warningConfirmCon = `止损价格触发价格或执行价格高于预警价格${warningPrice}，可能会导致止损失败，是否继续提交?`
              this.openWarningConfirm()
              return false
            }
         }

      }
      return true
    },
    // 提交计划委托  flag: true 止盈 false 止损
    submitPlan(flag, price_way) {
      let obj = {}
      obj.nonce = parseInt(Date.now() / 1000)
      obj.instrument_id = this.productInfo.instrument_id
      const isMarket = flag ? this.isMarketP : this.isMarketL
      obj.category = isMarket ? 2 : 1
      obj.trigger_type = this.currentTriggerType
      const triggerPrice = flag ? this.triggerPriceP : this.triggerPriceL
      obj.trend = Number(price_way) < Number(triggerPrice) ? 1 : 2
      if (!isMarket) {
        const orderPrice = flag ? this.orderPriceP : this.orderPriceL
        obj.exec_px = orderPrice
      }
      obj.px = triggerPrice
      // obj.qty = this.info.positionQty;
      const planInfo = JSON.parse(localStorage.getItem('planInfo'))
      const timeListValue = (planInfo && planInfo.timeListValue) || 24
      obj.cycle = timeListValue;
      obj.side = Number(this.info.side) === 1 ? 3 : 2

      obj.type = flag ? 1 : 2
      obj.pid = this.info.pid
      this.swapsApi.submitPlanOrder(obj).then(res => {
        if (res.errno === 'OK') {
          this.$alert('s', this.successTips)
          this.refreshProfitAndLoss()
        }
      });
    },
    cancelOrders(oidList) {
      let nonce = parseInt(Date.now() / 1000);
      this.swapsApi.cancelPlanOrders({orders: [{instrument_id: this.productInfo.instrument_id, orders: oidList}], nonce})
      .then(res => {
        if (res.errno === 'OK') {
          this.$alert('s', this.cancelTips)
          this.refreshProfitAndLoss()
        }
      });
    },
  }
}
</script>
<style scoped lang="less">
@import "../../../assets/css/base.less";
.stop-profit-and-loss {
  padding: 20px;
  .trigger-type {
    width: 100%;
    display: flex;
    border-radius: 2px;
    margin-bottom: 20px;
    li {
      flex: 1;
      height: 32px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      background: #aaaaaa;
      color: @L10;
      &:first-child {
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
      }
      &:last-child {
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
      }
      &.active {
        background: @main-2;
      }
    }
  }
  .title {
    position: relative;
    .checkbox-hidden {
      opacity: 0;
      position: absolute;
      left: 0px;
      top: 0px;
    }
    label {
      display: flex;
      align-items: center;
      >span {
        margin-left: 4px;
        font-size: 14px;
      }
    }
    .icon {
      width: 16px;
      height: 16px;
      fill: @main-2;
    }
  }
  .how-to-set {
    display: flex;
    justify-content: flex-end;
  }
  .h-20 {
    width: 100%;
    height: 30px;
  }
  .trigger-price,
  .order-price {
    height: 26px;
    width: 100%;
    border-width: 1px;
    border-style: solid;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    input {
      border: none;
      outline: none;
      &:disabled {
        cursor: not-allowed;
      }
    }
  }
  .trigger-price {
    input {
      flex: 1;
      padding: 0px 10px;
    }
    span {
      padding: 0px 10px;
    }
  }
  .order-price {
    .input {
      flex: 1;
      display: flex;
      input {
        flex: 1;
        padding: 0px 10px;
      }
      span {
        padding: 0px 10px;
      }
    }
    .market-price {
      flex: 1;
      padding: 0px 10px;
      font-size: 12px;
    }
    .market-btn {
      padding: 0px 10px;
      margin-left: 10px;
    }
  }

  .btn-box {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    button{
      display: block;
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 38px;
      font-size: 16px;
      border-radius: 2px;
      border: none;
      cursor: pointer;
      outline: none;
      &:first-child {
        border: 1px solid @main-2;
        color: @main-2;
        margin-right: 20px;
        &:hover {
            border-color: @mainHover;
            color: @mainHover;
        }
      }
      &:last-child {
          background-color: @main-2;
          color: @L10;
        &:hover {
            background-color: @mainHover;
        }
      }
    }
  }
}
</style>
