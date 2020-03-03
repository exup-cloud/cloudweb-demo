<template>
    <div class="header-assets-menu" @mouseover="show = true" @mouseleave="show = false">
        <div>
          <span>{{$t('header.ASSETS')}}</span>
          <i :class="show ? 'iconDown rotate' : 'iconDown'"></i>
        </div>
        <ul v-if="show">
            <li @click="goUrl(`${apiConfig.mainDomain}/assets/deposit`)"><a>{{$t('header.deposit')}}</a></li>
            <li @click="goUrl(`${apiConfig.mainDomain}/assets/withdraw`)"><a>{{$t('header.withdraw')}}</a></li>
            <li @click="goUrl(`${apiConfig.mainDomain}/assets/exchange_account`)"><a>{{$t('header.spotAccount')}}</a></li>
            <li @click="goUrl(`${apiConfig.mainDomain}/assets/swap_account`)"><a>{{$t('header.swapAccount')}}</a></li>
        </ul>
    </div>
</template>
<script>
import ApiConfig from '../../config/api.config'
export default {
  name: 'common-header',
  data() {
    return {
      apiConfig: ApiConfig,
      show: false
    }
  },
  computed: {
    locale() {
      return this.$store.state.auth.locale
    }
  },
  watch: {
    locale() {
      if (this.locale !== 'zh-cn') {
        window._MEIQIA('language', 'en')
      }
    }
  },
  methods: {
    hideList() {
      this.show = false
    },
    showList() {
      this.show = true
    },
    goUrl(url) {
      window.location.href = url + `?lang=${this.locale}`
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/base";
@menuDropDownColorBlue: #BDD1EF;
@menuDropDownHoverBack: #1E253B;
@menuDropDownColorWhite: #f2f3f4;
@menuDropDownBack: #283149;
.header-assets-menu {
    position: relative;
    padding: 0px 15px;
    &:hover {
        >ul {
            display: block;
        }
    }
    >div {
        color: @L8;
        span {
          font-weight: 400;
        }
        cursor: pointer;
        &:hover {
            .iconDown {
                background: url("../../assets/img/icon-down-sel.svg") left top no-repeat;
                background-size: 100% 100%;
                transform: rotate(180deg);
                transition: all .3s linear;
            }
            color: @main-2a;
        }
    }
    .iconDown {
      display: inline-block;
      width: 12px;
      height: 12px;
      position:absolute;
      right: 0px;
      top: 24px;
      background: url("../../assets/img/icon-down.svg") left top no-repeat;
      background-size: 100% 100%;
      transform: rotate(0);
      transition: all .3s linear;
    }
    >ul {
        display: none;
        background: @hintBack;
        width: 120px;
        padding: 10px 0px;
        position: absolute;
        left: 50%;
        margin-left: -60px;
        top: 50px;
        text-align: center;
        border: 1px solid @hintBorder;
        border-radius: 6px;
        li {
            width: 100%;
            height: 40px;
            // line-height: center;
            font-weight: 400;
            cursor: pointer;
            &:hover {
                background: @hintHoverBack;
                border-top: 1px solid @hintHoverBorder;
                border-bottom: 1px solid @hintHoverBorder;
            }
            >a {
              font-weight: 400;
              font-size: 12px!important;
              display: block;
              padding: 0px!important;
              width: 100%;
              height: 40px;
              line-height: 40px;
              color: @hintColor;
            }
        }
    }
}
</style>
