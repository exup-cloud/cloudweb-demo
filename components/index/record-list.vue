<template>
   <div class='record-list'>
      <st-row  v-if="!token" justify="center" class="no-login">
        <!-- <st-row align="center" class="no-login-message"> -->
           <!-- <a @click="locationTigerMEX('login')"  class="log-in">{{$t('header.LOGIN')}}</a>
           <span>&nbsp;{{ $t('record.or') }}&nbsp;</span>
           <a @click="locationTigerMEX('register')"  class="sign-in">{{$t('header.SIGNUP')}}</a>
           <span>
             {{ $t('submitEntrust.startTrade') }}
           </span> -->
           <div class="no-login-message">
              <p>{{$t('submitEntrust.nologin2')}}</p>
              <div>
                <a @click="locationTigerMEX('login')">{{$t('header.LOGIN')}}</a>
                <a @click="locationTigerMEX('register')">{{$t('header.SIGNUP')}}</a>
              </div>
           </div>

        <!-- </st-row> -->
      </st-row>
       <st-row justify="between" class='record-list-page'>
           <h5><nuxt-link :class="{active: !type}" :to="getUrl('')">{{ $t('record.positions') }}</nuxt-link></h5>
           <h5 class="width-560"><nuxt-link  :class="{active: type === 'pHistory'}" :to="getUrl('pHistory')">{{ $t('record.pHistory') }}</nuxt-link></h5>
           <h5><nuxt-link  :class="{active: type === 'entrust'}" :to="getUrl('entrust')">{{ $t('record.entrust') }}</nuxt-link></h5>
           <h5><nuxt-link :class="{active: type === 'eHistory'}" :to="getUrl('eHistory')">{{ $t('record.eHistory') }}</nuxt-link></h5>
           <h5><nuxt-link :class="{active: type === 'plan'}" :to="getUrl('plan')">{{ $t('record.plan') }}</nuxt-link></h5>
           <h5 class="width-750"><nuxt-link :class="{active: type === 'planHistory'}" :to="getUrl('planHistory')">{{ $t('record.planHistory') }}</nuxt-link></h5>
           <h5 class="width-560"><nuxt-link :class="{active: type === 'deal'}" :to="getUrl('deal')">{{ $t('record.deal') }}</nuxt-link></h5>
           <h5 class="width-560"><nuxt-link :class="{active: type === 'assets'}" :to="getUrl('assets')">{{ $t('record.assets') }}</nuxt-link></h5>
       </st-row>
      <template v-if="token">
      <positions v-if="!this.type"></positions>
       <positions-history class="width-560" v-else-if="type === 'pHistory'"></positions-history>
       <current-entrust  v-else-if="type === 'entrust'"></current-entrust>
       <history-entust v-else-if="type === 'eHistory'"></history-entust>
       <plan-entrust v-else-if="type === 'plan'"></plan-entrust>
       <plan-history class="width-750" v-else-if="type === 'planHistory'"></plan-history>
       <deal-record class="width-560" v-else-if="type === 'deal'"></deal-record>
       <assets class="width-560" v-else-if="type === 'assets'"></assets>
      </template>
   </div>
</template>
<script>

import CurrentEntrust from './record-list-cp/current-entrust'
import Positions from './record-list-cp/positions'
import DealRecord from './record-list-cp/deal-record'
import HistoryEntust from './record-list-cp/history-entust'
import Assets from './record-list-cp/assets'
import PositionsHistory from './record-list-cp/positions-history'
import PlanEntrust from './record-list-cp/plan-entrust'
import PlanHistory from './record-list-cp/plan-history'
import ApiConfig from '../../config/api.config'

export default {
  components: {
    Positions,
    CurrentEntrust,
    DealRecord,
    HistoryEntust,
    Assets,
    PositionsHistory,
    PlanEntrust,
    PlanHistory
  },
  data() {
    return {
      type: this.$route.query.type,
      apiConfig: ApiConfig
    }
  },
  computed: {
    locale() {
      return this.$store.state.auth.locale
    },
    token() {
      return this.$store.state.auth.token
    }
  },
  watch: {
    '$route'(route) {
      this.type = this.$route.query.type
    }
  },
  methods: {
    locationTigerMEX(type) {
      window.location.href = `${this.apiConfig.mainDomain}/${type}?lang=${this.locale}&path=${escape(window.location.href)}`
    },
    getUrl(key) {
      let obj = {}
      Object.assign(obj, this.$route.query, {type: key})
      !key && delete obj.type
      return {name: this.$route.name, query: obj}
    }
  }
}
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.record-list {
  position: relative;
  // margin-right: 10px;
  height: 346px;
  flex: 3;
  background-color: @L2;
  border-radius: 2px;
  .no-login {
    position: absolute;
    width: 100%;
    height:100%;
    background: rgba(@L3,0.8);
    .no-login-message {
      margin-top: 140px;
      // border: 1px solid  rgba(205,213,223, 0.1);
      // padding: 6px 16px;
      font-size: 14px;
      // span {
      //   color: @L9;
      // }
      p {
        text-align: center;
        color: #c4cad4;
      }
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 20px;
        a {
          display: inline-block;
          width: 110px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          border-radius: 2px;
          background: @main-2a;
          color: #fff;
          margin: 0px 10px;
          &:hover {
            background: @mainHover;
          }
        }
      }
    }

  }
  .record-list-page {
  height: 42px;
  padding:0 12px;
  background-color:  rgba(33,42,48, 0.2);
  h5 {
      margin-top: 5px;
      a {
          display: block;
          padding: 0 10px;
          height: 32px;
          line-height: 30px;
          font-size: 14px;
          color: @L9;
          &.active {
              border-bottom: 2px solid @main-2a;
              color: @main-2a;
          }
          &:hover {
              color: @mainHover;
          }
      }
    }
  }
}
@media screen and (max-width:750px) {
  .width-750 {
    display: none;
  }
}
@media screen and (max-width:560px) {
  .width-560 {
    display: none;
  }
}
</style>
