<template>
 <div class="lang-box" @mouseover="show = true" @mouseleave="show = false">
        <!-- <div class="lang-mask"></div> -->
        <span class="lang-name">
          <span>{{name}}</span>
          <i :class="show?'icon-down rotate':'icon-down'"></i>
        </span>
        <ul class="lang-list" v-if="show">
              <li  :key="item.value" v-for="item in list" :class="item.value === locale ? 'active' : '' " @click="changeLang(item.value)">
              {{item.name}}
             </li>
        </ul>
      </div>
</template>
<script>
  import cookie from '../../assets/js/cookie.js'
  import ApiConfig from '../../config/api.config.js'
  export default {
    name: 'switch-language',
    components: {
    },
    data() {
      return {
        show: false,
        name: '',
        list: [
           {name: '简体中文', value: 'zh-cn'},
           {name: '繁體中文', value: 'zh-tw'},
            {name: 'English', value: 'en-us'},
            {name: '한국어', value: 'ko-kr'}
        ]
      }
    },
    computed: {
      locale() {
        return this.$store.state.auth.locale
      }
    },
    methods: {
      changeLang(lang) {
        this.$store.commit('auth/SET_LOCALE', {
          locale: lang
        })
        cookie.setCookie('lang', lang, 7, '/', ApiConfig.domain)
        this._i18n.locale = lang
        this.getLocalenName()
        this.show = false
      },
      getLocalenName() {
        let info = this.list.filter(item => {
          return item.value === this.locale
        })[0] || this.list[0]
        this.name = info.name
      },
      getBrowserLang() {
        var lang = navigator.language || navigator.userLanguage // 常规浏览器语言和IE浏览器
        // lang = lang.substr(0, 2) // 截取lang前2位字符
        if (!cookie.getCookie('lang') && lang) {
          if (lang === 'en') {
            lang = 'en-us'
          }
          this.$store.commit('auth/SET_LOCALE', {
            locale: lang
          })
          cookie.setCookie('locale', lang, 7, '/', ApiConfig.domain)
          this._i18n.locale = lang
        }
      }
    },
    mounted() {
      // this.getBrowserLang()
      this.getLocalenName()
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.lang-box {
    position: relative;
    .lang-name{
        display: inline-block;
        padding-right: 20px;
        cursor: pointer;
        height: 60px;
        line-height: 60px;
        color: @L8;
        span {
          font-weight: 400;
        }
    }
    .icon-down {
      display: inline-block;
      width: 12px;
      height: 12px;
      position:absolute;
      right: 5px;
      top: 24px;
      background: url("../../assets/img/icon-down.svg") left top no-repeat;
      background-size: 100% 100%;
      transform: rotate(0);
      transition: all .3s linear;
    }
    &:hover {
      .icon-down {
        background: url("../../assets/img/icon-down-sel.svg") left top no-repeat;
        background-size: 100% 100%;
        transform: rotate(180deg);
        transition: all .3s linear;
      }
      .lang-name {
        color: @main-2a;
      }
    }
    .lang-list {
        position: absolute;
        background: @hintBack;
        border: 1px solid @hintBorder;
        border-radius: 4px;
        padding: 8px 0px;
        width: 100px;
        text-align: center;
        right: -5px;
        top: 52px;
        font-size: 12px;
        z-index: 1000;
        li {
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            color: @hintColor;
            &:hover {
              background: @hintHoverBack;
              border-top: 1px solid @hintHoverBorder;
              border-bottom: 1px solid @hintHoverBorder;
            }
        }

    }
    .lang-mask {
        position: fixed;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
    }



}
</style>
