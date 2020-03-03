<template>
     <div class="header-user-info-box">
                <div class="header-mask" v-if="show" @click="show = false" ></div>
                <img src="../../assets/img/icon-heads.svg" class="header-avatar" @mouseover="show = true"/>
                <div class="header-user-info" v-if="show" @click="show = false" @mouseleave="show = false">
                    <!-- <a @click="goUrl(`${apiConfig.mainDomain}/usercenter/account_information/list`)"> -->
                    <div class="account-info">
                        <!-- <h3>{{$t('header.header_account')}}</h3>
                        <div class="account">
                            {{userInfo.account_type == 2 ? userInfo.phone :userInfo.email}}
                        </div>
                        <div class="orange">{{userInfo.status == 1 ? $t('header.header_inactive') : ''}}</div> -->
                        <div class="account">{{userInfo.email?userInfo.email:userInfo.phone}}</div>
                        <div class="uid">UID: {{userInfo.account_id}}</div>
                    </div>
                    <!-- </a> -->
                    <!-- <a :href="`${apiConfig.mainDomain}/assets/balance/coin`">
                        <div class="account-balance">
                            <h3>{{$t('header.header_blance')}}</h3>
                            <p>{{ 0}} USD</p>/usercenter/rebate
                        </div>
                    </a> -->
                    <div class="account-menu">
                        <a @click="goUrl(`${apiConfig.mainDomain}/usercenter/account_security/list`)">{{$t('header.accountSecurity')}}</a>
                        <a @click="goUrl(`${apiConfig.mainDomain}/usercenter/kyc`)">{{$t('header.kyc')}}</a>
                        <a @click="goUrl(`${apiConfig.mainDomain}/usercenter/rebate`)">
                            <span class="hot-marker">{{$t('header.invitation')}}</span>
                        </a>
                        <a @click="goUrl(`${apiConfig.mainDomain}/usercenter/fee_level`)">{{$t('header.feeSchduleTier')}}</a>
                        <!-- <a @click="goUrl(`${apiConfig.mainDomain}/usercenter/ginfex_api`)">{{$t('header.api')}}</a> -->
                    </div>
                    <a class="exit" @click="logout">
                        {{$t('header.header_exit')}}
                    </a>
                </div>
            </div>
</template>
<script>
  import Cookie from '../../assets/js/cookie'
  import ApiConfig from '../../config/api.config'
  export default {
    name: 'common-header',
    components: {
    },
    data() {
      return {
        apiConfig: ApiConfig,
        show: false,
        balance: 0
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.auth.userInfo
      }
    },
    methods: {
      logout() {
        this.swapsApi.userLogout().then(res => {
          Cookie.clearCookie('token', this.apiConfig.domain)
          Cookie.clearCookie('uid', this.apiConfig.domain)
          window.location.reload()
        })
      },
      goUrl(url) {
        console.log('url###', url)
        window.location.href = url
      }
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
@menuDropDownColorBlue: #BDD1EF;
@menuDropDownHoverBack: #1E253B;
@menuDropDownColorWhite: #f2f3f4;

.header-user-info-box {
    position: relative;
    .header-mask {
        position: fixed;
        left:0;
        right: 0;
        bottom: 0;
        top: 0;
        //background: red;
        //background: rgba(0,0,0,0.5);
    }
    .header-avatar {
        width: 32px;
        height: 32px;
        margin-left: 4px;
        cursor: pointer;
    }
    .header-user-info {
        min-width: 200px;
        position: absolute;
        // padding: 0px 10px;
        text-align: center;
        // color: #cad2dc;
        color: @hintColor;
        background: @hintBack;
        border: 1px solid @hintBorder;
        border-radius: 4px;
        font-size: 12px;
        left: -77px;
        top: 42px;
        border-radius: 6px;
        >a{
            display: block;
            text-decoration: none;
            // color: #cad2dc;
            color: @hintHoverColor;
            cursor: pointer;
            font-weight: 400;
            &:hover {
                background: @hintHoverBack;
                border-top: 1px solid @hintHoverBorder;
                border-bottom: 1px solid @hintHoverBorder;
                // color: @menuDropDownColorBlue;
            }
        }
        // &::before {
        //     content: "";
        //     width: 0;
        //     height: 0;
        //     border-width: 0 10px 10px;
        //     border-style: solid;
        //     border-color: transparent transparent @L4;
        //     position: absolute;
        //     margin-left: -12px;
        //     top: -10px;
        // }

        &::after {
            content: "";
            width: 44px;
            height: 62px;
           // background: red;
            position: absolute;
            left: 50%;
            margin-left: -22px;
            top: -62px;
        }
        .account-info {
            // border-bottom: 1px solid #2c354d;
            border-bottom: 1px solid @hintBorder;
            padding: 15px 0px;
            font-size: 14px;
            width: 86%;
            margin: 0 auto;
            .account {
                color: @hintColor;
                padding-bottom: 4px;
            }
            .uid {
                color: @hintColor;
            }
        }
        .account-menu {
            width: 100%;
            padding: 10px 0px;
            a {
                display: block;
                width: 100%;
                height: 35px;
                line-height: 35px;
                color: @hintColor;
                font-size: 12px;
                &:hover {
                    // background: @menuDropDownHoverBack;
                    background: @hintHoverBack;
                }

                .hot-marker {
                    position: relative;
                    &::after {
                        position: absolute;
                        height: 16px;
                        display: flex;
                        align-items: center;
                        content: "HOT";
                        top: -1px;
                        right: -34px;
                        color: #e37f17;
                        background: rgba(227,127,23,0.2);
                        padding: 0px 2px;
                        margin-left: 2px;
                    }
                }
            }
        }
        .account-balance {
            padding: 10px 0px;
            border-bottom: 1px solid @hintBorder;
            h3 {
                padding: 0;
                margin: 0;
                color: #8b929f;
            }
            p {
                margin: 0;
                padding: 0;
                font-size: 14px;
                white-space: nowrap;
            }
        }
        .exit {
            display: block;
            color: #cdd5df;
            padding: 10px 0px;
        }
        .settings{
            display: block;
            color: #cdd5df;
            padding: 10px 0px;
            border-bottom: 1px solid #2c354d;
            cursor: pointer;
        }
    }
}
</style>
