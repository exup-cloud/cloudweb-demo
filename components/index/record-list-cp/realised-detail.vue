<template>
  <div class="realised-detail">
    <p class="introduce">已实现盈亏包含已平仓部分的平仓盈亏、当前持仓的开仓手续费、平仓手续费、资金费用，费用明细如下</p>
    <ul class="details">
      <li>
        <a>资金费用</a>
        <span>{{capitalCost}}</span>
      </li>
      <li>
        <a>手续费</a>
        <span>{{fee}}</span>
      </li>
      <li>
        <a>平仓盈亏</a>
        <span>{{closeRealise}}</span>
      </li>
    </ul>
    <div class="btn-box">
      <button @click="positionFeeShow">资金费用详情</button>
      <button @click="close">我知道了</button>
    </div>
  </div>
</template>
<script>
import Utils from '../../../assets/js/util.js';

export default {
  name: 'realised-detail',
  props: ['close', 'info'],
  data() {
    return {
    }
  },
  computed: {
    //资金费用
    capitalCost() {
      // return -Number(Utils.retainDecimals(Number(this.info.tax), {decimal: 8}));
      if (-Number(this.info.tax) < 0) {
        return -Number(Utils.mathCeil(Number(this.info.tax), 8));
      } else {
        return -Number(Utils.retainDecimals(Number(this.info.tax), {decimal: 8}));
      }
    },
    // 手续费
    fee() {
      let fee = -Number(this.info.open_fee) - Number(this.info.close_fee);
      if (fee < 0) {
        return Utils.mathCeil(fee, 8);
      } else {
        return Utils.retainDecimals(fee, {decimal: 8});
      }
    },
    // 平仓盈亏
    closeRealise() {
      let closeRealise = Number(this.info.earnings) + Number(this.info.tax) - (-Number(this.info.open_fee) - Number(this.info.close_fee));
      if (closeRealise < 0) {
        return Utils.mathCeil(closeRealise, 8);
      } else {
        return Utils.retainDecimals(closeRealise, {decimal: 8});
      }
    }
  },
  mounted() {
    // console.log('this.info#####', this.info);
  },
  methods: {
    positionFeeShow() {
      this.$emit('positionFeeShow', this.info);
      this.close();
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/base";
.realised-detail {
  padding: 20px;
  .details {
    padding-top: 10px;
    li {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      padding-top: 10px;
      color: #000;
      a {
        display: inline-block;
        min-width: 120px;
        padding-right: 10px;
        color: #000;
        font-weight: bolder;
      }
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    button {
      border: none;
      width: 200px;
      height: 50px;
      font-size: 18px;
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
