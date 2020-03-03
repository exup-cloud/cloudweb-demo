<template>
  <section class="game-index">
      <st-row class="game-nav" justify="center">
         <nuxt-link to="/game/?nav=first" :class="nav === 'first' && 'active'" href="">活动主页</nuxt-link>
        <nuxt-link to="/game/trade" class="trade" v-if="haveGameTrade">模拟交易区</nuxt-link>
         <nuxt-link to="/game/?nav=team" :class="nav === 'team' && 'active'">战队列表</nuxt-link>
         <nuxt-link  class="news" to="/game/rank">排行榜</nuxt-link>
         <a  target="_blank" href="http://www.bishijie.com/app?recommend_type=2&channelCode=heyuejiaoyidasai">币世界APP</a>
         <nuxt-link class="exchange"  to="/bonus" >领取{{ $t('bonus.bonus') }}<span class="huo"></span></nuxt-link>
      </st-row>
      <div class="game-top">
        <div class="game-top-hyjy">
        <div class="hyjl">
           <div></div>
        </div>
        </div>
        <div class="game-top-hyjy zd">
          扫描二维码，联系官方客服进入战队群
        <div class="hyjl">
           <div></div>
        </div>
        </div>
           <!-- <h2>2018 币世界&TigerMEX联合举办全球首届永续合约模拟交易大赛</h2> -->
      </div>
      <!-- <st-row class="game-nav" justify="center">
         <nuxt-link to="/game/?nav=first" :class="nav === 'first' && 'active'" href="">活动主页</nuxt-link>
        <nuxt-link to="/game/trade" class="trade">模拟交易区</nuxt-link>
         <nuxt-link to="/game/?nav=team" :class="nav === 'team' && 'active'">战队列表</nuxt-link>
         <nuxt-link  class="news" to="/game/rank">排行榜</nuxt-link>
         <a  target="_blank" href="http://www.bishijie.com/app?recommend_type=2&channelCode=heyuejiaoyidasai">币世界APP</a>
         <nuxt-link class="exchange"  to="/bonus" >领取{{ $t('bonus.bonus') }}<span class="huo"></span></nuxt-link>
      </st-row> -->
      <first-page v-if="nav === 'first'"></first-page>
      <team-list v-else-if="nav === 'team'"></team-list>
  </section>
</template>
<script>
import FirstPage from '../../components/game/first-page'
import TeamList from '../../components/game/team-list'
export default {
  layout: 'active',
  components: {
    FirstPage,
    TeamList
  },
  data() {
    return {
      rankType: 'mouth',
      haveGameTrade: false
    }
  },
  computed: {
    nav() {
      return this.$route.query.nav || 'first'
    },
    productList() {
      return this.$store.state.market.productList
    }
  },
  methods: {
    setHaveGameTrade() {
      this.productList.forEach(item => {
        if (item.contract && item.contract.block === 4) {
          this.haveGameTrade = true
        }
      })
    }
  },
  watch: {
    productList() {
      this.productList.forEach(item => {
        if (item.contract && item.contract.block === 4) {
          this.haveGameTrade = true
        }
      })
    }
  },
  mounted() {
    this.setHaveGameTrade()
  }
}
</script>

<style lang="less" scoped>
@import '../../components/game/game.less';
.game-index {
  // height: 4100px;
  // min-width: 1200px;
  min-width: 480px;
  background-color: #0e1015;
  .game-top {
    height: 7rem;
    padding-top: 5.80rem;
    background-image: url(../../assets/img/game/BG01.png);
    background-position: center center;
    background-size: 19.2rem  7.37rem;
    // h2 {
    //   // margin-top: 600px;
    //   font-size: 30px;
    //   text-align: center;
    //   .font_color_gradient()
    // }
    .game-top-hyjy {
      position: relative;
      margin: 0 auto;
      width: 2rem;
      height: .4rem;
      // background-color: red;
    }
    .zd {
      font-size: .18rem;
      margin-top: .2rem;
      width: 400px;
      text-align: center;
      color: #b5c1ce;
       .hyjl {
         right: 20px;
         top: 4px;
         div {
           background-image: url('../../assets/img/game/kf.jpg')
         }
       }
    }
    .hyjl {
      position: absolute;
      right: -90%;
      bottom:  5.8%;
      width: 19px;
      height: 19px;
      cursor: pointer;
      background-image: url(../../assets/img/game/hyjl.png);
      div {
        display: none;
        position: absolute;
        right: -108px;
        top: 0px;
        width: 100px;
        height: 100px;
        background-image: url(../../assets/img/game/hyjl.jpg);
        background-size: 100%;
        z-index: 1;
      }
      &:hover {
        div {
          display: block;
        }
      }
    }
  }
  .game-nav {
    width: 1200px;
    margin: 0 auto;
    .news {
      position: relative;
      // &::before {
      //   position: absolute;
      //   display: block;
      //   content: '';
      //   background-image: url(../../assets/img/game/news.png);
      //   width: 39px;
      //   height: 18px;
      //   right: -18px;
      // }
    }
    .trade {
      position: relative;
      &::before {
        position: absolute;
        display: block;
        content: '';
        background: url('../../assets/img/bonus/hot.svg')left top no-repeat;
        width: 39px;
        height: 18px;
        right: -18px;
      }
    }
   a {
    position: relative;
    height: 48px;
    padding: 0 0.2rem;
    // width: 1.5rem;
    line-height: 48px;
    font-size: 16px;
    color: @game_color;
    text-align: center;
    line-height: 48px;
    flex: 1;
    &.active {
      color: #00addb;
    }
    &:nth-child(n+2)::after {
      position: absolute;
      left: 0px;
      top: 50%;
      height: 20px;
      margin-top: -10px;
      display: block;
      content: '';
      width: 1px;
      background-color: rgba(139,166,211, .5);
    }
   }
  }

}
@media screen and (max-width:750px){
  .game-index {
    .game-nav {
      width: 100%;
      a {
        font-size: 12px;
      }
    }
  }

  .game-index .game-top{
    .zd {
      width: 5.6rem;
       .hyjl {
         right: 8px;
         top: 0px;
       }
    }
    .hyjl {
      bottom: -8.2%;
      right: -106%;
      // width: .38rem;
      // height: .38rem;
    }
  }
}
@media screen and (max-width: 640px) {
   .game-index .game-top{
    .zd {
      width: 5.8rem;
    }
  }
}
@media screen and (max-width: 560px) {
   .game-index .game-top{
    .zd {
      width: 6.6rem;
    }
  }
}
</style>
