
<template>
  <div class="unwind-window">
      <div class="unwind-window-message">
          <h4 v-if="!isAll" :class="info.side === 2 ? 'green' : 'red'">{{ $t(`common.${info.side === 2 ? 'buy' : 'sell'}`) + $t('common.table.unwind') }}</h4>
          <h4 v-else :class="info.side === 2 ? 'green' : 'red'">{{ $t('common.table.marketPriceUnwind') }}</h4>
          <p :class="info.side === 2 ? 'green' : 'red'">{{ $t(`common.${info.category === 1 ? 'limitPrice' : 'marketPrice'}`) }} <span>{{ info.category === 1 ? info.px : '' }} </span> {{ info.category === 1 ? productInfo.quote_coin : '' }}{{ $t(`common.${info.side === 2 ? 'buy' : 'sell'}`) }} <span> {{ info.qty }} </span>{{ $t('common.pieces') + ' ' + productInfo.symbol }}{{$t('informationPage.funding.contract')}}</p>
      </div>
      <div v-if="forced" class="forced-notes">
          <p class="notes" v-if="info.type && info.category === 1">{{$t('submitEntrust.forcedNotes.limitedPriceOpen')}}</p>
          <p class="notes" v-if="!info.type && info.category === 1">{{$t('submitEntrust.forcedNotes.limitedPriceUnwind')}}</p>
          <p class="notes" v-if="info.type && info.category === 2">{{$t('submitEntrust.forcedNotes.marketPriceOpen')}}</p>
          <p class="notes" v-if="!info.type && info.category === 2">{{$t('submitEntrust.forcedNotes.marketPriceUwind')}}</p>
      </div>
      <div v-if="confirm && !forced" class="forced-notes"></div>
      <div v-if="isAll && !forced" class="forced-notes"></div>
      <div class="unwind-window-content">
         <p @click="isConfirm" :class="{active: isShow}" v-if="!isAll && !forced">
           <st-row align="center" justify="end">
             <i></i> &nbsp;<p>{{ $t('record.cp.noAccording') }}</p>
           </st-row>
         </p>

         <st-row justify="between" class="unwind-window-btn">
            <a @click="close">{{ $t('common.cancel') }}</a>
            <!-- <a @click="unwind">{{ info.category === 1 ? $t('record.cp.limitPricePosition') : isAll?$t('common.table.marketPriceUnwind'):$t('submitEntrust.price2') + $t('submitEntrust.unwind') }}</a> -->
            <a @click="unwind" v-if="!isAll">{{ $t(`common.${info.side === 2 ? 'buy' : 'sell'}`) + $t('common.table.unwind') }}</a>
            <a @click="unwind" v-else>{{ $t('common.table.marketPriceUnwind') }}</a>
         </st-row>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'unwind-window',
    props: ['close', 'info', 'isAll', 'forced', 'confirm'],
    data() {
      return {
        isShow: false
      }
    },
    mounted() {
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
           &:nth-child(2) {
               margin: 23px 0;
               font-size: 16px;
              //  font-weight: 500;
               color: #000;
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
           }
           &:last-child {
             color: @L6;
           }
       }
    }
    .unwind-window-content {
        padding: 0 30px;
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
      padding: 0px 30px;
      min-height: 40px;
      // line-height: 40px;
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
