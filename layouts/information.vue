<template>
<div class="default white">
  <div class="header-box">
    <common-header></common-header>
  </div>
  <st-row class="container">
        <div class="sidebar">
          <information-sidebar></information-sidebar>
        </div>
        <div class="body">
          <nuxt/>
        </div>
  </st-row>
  <common-footer/>
</div>
</template>

<script>
import CommonFooter from '../components/template/footer'
import CommonHeader from '../components/template/header'
import InformationSidebar from '../components/information/sidebar.vue'
import ApiConfig from '../config/api.config'
import webSocketFn from '../assets/js/webSocket'
export default {
  components: {
    CommonFooter,
    CommonHeader,
    InformationSidebar
  },
  beforeMount() {
    window.webSocket_base = webSocketFn(ApiConfig.webSocketUrl)
  },
  mounted() {
    this.$store.dispatch('getUser')
  }
}
</script>

<style lang="less">

.default {
  position: relative;
  min-width: 1260px;
  padding-bottom: 385px;
  // .sidebar {
  //   position: fixed;
  //   left: 0px;
  //   top: 60px;
  // }
  // display: flex;
  // flex-direction: column;
  // .header-box {
  //   width: 100%;
  //   position: fixed;
  //   left: 0px;
  //   top: 0px;
  // }
  .container {
    // flex: 1;
    // padding-top: 60px;
    position: relative;
    padding-left: 260px;
    // background: pink;
    .sidebar {
      position: absolute;
      left: 0px;
      top: 0px;
    }

    // height: 100%;
    .body {
        max-height: 800px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
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
.white {
  background: #f3f7fc;
  .container
    {
      width: 1200px;
      margin: 20px auto 50px;
    }
}
</style>
