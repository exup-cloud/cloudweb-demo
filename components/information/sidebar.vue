<template>
    <div class='information-sidebar'>
        <!-- <dl>
            <dt>{{$t('header.swapStudent')}}</dt>
            <dd><nuxt-link to="/information/guide/start">{{$t('information.tradingGuide')}}</nuxt-link></dd>
            <dd><nuxt-link to="/information/guide/overview">{{$t('information.contractDesc')}}</nuxt-link></dd>
            <dd><nuxt-link to="/information/guide/margin">{{$t('information.margin')}}</nuxt-link></dd>
            <dd><nuxt-link to="/information/guide/plan">{{$t('information.planOrder')}}</nuxt-link></dd>
            <dd><nuxt-link to="/information/guide/fair_price">{{$t('information.fairPrice')}}</nuxt-link></dd>
            <dd><nuxt-link to="/information/guide/forced_liquidation">{{$t('information.forcedLiquidation')}}</nuxt-link></dd>
            <dd><nuxt-link to="/information/guide/adl">{{$t('information.adl')}}</nuxt-link></dd>
            <dd><nuxt-link to="/information/guide/faq">{{$t('information.faq')}}</nuxt-link></dd>
        </dl> -->
        <dl>
            <dt>{{ $t('informationPage.historyData') }}</dt>
            <dd><nuxt-link to="/information/funding?id=1">{{ $t('informationPage.funding.fundingHistory') }}</nuxt-link></dd>
            <dd><nuxt-link to="/information/insure?id=1">{{ $t('informationPage.insure.insureIndex') }}</nuxt-link></dd>
            <dd><nuxt-link to="/information/index">{{$t('informationPage.index.indexPrice')}}</nuxt-link></dd>
            <!-- <dd><nuxt-link to="/information/explosion">爆仓订单</nuxt-link></dd> -->
        </dl>
        <!-- <dl>
            <dt>{{ $t('informationPage.index.index') }}</dt>
            <dd :key="item.index_id" v-for="item in list"><nuxt-link :to="`/information/index/${item.index_id}`">{{ item.name }}</nuxt-link></dd>
        </dl> -->
    </div>
</template>
<script>

export default {
  name: 'information-sidebar',
  computed: {
    list() {
      return this.$store.state.market.indexs
    }
  }
}
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.information-sidebar{
    width: 260px;
    background: #fff;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,Arial,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
   h1, h2, h3, h4, h5, h6, a, p, th, span {font-weight: 400;}
   dl {
       margin-bottom: 0;
       &:last-child {
           dt {
               border-top: 1px solid #eaeff7;
           }
       }
       dt {
            border-bottom: 1px solid #eaeff7;
            padding-left: 20px;
            // height: 70px;
            // font-size: 18px;
            // color: @L4;
            // line-height: 70px;
            font-size: 16px;
            height: 50px;
            line-height: 50px;
            color: #393e4e;
            font-weight: 700;
       }
       dd {
           margin: 0;
          a {
               display: block;
               padding-left: 20px;
               font-size: 14px;
                height: 40px;
                line-height: 40px;
                color: #4a5064;
                &:active {
                   color: #fff;
               }
               &.nuxt-link-active {
                   color: #fff;
                   background: @i-main-2a;
                   &:hover {
                       color: #fff;
                   }
               }
               &:hover {
                   cursor: pointer;
                    color: @i-main-2a;
               }
          }
       }
   }
}
</style>
