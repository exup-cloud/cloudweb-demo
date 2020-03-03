<template>
    <section class="competition-team-info">
        <div class="box">
            <div class="crumbs">
                <nuxt-link to="/competition">合约大赛首页</nuxt-link>
                <span> > </span>
                <nuxt-link to="/competition/?nav=team">团队列表</nuxt-link>
                <span> > </span>
                <span>{{info.name}}</span>
            </div>
            <div class="body">
                <div class="header">
                    <div class="avatar">
                        <img :src="info.img_url" alt="avatar" v-if="info.img_url" />
                        <img src="../../../assets/img/competition/mr-tx.png" v-if="!info.img_url" />
                    </div>
                    <div class="header-info">
                        <h3>{{info.name}}</h3>
                        <p>2019币快报&TigerMEX永续合约交易大赛</p>
                        <div class="declaration">战队宣言：{{info.manifesto}}</div>
                    </div>
                </div>
                <div class="info-list-box">
                    <ul>
                        <li>
                            <img src="../../../assets/img/competition/icon-captain.png"/>
                            <div>
                                <h3>{{info.nick_name}}</h3>
                            </div>
                            <a>队长</a>
                        </li>
                        <li>
                            <img src="../../../assets/img/competition/icon-USDT.png"/>
                            <div>
                                <h3>{{info.total | splitFormat(3)}}</h3>
                                <p>USDT</p>
                            </div>
                            <a>战队收益额</a>
                        </li>
                        <li>
                            <img src="../../../assets/img/competition/icon-Trophy.png"/>
                            <div>
                                <h3>{{info.ranking}}</h3>
                            </div>
                            <a>当前排名</a>
                        </li>
                        <li>
                            <img src="../../../assets/img/competition/icon-join.png"/>
                            <div>
                                <h3>{{ info.crew }}</h3>
                            </div>
                            <a>团员</a>
                        </li>
                    </ul>
                </div>
                <div class="team-introduction">
                    <h3>战队介绍</h3>
                    <div class="introduction">
                        {{info.introduce}}
                    </div>
                </div>
                <a class="join-the-team" @click="addTeamUser">{{message}}</a>
                <a class="competition-link" href="/competition">2019币快报&TigerMEX永续合约交易大赛</a>
            </div>
        </div>
    </section>
</template>
<script>
import ApiConfig from '../../../config/api.config'
export default {
  layout: 'competition',
  data() {
    return {
      info: {},
      isAdd: false,
      message: '加入此战队参赛，领取15,000 TUSD操盘基金'
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    }
  },
  methods: {
    getUrl(type) {
      window.location.href = `${ApiConfig.mainDomain}/${type}?lang=zh-CN&path=${escape(window.location.href)}`
    },
    getTeams() {
      this.swapsApi.team(this.$route.params.id).then(res => {
        this.info = res.data
      })
    },
    addTeamUser() {
      if (!this.token) {
        // this.getUrl('register')
        window.location.href = `${ApiConfig.mainDomain}/register?lang=zh-CN&inviter=` + this.info.captain_id
        return
      }
      if (!this.isAdd) {
        this.$alert(this.message)
        return
      }
      this.swapsApi.addTeamUser(Number(this.$route.params.id))
      .then(res => {
        this.isAdd = false
        this.message = '已经加入过战队！'
        this.$alert('s', '加入战队成功！')
      }).catch(e => {
        this.$alert('失败！')
      })
    }
  },
  mounted() {
    // l.login()
    if (this.token) {
      this.swapsApi.isTeamUser(this.$route.params.id)
      .then(res => {
        this.isAdd = true
      }).catch(e => {
        if (e.errno === 'ONE_OF_TEAM_MEMBER') {
          this.message = '已经加入过战队！'
        } else if (e.errno === 'TEAM_MAX_MEMBER_LIMIT') {
          this.message = '该战队成员人数已满！'
        } else if (e.errno === 'TEAM_NOT_FOUND') {
          this.message = '战队不存在！'
        }
      })
    }
    this.getTeams()
  }
}
</script>
<style lang="less" scoped>
@white: #f9edd7;
@red: #ea4241;
@mainTextColor: #79504a;
@yellow: #f7d79c;
.competition-team-info {
    width: 100%;
    background: linear-gradient(to left, #8E1305, #C7312E, #8E1305);
    color: @mainTextColor;
    padding-bottom: 40px;
    .box {
        width: 100%;
        height: 100%;
        background: url("../../../assets/img/competition/team-bg2.png") center 20px no-repeat;
    }
    h3,p,a,span {
        font-weight: 400;
    }
    .crumbs {
        color: @white;
        height: 50px;
        width: 1200px;
        margin: 0 auto;
        line-height: 50px;
        background: url("../../../assets/img/competition/team-home.svg") left center no-repeat;
        background-size: 20px 20px;
        padding-left: 26px;
        font-size: 12px;
        a {
            color: @white;
            text-decoration: underline;
        }
    }
    .body {
        width: 1200px;
        margin: 0 auto;
        background: @white;
        padding: 50px 40px;
        .header {
            height: 126px;
            width: 100%;
            display: flex;
            .avatar {
                width:126px;
                height: 126px;
                // background: pink;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                    border: 1px solid #ffffff;
                }
            }
            .header-info {
                padding-left: 15px;
                flex: 1;
                >h3 {
                    padding-top: 8px;
                    color: @red;
                    font-size: 24px;
                }
                >p {
                    font-size: 14px;
                    padding-top: 8px;
                }
                .declaration {
                    margin-top: 14px;
                    font-size: 14px;
                    padding: 2px 5px;
                    border: 1px solid @mainTextColor;
                    display: inline-block;
                }
            }
        }
        .info-list-box {
            padding-left: 140px;
            padding-top: 25px;
            ul {
                display: flex;
                li {
                    width: 220px;
                    height: 250px;
                    background: url("../../../assets/img/competition/team-bg.png") left top no-repeat;
                    background-size: 100% 100%;
                    text-align: center;
                    margin-left: 25px;
                    &:first-child {
                        margin-left: 0px;
                    }
                    padding-top: 30px;
                    >div {
                        height: 45px;
                        margin-top: 20px;
                        h3,p {
                            color: @yellow;
                        }
                        p {
                            font-size: 12px;
                        }
                    }
                    >a {
                        display: block;
                        color: @yellow;
                        width: 120px;
                        height: 25px;
                        line-height: 25px;
                        margin: 0 auto;
                        background: url("../../../assets/img/competition/decorate-1.png") left top no-repeat;
                        background-size: 100% 100%;
                        font-size: 12px;
                    }
                }
            }
        }
        .team-introduction {
            >h3 {
                height: 40px;
                line-height: 40px;
                padding-left: 30px;
                background: url("../../../assets/img/competition/team-introduce.svg") left center no-repeat;
                background-size: 24px auto;
                color: @red;
                font-size: 22px;
                margin: 20px 0px;
            }
            div {
                width: 100%;
                padding: 20px;
                background: #fcf4e7;
                border: 1px solid #e5d6c3;
                color: #7b524c;
            }
        }
        .join-the-team {
            display: block;
            width: 400px;
            height: 40px;
            margin: 0 auto;
            line-height: 40px;
            text-align: center;
            background: url("../../../assets/img/competition/team-btn_nor.png") left top no-repeat;
            background-size: 100% 100%;
            color: #ffffff;
            margin-top: 40px;
            &:hover {
                background: url("../../../assets/img/competition/team-btn_sel.png") left top no-repeat;
                background-size: 100% 100%;
            }
        }
        .competition-link {
            display: block;
            width: 200px;
            font-size: 12px;
            text-decoration: underline;
            color: #835c55;
            margin: 0 auto;
            margin-top: 20px;
        }
    }
}

@media screen  and (max-width: 750px) {
    .competition-team-info {
        .crumbs {
            width: 90%;
            height: 35px;
            line-height: 35px;
        }
        .body {
            width: 90%;
            padding: 20px 10px;
            .header {
                flex-direction: column;
                align-items: center;
                text-align: center;
                height: auto;
                .header-info {
                    padding-left: 0px;
                }
            }
            .info-list-box {
                padding-left: 0px;
                padding-top: 10px;
                ul {
                    flex-direction: column;
                    align-items: center;
                    li {
                        margin-left: 0px;
                        margin-top: 10px;
                    }
                }
            }
            .team-introduction {
                padding-top: 20px;
                >h3 {
                    margin: 0px 0px;
                    // font-size: 16px;
                }
            }
            .join-the-team {
                width: 100%;
                font-size: 12px;
            }
        }

    }
}
</style>
