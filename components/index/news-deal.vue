<template>
    <div class='news-deal'>
       <h3>{{ $t('newsDeal.newsDeal') }}</h3>
       <div class="news-deal-centent">
        <st-row class="news-deal-title">
         <h6>{{ $t('newsDeal.time') }}</h6>
         <h6>{{ $t('newsDeal.price') }} ({{ productInfo.quote_coin }})</h6>
         <h6>{{ $t('newsDeal.number') }} ({{ coinUnit ? $t('common.pieces') : productInfo.base_coin }})</h6>
       </st-row>
       <ul>
         <li :key="index" v-for="(item, index) in trades" :class="item.color">
           <st-row>
             <p>{{item.created_at | timeFormat('HMS')}}</p>
             <p :class="~[1, 2, 3, 4].indexOf(item.side) || 'red'">{{item.px | splitFormat(com.pxUnit - 1)}}</p>
             <p>{{coinUnit ? item.qty : changUnitGetVol(item.qty, item.px)|addCommom(coinUnit ? com.qtyUnit : com.valueUnit)}}</p>
           </st-row>
         </li>
       </ul>
       </div>
    </div>
</template>
<script>
import Formula from '../../assets/js/formula/index.js'
export default {
  name: 'news-deal',
  data() {
    return {
      changeColor: true
    }
  },
  computed: {
    com() {
      return this.$store.state.com
    },
    coinUnit() {
      return this.$store.state.market.coinUnit
    },
    trades() {
      return this.$store.state.market.trades
    },
    productInfo() {
      return this.$store.state.market.productInfo
    }
  },
  watch: {
    trades(value, old) {
      if (!value || !old) {
        return false
      }
      let trades_len = value.length
      let old_len = old.length
      let step = trades_len - old_len
      if (!old_len || !step) {
        return false
      }
      let red = this.changeColor ? 'am_red_1' : 'am_red_2'
      let green = this.changeColor ? 'am_green_1' : 'am_green_2'
      this.changeColor = !this.changeColor
      value.forEach(item => {
        item.color = ''
      })
      for (let i = 0; i < step; i++) {
        value[i].color = ~[1, 2, 3, 4].indexOf(value[i].way) ? green : red
      }
    }
  },
  methods: {
    // 张和base_coin单位的切换
    changUnitGetVol(vol, price) {
      return Formula.CalculateContractBasicValue(vol, price, Formula.contractObj.getContract(this.productInfo))
    }
  }
}
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.news-deal{
  // margin-right: 10px;
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
  .news-deal-centent {
    .news-deal-title {
      h6 {
       font-size: 12px;
       color:  @L8;
        &:nth-child(n+2) {
         width: 80px;
         text-align: right;
       }
       &:first-child {
         width: 50px;
       }
      }
    }
    padding: 8px;
  }
  ul {
    margin-bottom: 0;
    height: 391px;
    overflow: auto;
    li {
      &.am_red_1,&.am_red_2 {
        animation: changeColor_red .5s linear 0s 1;
      }
      &.am_green_1,&.am_green_2 {
       animation: changeColor_green .5s linear 0s 1;
      }
      p {
        margin-bottom: 0px;
        height: 23px;
        line-height: 23px;
        font-size: 12px;
        font-weight: 500;
        &:nth-child(n+2) {
          width: 80px;
          text-align: right;
        }
        &:first-child {
          width: 50px;
        }
        &:last-child,&:first-child {
           color: @L9;
        }
        &:nth-child(2) {
          color: @demoGreen;
          &.red {
           color: @demoRed;
          }
        }
      }
    }
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
