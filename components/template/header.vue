<template>
  <header class="pc-header">
    <div class="pc-header-web">
      <a
        @click="goUrl(apiConfig.mainDomain + `?lang=${locale}`)"
        class="logo"
      ><img src="../../assets/img/logo.png" /></a>
      <!-- <a class="exchange one" :href="`${apiConfig.mainDomain}/exchange?coinPair=XDAG/USDT&lang=${locale}`">{{$t('header.EXCHANGE')}}</a> -->
      <a
        class="exchange one"
        @click="goUrl(`${apiConfig.mainDomain}/exchange?coinPair=BTC/USDT&lang=${locale}`)"
      >{{$t('header.EXCHANGE')}}</a>
      <nuxt-link
        class="exchange"
        :style="$route.path === '/' && 'color: #F8B500'"
        to="/"
      >
        {{ $t('header.trade') }}
        <!-- <span class="huo"></span> -->
      </nuxt-link>
      <!-- <div class="contract" @mouseover="showContractList" @mouseleave="hideContractList">
              <nuxt-link to="/"> {{ $t('header.trade') }} </nuxt-link>
              <i :class="isShowContract?'icon-down rotate':'icon-down'"></i>
              <span class="huo"></span>
              <ul v-if="isShowContract">
                <li @click="hideContractList"><nuxt-link to="/">{{$t('header.realTrading')}}</nuxt-link></li>
                <li @click="hideContractList"><nuxt-link to="/game/trade">{{$t('header.simulationTrading')}}</nuxt-link></li>
              </ul>
            </div> -->

      <a
        class="exchange"
        @click="goUrl(`${apiConfig.mainDomain}/c2c_trade?lang=${locale}`)"
      >{{$t('header.c2c')}}</a>
      <!-- <nuxt-link class="exchange" :style="$route.path === '/bonus' && 'color: #F8B500'" to="/bonus" >{{ $t('bonus.bonus') }}<span class="huo"></span></nuxt-link> -->
      <!-- <nuxt-link class="exchange" :style="$route.path === '/competition' && 'color: #F8B500'" to="/competition" >{{$t('header.swapCompetition')}}<span class="huo"></span></nuxt-link> -->
      <!-- <a
        class="exchange"
        @click="goUrl(`${apiConfig.mainDomain}/super_partner?lang=${locale}`)"
      >{{$t('header.superPartners')}}
      </a> -->
      <!-- <nuxt-link
        class="exchange"
        :style="$route.path === '/bonus' && 'color: #F8B500'"
        to="/bonus"
      >{{$t('header.contractBonus')}} <span class="hot"></span></nuxt-link> -->
      <!-- <a
        class="exchange"
        @click="goUrl(token ? `${apiConfig.mainDomain}/usercenter/rebate?lang=${locale}` : 'https://support.tigermex.com/hc/zh-cn/articles/360032191251')"
      >{{ $t('header.invitation') }}</a> -->
      <nav class="pc-nav clearfix">
        <div class="jump-list">
          <!-- <a target="_blank" class="exchange" :href="`https://support.tigermex.com/hc/${locale}/sections/360001701593`" >{{$t('header.swapStudent')}}<span class="huo"></span></a> -->
          <!-- <nuxt-link class="exchange" to="/information/guide/start" >{{$t('header.swapStudent')}}<span class="huo"></span></nuxt-link> -->
          <!-- <a :href="`${apiConfig.mainDomain}/download`" >{{$t('header.DOWNLOAD')}}</a> -->

          <!-- <a target="_blank" :href="`https://support.tigermex.com/hc/${locale}`">{{$t('header.HELP')}}</a> -->
          <!-- <a target="_blank" :href="`https://support.tigermex.com/hc/${locale}/categories/360000051514-%E5%85%AC%E5%91%8A%E4%B8%AD%E5%BF%83`">{{$t('header.ANNOUNCEMENT')}}</a> -->
          <!-- <a v-if="token" @click="goUrl(`${apiConfig.mainDomain}/contract_asset/balance/contract?lang=${locale}&coin=${com.marginUnit}`)">{{$t('header.ASSETS')}}</a> -->
          <!-- /contract_asset/balance/contract -->
          <div
            className="header-assets"
            v-if="token"
          >
            <Assets></Assets>
          </div>
        </div>
        <div
          v-if="token"
          class="avatar-box"
        >
          <UserInfo></UserInfo>
        </div>
        <div
          v-else
          class="no-login"
        >
          <a
            @click="getUrl('register')"
            class="sign-in"
          >{{$t('header.SIGNUP')}}</a>
          <a
            @click="getUrl('login')"
            class="log-in"
          >{{$t('header.LOGIN')}}</a>
        </div>

        <!-- APP下载 -->
        <!-- <div class="app-download">
          <span class="app-name">APP</span>
          <div class="app-qr-box">
            <div class="qr-code">
              <qrcode
                :value="`${apiConfig.mainDomain}/download?lang=${locale}`"
                :options="{ width: 120, padding: 10 }"
              ></qrcode>
            </div>
            <p class="code-text">{{$t('header.appDownload')}}</p>
          </div>
        </div> -->
        <!-- <div class="switch-line">
          <SwitchLine></SwitchLine>
        </div> -->
        <div class="language">
          <SwitchLanguage />
        </div>
      </nav>
    </div>
    <div class="pc-header-m">
      <div class="pc-header-h5">
        <div class="menu">

          <img
            class="icon-close"
            src="../../assets/img/m/header/H5-ICON-close.svg"
            v-if="h5MenuShow"
            @click="h5MenuShow = !h5MenuShow"
          >
          <img
            class="icon-menu"
            src="../../assets/img/m/header/H5-ICON-Setting.svg"
            v-else
            @click="h5MenuShow = !h5MenuShow"
          >
          <a
            @clcik="goUrl(apiConfig.mainDomain + `?lang=${locale}`)"
            class="logo"
          ><img src="../../assets/img/logo.svg" /></a>
          <a
            v-if="token"
            @click="goUrl(`${apiConfig.mainDomain}/usercenter/account_information/list?lang=${locale}`)"
          >
            <img
              class="avatar"
              src="../../assets/img/m/header/H5-heads-1.svg"
              alt="avatar"
            />
          </a>
          <a
            v-else
            @click="getUrl('login')"
          >
            <img
              class="avatar"
              src="../../assets/img/m/header/H5-ICON-my1.svg"
              alt="avatar"
            />
          </a>
        </div>
        <ul
          v-if="h5MenuShow"
          class="nav-h5"
          @click="h5MenuShow = false"
        >
          <li><a @click="goUrl(apiConfig.mainDomain + `?lang=${locale}`)">{{$t('header.first')}}</a></li>
          <li> <a @click="goUrl(`${apiConfig.mainDomain}/exchange?coinPair=BTC/USDT&lang=${locale}`)">{{$t('header.EXCHANGE')}}</a></li>
          <!-- <li><nuxt-link  :style="$route.path === '/' && 'color: #F8B500'" to="/" >{{ $t('header.trade') }}</nuxt-link></li> -->
          <li>
            <nuxt-link
              :style="$route.path === '/' && 'color: #F8B500'"
              to="/"
            >{{ $t('header.realTrading') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link
              :style="$route.path === '/game/trade' && 'color: #F8B500'"
              to="/game/trade"
            >{{ $t('header.simulationTrading') }}</nuxt-link>
          </li>
          <li><a @click="goUrl(`${apiConfig.mainDomain}/c2c_trade?lang=${locale}`)">{{$t('header.c2c')}}</a></li>
          <!-- <li>
                      <a class="exchange" @click="goUrl(`${apiConfig.mainDomain}/super_partner?lang=${locale}`)" >{{$t('header.superPartners')}}</a>
                    </li> -->
          <!-- <li>
                      <nuxt-link :style="$route.path === '/m/bonus' && 'color: #F8B500'" to="/m/bonus" >{{ $t('bonus.bonus') }}</nuxt-link>
                    </li> -->
          <!-- <li>
                       <a @click="goUrl(token ? `${apiConfig.mainDomain}/assets/rebate?lang=${locale}` : 'https://support.tigermex.com/hc/zh-cn/articles/360004879913')">{{ $t('header.invitation') }}</a>
                    </li> -->
          <!-- <li>
                     <a @clcik="goUrl(`${apiConfig.mainDomain}/download`)" >{{$t('header.DOWNLOAD')}}</a>
                    </li> -->
          <!-- <li>
                     <a target="_blank" :href="`https://support.tigermex.com/hc/${locale}`">{{$t('header.HELP')}}</a>
                    </li> -->
          <!-- <li>
                      <a target="_blank" :href="`https://support.tigermex.com/hc/${locale}/categories/360000051514`">{{$t('header.ANNOUNCEMENT')}}</a>
                    </li> -->
          <li v-if="token">
            <a @click="goUrl(`${apiConfig.mainDomain}/contract_asset/balance/contract?lang=${locale}&coin=${com.marginUnit}`)">{{$t('header.ASSETS')}}</a>
          </li>
          <li
            :key="item.value"
            v-for="item in list"
            @click="changeLang(item.value)"
          >
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import ApiConfig from "../../config/api.config";
import UserInfo from "./user-info";
import Assets from "./header-assets";
import SwitchLanguage from "./switch-language";
// import SwitchLine from './line-switching.vue'
import cookie from "../../assets/js/cookie.js";
export default {
  name: "common-header",
  components: {
    UserInfo,
    Assets,
    SwitchLanguage
    // SwitchLine
  },
  data() {
    return {
      apiConfig: ApiConfig,
      show: false,
      h5MenuShow: false,
      list: [
        { name: "简体中文", value: "zh-cn" },
        { name: "繁體中文", value: "zh-tw" },
        { name: "English", value: "en-us" }
      ],
      isShowContract: false
    };
  },
  computed: {
    com() {
      return this.$store.state.com;
    },
    token() {
      return this.$store.state.auth.token;
    },
    locale() {
      return this.$store.state.auth.locale;
    },
    path() {
      return this.$route.path;
    }
  },
  watch: {
    locale() {
      if (this.locale !== "zh-cn") {
        window._MEIQIA("language", "en");
      }
    }
  },
  methods: {
    changeLang(lang) {
      this.$store.commit("auth/SET_LOCALE", {
        locale: lang
      });
      cookie.setCookie("lang", lang, 7, "/", ApiConfig.domain);
      this._i18n.locale = lang;
      this.getLocalenName();
      this.show = false;
    },
    getUrl(type) {
      window.location.href = `${this.apiConfig.mainDomain}/${type}?lang=${
        this.locale
      }&path=${escape(window.location.href)}`;
    },
    goUrl(url) {
      window.location.href = url;
    },
    showContractList() {
      this.isShowContract = true;
    },
    hideContractList() {
      this.isShowContract = false;
    }
  },
  mounted() {
    this.$store.dispatch("getUser");
    if (this.locale !== "zh-cn") {
      window._MEIQIA("language", "en");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/base";
@import "../bx-ui/font/iconfont.css";
.pc-header {
  .pc-header-m {
    display: none;
  }
  width: 100%;
  // min-width: 1200px;
  height: 60px;
  padding: 0px 10px;
  box-sizing: border-box;
  background: @L2;
  color: @L8;
  position: relative;
  z-index: 10010;
  .logo {
    text-align: center;
    float: left;
    padding-right: 30px;
    img {
      margin-top: 20px;
      width: 100px;
    }
  }
  .exchange,
  .contract {
    position: relative;
    float: left;
    height: 60px;
    line-height: 60px;
    padding-right: 30px;
    font-size: 14px;
    // color: #cdd5df;
    color: @L8;
    text-decoration: none;
    font-weight: 400;
    cursor: pointer;
    // &.one {
    //   padding-left: 60px;
    // }
    &:hover,
    &:active {
      // color: @sub-3;
      color: @main-2a;
    }
    .huo {
      position: absolute;
      top: 7px;
      right: 10px;
      background: url("../../assets/img/bonus/hot.svg") left top no-repeat;
      width: 35px;
      height: 12px;
    }
    .hot {
      position: absolute;
      top: 7px;
      right: 10px;
      background: url("../../assets/img/bonus/header_icon_hot@3x.png") left top
        no-repeat;
      background-size: cover;
      width: 18px;
      height: 22px;
    }
    .bate {
      position: absolute;
      top: 7px;
      right: 0px;
      background: url("../../assets/img/Beta.svg") left top no-repeat;
      width: 46px;
      height: 16px;
    }
  }
  .contract {
    cursor: pointer;
    > a {
      font-weight: 400;
      color: @L8;
    }
    margin-right: 15px;
    .icon-down {
      display: inline-block;
      width: 12px;
      height: 12px;
      position: absolute;
      right: 15px;
      top: 24px;
      background: url("../../assets/img/icon-down.svg") left top no-repeat;
      background-size: 100% 100%;
      transform: rotate(0);
      transition: all 0.3s linear;
    }
    > ul {
      // display: none;
      position: absolute;
      left: 0px;
      top: 10px;
      // border: 1px solid @L4;
      // box-shadow: 0 1px 6px 0 rgba(0,0,0,.15);
      background: @hintBack;
      border: 1px solid @hintBorder;
      border-radius: 4px;
      left: 50%;
      margin-left: -62px;
      top: 52px;
      // border-top: none;
      border-radius: 4px;
      padding: 8px 0px;
      a {
        display: block;
        width: 100px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        color: @hintColor;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        &:hover,
        &.active {
          background: @hintHoverBack;
          border-top: 1px solid @hintHoverBorder;
          border-bottom: 1px solid @hintHoverBorder;
        }
      }
    }

    &:hover {
      .icon-down {
        background: url("../../assets/img/icon-down-sel.svg") left top no-repeat;
        background-size: 100% 100%;
        transform: rotate(180deg);
        transition: all 0.3s linear;
      }
      > a {
        // color: @sub-3;
        color: @main-2a;
      }
    }
  }
  .pc-nav {
    float: right;
    display: flex;
    align-items: center;
    .jump-list {
      // display:inline-block;
      display: flex;
      height: 60px;
      line-height: 60px;
      padding-right: 5px;
      vertical-align: middle;
      a {
        padding: 0px 15px;
        font-size: 14px;
        // color: #cdd5df;
        color: @L8;
        text-decoration: none;
        font-weight: 400;
        &:hover,
        &:active {
          color: @i-main-2a;
        }
      }
      .exchange {
        .huo {
          right: -5px;
        }
      }
      .exchange {
        .hot {
          right: -5px;
        }
      }
    }

    .app-download {
      padding: 0px 15px;
      font-size: 14px;
      // color: #cdd5df;
      color: @L8;
      text-decoration: none;
      font-weight: 400;
      &:hover,
      &:active {
        // color: @sub-3;
        color: @main-2a;
      }
    }

    .app-download {
      position: relative;
      display: inline-block;
      text-align: center;
      .app-name {
        cursor: pointer;
        font-weight: 400;
        &:hover {
          & + .app-qr-box {
            display: block;
          }
        }
      }
      .app-qr-box {
        display: none;
        position: absolute;
        background: #fff;
        border: 1px solid #293251;
        width: 122px;
        // padding-top: 10px;

        padding-bottom: 0px;
        left: 50%;
        // top: 50%;
        margin-left: -60px;
        top: 40px;
        .qr-code {
          // width: 100px;
          // height: 100px;
          // background: pink;
          // margin: 0 auto;
          width: 100%;
          height: 120px;
        }
        > p {
          width: 100%;
          font-size: 12px;
          color: #333333;
          text-align: center;
          height: 24px;
          line-height: 20px;
          margin-top: -8px;
          position: relative;
        }
      }
    }

    .no-login {
      display: inline-block;
    }

    .sign-in,
    .log-in {
      display: inline-block;
      // border: 1px solid fade(@sub-3, 30%);
      // background: fade(@sub-3,20%);
      border: 1px solid fade(@main-2a, 30%);
      background: fade(@main-2a, 20%);
      //padding: 6px;
      min-width: 70px;
      height: 30px;
      line-height: 30px;
      color: @main-2;
      margin: 0px 10px;
      border-radius: 2px;
      cursor: pointer;
      outline: none;
      text-align: center;
      text-decoration: none;
      font-size: 12px;
      font-weight: 400;
      &.active, &:hover {
        // background: fade(@sub-3, 25%);
        background: fade(@main-2a, 25%);
        color: @mainHover;
      }
    }
    .sign-in {
      // margin-left: 20px;
    }

    .avatar-box {
      display: inline-block;
      width: 32px;
      height: 32px;
      margin: 0px 10px;
    }

    .language,
    .switch-line {
      display: inline-block;
      padding-left: 20px;
      //background: pink;
      font-size: 12px;
      font-weight: 400;
    }
  }
}
@media screen and (max-width: 750px) {
  .pc-header {
    // min-width: 100%;
    height: 50px;
    padding: 0px;
    .logo {
      img {
        margin-top: 4px;
        height: 30px;
      }
    }
    .pc-header-web {
      display: none;
    }
    .pc-header-m {
      display: block;
      .pc-header-h5 {
        width: 100%;
        height: 50px;
        padding: 0px 20px;
        box-sizing: border-box;
        background: @L2;
        color: @L9;
        position: relative;
        z-index: 10010;
        border-bottom: 1px solid @L4;
        .menu {
          display: flex;
          width: 100%;
          height: 50px;
          align-items: center;
          justify-content: space-between;
          // .icon-menu {

          // }
          .icon-menu,
          .icon-close {
            //font-size: 2rem;
            width: 26px;
            height: 26px;
          }
          .logo {
            height: 40px;
          }
          .avatar {
            height: 30px;
          }
        }
        .nav-h5 {
          width: 100%;
          background: @L1;
          padding: 0px 20px;
          position: absolute;
          left: 0px;
          top: 50px;
          li {
            border-bottom: 1px solid @L2;

            height: 50px;
            line-height: 50px;
            a {
              display: block;
              width: 100%;
              height: 100%;
              line-height: 50px;
              color: @h5NavColor;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 320px) {
  .pc-header {
    min-width: 320px;
  }
}
</style>
