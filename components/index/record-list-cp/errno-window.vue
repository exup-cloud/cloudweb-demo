
<template>
  <div class="errno-window">
     <!-- <h6 v-if="!info.errno" v-html="$t('record.errno.success', {time: `<span>${Util.timeFormat(info.finished_at)}</span>`, contract: productInfo[locale === 'zh-cn' ? 'name_zh' : 'name_en'], priceType: $t('submitEntrust.priceType_' + info.trigger_type), downOrUp: Number(info.trend) === 1 ? $t('record.cp.on') : $t('record.cp.down'), price: `<span>${info.px}</span>`})"></h6> -->
     <!-- <h6 v-else v-html="$t('record.errno.failure', {time: `<span>${Util.timeFormat(info.finished_at)}</span>`, contract: productInfo[locale === 'zh-cn' ? 'name_zh' : 'name_en'], priceType: $t('submitEntrust.priceType_' + info.trigger_type), downOrUp: Number(info.trend) === 1 ? $t('record.cp.on') : $t('record.cp.down'), errno: $t('record.errno.plan_' + info.errno), price: `<span>${info.px}</span>`})"></h6> -->
    <h6 class="error-reason" v-if="!info.errno" v-html="$t('record.errno.success', {time: `<span>${Util.timeFormat(info.finished_at)}</span>`, contract: productInfo.symbol, priceType: $t('submitEntrust.priceType_' + info.trigger_type), downOrUp: Number(info.trend) === 1 ? $t('record.cp.on') : $t('record.cp.down'), price: `<span>${info.px}</span>`})"></h6>
    <h6 class="error-reason" v-if="info.errno && info.errno !== 9 && info.errno !==5 && info.errno !== 11 && info.errno !== 13 && info.errno !== 1 && info.errno !== 2" v-html="$t('record.errno.failure', {time: `<span>${Util.timeFormat(info.finished_at)}</span>`, contract: productInfo.symbol, priceType: $t('submitEntrust.priceType_' + info.trigger_type), downOrUp: Number(info.trend) === 1 ? $t('record.cp.on') : $t('record.cp.down'), errno: $t('record.errno.plan_' + info.errno), price: `<span>${info.px}</span>`})"></h6>
    <h6 class="error-reason" v-if="info.errno && info.errno === 9" v-html="$t('record.errno.failure', {time: `<span>${Util.timeFormat(info.finished_at)}</span>`, contract: productInfo.symbol, priceType: $t('submitEntrust.priceType_' + info.trigger_type), downOrUp: Number(info.trend) === 1 ? $t('record.cp.on') : $t('record.cp.down'), errno: $t('record.errno.plan_' + info.errno, {pid: info.pid}), price: `<span>${info.px}</span>`})"></h6>
    <h6 class="error-reason" v-if="info.errno && (info.errno === 5 || info.errno === 11 || info.errno === 13 || info.errno === 1 || info.errno === 2)">{{$t('record.errno.plan_' + info.errno)}}</h6>
    <st-row justify="center">
      <a @click="close">{{ $t('record.cp.confirm') }}</a>
    </st-row>
  </div>
</template>

<script>
  import Util from '../../../assets/js/util.js'
  export default {
    name: 'errno-window',
    props: ['close', 'info'],
    data() {
      return {
        Util: Util
      }
    },
    computed: {
      locale() {
        return this.$store.state.auth.locale
      },
      productInfo() {
        return this.$store.state.market.productInfo
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
 @import "../../../assets/css/base";
.errno-window {
  h6 {
    margin-top: 30px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    span {
      color: @demoRed;
    }
  }
   a {
        margin-top: 30px;
        // margin-left: 37px;
        display: block;
        width: 160px;
        height: 48px;
        background-color: @main-2;
        font-size: 18px;
        text-align: center;
        line-height: 48px;
        color: @L10;
        border-radius: 2px;
        &:hover {
            background-color: @mainHover;
        }
    }
}
</style>
