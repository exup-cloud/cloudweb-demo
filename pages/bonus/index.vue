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
      </div> -->
      <!-- <st-row class="bonus-index-content-center" justify="between" align="center">
        <div><span>{{ $t('bonus.totalPeople', {num: child_count}) }}</span><a @click="copyFn" class="btn">{{ $t('bonus.copy') }}</a></div>
        <div><span>{{ $t('bonus.cumulative', {coin: 'USDT'}) }}{{ vol + ' USDT' }}</span><a :href="`${apiConfig.mainDomain}/assets/deposit_withdrawal/deposit?lang=${locale}`">{{ $t('bonus.recharge') }}</a></div>
      </st-row> -->
      <div class="bonus-index-content-bottom">
        <h6>{{$t('bonus.stayGold')}}</h6>
        <st-row
          justify="start"
          class="active-block"
        >
          <div class="info hot">
            <div style="margin-bottom: 10px;"><img
                src="../../assets/img/bonus/icon-Grade2.svg"
                alt=""
                class="sign"
              ></div>
            <h3>{{ $t('bonus.getLv2Tit') }}</h3>
            <p class="con">{{ $t('bonus.getLv2Con') }}</p>
            <p><a
                :class="{noClick: lv2Reward}"
                @click="lv2RewardFn"
              >{{ lv2Reward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
          </div>
          <!-- <div class="info hot">
              <div style="margin-bottom: 10px;"><img src="../../assets/img/bonus/icon-giving.svg" alt="" class="sign"></div>
              <h3>2 USDT</h3>
              <p class="con">{{ $t('bonus.newUser2USDT') }}</p>
              <p><a :class="{noClick: newUserReward}" @click="newUserRewardFn">{{ newUserReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
           </div>
           <div class="info hot">
              <div style="margin-bottom: 10px;"><img src="../../assets/img/bonus/icon-giving.svg" alt="" class="sign"></div>
              <h3>5 USDT</h3>
              <p class="con">{{ $t('bonus.trade5USDT') }}</p>
              <p><a :class="{noClick: tradeReward}" @click="tradeRewardFn">{{ tradeReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
           </div> -->
          <div class="info">
            <div style="margin-bottom: 10px;"><img
                src="../../assets/img/bonus/icon-Signin.svg"
                alt=""
                class="sign"
              ></div>
            <h3>100 TUSD</h3>
            <p class="con">{{ $t('bonus.signTUSD') }}</p>
            <p><a
                :class="{noClick: signReward}"
                @click="signRewardFn"
              >{{ signReward ? $t('bonus.signTUSDReceived') : $t('bonus.receive') }}</a></p>
          </div>
          <div class="info">
            <div style="margin-bottom: 10px;"><img
                src="../../assets/img/bonus/Icon-TUSD.svg"
                alt=""
              ></div>
            <h3>10,000 TUSD</h3>
            <p class="con">{{ $t('bonus.openTUSD') }}</p>
            <p><a
                :class="{noClick: openAccountReward}"
                @click="openAccountRewardFn"
              >{{ openAccountReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
          </div>
          <div class="info">
            <div style="margin-bottom: 10px;"><img
                src="../../assets/img/bonus/icon-1.svg"
                alt=""
              ></div>
            <h3>{{ $t('bonus.openTrade') }}</h3>
            <p class="con">{{ $t('bonus.send') }}{{ '10USDT' }}</p>
            <p><a
                :class="{noClick: openUSDTAccountReward}"
                @click="openUSDTAccountRewardFn"
              >{{ openUSDTAccountReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
            <!-- <p><a :class="{noClick: true}">{{ $t('bonus.end') }}</a></p> -->
          </div>
          <!-- <div class="info">
              <div style="margin-bottom: 10px;"><img src="../../assets/img/bonus/icon-2.svg" alt=""></div>
              <h3>{{ $t('bonus.first') }}</h3>
              <p class="con">{{ $t('bonus.send') }}{{ '100USDT' }}</p>

              @click="depositRewardFn"
              depositReward ? $t('bonus.end') : $t('bonus.receive')

              <p><a :class="{noClick: depositReward}" @click="depositRewardFn">{{ depositReward ? $t('bonus.end') : $t('bonus.receive') }}</a></p>
           </div> -->
        </st-row>
      </div>
      <!-- <div class="bonus-index-content-bottom">
         <h6>{{ $t('bonus.stayGold') }}</h6>
         <h6>{{ $t('bonus.endActive') }}</h6>
         <st-row justify="start" class="active-block">
           <div class="info">
              <div><img src="../../assets/img/bonus/icon-1.svg" alt=""></div>
              <p>{{ $t('bonus.openTrade') }}</p>
              <p class="con">{{ $t('bonus.send') }}{{ '10USDT' }}</p>
              <p><a :class="{noClick: openAccountReward}" @click="openAccountRewardFn">{{ openAccountReward ? $t('bonus.onReceive') : $t('bonus.receive') }}</a></p>
              <p><a :class="{noClick: true}">{{ $t('bonus.end') }}</a></p>
           </div>
            <div class="info">
              <div><img src="../../assets/img/bonus/icon-2.svg" alt=""></div>
              <p>{{ $t('bonus.first') }}</p>
              <p class="con">{{ $t('bonus.send') }}{{ '100USDT' }}</p>
              @click="depositRewardFn"
              depositReward ? $t('bonus.end') : $t('bonus.receive')
              <p><a :class="{noClick: true}" >{{ $t('bonus.end') }}</a></p>
           </div>
          <div class="info">
              <div><img src="../../assets/img/bonus/icon-3.png" alt=""></div>
              <p>{{ $t('bonus.palce') }}</p>
              <p>{{ $t('bonus.send') }}{{ '20USDT' }}</p>
              <p><a :class="{noClick: true}" href="javascirpt:void(0)">{{ $t('bonus.noOpen') }}</a></p>
           </div>
         </st-row>
      </div> -->
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
    </div>
    <popup
      :title="info.title"
      width="440"
      :callback="messageClose"
      v-if="isMessage"
    >
      <message-window
        :info="info"
        :close="messageClose"
      ></message-window>
    </popup>
    <popup
      :title="locale === 'zh-cn' ? $t('bonus.smTitle') : 'Join ginfex Telegram Group to Get Bonus！'"
      width="440"
      :callback="smClose"
      v-if="isSm"
    >
      <sm-window :close="smClose"></sm-window>
    </popup>

    <popup
      :title="$t('bonus.tips')"
      v-if="haveBindPhoneTips"
      :callback="haveBindPhoneTipsClose"
    >
      <div class="bind-phone-box">
        <p>{{$t('bonus.pleaseBindPhone')}}</p>
        <a @click="goUrl(`${apiConfig.mainDomain}/usercenter/account_information/bind_phone`)">{{$t('bonus.gotoBind')}}</a>
      </div>
    </popup>

    <popup
      :title="$t('bonus.tips')"
      v-if="haveOpenGusdTips"
      :callback="haveOpenGusdTipsClose"
    >
      <div class="to-open-gusd">
        <p>{{$t('bonus.openTUSDFirst')}}</p>
        <a @click="goUrl(`${apiConfig.swapsDomain}game/trade`)">{{$t('bonus.ino')}}</a>
      </div>
    </popup>
  </div>
</template>
<script>
import ClipboardJS from "clipboard";
import ApiConfig from "../../config/api.config";
import cookie from "../../assets/js/cookie.js";
import MessageWindow from "../../components/bonus/message-window";
import SmWindow from "../../components/bonus/sm-window";
import Util from "../../assets/js/util.js";
export default {
  name: "bonus-index",
  components: {
    MessageWindow,
    SmWindow
  },
  data() {
    return {
      Util: Util,
      total: 0,
      apiConfig: ApiConfig,
      copy: null,
      // 检查模拟合约账户开通奖励是否被领取
      openAccountReward: false,
      // 检查真实合约账户开通奖励是否被领取
      openUSDTAccountReward: false,
      // 检查合约充值奖励是否被领取
      depositReward: false,
      // 邀请人数
      child_count: 0,
      isMessage: false,
      info: null,
      // 领取开通模拟合约赠金步骤
      openConditions: null,
      // 领取开通真实合约赠金步骤
      openUSDTConditions: null,
      // 领取首次充值步骤
      depositConditions: null,
      vol: 0,
      validation: null,
      isSm: false,
      havePhone: false,
      isOpenGusd: false,
      haveBindPhoneTips: false, //  去绑定手机号弹框
      haveOpenGusdTips: false, //  需要开通gusd合约弹框
      //  是已否领取签到奖励
      signReward: false,
      signConditions: false,
      lv2Reward: false, // 是否领取lv2手续费奖励
      lv2Conditions: false,
      newUserReward: false, // 是否领取了新用户奖励
      newUserConditions: false,
      tradeReward: false, // 是否领取合约交易量达2万的奖励
      tradeConditions: false
    };
  },
  computed: {
    locale() {
      return this.$store.state.auth.locale;
    },
    user() {
      return this.$store.state.auth.userInfo;
    }
  },
  watch: {
    locale() {
      this.getValidation();
    },
    user() {
      if (this.user) {
        this.havePhone = this.user.phone;
      }
    }
  },
  methods: {
    getValidation() {
      this.validation = {
        KYC_AUTH: {
          title: this.$t("bonus.validation.kycTitle"),
          message: this.$t("bonus.validation.kycMessge"),
          href: "",
          hrefTitle: this.$t("bonus.validation.kycGo")
        },
        OPEN_CONTRACT_ACCOUNT: {
          title: this.$t("bonus.validation.openTitle"),
          message: this.$t("bonus.openTUSDFirst"),
          href: ApiConfig.swapsDomain + "/game/trade",
          hrefTitle: this.$t("bonus.validation.openGo")
        },
        OPEN_USDT_CONTRACT_ACCOUNT: {
          title: this.$t("bonus.validation.openTitle"),
          message: this.$t("bonus.openUSDTFirst"),
          href: ApiConfig.swapsDomain + "/",
          hrefTitle: this.$t("bonus.validation.openGo")
        },
        CUMULATION_DEPOSIT_VOL: {
          title: this.$t("bonus.validation.addTitle"),
          message: this.$t("bonus.validation.addMessge"),
          href: ApiConfig.mainDomain + "/assets/deposit",
          hrefTitle: this.$t("bonus.validation.addGo")
        },
        BIND_PHONE: {
          title: this.$t("bonus.validation.phoneTitle"),
          message: this.$t("bonus.validation.phoneMessage"),
          href: "",
          hrefTitle: this.$t("bonus.validation.phoneGo")
        },
        CUMULATION_TRADE_VOL: {
          title: this.$t("bonus.unstandardTit"),
          message: "",
          href: ApiConfig.swapsDomain + "",
          hrefTitle: this.$t("bonus.continueTrade")
        },
        CUMULATION_DEPOSIT_COUNT: {
          title: this.$t("bonus.unstandardTit"),
          message: this.$t("bonus.unstandardCon1"),
          href: ApiConfig.swapsDomain + "",
          hrefTitle: this.$t("bonus.continueTrade")
        },
        CUMULATION_TRADE_COUNT: {
          title: this.$t("bonus.unstandardTit"),
          message: this.$t("bonus.unstandardCon1"),
          href: ApiConfig.swapsDomain + "",
          hrefTitle: this.$t("bonus.continueTrade")
        }
      };
    },
    smClose() {
      this.isSm = false;
    },
    messageClose() {
      this.isMessage = false;
    },
    copyFn() {
      let uid = cookie.getCookie("uid");
      let href = `${this.apiConfig.mainDomain}/register?inviter=${uid}&lang=${this.locale}`;
      this.copy = new ClipboardJS(".btn", {
        text: function() {
          return href;
        }
      });
      this.$alert("s", this.$t("bonus.copyMessage"));
    },
    getTotal() {
      let total = 0;
      if (this.openAccountReward) {
        total += 10;
      }
      if (this.depositReward) {
        total += 100;
      }
      return total;
    },
    getDate() {
      // console.log('getData####')
      // Promise.all([this.swapsApi.checkBonusTask('OpenTUSDContractReward'), this.swapsApi.checkBonusTask('DepositReward-1'), this.swapsApi.checkBonusTask('CheckInTask'), this.swapsApi.checkBonusTask('AccountLevelTask'), this.swapsApi.checkBonusTask('OpenUSDTContractReward')])
      Promise.all([
        this.swapsApi.checkBonusTask("OpenTUSDContractReward"),
        this.swapsApi.checkBonusTask("CheckInTask"),
        this.swapsApi.checkBonusTask("AccountLevelTask"),
        this.swapsApi.checkBonusTask("OpenUSDTContractReward")
      ]).then(res => {
        // console.log('res####', res)
        // 是否领取开通模拟合约奖励
        this.openAccountReward = res[0].data.participated;
        this.openConditions = res[0].data.conditions;

        // 是否领取充值奖励
        // this.depositReward = res[1].data.participated
        // this.depositConditions = res[1].data.conditions
        // this.vol = res[1].data.vol
        // this.total = this.getTotal()
        // this.isOpenGusd = res[2].data.accounts[0]
        //  是否已领取签到奖励
        this.signReward = res[1].data.participated;
        this.signConditions = res[1].data.conditions;
        // 是否领取lv2奖励
        this.lv2Reward = res[2].data.participated;
        this.lv2Conditions = res[2].data.conditions;
        // 是否领取新用户首次入金，成交两笔奖励
        // this.newUserReward = res[5].data.participated
        // this.newUserConditions = res[5].data.conditions
        // 是否领取交易额满2万的奖励
        // this.tradeReward = res[6].data.participated
        // this.tradeConditions = res[6].data.conditions
        // let tradeConditions = res[6].data.conditions || []

        // 是否领取真实合约奖励
        this.openUSDTAccountReward = res[3].data.participated;
        this.openUSDTConditions = res[3].data.conditions;

        // tradeConditions.forEach((item) => {
        //   if (item.key === 'CUMULATION_TRADE_VOL') {
        //     this.validation['CUMULATION_TRADE_VOL'].message = this.$t('bonus.unstandardCon2', {price: Util.retainDecimals(item.cur_vol, {decimal: 2})})
        //   }
        // })
      });
    },
    // 领取开通合约奖励(真实合约)
    openUSDTAccountRewardFn() {
      if (!this.$store.state.auth.token) {
        window.location.href = `${this.apiConfig.mainDomain}/login?lang=${
          this.locale
        }&path=${escape(window.location.href)}`;
        return;
      }
      // this.isSm = true
      // this.swapsApi.openAccountReward('receive')
      // .then(res => {
      //   if (res.message === 'Success') {
      //     this.openUSDTAccountReward = true
      //     this.total = this.getTotal()
      //     this.$alert('s', this.$t('bonus.receiveSuccess'))
      //   }
      // })
      // if (!this.openUSDTAccountReward) {
      //   if (!this.havePhone) {
      //     this.haveBindPhoneTips = true
      //     return false
      //   }
      //   if (!this.isOpenGusd) {
      //     this.haveOpenGusdTips = true
      //     return false
      //   }
      // } else {
      //   return false
      // }
      if (!this.openUSDTAccountReward) {
        for (let item in this.openUSDTConditions) {
          let obj = this.openUSDTConditions[item];
          if (!obj.status) {
            if (obj.key === "OPEN_CONTRACT_ACCOUNT") {
              this.info = this.validation["OPEN_USDT_CONTRACT_ACCOUNT"];
            } else {
              this.info = this.validation[obj.key];
            }
            this.isMessage = true;
            return false;
          }
        }
        this.swapsApi.receiveReward("OpenUSDTContractReward").then(res => {
          if (res.message === "Success") {
            this.openUSDTAccountReward = true;
            this.total = this.getTotal();
            this.$alert("s", this.$t("bonus.receiveSuccess"));
          }
        });
      } else {
        return false;
      }
    },
    // 领取开通体验TUSD模拟合约
    openAccountRewardFn() {
      // this.isMessage = true
      if (!this.$store.state.auth.token) {
        window.location.href = `${this.apiConfig.mainDomain}/login?lang=${
          this.locale
        }&path=${escape(window.location.href)}`;
        return;
      }
      if (!this.openAccountReward) {
        for (let item in this.openConditions) {
          let obj = this.openConditions[item];
          if (!obj.status) {
            this.info = this.validation[obj.key];
            this.isMessage = true;
            return false;
          }
        }
        this.swapsApi.receiveReward("OpenTUSDContractReward").then(res => {
          if (res.message === "Success") {
            this.openAccountReward = true;
            this.total = this.getTotal();
            this.$alert("s", this.$t("bonus.receiveSuccess"));
          }
        });
      } else {
        return false;
      }
      // this.isSm = true

      // this.swapsApi.openAccountReward('receive')
      // .then(res => {
      //   if (res.message === 'Success') {
      //     this.openAccountReward = true
      //     this.total = this.getTotal()
      //     this.$alert('s', this.$t('bonus.receiveSuccess'))
      //   }
      // })
      // if (!this.openAccountReward) {
      // if (!this.havePhone) {
      //   this.haveBindPhoneTips = true
      //   return false
      // }

      // if (!this.isOpenGusd) {
      //   this.haveOpenGusdTips = true
      //   return false
      // }
      // } else {
      //   return false
      // }
    },
    // 领取签到奖励
    signRewardFn() {
      if (!this.$store.state.auth.token) {
        window.location.href = `${this.apiConfig.mainDomain}/login?lang=${
          this.locale
        }&path=${escape(window.location.href)}`;
        return false;
      }

      if (!this.signReward) {
        //  是否领取了签到奖励
        for (let item in this.signConditions) {
          let obj = this.signConditions[item];
          if (!obj.status) {
            this.info = this.validation[obj.key];
            this.isMessage = true;
            return false;
          }
        }

        this.swapsApi.signTask().then(res => {
          if (res.message === "Success") {
            this.signReward = true;
            this.$alert("s", this.$t("bonus.receiveSuccess"));
          }
        });
      } else {
        return false;
      }
    },
    // 领取Lv2奖励
    lv2RewardFn() {
      if (!this.$store.state.auth.token) {
        window.location.href = `${this.apiConfig.mainDomain}/login?lang=${
          this.locale
        }&path=${escape(window.location.href)}`;
        return false;
      }
      // this.lv2Reward = res[4].data.participated
      //   this.lv2Conditions = res[4].data.conditions
      if (!this.lv2Reward) {
        //  是否领取了签到奖励
        for (let item in this.lv2Conditions) {
          let obj = this.lv2Conditions[item];
          if (!obj.status) {
            this.info = this.validation[obj.key];
            this.isMessage = true;
            return false;
          }
        }

        this.swapsApi.receiveReward("AccountLevelTask").then(res => {
          if (res.message === "Success") {
            this.lv2Reward = true;
            this.$alert("s", this.$t("bonus.receiveSuccess"));
          }
        });
      } else {
        return false;
      }
    },
    // 领取新用户奖励
    newUserRewardFn() {
      if (!this.$store.state.auth.token) {
        window.location.href = `${this.apiConfig.mainDomain}/login?lang=${
          this.locale
        }&path=${escape(window.location.href)}`;
        return false;
      }

      if (!this.newUserReward) {
        //  是否领取了签到奖励
        for (let item in this.newUserConditions) {
          let obj = this.newUserConditions[item];
          if (!obj.status) {
            this.info = this.validation[obj.key];
            this.isMessage = true;
            return false;
          }
        }

        this.swapsApi.receiveReward("DepositTradeTask").then(res => {
          if (res.message === "Success") {
            this.newUserReward = true;
            this.$alert("s", this.$t("bonus.receiveSuccess"));
          }
        });
      } else {
        return false;
      }
    },
    // 领取交易额满2万奖励
    tradeRewardFn() {
      if (!this.$store.state.auth.token) {
        window.location.href = `${this.apiConfig.mainDomain}/login?lang=${
          this.locale
        }&path=${escape(window.location.href)}`;
        return false;
      }

      if (!this.tradeReward) {
        //  是否领取了签到奖励
        for (let item in this.tradeConditions) {
          let obj = this.tradeConditions[item];
          // console.log('obj###', obj)
          if (!obj.status) {
            this.info = this.validation[obj.key];
            this.isMessage = true;
            return false;
          }
        }

        this.swapsApi.receiveReward("TradeVolTask").then(res => {
          if (res.message === "Success") {
            this.tradeReward = true;
            this.$alert("s", this.$t("bonus.receiveSuccess"));
          }
        });
      } else {
        return false;
      }
    },
    haveBindPhoneTipsClose() {
      this.haveBindPhoneTips = false;
    },
    haveOpenGusdTipsClose() {
      this.haveOpenGusdTips = false;
    },
    // 充值满1000奖励
    depositRewardFn() {
      if (!this.depositReward) {
        for (let item in this.depositConditions) {
          let obj = this.depositConditions[item];
          // console.log('obj###', obj)
          if (!obj.status) {
            this.info = this.validation[obj.key];
            this.isMessage = true;
            return false;
          }
        }
      } else {
        return false;
      }
      this.swapsApi.receiveReward("DepositReward-1").then(res => {
        if (res.message === "Success") {
          this.depositReward = true;
          this.total = this.getTotal();
          this.$alert("s", this.$t("bonus.receiveSuccess"));
        }
      });
    },
    // 获取累计邀请人数
    getNum() {
      this.swapsApi.rebates().then(res => {
        this.child_count = res.data.rebate.child_count;
      });
    },
    goUrl(url) {
      window.location.href = url;
    }
  },
  mounted() {
    if (this.$store.state.auth.token) {
      if (document.documentElement.clientWidth <= 700) {
        this.$router.push({ path: "/m/bonus" });
      }
      this.getValidation();
      // this.$store.dispatch('getUser')
      this.getDate();
      this.getNum();
      this.validation.BIND_PHONE.href =
        ApiConfig.mainDomain +
        "/usercenter/account_information/bind_phone?lang=" +
        this.locale;
      this.validation.KYC_AUTH.href =
        ApiConfig.mainDomain + "/usercenter/kyc?lang=" + this.locale;
      this.validation.CUMULATION_DEPOSIT_VOL.href = `${ApiConfig.mainDomain}/assets/deposit?lang=${this.locale}`;
    }
    // else {
    //   window.location.href = `${this.apiConfig.mainDomain}/login?lang=${this.locale}&path=${escape(window.location.href)}`
    // }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/base.less";
.bonus-index {
  //  height: 1080px;
  margin-bottom: 50px;
  background: url("/static/img/bg-1.jpg") no-repeat;
  background-size: 100%;
  //  background-color: #1f2636;
  .bonus-index-title {
    padding-top: 20px;
    h1,
    p {
      text-align: center;
    }
    h1 {
      padding-top: 30px;
      color: #e6b991;
      font-size: 46px;
      font-weight: 400;
      text-shadow: 0px 3px 4px #232732;
    }
    p {
      color: #c7ada0;
      font-size: 24px;
      padding-bottom: 20px;
    }
  }
  .bonus-index-content {
    margin: 20px auto 0;
    width: 1200px;
    background-color: @L2;
    .bonus-index-content-top {
      padding: 30px 0 20px;
      text-align: center;
      h3 {
        line-height: 58px;
        font-size: 32px;
        color: #fffdf9;
        span {
          color: #e6b991;
        }
      }
      p {
        line-height: 38px;
        font-size: 16px;
        color: #fffdf9;
      }
    }
    .bonus-index-content-center {
      margin: 0 25px;
      height: 90px;
      border-top: 1px solid #373f53;
      border-bottom: 1px solid #373f53;
      font-size: 18px;
      span {
        color: #fffdf9;
      }
      a {
        margin-left: 24px;
        display: inline-block;
        height: 35px;
        width: 140px;
        font-size: 16px;
        line-height: 35px;
        color: #2e3345;
        background: #e6b991;
        text-align: center;
        font-weight: 400;
        &:hover {
          background: #e8bf9a;
        }
      }
    }
    .bonus-index-content-bottom {
      h6 {
        //  margin-left: 25px;
        padding-left: 25px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        color: #fffdf9;
        background: @L1;
      }
      .active-block {
        padding: 50px 45px;
        padding-bottom: 0px;
        flex-wrap: wrap;
      }
      .info {
        padding-top: 10px;
        width: 340px;
        height: 340px;
        background: @L3;
        text-align: center;
        margin-right: 45px;
        margin-bottom: 45px;
        &:nth-of-type(3n) {
          margin-right: 0px;
        }
        div {
          margin: 16px;
          img {
            width: 90px;
            height: 90px;
            margin-top: 30px;
          }
        }
        h3 {
          color: #fcc194;
          font-size: 18px;
          padding-bottom: 5px;
        }
        p {
          color: #fffdf9;
          font-size: 14px;
          padding: 0px 30px;
          a {
            margin-top: 10px;
            display: inline-block;
            height: 40px;
            width: 180px;
            line-height: 40px;
            color: #2e3345;
            background: #e6b991;
            text-align: center;
            font-weight: 400;
            font-size: 16px;
            &:hover {
              background: #e8bf9a;
            }
            &.noClick {
              background: #a5acc0;
            }
          }
        }
        .con {
          height: 72px;
        }
        &.hot {
          // background-image: url('../../assets/img/bonus/icon-hot.svg') right top no-repeat;
          // background-size:
          // // background-repeat:  no-repeat;
          // // background-position: -6px -6px;
          position: relative;
          &::after {
            content: "";
            display: inline-block;
            width: 60px;
            height: 60px;
            background: url("../../assets/img/bonus/icon-new.svg") right top
              no-repeat;
            background-size: auto auto;
            position: absolute;
            right: 0px;
            top: 0px;
          }
        }
      }
    }
    .bonus-index-message {
      //  margin-left: 48px;
      margin-left: 15px;
      padding: 24px 10px;
      p {
        //  height: 24px;
        line-height: 24px;
        color: #fffdf9;
        font-size: 12px;
        word-wrap: break-word;
        word-break: break-all;
        //  overflow: hidden;
        &:first-child {
          margin-bottom: 12px;
        }
      }
    }
  }

  .bind-phone-box,
  .to-open-gusd {
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
