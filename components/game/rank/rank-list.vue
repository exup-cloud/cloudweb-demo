<template>
  <section class="rank-list">
    <st-row class="rank-list-top">
       <nuxt-link :class="type === 'team' && 'active'" to="/game/rank/?type=team">战队</nuxt-link>
       <nuxt-link :class="type === 'personal' && 'active'" to="/game/rank/?type=personal">个人</nuxt-link>
    </st-row>
    <div class="rank-list-bottom">
      <st-row class="rank-time" v-if="type === 'personal'">
        <nuxt-link :class="time === 'day' && 'active'" :to="`/game/rank/?type=personal&time=day`">日榜</nuxt-link>
        <nuxt-link :class="time === 'week' && 'active'" :to="`/game/rank/?type=personal&time=week`">周榜</nuxt-link>
        <nuxt-link :class="time === 'total' && 'active'" :to="`/game/rank/?type=personal&time=total`">总榜</nuxt-link>
      </st-row>
      <div class="rank-list-data">
        <st-row class="rank-list-title">
          <p>排名</p>
          <p>{{this.type === 'team' ? '战队名称' : '昵称' }}</p>
          <p>净值变化(TUSD)</p>
          <p>排名变化</p>
        </st-row>
        <nuxt-link class="my-team" :to="`/game/rank/?type=${type}&time=${time}&id=${type==='team'?myTeam.id:myInfo.id}&user_id=${type==='team'?'':myInfo.user_id}&team_id=${type==='team'?myTeam.team_id:myInfo.team_id}`">
           <st-row v-if="type === 'personal'" class="rank-item">
            <div class="img">{{ myInfo.rank || '--' }}</div>
             <div class="team-name">{{ type === 'team' ? myInfo.name : (myInfo.nick_name || 'TigerMEX_' + myInfo.user_id) }}</div>
             <div>{{ myInfo.total | splitFormat(4) }}</div>
             <div><span :class="myInfo.rank | getRankClass(myInfo.last_ranking)">{{ myInfo.rank | upsAndDowns(myInfo.last_ranking) }}</span></div>
           </st-row>
           <st-row v-if="type === 'team'" class="rank-item">
             <div class="img">{{ myTeam.ranking || '--' }}</div>
             <div class="team-name">{{ myTeam.name || '--' }}</div>
             <div>{{ myTeam.total | splitFormat(4) || '--'}}</div>
             <div><span :class="myTeam.ranking | getRankClass(myTeam.last_ranking)">{{ myTeam.ranking | upsAndDowns(myTeam.last_ranking) }}</span></div>
           </st-row>
         </nuxt-link>
        <div class="list" :class="type === 'team' && 'more'">
          <div class="over">
            <nuxt-link class="item" v-if="index < 100" :class="id === item.id && 'active'" :to="`/game/rank/?type=${type}&time=${time}&id=${item.id || item.user_id}&user_id=${item.user_id}&team_id=${item.team_id}`" :key="index" v-for="(item, index) in list">
             <st-row class="rank-item">
                <div class="index">
                   <p v-if="index < 3" :class="'img_' + index"></p>
                   <p v-else>{{ index + 1 }}</p>
                </div>
                <div class="team-name">{{ type === 'team' ? item.name : (item.nick_name || 'TigerMEX_' + item.user_id)}}</div>
                <!-- <div>{{ type === 'team' ? item.total : item.PNL }}</div> -->
                <!-- <div v-if="type === 'team'">{{ item.total | splitFormat(4) }}</div>
                <div v-if="type !== 'team'">{{ item.PNL | splitFormat(4) }}</div> -->
                <div>{{ item.PNL | splitFormat(4) }}</div>
                <div><span :class="item.ranking | getRankClass(item.last_ranking)">{{ item.ranking | upsAndDowns(item.last_ranking) }}</span></div>
             </st-row>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
//  import cookie from '../../../assets/js/cookie'
export default {
  data() {
    return {
      list: [],
      info: {
        user_id: 0,
        nick_name: '--',
        PNL: '--',
        upsAndDowns: '--'
      }
    }
  },
  computed: {
    type() {
      return this.$route.query.type || 'team'
    },
    time() {
      return this.$route.query.time || 'day'
    },
    id() {
      return Number(this.$route.query.id)
    },
    token() {
      return this.$store.state.auth.token
    },
    tid() {
      return Number(this.$route.query.team_id)
    },
    uid() {
      return Number(this.$route.query.user_id)
    },
    teamUser() {
      // console.log('this.$store.state.active.teamUser#####', this.$store.state.active.teamUser)
      return this.$store.state.active.teamUser
    },
    myInfo() {
      // console.log('this.$store.state.active.myInfo#####', this.$store.state.active.myInfo)
      return this.$store.state.active.myInfo
    },
    myTeam() {
      return this.$store.state.active.myTeam
    }
  },
  filters: {
    upsAndDowns(now, yday) {
      if (!yday) {
        return '--'
      }
      let num = yday - now
      if (num === 0) {
        return '--'
      } else {
        return Math.abs(num)
      }
    },
    getRankClass(now, yday) {
      if (!yday) {
        return ''
      }
      let num = parseInt(yday) - parseInt(now)
      if (num < 0) {
        return 'red'
      } else if (num > 0) {
        return 'green'
      } else {
        return ''
      }
    }
  },
  watch: {
    type() {
      this.getList()
    },
    id() {
      this.setHistoryList([])
      this.getHistoryInfo()
    },
    myInfo(val) {
      if (val && val.team_id) {
        this.getTeams(val.team_id)
      }
    },
    time() {
      this.getList(1)
    }
  },
  methods: {
    getList(time) {
      if (this.$store.state.active.teamList && this.$store.state.active.userList && !time) {
        // this.getInfo()
        this.getHistoryInfo()
      } else {
        //  let arr = [this.swapsApi.teams(), this.swapsApi.usersRank(undefined, this.time)]
        let arr = [this.swapsApi.teamsRank(), this.swapsApi.usersRank(undefined, this.time)]
        if (this.token) {
          arr.push(this.swapsApi.teamUser(this.tiem))
        }
        Promise.all(arr)
        .then(res => {
          //  接口不返回数据则终止
          if (res.leng === 0) return

          this.$store.commit('active/SET_ACTIVE', {
            teamList: res[0].data
          })
          this.$store.commit('active/SET_ACTIVE', {
            userList: res[1].data
          })
          if (res[2]) {
            this.$store.commit('active/SET_ACTIVE', {
              teamUser: res[2].data
            })
          }
          let info = {}
          // console.log('this.token###', this.token)
          if (this.token) {
            // console.log('111')
            // let u = this.$store.state.active.userList.filter(item => {
            //   return Number(cookie.getCookie('uid')) === item.user_id
            // })[0]
            // console.log('uid###', cookie.getCookie('uid'))
            let u = this.teamUser
            // console.log('u####', u)
            if (u) {
              this.getTeams(u.team_id)
              info.id = u.id
              info.user_id = u.user_id
              info.nick_name = u.nick_name || 'TigerMEX_' + info.user_id
              info.rank = u.ranking || 0
              info.total = u.PNL || '--'
              info.last_ranking = u.last_ranking
              info.team_id = u.team_id
            }
          }

          if (this.$store.state.active.teamUser) {
            let t = this.$store.state.active.teamList.filter((item) => {
              return this.$store.state.active.teamUser.team_id === item.id
            })[0]
            if (t) {
              info.name = t.name
            }
            // console.log('info###', info)
            this.$store.commit('active/SET_ACTIVE', {
              myInfo: {...this.$store.state.active.myInfo, ...info, ...this.$store.state.otherInfo}
            })
          }
          //  this.getInfo()
          this.getHistoryInfo()
        })
      }
    },
    getInfo() {
      if (this.type === 'team') {
        this.list = this.$store.state.active.teamList
        this.info = {
          id: 0,
          name: '--',
          total: '--',
          upsAndDowns: '--'
        }
        if (this.$store.state.active.teamUser) {
          let t = this.$store.state.active.teamList.filter((item) => {
            return this.$store.state.active.teamUser.team_id === item.id
          })[0]
          t && (this.info = t)
        }
      } else {
        this.list = this.$store.state.active.userList
        this.info = {
          user_id: 0,
          nick_name: '--',
          PNL: '--',
          upsAndDowns: '--'
        }
        if (this.$store.state.active.teamUser) {
          let u = this.$store.state.active.userList.filter(item => {
            return this.$store.state.active.teamUser.user_id === item.user_id
          })[0]
          u && (this.info = u)
        }
      }
      this.setInfo()
    },
    setInfo() {
      let otherInfo = this.list[0]
      if (this.id) {
        let info = this.list.filter(item => {
          return (this.type === 'team' ? item.id : item.user_id) === this.id
        })[0]
        if (info) {
          otherInfo = info
        }
      }
      // console.log('otherInfo===', otherInfo)
      this.$store.commit('active/SET_ACTIVE', { otherInfo })
    },
    getHistoryInfo() {
      // console.log('this.myTeam#####', this.myTeam)
      if (this.type === 'team') {
        this.list = this.$store.state.active.teamList
        if (this.tid) {
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].team_id === parseInt(this.tid)) {
              //  console.log('this.list[i]###', this.list[i])
              this.info = this.list[i]
              this.setHistoryInfo(this.list[i])
              break
            }
          }
          this.swapsApi.teamHistoryRanks(this.tid, this.time).then(res => {
            // console.log('teamHistoryRanks####', res)
            //  this.info = res.data.team_info
            let info = {...res.data.team_info, ...this.info}
            this.setHistoryInfo(info)
            this.setHistoryList(res.data.ranks)
          })
        } else {
          this.swapsApi.teamHistoryRanks(this.list[0].team_id, this.time).then(res => {
            //  console.log('teamHistoryRanks####', res)
            this.info = res.data.team_info
            this.setHistoryInfo(this.info)
            this.setHistoryList(res.data.ranks)
          })
        }
      } else if (this.type === 'personal') {
        this.list = this.$store.state.active.userList
        if (this.uid) {
          let info
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].user_id === this.uid) {
              info = this.list[i]
              break
            }
          }
          // console.log('info###', info)
          if (!info) {
            // console.log('myInfo###', this.myInfo)
            this.setHistoryInfo(this.myInfo)
          } else {
            this.setHistoryInfo(info)
          }
          this.swapsApi.userHistoryRanks(this.uid, this.time).then(res => {
            //  console.log('userHistoryRanks####', res)
            // if (res.data.length > 0) {
            //   this.setHistoryInfo(res.data[res.data.length - 1])
            // } else {
            //   this.setHistoryInfo(this.myInfo)
            // }
            this.setHistoryList(res.data)
          })
        } else {
          let info = this.list[0]
          this.setHistoryInfo(info)
          this.swapsApi.userHistoryRanks(this.list[0].user_id, this.time).then(res => {
            this.setHistoryList(res.data)
          })
        }
      }
    },
    setHistoryInfo(info) {
      let otherInfo
      if (info) {
        otherInfo = info
      } else {
        otherInfo = {}
      }
      //  console.log('otherInfo####', otherInfo)
      this.$store.commit('active/SET_ACTIVE', { otherInfo })
    },
    setHistoryList(list) {
      let historyList = list
      //  console.log('historyList###', historyList)
      this.$store.commit('active/SET_ACTIVE', { historyList })
    },
    getTeams(team_id) {
      if (!team_id) {
        return
      }
      this.swapsApi.team(team_id).then(res => {
        // this.myTeam = res.data
        let myTeam = res.data
        this.$store.commit('active/SET_ACTIVE', { myTeam })
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
@import url(../../../assets/css/base.less);
::-webkit-scrollbar-track-piece{
  background-color: #e6e6e6;
  -webkit-border-radius: 3px;
}
 ::-webkit-scrollbar-thumb:vertical{
  height: 5px;
  background-color: #bbb;
  -webkit-border-radius: 3px;
}

::-webkit-scrollbar-thumb:horizontal{
  width: 5px;
  background-color: #bbb;
  -webkit-border-radius: 3px;
}
.rank-list {
  .rank-item {
    .red {
      position: relative;
      color: #b83a3a;
      &::before{
        content: '';
        position: absolute;
        left: -12px;
        top: 1px;
        display: block;
        width: 13px;
        height: 16px;
        background: url(../../../assets/img/down.png) left top no-repeat;
        background-size: 100% 100%;
      }
    }
    .green {
      position: relative;
      color: #319e5c;
      &::before{
        content: '';
        position: absolute;
        left: -12px;
        top: 1px;
        display: block;
        width: 13px;
        height: 16px;
        background: url(../../../assets/img/up.png) left top no-repeat;
        background-size: 100% 100%;
      }
    }
  }
.team-name {
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  height: 6.6rem;
  background-color: #fbfbfb;
  .rank-list-top {
    height: 0.44rem;
    line-height: 0.44rem;
    background-color: @L10;
    a {
      flex: 1;
      text-align: center;
      color: #000;
      font-size: 16px;
      &.active {
        color: @L10;
         background-color: #499ffc;
      }
    }
  }
  .rank-list-bottom {
    margin-top: .1rem;
    .rank-time {
      height: 0.46rem;
      line-height: 0.46rem;
      background-color: @L10;
      a {
        position: relative;
        flex: 1;
        text-align: center;
        color: #000;
        &.active {
          color: #499ffc;
        }
        &:after {
          position: absolute;
          content: '';
          top: 10%;
          left: 0;
          display: block;
          width: 1px;
          height: 80%;
          background-color: #f3f3f3;
        }
      }
    }
    .rank-list-data {
      .my-team {
        &>div {
          height: 0.7rem;
          background-color: #f3f9ff;
          color: #000;
          line-height: 0.7rem;
          text-align: center;
          div {
            &:nth-child(n + 2) {
              flex: 1;
            }
            &:first-child {
              width: 0.6rem;
            }
            &.img {
              height: 100%;
              background-image: url(../../../assets/img/game/rank/icon-top.png);
              background-position: center center;
              background-repeat: no-repeat;
              font-size: 16px;
              color: @L10;
            }
          }
        }
      }
      .rank-list-title {
        height: 0.34rem;
        line-height: .34rem;
        p {
          // flex: 1;
          &:nth-child(n + 2) {
            flex: 1;
          }
          &:first-child {
            width: 0.6rem;
          }
          text-align: center;
        }
      }
      .list {
        overflow: auto;
        height: 4.48rem;
        &.more {
          height: 5.04rem;
        }
        .over {
        .item {
          color: #000;
          &:nth-child(2n)>div {
            background-color: @L10;
          }
          &.active>div{
            background-color: @L10;
            border: 1px solid #499ffc;
            color: #499ffc;
          }
          div {
            // flex: 1;
            height: 0.56rem;
            line-height: .56rem;
            text-align: center;
          }
          &>div>div {
            &:nth-child(n + 2) {
              flex: 1;
            }
            &:first-child {
              width: 0.6rem;
            }
          }
          .index {
            .img_0,.img_1,.img_2 {
              // width: 28px;
              // height: 42px;
              height: 100%;
              background-image: url(../../../assets/img/game/rank/icon-one.png);
              background-position: center center;
              background-repeat: no-repeat;
            }
            .img_1 {
              background-image: url(../../../assets/img/game/rank/icon-tow.png);
            }
            .img_2 {
              background-image: url(../../../assets/img/game/rank/icon-three.png);
            }
          }
        }
        }
      }
    }
  }
}
@media screen  and (max-width: 750px) {
  .rank-list {
    height: 19.8rem;
    .rank-list-top {
      height: 1.32rem;
      line-height: 1.32rem;
    }
    .rank-list-bottom {
      margin-top: .3rem;
      .rank-time {
        height: 1.38rem;
        line-height: 1.38rem;
      }
      .rank-list-data {
        .my-team {
          &>div {
            height: 2.1rem;
            line-height: 2.1rem;
            div {
               &:first-child {
                 width: 1.8rem;
              }
            }
          }
        }
        .rank-list-title {
           height: 1.02rem;
           line-height: 1.02rem;
           p {
              &:first-child {
                width: 1.8rem;
             }
           }
        }
        .list {
          height: 13.44rem;
          &.more {
            height: 15.12rem;
          }
          .over .item {
            div {
              height: 1.68rem;
              line-height: 1.68rem;
            }
            &>div>div {
               &:first-child {
                width: 1.8rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
