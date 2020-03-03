<template>
<div class="default black">
  <common-header></common-header>
  <div>
    <nuxt/>
  </div>
    <common-footer/>
</div>
</template>

<script>
import CommonFooter from '../components/template/footer'
import CommonHeader from '../components/template/header'
import InformationSidebar from '../components/information/sidebar.vue'
export default {
  head() {
    return {
      title: 'ginfex&币世界模拟交易大赛',
      meta: [
        { hid: 'description', name: 'description', content: this.$t('header.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('header.keywords') },
        { hid: 'format-detection', name: 'format-detection', content: 'telephone=no' }
      ]
    }
  },
  components: {
    CommonFooter,
    CommonHeader,
    InformationSidebar
  }
}
</script>

<style lang="less" scoped>

.default {
  position: relative;
  min-width: 1260px;
  // padding-bottom: 385px;
}
@media screen and (max-width:750px) and (min-width: 420px){
  .default {
    padding-bottom: 640px;
    min-width: 480px;
  }
}
@media screen and (max-width: 420px) {
  .default {
    padding-bottom: 760px;
    min-width: 480px;
  }
}
.black {
  background: #12161c;
  .container
      {
        margin: 0;
        width: 100%;
        padding: 100px 0;
      }
}
</style>
