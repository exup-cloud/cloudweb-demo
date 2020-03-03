<template>
    <div class="forced-reminder">
        <div class="top">
            <h3 :class="info.side === 1 ? 'green' : 'red'">{{ $t(`common.${info.category === 1 ? 'limitPrice' : 'marketPrice'}`) + $t(`common.${info.side === 1 ? 'buy' : 'sell'}`)}}</h3>
            <p>{{productInfo.symbol}}{{$t('common.table.contract')}}</p>
        </div>
        <div class="content">
            <ul class="info-con">
                <li>
                    <h4>{{$t('submitEntrust.price')}}{{ info.category === 1 ? '(' + productInfo.quote_coin+ ')' : '' }}</h4>
                    <p>{{ info.category === 1 ? info.px : $t('common.marketPrice') }}</p>
                </li>
                <li>
                    <h4>{{$t('common.table.quantity')}}</h4>
                    <p>{{ info.qty }}</p>
                </li>
                <li>
                    <h4>{{$t('submitEntrust.leverage')}}</h4>
                    <p>{{ info.leverageName !== 'allCabin' ? ($t('submitEntrust.partCabin') + ' ' + info.leverageName) : $t('submitEntrust.allCabin') + '100x' }}</p>
                </li>
            </ul>
            <ul class="info-list">
                <li>
                    <span>{{ $t('record.cp.entrustedValue') }}</span>
                    <span>{{ info.jz }}</span>
                </li>
                <li>
                    <span>{{ $t('record.cp.costing', {leverage: info.leverageName !== 'allCabin' ? info.leverageName : '100x'}) }}</span>
                    <span>{{ info.cb }}</span>
                </li>
                <li>
                    <span>{{ $t('record.cp.balance') }}</span>
                    <span>{{ info.ye }}</span>
                </li>
                <li>
                    <span>{{ $t('record.cp.positionSize') }}</span>
                    <span>{{ info.size + ' ' + $t('common.pieces') }}</span>
                </li>
            </ul>
        </div>
        <div v-if="type === 2">
            <p class="notes" v-if="info.type && info.category === 1">{{$t('submitEntrust.forcedNotes.limitedPriceOpen')}}</p>
            <p class="notes" v-if="!info.type && info.category === 1">{{$t('submitEntrust.forcedNotes.limitedPriceUnwind')}}</p>
            <p class="notes" v-if="info.type && info.category === 2">{{$t('submitEntrust.forcedNotes.marketPriceOpen')}}</p>
            <p class="notes" v-if="!info.type && info.category === 2">{{$t('submitEntrust.forcedNotes.marketPriceUwind')}}</p>
        </div>
        <p v-if="type !== 2" @click="isConfirm" class="select" :class="{active: isShow}"><i></i> {{ $t('record.cp.noAccording') }}</p>
        <div class="btn">
            <a class="cancel" @click="close">{{ $t('common.cancel') }}</a>
            <a class="confirm" @click="unwind">{{ $t(`common.${info.side === 1 ? 'buy' : 'sell'}`) }}</a>
        </div>
    </div>
</template>
<script>
export default {
  name: 'forced-reminder',
  props: ['close', 'info', 'type'], // type 1二次确认 2强制提醒
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    productInfo() {
      return this.$store.state.market.productInfo
    }
  },
  methods: {
    unwind() {
      console.log('unwind')
      this.$emit('submitOrder', this.info.longOrSort)
    },
    getNotes() {
      if (this.type && this.category === 1) { // 限价开仓
        return this.$t('submitEntrust.forcedNotes.limitedPriceOpen')
      } else if (!this.type && this.category === 1) { // 限价平仓
        return this.$t('submitEntrust.forcedNotes.limitedPriceUnwind')
      } else if (this.type && this.category === 2) { // 市价开仓
        return this.$t('submitEntrust.forcedNotes.marketPriceOpen')
      } else if (!this.type && this.category === 2) { // 市价平仓
        return this.$t('submitEntrust.forcedNotes.marketPriceUwind')
      }
    },
    isConfirm() {
      this.isShow = !this.isShow
      this.isShow ? window.localStorage.setItem('isConfirm', '1') : window.localStorage.removeItem('isConfirm')
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/base";
.forced-reminder {
    padding: 0px 20px;
    color: @L6;
    ul {
        margin-bottom: 0px;
    }
    .top {
        width: 100%;
        height: 70px;
        text-align: center;
        border-bottom: 1px solid #eaeff7;
        display: flex;
        flex-direction: column;
        justify-content: center;
        >h3 {
            font-size: 16px;
            font-weight: 400!important;
            &.red {
                color: @demoRed;
            }
            &.green {
                color: @demoGreen;
            }
        }
        >p {
            font-size: 14px;
            color:#3d455e;
        }
    }
    .content {
        padding: 20px;
        padding-bottom: 0px;
        .info-con {
            display: flex;
            justify-content: space-between;
            li {
                h4 {
                    font-size: 12px;
                }
                p {
                    font-size: 16px;
                    color: #3d455e;
                }
            }

        }
        .info-list {
            font-size: 14px;
            padding-top: 20px;
            li {
                display: flex;
                justify-content: space-between;
                padding: 5px 0px;
            }
        }
    }
    .notes {
        padding: 10px 20px;
        color: #e04d4d;
    }
    .select {
        margin-bottom: 10px;
        cursor: pointer;
        color: @L6;
        text-align: right;
        font-size: 12px;
        padding: 0px 20px;
        padding-top: 10px;
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
    .btn {
        padding: 5px 20px;
        padding-bottom: 0px;
        display: flex;
        justify-content: space-between;
        a {
            display: block;
            width: 160px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 2px;
            font-size: 16px;
            &:first-child {
                border: 1px solid @i-main-2;
                color: @i-main-2;
                &:hover {
                border-color: @mainHover;
                color: @mainHover;
                }
            }
            &:last-child {
                background-color: @i-main-2;
                color: @L10;
                &:hover {
                background-color: @mainHover;
                }
            }
        }
    }
}
</style>
