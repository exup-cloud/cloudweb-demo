<template>
   <div class="bonus-index">
    <div class="bonus-index-title">
          <h1>{{ $t('bonus.title') }}</h1>
          <p>{{ $t('bonus.message') }}</p>
    </div>
    <div class="bonus-index-content">
      <!-- <div class="bonus-index-content-top">
        <h3>{{ $t('bonus.myTrade') }}<span>{{ `${total}.00 USDT` }}</span></h3>
        <p>{{ $t('bonus.dataTime') }}</p>
      </div>
      <div class="bonus-index-content-center" >
        <st-row justify="between" align="center"><span>{{ $t('bonus.totalPeople', {num: child_count}) }}</span><a @click="moveCopyFn" class="btn">{{ $t('bonus.copy') }}</a></st-row>
        <st-row justify="between" align="center"><span>{{ $t('bonus.cumulative', {coin: 'USDT'}) }}{{ vol + ' USDT' }}</span><a @click="go(1, `${apiConfig.mainDomain}/assets/deposit_withdrawal/deposit?lang=${locale}`)">{{ $t('bonus.recharge') }}</a></st-row>
      </div> -->
      <div class="bonus-index-content-bottom">
        <h6>{{$t('bonus.stayGold')}}</h6>
        <st-row justify="between" class="active-block">
            <div class="info hot">
                <div style="margin-bottom: 5px;"><img src="../../../assets/img/bonus/icon-Grade2.svg" alt="" class="sign"></div>
                <div class="con-box">
                  <h3>{{ $t('bonus.getLv2Tit') }}</h3>
                  <p class="con">{{ $t('bonus.getLv2Con') }}</p>
                </div>
                <p><a :class="{noClick: lv2Reward}" @click="lv2RewardFn">{{ lv2Reward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
            </div>
            <!-- <div class="info hot">
                <div style="margin-bottom: 5px;"><img src="../../../assets/img/bonus/icon-giving.svg" alt="" class="sign"></div>
                <h3>2 USDT</h3>
                <p class="con">{{ $t('bonus.newUser2USDT') }}</p>
                <p><a :class="{noClick: newUserReward}" @click="newUserRewardFn">{{ newUserReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
            </div>
            <div class="info hot">
                <div style="margin-bottom: 5px;"><img src="../../../assets/img/bonus/icon-giving.svg" alt="" class="sign"></div>
                <h3>5 USDT</h3>
                <p class="con">{{ $t('bonus.trade5USDT') }}</p>
                <p><a :class="{noClick: tradeReward}" @click="tradeRewardFn">{{ tradeReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
            </div> -->
            <div class="info">
              <div style="margin-bottom: 5px;"><img src="../../../assets/img/bonus/icon-Signin.svg" alt=""></div>
              <div class="con-box">
                <h3>100 TUSD</h3>
                <p class="con">{{ $t('bonus.signTUSD') }}</p>
              </div>
              <p><a :class="{noClick: signReward}" @click="signRewardFn">{{ signReward ? $t('bonus.signTUSDReceived') : $t('bonus.receive') }}</a></p>
           </div>
           <div class="info">
              <div style="margin-bottom: 5px;"><img src="../../../assets/img/bonus/Icon-TUSD.svg" alt=""></div>
              <div class="con-box">
                <h3>10,000 TUSD</h3>
                <p class="con">{{ $t('bonus.openTUSD') }}</p>
              </div>
              <p><a :class="{noClick: openAccountReward}" @click="openAccountRewardFn">{{ openAccountReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
           </div>
           <div class="info">
              <div style="margin-bottom: 5px;"><img src="../../../assets/img/bonus/icon-1.svg" alt=""></div>
              <div class="con-box">
                <h3>{{ $t('bonus.openTrade') }}</h3>
                <p class="con">{{ $t('bonus.send') }}{{ '10USDT' }}</p>
              </div>
              <p><a :class="{noClick: openUSDTAccountReward}" @click="openUSDTAccountRewardFn">{{ openUSDTAccountReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
              <!-- <p><a :class="{noClick: true}">{{ $t('bonus.end') }}</a></p> -->
           </div>
            <!-- <div class="info">
              <div style="margin-bottom: 5px;"><img src="../../../assets/img/bonus/icon-2.svg" alt=""></div>
              <div class="con-box">
                <h3>{{ $t('bonus.first') }}</h3>
                <p class="con">{{ $t('bonus.send') }}{{ '100USDT' }}</p>
              </div>
              @click="depositRewardFn"
              depositReward ? $t('bonus.end') : $t('bonus.receive')
              <p><a :class="{noClick: depositReward}" @click="depositRewardFn">{{ depositReward ? $t('bonus.end') : $t('bonus.receive') }}</a></p>
           </div> -->
         </st-row>
      </div>
      <!-- <div class="bonus-index-content-bottom">
         <h6>{{ $t('bonus.endActive') }}</h6>
         <st-row justify="between">
           <div class="info">
              <div><img src="../../../assets/img/m/bonus/icon-1.svg" alt=""></div>
              <div class="con-box">
                <p>{{ $t('bonus.openTrade') }}</p>
                <p class="con">{{ $t('bonus.send') }}{{ '10USDT' }}</p>
              </div>
              <p><a :class="{noClick: true}">{{ $t('bonus.end') }}</a></p>
           </div>
            <div class="info">
              <div><img src="../../../assets/img/m/bonus/icon-2.svg" alt=""></div>
              <div class="con-box">
                <p>{{ $t('bonus.first') }}</p>
                <p class="con">{{ $t('bonus.send') }}{{ '100USDT' }}</p>
              </div>
              <p><a :class="{noClick: true}" >{{ $t('bonus.end') }}</a></p>
              <p><a :class="{noClick: depositReward}" @click="depositRewardFn">{{ depositReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
           </div>
          <div class="info">
              <div><img src="../../../assets/img/m/bonus/icon-3-H5@2x.png" alt=""></div>
              <p>{{ $t('bonus.palce') }}</p>
              <p>{{ $t('bonus.send') }}{{ '20USDT' }}</p>
              <p><a :class="{noClick: true}" href="javascirpt:void(0)">{{ $t('bonus.noOpen') }}</a></p>
           </div>
         </st-row>
      </div> -->
    </div>
      <div class="bonus-index-message">
       <p>{{ $t('bonus.activeOne') }}</p>
       <p>{{ $t('bonus.activeTwo') }}</p>
       <p>{{ $t('bonus.activeThree') }}</p>
       <p>{{ $t('bonus.activeFore') }}</p>
       <p>{{ $t('bonus.activeFive') }}</p>
       <p>{{ $t('bonus.activeSix') }}</p>
       <!-- <p>{{ $t('bonus.activeSeven') }}</p> -->
       <p>{{ $t('bonus.activeEight') }}</p>
    </div>
     <popup :title="info.title"  :width="windowWidth" :callback="messageClose" v-if="isMessage">
            <web-message-window @go="go(info.type, info.href)" :info="info" :close="messageClose"></web-message-window>
       </popup>
          <popup :title="$t('bonus.smTitle')"  :width="windowWidth" :callback="smClose" v-if="isSm">
            <sm-window :close="smClose"></sm-window>
       </popup>


       <popup :title="$t('bonus.tips')" :width="300" v-if="haveBindPhoneTips" :callback="haveBindPhoneTipsClose">
        <div class="bind-phone-box">
          <p>{{$t('bonus.pleaseBindPhone')}}</p>
          <a @click="go(3)">{{$t('bonus.gotoBind')}}</a>
        </div>
      </popup>

      <popup :title="$t('bonus.tips')" :width="300" v-if="haveOpenGusdTips" :callback="haveOpenGusdTipsClose">
        <div class="to-open-gusd">
          <p>{{$t('bonus.openTUSDFirst')}}</p>
          <a @click="haveOpenGusdTipsClose">{{$t('bonus.ino')}}</a>
        </div>
      </popup>
   </div>
</template>
<script>
import ClipboardJS from 'clipboard'
import ApiConfig from '../../../config/api.config'
import cookie from '../../../assets/js/cookie.js'
import WebMessageWindow from '../../../components/bonus/web-message-window'
import SmWindow from '../../../components/bonus/sm-window'
import Util from '../../../assets/js/util.js'
export default {
  name: 'bonus-index',
  layout: 'm',
  components: {
    WebMessageWindow,
    SmWindow
  },
  data() {
    return {
      Util: Util,
      total: 0,
      apiConfig: ApiConfig,
      copy: null,
      // 检查模拟合约账户开通奖励是否被领取
      openAccountReward: true,
      // 检查真实合约账户开通奖励是否被领取
      openUSDTAccountReward: false,
      // 检查合约充值奖励是否被领取
      depositReward: true,
      // 邀请人数
      child_count: 0,
      isMessage: false,
      info: null,
      // 领取赠金步骤
      openConditions: null,
      // 领取开通真实合约赠金步骤
      openUSDTConditions: null,
      // 领取首次充值步骤
      depositConditions: null,
      vol: 0,
      validation: null,
      isSm: false,
      width: 440,
      isAndroid: false,
      isiOS: false,
      havePhone: false,
      isOpenGusd: false,
      haveBindPhoneTips: false,
      //  去绑定手机号弹框
      haveOpenGusdTips: false,
      //  是已否领取签到奖励
      signReward: false,
      signConditions: false,
      lv2Reward: false, // 是否领取lv2手续费奖励
      lv2Conditions: false,
      newUserReward: false, // 是否领取了新用户奖励
      newUserConditions: false,
      tradeReward: false, // 是否领取合约交易量达2万的奖励
      tradeConditions: false
    }
  },
  computed: {
    locale() {
      return this.$store.state.auth.locale
    },
    windowWidth() {
      return String(this.$store.state.m.windowWidth)
    },
    user() {
      return this.$store.state.auth.userInfo
    }
  },
  watch: {
    locale() {
      this.getValidation()
    },
    user() {
      if (this.user) {
        this.havePhone = this.user.phone
      }
    }
  },
  methods: {
    getValidation() {
      this.validation = {
        KYC_AUTH: {
          title: this.$t('bonus.validation.kycTitle'),
          message: this.$t('bonus.validation.kycMessge'),
          href: '',
          hrefTitle: this.$t('bonus.validation.kycGo'),
          type: 5
        },
        // OPEN_CONTRACT_ACCOUNT: {
        //   title: this.$t('bonus.validation.openTitle'),
        //   message: this.$t('bonus.validation.openMessge'),
        //   href: ApiConfig.swapsDomain + '?id=1',
        //   hrefTitle: this.$t('bonus.validation.openGo'),
        //   type: 2
        // },
        OPEN_USDT_CONTRACT_ACCOUNT: {
          title: this.$t('bonus.validation.openTitle'),
          message: this.$t('bonus.openUSDTFirst'),
          href: ApiConfig.swapsDomain + '/',
          hrefTitle: this.$t('bonus.validation.openGo')
        },
        OPEN_CONTRACT_ACCOUNT: {
          title: this.$t('bonus.validation.openTitle'),
          message: this.$t('bonus.openTUSDFirst'),
          href: ApiConfig.mainDomain + 'game/trade',
          hrefTitle: this.$t('bonus.ino'),
          type: 0
        },
        CUMULATION_DEPOSIT_VOL: {
          title: this.$t('bonus.validation.addTitle'),
          message: this.$t('bonus.validation.addMessge'),
          href: '',
          hrefTitle: this.$t('bonus.ino'),
          type: 1
        },
        BIND_PHONE: {
          title: this.$t('bonus.validation.phoneTitle'),
          message: this.$t('bonus.validation.phoneMessage'),
          href: '',
          hrefTitle: this.$t('bonus.validation.phoneGo'),
          type: 3
        },
        CUMULATION_TRADE_VOL: {
          title: this.$t('bonus.unstandardTit'),
          message: '',
          href: ApiConfig.swapsDomain + '',
          hrefTitle: this.$t('bonus.continueTrade'),
          type: 0
        },
        CUMULATION_DEPOSIT_COUNT: {
          title: this.$t('bonus.unstandardTit'),
          message: this.$t('bonus.unstandardCon1'),
          href: ApiConfig.swapsDomain + '',
          hrefTitle: this.$t('bonus.continueTrade'),
          type: 0
        },
        CUMULATION_TRADE_COUNT: {
          title: this.$t('bonus.unstandardTit'),
          message: this.$t('bonus.unstandardCon1'),
          href: ApiConfig.swapsDomain + '',
          hrefTitle: this.$t('bonus.continueTrade'),
          type: 0
        }
      }
    },
    smClose() {
      this.isSm = false
    },
    messageClose() {
      this.isMessage = false
    },
    copyFn() {
      let uid = cookie.getCookie('uid')
      let href = `${this.apiConfig.mainDomain}/register?inviter=${uid}&lang=${this.locale}`
      this.copy = new ClipboardJS('.btn', {
        text: function () {
          return href
        }
      })
      this.$alert('s', this.$t('bonus.copyMessage'))
    },
    moveCopyFn() {
      let obj = {
        cyInfo: `${this.apiConfig.mainDomain}/register?inviter=${this.$route.query.uid}&lang=${this.locale}`
      }
      if (this.isAndroid) {
        window.bridge.Copy2Clipboard(JSON.stringify(obj))
      } else if (this.isiOS) {
        window.webkit.messageHandlers.Copy2Clipboard.postMessage(JSON.stringify(obj))
      } else {
        this.copyFn()
      }
    },
    getTotal() {
      let total = 0
      if (this.openAccountReward) {
        total += 10
      }
      if (this.depositReward) {
        total += 100
      }
      return total
    },
    getDate() {
      // Promise.all([this.swapsApi.checkBonusTask('OpenTUSDContractReward'), this.swapsApi.checkBonusTask('DepositReward-1'), this.swapsApi.checkBonusTask('CheckInTask'), this.swapsApi.checkBonusTask('AccountLevelTask'), this.swapsApi.checkBonusTask('OpenUSDTContractReward')])
      Promise.all([this.swapsApi.checkBonusTask('OpenTUSDContractReward'), this.swapsApi.checkBonusTask('CheckInTask'), this.swapsApi.checkBonusTask('AccountLevelTask'), this.swapsApi.checkBonusTask('OpenUSDTContractReward')])
      .then(res => {
        // 是否领取开通模拟合约奖励
        this.openAccountReward = res[0].data.participated
        this.openConditions = res[0].data.conditions
        // console.log('res[0].data.conditions####', res[0].data.conditions)
        // 充值奖励
        // this.depositReward = res[1].data.participated
        // this.depositConditions = res[1].data.conditions
        // this.vol = res[1].data.vol
        // this.total = this.getTotal()

        //  是否已领取签到奖励
        this.signReward = res[1].data.participated
        this.signConditions = res[1].data.conditions
        // 是否领取lv2奖励
        this.lv2Reward = res[2].data.participated
        this.lv2Conditions = res[2].data.conditions
        // // 是否领取新用户首次入金，成交两笔奖励
        // this.newUserReward = res[5].data.participated
        // this.newUserConditions = res[5].data.conditions
        // // 是否领取交易额满2万的奖励
        // this.tradeReward = res[6].data.participated
        // this.tradeConditions = res[6].data.conditions
        // let tradeConditions = res[6].data.conditions || []
        // tradeConditions.forEach((item) => {
        //   if (item.key === 'CUMULATION_TRADE_VOL') {
        //     this.validation['CUMULATION_TRADE_VOL'].message = this.$t('bonus.unstandardCon2', {price: Util.retainDecimals(item.cur_vol, {decimal: 2})})
        //   }
        // })
        // 是否领取真实合约奖励
        this.openUSDTAccountReward = res[3].data.participated
        this.openUSDTConditions = res[3].data.conditions
      }).catch(e => {
        // console.log('catch')
        // this.go(4) //跳登录
      })
    },
    // 领取开通合约奖励(真实合约)
    openUSDTAccountRewardFn() {
      if (!this.openUSDTAccountReward) {
        for (let item in this.openUSDTConditions) {
          let obj = this.openUSDTConditions[item]
          if (!obj.status) {
            if (obj.key === 'OPEN_CONTRACT_ACCOUNT') {
              this.info = this.validation['OPEN_USDT_CONTRACT_ACCOUNT']
            } else {
              this.info = this.validation[obj.key]
            }
            this.isMessage = true
            return false
          }
        }

        this.swapsApi.receiveReward('OpenUSDTContractReward')
        .then(res => {
          if (res.message === 'Success') {
            this.openUSDTAccountReward = true
            this.total = this.getTotal()
            this.$alert('s', this.$t('bonus.receiveSuccess'))
          }
        })
      } else {
        return false
      }
    },
    // 领取模拟合约开通奖励
    openAccountRewardFn() {
      if (!this.openAccountReward) {
        for (let item in this.openConditions) {
          let obj = this.openConditions[item]
          if (!obj.status) {
            this.info = this.validation[obj.key]
            this.isMessage = true
            return false
          }
        }

        this.swapsApi.receiveReward('OpenTUSDContractReward')
        .then(res => {
          if (res.message === 'Success') {
            this.openAccountReward = true
            this.total = this.getTotal()
            this.$alert('s', this.$t('bonus.receiveSuccess'))
          }
        })
      } else {
        return false
      }
    },
    signRewardFn() {
      if (!this.$store.state.auth.token) {
        window.location.href = `${this.apiConfig.mainDomain}/login?lang=${this.locale}&path=${escape(window.location.href)}`
        return false
      }

      if (!this.signReward) { //  是否领取了签到奖励
        for (let item in this.signConditions) {
          let obj = this.signConditions[item]
          if (!obj.status) {
            this.info = this.validation[obj.key]
            this.isMessage = true
            return false
          }
        }

        this.swapsApi.signTask()
        .then(res => {
          if (res.message === 'Success') {
            this.signReward = true
            this.$alert('s', this.$t('bonus.receiveSuccess'))
          }
        })
      } else {
        return false
      }
    },
    depositRewardFn() {
      if (!this.depositReward) {
        for (let item in this.depositConditions) {
          let obj = this.depositConditions[item]
          if (!obj.status) {
            this.info = this.validation[obj.key]
            this.isMessage = true
            return false
          }
        }
      } else {
        return false
      }
      this.swapsApi.receiveReward('DepositReward-1')
      .then(res => {
        if (res.message === 'Success') {
          this.depositReward = true
          this.total = this.getTotal()
          // this.$alert('s', this.$t('bonus.receiveSuccess'))
          let obj = {
            content: this.$t('bonus.receiveSuccess')
          }
          if (this.isAndroid) {
            window.bridge.toast(JSON.stringify(obj))
          } else if (this.isiOS) {
            window.webkit.messageHandlers.toast.postMessage(JSON.stringify(obj))
          } else {
            this.$alert('s', this.$t('bonus.receiveSuccess'))
          }
        }
      })
    },
    // 领取Lv2奖励
    lv2RewardFn() {
      if (!this.$store.state.auth.token) {
        window.location.href = `${this.apiConfig.mainDomain}/login?lang=${this.locale}&path=${escape(window.location.href)}`
        return false
      }
      // this.lv2Reward = res[4].data.participated
      //   this.lv2Conditions = res[4].data.conditions
      if (!this.lv2Reward) { //  是否领取了签到奖励
        for (let item in this.lv2Conditions) {
          let obj = this.lv2Conditions[item]
          if (!obj.status) {
            this.info = this.validation[obj.key]
            this.isMessage = true
            return false
          }
        }

        this.swapsApi.receiveReward('AccountLevelTask')
        .then(res => {
          if (res.message === 'Success') {
            this.lv2Reward = true
            this.$alert('s', this.$t('bonus.receiveSuccess'))
          }
        })
      } else {
        return false
      }
    },
    // 领取新用户奖励
    newUserRewardFn() {
      if (!this.$store.state.auth.token) {
        window.location.href = `${this.apiConfig.mainDomain}/login?lang=${this.locale}&path=${escape(window.location.href)}`
        return false
      }

      if (!this.newUserReward) { //  是否领取了签到奖励
        for (let item in this.newUserConditions) {
          let obj = this.newUserConditions[item]
          if (!obj.status) {
            this.info = this.validation[obj.key]
            this.isMessage = true
            return false
          }
        }

        this.swapsApi.receiveReward('DepositTradeTask')
        .then(res => {
          if (res.message === 'Success') {
            this.newUserReward = true
            this.$alert('s', this.$t('bonus.receiveSuccess'))
          }
        })
      } else {
        return false
      }
    },
    // 领取交易额满2万奖励
    tradeRewardFn() {
      if (!this.$store.state.auth.token) {
        window.location.href = `${this.apiConfig.mainDomain}/login?lang=${this.locale}&path=${escape(window.location.href)}`
        return false
      }

      if (!this.tradeReward) { //  是否领取了签到奖励
        for (let item in this.tradeConditions) {
          let obj = this.tradeConditions[item]
          // console.log('obj###', obj)
          if (!obj.status) {
            this.info = this.validation[obj.key]
            this.isMessage = true
            return false
          }
        }

        this.swapsApi.receiveReward('TradeVolTask')
        .then(res => {
          if (res.message === 'Success') {
            this.tradeReward = true
            this.$alert('s', this.$t('bonus.receiveSuccess'))
          }
        })
      } else {
        return false
      }
    },
    // 获取累计邀请人数
    getNum() {
      this.swapsApi.rebates().then(res => {
        this.child_count = res.data.rebate.child_count
      })
    },
    setUserCookie() {
      // cookie.setCookie('ssid', this.$route.query.ssid, 1, '/',this.apiConfig.mainDomain)
      let lang = this.$route.query.lang
      cookie.setCookie('uid', this.$route.query.uid, 1, '/', this.apiConfig.domain)
      cookie.setCookie('lang', lang, 1, '/', this.apiConfig.domain)
      cookie.setCookie('token', this.$route.query.token, 1, '/', this.apiConfig.domain)
      cookie.setCookie('version', this.$route.query.version, 1, '/', this.apiConfig.domain)
      cookie.setCookie('options', this.$route.query.options, 1, '/', this.apiConfig.domain)
      this.$store.commit('auth/SET_LOCALE', {
        locale: lang
      })
      this._i18n.locale = lang
      this.$store.commit('auth/SET_TOKEN', {
        token: this.$route.query.token
      })
    },
    isAndroidOrIOS() {
      var u = navigator.userAgent
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    },
    go(type, href) {
      // alert(type)
      let obj = {
        to: type,
        coin_code: 'USDT'
      }

      if (!type || type === 2) {
        this.messageClose()
        return false
      }
      // console.log('type####', type)
      // console.log('href####', href)
      if (this.isAndroid) {
        try {
          window.bridge.jumpTo(JSON.stringify(obj))
        } catch (err) {
          // console.log('isandroid')
          // return false
          window.location.href = href
        }
      } else if (this.isiOS) {
        try {
          window.webkit.messageHandlers.jumpTo.postMessage(JSON.stringify(obj))
        } catch (err) {
          // console.log('is ios')
          // return false
          window.location.href = href
        }
      } else {
        // console.log('else')
        // return false
        window.location.href = href
      }
    },
    haveBindPhoneTipsClose() {
      this.haveBindPhoneTips = false
    },
    haveOpenGusdTipsClose() {
      this.haveOpenGusdTips = false
    },
    gotoBindPhone() {

    },
    gotoOpenTUSD() {

    }
    // depositReward(type) {
    //   let data = {
    //     url: config.swapsUrl + '/ifcontract/activity/openAccountReward?action=' + type,
    //     method: 'GET',
    //     body: '',
    //     succeedCallback: '',
    //     failCallBack: ''
    //   }
    //   if (this.isAndroid) {
    //     window.bridge.HttpRequest(JSON.stringify(data))
    //   } else if (this.isiOS) {
    //     window.webkit.messageHandlers.HttpRequest.postMessage(JSON.stringify(data))
    //   }
    // }
  },
  mounted() {
    if (this.$route.query.token) {
      this.isAndroidOrIOS()
      this.setUserCookie()
    }
    if (this.$store.state.auth.token) {
      this.getValidation()
      // this.$store.dispatch('getUser')
      this.getDate()
      this.getNum()
      this.validation.BIND_PHONE.href = ApiConfig.mainDomain + '/usercenter/account_information/bind_phone?lang=' + this.locale
      this.validation.KYC_AUTH.href = ApiConfig.mainDomain + '/usercenter/kyc?lang=' + this.locale
      this.validation.CUMULATION_DEPOSIT_VOL.href = `${ApiConfig.mainDomain}/assets/deposit_withdrawal/deposit?lang=${this.locale}`
    } else {
      // window.location.href = `${this.apiConfig.mainDomain}/login?lang=${this.locale}&path=${escape(window.location.href)}`
    }
  },
  created() {
  }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/base.less";
.bonus-index {
  //  height: 1080px;
  //  margin-bottom: 50px;
   background: url('../../../assets/img/m/bonus/bg-1@2x.png') no-repeat;
   background-size: 100%;
   background-color: @L1;
   .bonus-index-title {
     padding-top: .4rem;
     h1,p {
       text-align: center;
     }
     h1 {
       padding-top: .3rem;
       color: #e6b991;
       font-size: .50rem;
       font-weight: 400;
       text-shadow: 0 .03rem .04rem #232732;
     }
     p {
       color: #fffdf9;
       font-size: .26rem;
       padding: .1rem 0 .2rem;
     }
   }
   .bonus-index-content {
     margin: .5rem auto 0;
     width: 6.9rem;
     background-color: @L2;
     .bonus-index-content-top {
       padding: .3rem 0 .2rem;
       text-align: center;
       h3 {
         line-height: .58rem;
         font-size: .34rem;
         color: #fffdf9;
         font-size: 400;
         span {
           color: #e6b991;
         }
       }
       p {
         line-height: .38rem;
         font-size: .22rem;
         color: #fffdf9;
       }
     }
     .bonus-index-content-center {
       margin: 0 .3rem;
       padding: .34rem 0;
      //  height: 90px;
       border-top: 1px solid #373f53;
       border-bottom: 1px solid #373f53;
       font-size: .28rem;
       div:last-child {
         margin-top: .34rem;
       }
       span {
         color: #fffdf9;
       }
       a {
         margin-left: .24rem;
         display: inline-block;
         height: .48rem;
         width: 1.8rem;
         font-size: .26rem;
         line-height: .48rem;
         color: #2e3345;
         background: #e6b991;
         text-align: center;
         font-weight: 400;
         &:hover {
            background: #E8BF9A;
          }
       }
     }
     .bonus-index-content-bottom {
       h6 {
        //  margin-left: 25px;
        //  height: 80px;
        //  line-height: 80px;
         font-size: 14px;
         color: #fffdf9;
         padding: 10px 0px;
         background: @L1;
         padding-left: 15px;
       }
      &>div {
        flex-wrap: wrap;
        padding: 15px;
      }
      // padding: .3rem;
      // padding-bottom: 0px;
       .info {
          // padding-top: .1rem;
          width: 3rem;
          // min-height: 3rem;
          padding-bottom: 10px;
          background: @L3;
          text-align: center;
          // height: 230px;
          height: 220px;
          margin-bottom: 15px;
          // &:last-child {
          //   margin-top: .3rem;
          // }
          div {
            margin: .24rem;
            img {
              width: 1rem;
              height: 1rem;
            }
          }
          .con-box {
            height: 90px;
          }
          h3 {
            color: #fcc194;
            font-size: 16px;
            padding-bottom: 5px;
          }
          p {
            color: #fffdf9;
            font-size: .2rem;
            a {
              margin-top: .1rem;
              display: inline-block;
              height: .48rem;
              width: 1.5rem;
              line-height: .48rem;
              color: #2e3345;
              background: #e6b991;
              text-align: center;
              font-weight: 400;
              &:hover {
                background: #E8BF9A;
              }
              &.noClick {
                background: #a5acc0;
              }
            }
          }
          .con {
            // height: 90px;
            height: 70px;
            font-size: 12px;
            padding: 0px 4px;
          }
          &.hot {
            background-image: url('../../../assets/img/m/bonus/128772877044550991.png');
            background-repeat:  no-repeat;
            background-position: -6px -6px;
            background-size: 1rem 1rem;
          }
       }
     }
   }
   .bonus-index-message {
       margin: 0 .48rem;
       padding: .24rem .1rem;
       p {
        //  height: 24px;
         margin-bottom: .2rem;
         line-height: .36rem;
         color: #fffdf9;
         font-size: .26rem;
         word-wrap: break-word;
         word-break: break-all;
        //  overflow: hidden;
         &:first-child {
           margin-bottom: .12rem;
         }
       }
     }
  .bind-phone-box, .to-open-gusd {
     text-align: center;
     padding: 0px 44px;
     p {
       color: #060606;
       height: 74px;
       padding-top: 30px;
     }

     a {
       display: block;
       width: 100%;
       height: 50px;
       line-height: 50px;
       background: #F8B500;
       margin-top: 20px;
       color: #fff;
       font-size: 16px;
     }
  }
}
</style>
