<template>
    <section class="competition-index">
        <div class="competition-top">
            <div class="enroll-box">
                <!-- is-enroll -->
                <button class="enroll-btn" @click="addTeamUser">{{btnText}}</button>
                <p>2019-02-20 15:00开始实盘大赛</p>

                <div class="contract-us">
                    <span>赛事特约行情提醒工具：合约精灵（微信搜索即可关注）</span>
                    <!-- <img src="../../assets/img/competition/hyjl.png"/> -->
                    <span class="qr-code">
                        <img src="../../assets/img/competition/kf.jpg"/>
                    </span>
                </div>
            </div>
        </div>
        <div class="competition-nav-box">
            <st-row class="competition-nav" justify="center">
                <nuxt-link to="/competition/?nav=first" :class="nav === 'first' && 'active'" href="">大赛主页</nuxt-link>
                <nuxt-link to="/game/trade" v-if="haveGameTrade" target="_blank">模拟交易区</nuxt-link>
                <nuxt-link to="/competition/?nav=team" :class="nav === 'team' && 'active'">团队列表</nuxt-link>
                <nuxt-link to="/competition/rank" :class="nav === 'rank' && 'active'">比赛排行榜单</nuxt-link>
                <a target="_blank">币快报APP<span class="huo"></span></a>
            </st-row>
        </div>
        <home-page v-if="nav==='first'"></home-page>
        <team-list v-if="nav==='team'"></team-list>
        <!-- <div class="coming-soon" v-if="nav==='rank'">
            <img src="../../assets/img/competition/Comingsoon.png"/>
            <p>活动即将开始，敬请期待～</p>
        </div> -->
    </section>
</template>
<script>
import HomePage from '../../components/competition/homepage.vue'
import TeamList from '../../components/competition/team-list.vue'
import ApiConfig from '../../config/api.config'
export default {
  layout: 'competition',
  components: {
    HomePage,
    TeamList
  },
  data() {
    return {
      info: {},
      isEnroll: false, // 是否报名
      haveGameTrade: false,
      message: '',
      btnText: '点击报名参赛',
      btnUrl: ''
    //   isTotal: true
    }
  },
  computed: {
    nav() {
      return this.$route.query.nav || 'first'
    },
    productList() {
      return this.$store.state.market.productList
    },
    token() {
      return this.$store.state.auth.token
    }
  },
  methods: {
    getUrl(type, qd) {
      if (!qd) {
        qd = '';
      }
      window.location.href = `${ApiConfig.mainDomain}/${type}?lang=zh-CN&qd=${qd}&path=${escape(window.location.href)}`
    },
    setHaveGameTrade() {
      this.productList.forEach(item => {
        if (item.contract && item.contract.block === 4) {
          this.haveGameTrade = true
        }
      })
    },
    addTeamUser() {
      if (!this.token) {
        this.getUrl('login', this.info.qd)
        return
      } else {
        if (this.isEnroll) {
          this.$router.push(this.btnUrl)
          return
        }
      }
      this.swapsApi.addTeamUser(0)
      .then(res => {
        this.isEnroll = true
        // this.btnText = '已报名，待开赛'
        this.$alert('s', '报名成功！')
        this.getIsTeamUser()
      }).catch(e => {
        this.btnText = '点击报名参赛'
        this.$alert('失败！')
      })
    },
    getIsTeamUser() {
      this.swapsApi.isTeamUser(0)
      .then(res => {
            // this.isEnroll = true
      }).catch(e => {
        if (e.errno === 'ONE_OF_TEAM_MEMBER') {
        //   this.message = '已经加入过团队！'
          this.isEnroll = true
          let now = new Date()
          now = now.valueOf()
          if (now <= 1550127600000) {
            this.btnText = '已报名，待开赛'
            this.btnUrl = ''
          } else if (now <= 1550646000000) {
            this.btnText = '已报名，体验模拟赛'
            this.btnUrl = '/game/trade'
          } else if (now <= 1552546800000) {
            this.btnText = '已报名，参加实盘赛'
            this.btnUrl = '/'
          } else if (now > 1552546800000) {
            this.btnText = '比赛已结束'
            this.btnUrl = ''
          }
        } else if (e.errno === 'TEAM_MAX_MEMBER_LIMIT') {
          this.isEnroll = true
          let now = new Date()
          now = now.valueOf()
          if (now <= 1550127600000) {
            this.btnText = '已报名，待开赛'
            this.btnUrl = ''
          } else if (now <= 1550646000000) {
            this.btnText = '已报名，体验模拟赛'
            this.btnUrl = '/game/trade'
          } else if (now <= 1552546800000) {
            this.btnText = '已报名，参加实盘赛'
            this.btnUrl = '/'
          } else if (now > 1552546800000) {
            this.btnText = '比赛已结束'
            this.btnUrl = ''
          }
        } else if (e.errno === 'TEAM_NOT_FOUND') {
          this.message = '团队不存在！'
        }
      })
    }
    // selectTab(flag) {
    //   this.isTotal = flag
    // }
  },
  mounted() {
    this.setHaveGameTrade()
    if (this.token) {
      this.getIsTeamUser()
    }
    // this.getTeams()
  }
}
</script>
<style lang="less" scoped>
.competition-index {
    .competition-top {
        width: 100%;
        height: 602px;
        background: #9F1501 url("../../assets/img/competition/benner.jpg") center top no-repeat;
        background-size: auto 100%;
        position: relative;
        .enroll-box {
            width: 100%;
            text-align: center;
            position: absolute;
            bottom: 20px;
            left: 0px;
            .enroll-btn {
                display: block;
                margin: 0 auto;
                width: 302px;
                height: 56px;
                color: #fff;
                background: url("../../assets/img/competition/BTN-04.png") left top no-repeat;
                background-size: #fff;
                font-size: 22px;
                line-height: 56px;
                font-weight: 400;
                border: none;
                background-size: 100% 100%;
                outline: none;
                cursor: pointer;
                &:hover {
                    background: url("../../assets/img/competition/BTN-04_sel.png") left top no-repeat;
                    background-size: 100% 100%;
                }
                &:disabled {
                    background: url("../../assets/img/competition/BTN-05.png") left top no-repeat;
                    cursor: not-allowed;
                    background-size: 100% 100%;
                    &:hover {
                        background: url("../../assets/img/competition/BTN-05.png") left top no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            >p {
                font-size: 12px;
                color: #5a0d03;
                padding-top: 15px;
                font-weight: 400;
            }
            .contract-us {
                margin-top: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                span {
                    color: #5A0E02;
                    font-weight: 400;
                }
                .qr-code {
                    display: inline-block;
                    position: relative;
                    width: 20px;
                    height: 20px;
                    background: url("../../assets/img/competition/hyjl.png") left top no-repeat;

                    img {
                        display: none;
                        position: absolute;
                        width: 120px;
                        height: 120px;
                        right: -130px;
                        top: 0px;
                        z-index: 1000;
                        cursor: pointer;
                    }
                    &:hover {
                        img {
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
    .competition-nav-box {
        width: 100%;
        // background: -webkit-linear-gradient(left,#A01600 , #E11E00, #A01600); /* Safari 5.1 - 6.0 */
        // background: -o-linear-gradient(left,#A01600 , #E11E00, #A01600); /* Opera 11.1 - 12.0 */
        // background: -moz-linear-gradient(left,#A01600 , #E11E00, #A01600); /* Firefox 3.6 - 15 */
        background: linear-gradient(to left,#A01600 , #E11E00, #A01600);
        border-top: 1px solid #dd2401;
        border-bottom: 1px solid #dd2401;
        .competition-nav {
            width: 1200px;
            margin: 0 auto;
            font-size: 16px;
            height: 50px;
            align-items: center;
            >a {
                flex: 1;
                color: #fff;
                border-right: 1px solid #FE5A19;
                text-align: center;
                &:last-child {
                    border: none;
                }
                &.active {
                    color: #ffee0a;
                    position: relative;
                    &::after {
                        content: "";
                        height: 3px;
                        width: 60px;
                        background: #ffef0b;
                        position: absolute;
                        left: 50%;
                        margin-left: -30px;
                        bottom: -14px;
                    }
                }
            }
        }
    }
    .coming-soon{
        width: 100%;
        height: 700px;
        text-align: center;
        background: #fff2df;
        color: #333333;
        padding-top: 130px;
    }
}
@media screen and (max-width:750px){
.competition-index {
    .competition-top {
        width: 100%;
        height: 200px;
        background: #9F1501 url("../../assets/img/competition/H5-banner.jpg") center top no-repeat;
        background-size: auto 100%;
        .enroll-box {
            bottom: 0px;
            .enroll-btn {
                width: auto;
                font-size: 12px;
                padding: 0px 20px;
                height: 28px;
                line-height: 28px;
            }
            >p {
                padding-top: 2px;
                font-size: 12px;
                color: #fdebbb;
            }
            .contract-us {
                display: none;
            }
        }
    }
    .competition-nav-box {
        .competition-nav {
            width: 100%;
            margin: 0 auto;
            font-size: 12px;
        }
    }
    .coming-soon {
        height: 400px;
        padding-top: 60px;
        img {
            width: 70%;
        }
    }

}
}
</style>
