
<template>
  <!-- 勾选不再提醒后的强制提醒框 -->
  <div class="unwind-window">
      <div class="unwind-window-message">
          <!-- <h4>{{ $t(`common.${info.category === 1 ? 'limitPrice' : 'marketPrice'}`) + $t(`common.${info.way === 2 ? 'buy' : 'sell'}`) + $t('common.table.unwind') }}</h4> -->
          <h4>{{$t('submitEntrust.riskWarning')}}</h4>
          <!-- <p :class="info.way === 2 ? 'green' : 'red'"><span>{{ $t(`common.${info.way === 2 ? 'buy' : 'sell'}`) }}</span>{{ $t('record.cp.tradeMessage') }}<span>{{ info.category === 1 ? info.price : $t('common.marketPrice') }}</span>{{ info.category === 1 ? productInfo.quote_coin : '' }} <span>{{ info.vol }}</span>{{ $t('common.pieces') + ' ' + productInfo.contract.name }}</p> -->
          <p :class="info.buyOrSell === 'buy' ? 'green' : 'red'">
              {{ info.category === 1 ? $t('common.limitPrice') : '' }}<span>{{ info.category === 1 ? info.px : $t('common.marketPrice') }}</span>{{ $t(`common.${info.buyOrSell === 'buy' ? 'buy' : 'sell'}`) }} {{ info.category === 1 ? productInfo.quote_coin : '' }} <span>{{ info.qty }} </span>{{ $t('common.pieces') + ' ' + productInfo.symbol }}{{$t('informationPage.funding.contract')}},
            <i v-if="info.type && info.category === 1">{{$t('submitEntrust.forcedNotes.limitedPriceOpen')}}</i>
            <i v-if="!info.type && info.category === 1">{{$t('submitEntrust.forcedNotes.limitedPriceUnwind')}}</i>
            <i v-if="info.type && info.category === 2">{{$t('submitEntrust.forcedNotes.marketPriceOpen')}}</i>
            <i v-if="!info.type && info.category === 2">{{$t('submitEntrust.forcedNotes.marketPriceUwind')}}</i>
          </p>
      </div>

      <div class="unwind-window-content">
         <st-row justify="between" class="unwind-window-btn">
            <a @click="close">{{ $t('common.cancel') }}</a>
            <!-- <a @click="unwind">{{ info.category === 1 ? $t('record.cp.limitPricePosition') : isAll?$t('common.table.marketPriceUnwind'):$t('submitEntrust.price2') + $t('submitEntrust.unwind') }}</a> -->
            <a @click="unwind">{{ info.category === 1 ? $t('common.limitPrice') : $t('common.marketPrice') }}{{ $t(`common.${info.buyOrSell === 'buy' ? 'buy' : 'sell'}`) }}</a>
         </st-row>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'unwind-window',
    props: ['close', 'info', 'isAll'],
    data() {
      return {
        isShow: false
      }
    },
    mounted() {
      console.log('info###', this.info)
    },
    computed: {
      productInfo() {
        return this.$store.state.market.productInfo
      }
    },
    methods: {
      unwind() {
        this.$emit('submitOrder', this.info.longOrSort)
      },
      isConfirm() {
        this.isShow = !this.isShow
        this.isShow ? window.localStorage.setItem('isConfirm', '1') : window.localStorage.removeItem('isConfirm')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 @import "../../../assets/css/base";
.unwind-window {
    padding: 0 20px;
    .unwind-window-message {
       margin-top: 34px;
       text-align: center;
       h4 {
           font-weight: 500;
           font-size: 22px;
           &.green {
             color: @demoGreen;
           }
           &.red {
             color: @demoRed;
           }
       }
        p {
            min-height: 40px;
            text-align: left;
            padding: 0px 15px;
            &:nth-child(2) {
                margin: 20px 0;
                font-size: 16px;
                //  font-weight: 500;
                color: #000;
            }
            &:last-child {
                color: @L6;
            }
            &.green {
                span {
                color: @demoGreen;
                }
            }
            &.red {
                span {
                    color: @demoRed;
                }
            }
            i {
                font-style: normal;
            }
       }
    }
    .unwind-window-content {
        padding: 0 20px;
        padding-top: 20px;
        p {
            padding: 10px 0 ;
            cursor: pointer;
            color: @L6;
            text-align: right;
            font-size: 12px;
            i {
                display: inline-block;
                width: 12px;
                height: 12px;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: 100% 100%;
                background-image: url("../../../assets/img/icon-chose-login_nor.png");
            }
             &.active i{
                  background-image: url("../../../assets/img/icon-chose-login_sel.png");
            }
        }
    }
    .forced-notes {
      padding: 10px 30px;
      color: #e04d4d;
    }
    .unwind-window-btn a{
      width: 160px;
      height: 50px;
      text-align: center;
      line-height: 48px;
      font-size: 18px;
      border-radius: 2px;
      &:first-child {
        border: 1px solid @main-2;
        color: @main-2;
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
</style>
