<template>
<div class="information-funding">
    <st-row>
        <explosion-page></explosion-page>
    </st-row>
</div>
</template>

<script>
import ExplosionPage from '../../../components/information/explosion-page.vue'
// import SwapsApi from '../../../assets/js/api/swapsApi'
export default {
  name: 'information-funding',
  head() {
    return {
      title: this.$t('informationPage.historyData')
    }
  },
//   async asyncData({ store }) {
//     let res = await SwapsApi.getIndexList()
//     store.commit('market/SET_MARKET', {
//       key: 'indexs',
//       data: res.data
//     })
//   },
  layout: 'information',
  components: {
    ExplosionPage
  }
}
</script>

<style lang="less" scoped>

</style>
