<template>
    <div class="line-switching-box" @mouseover="show = !showGuide" @mouseleave="show = false">
        <div class="name">
            <span>{{currentHost === 'api.tigermex.com'?$t('header.lineSwitch3'):(currentHost === 'api.ginfexapp.top' ? $t('header.lineSwitch2') :$t('header.lineSwitch1'))}}</span>
            <i :class="show ? 'iconDown rotate' : 'iconDown'"></i>
        </div>
        <div class="guide-mask" @click="showGuide = false" v-if="showGuide"></div>
        <div class="guide" v-if="showGuide">
            <p>{{$t('header.lineSwitchGuide')}}</p>
            <div><span class="close"  @click="showGuide = false">{{$t('bonus.ino')}}</span></div>
        </div>
        <ul class="list" v-if="!showGuide && show">
            <li @click="switchLine('api.ginfexapp.vip')">{{$t('header.lineSwitch1')}}</li>
            <li @click="switchLine('api.ginfexapp.top')">{{$t('header.lineSwitch2')}}</li>
            <li @click="switchLine('api.tigermex.com')">{{$t('header.lineSwitch3')}}</li>
        </ul>
    </div>
</template>
<script>
import ApiConfig from '../../config/api.config.js'
import cookie from '../../assets/js/cookie.js'
export default {
  name: 'switch-line',
  components: {
  },
  data() {
    return {
      show: false,
      currentHost: '',
      showGuide: false
    }
  },
  methods: {
    hideList() {
      this.show = false
    },
    showList() {
      this.show = !this.showGuide
    },
    switchLine(host) {
      cookie.setCookie('host', host, 7, '/', ApiConfig.domain)
      setTimeout(() => {
        window.location.reload()
      }, 200)
    }
  },
  mounted() {
    let c_host = cookie.getCookie('host')
    this.currentHost = c_host || 'api.ginfexapp.vip'
    let showGuide = localStorage.getItem('isShowGuide')
    if (!showGuide) {
      localStorage.setItem('isShowGuide', 'true')
      this.showGuide = true
    } else {
      this.showGuide = false
    }
  }
}
</script>
<style lang="less" scoped>
@menuDropDownColorBlue: #BDD1EF;
@menuDropDownHoverBack: #1E253B;
@menuDropDownColorWhite: #f2f3f4;
@menuDropDownBack: #283149;
.line-switching-box {
    position: relative;
    >.name {
        display: inline-block;
        padding-right: 15px;
        cursor: pointer;
        height: 60px;
        line-height: 60px;
        color: #97b0d6;
        font-weight: 400;
        font-size: 12px;
        span {
          font-weight: 400;
        }
        &:hover {
            .iconDown {
                background: url("../../assets/img/icon-down-sel.svg") left top no-repeat;
                background-size: 100% 100%;
                transform: rotate(180deg);
                transition: all .3s linear;
            }
            color: rgb(95, 142, 212);
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
    .list {
        position: absolute;
        // box-shadow: 0 1px 6px 0 rgba(0,0,0,.15);
        border: 1px solid @L2;
        background: @L1;
        border-radius: 6px;
        padding: 8px 0px;
        width: 100px;
        text-align: center;
        right: -15px;
        top: 50px;
        font-size: 12px;
        z-index: 1000;
        font-weight: 300;
        li {
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            cursor: pointer;
            // color: #cad2dc;
            color: @menuDropDownColorBlue;
            &:hover,&.active {
              background: rgba(49,58,86,30.3);
            }
        }
    }
    .guide-mask {
        position: fixed;
        z-index: 12000;
        width: 100%;
        height: 100%;
        // background: pink;
        left: 0px;
        top: 0px;
    }
    .guide{
        position: absolute;
        z-index: 12100;
        white-space:nowrap;
        padding: 10px;
        text-align: center;
        right: -95px;
        top: 50px;
        font-size: 12px;
        background: #ffffff url("../../assets/img/ICON-WIFI.svg") 20px 10px no-repeat;
        background-size: 40px auto;
        padding-left: 60px;
        >p {
            color: #191a1f;
            padding: 10px;
        }
        >div {
            text-align: right;
            padding-right: 10px;
            >span {
                font-size: 12px;
                color: #4b8cdc;
                cursor: pointer;
                &:hover {
                    color: #F8B500;
                }
            }
        }
        &::after {
            content: '';
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #ffffff;
            position: absolute;
            left: 50%;
            top: -6px;
            margin-left: 38px;
            transform: rotate(45deg);
        }
    }
}
</style>
