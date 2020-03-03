
<template>
  <div class="blowing-up-window">
    <template v-if="isStrongOrBlow && info" >
      <p v-html="$t('record.cp.blowingUpFive', {time: getTime(), price: (Util.retainDecimals(info.trigger_px, {decimal: com.pxUnit}) || 0) + ' ' + productInfo.quote_coin, dealPrice: Util.retainDecimals(info.order_px, {decimal: com.pxUnit}) + ' ' + productInfo.quote_coin})"></p>
      <a target="_blank">{{ $t('record.cp.blowingUpFore')}}</a>
    </template>
    <template v-else-if="info">
      <p v-html="$t('record.cp.blowingUpOne', {time: getTime(), price: (Util.retainDecimals(info.trigger_px, {decimal: com.pxUnit}) || 0) + ' ' + productInfo.quote_coin, name: productInfo.symbol, mmr: Util.retainDecimals(info.mmr * 100, {decimal: 2}), positionType: $t(way === 3 ? 'record.cp.more' : 'record.cp.empty'), direction: $t(way === 3 ? 'record.cp.down' : 'record.cp.on')})"></p>
      <p v-html="$t('record.cp.blowingUpTwo', {price: (Util.retainDecimals(info.order_px, {decimal: com.pxUnit}) || 0) + ' ' + productInfo.quote_coin})"></p>
      <a target="_blank">{{ $t('record.cp.blowingUpThree') }}</a>
    </template>
  </div>
</template>

<script>
  import Util from '../../../assets/js/util.js'
  export default {
    name: 'blowing-up-window',
    props: ['close', 'orderId', 'way', 'isStrongOrBlow'],
    data() {
      return {
        info: null,
        Util: Util
      }
    },
    mounted() {
      this.userLiqRecords()
    },
    computed: {
      locale() {
        return this.$store.state.auth.locale
      },
      com() {
        return this.$store.state.com
      },
      productInfo() {
        return this.$store.state.market.productInfo
      }
    },
    methods: {
      userLiqRecords() {
        this.swapsApi.userLiqRecords(this.orderId)
        .then(res => {
          this.info = res.data.records[0]
        })
      },
      getTime() {
        return Util.timeFormat(this.info.created_at)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
 @import "../../../assets/css/base";
.blowing-up-window {
    padding-top: 20px;
    p {
        position: relative;
        padding: 10px 50px;
        color: @L4;
        word-wrap: break-word;
       i {
           position: absolute;
           left: 30px;
           top: 12px;
           width: 16px;
           height: 16px;
           background-color: @L8;
           border-radius: 50%;
           text-align: center;
           line-height: 16px;
           font-style: normal;
           color: #fff;
           font-size: 12px;
       }
       span {
           color: #c87e80;
       }
    }
    a {
        margin-top: 20px;
        margin-left: 37px;
        display: block;
        width: 240px;
        height: 50px;
        background-color: @main-2;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        color: @L10;
        &:hover {
            background-color: @main-2a;
        }
    }
}
</style>
