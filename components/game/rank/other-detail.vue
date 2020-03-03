<template>
   <section>
     <st-row class="other-detail" align="center">
       <div class="logo">
         <img :src="otherInfo.img_url" alt="" v-if="otherInfo.img_url">
         <p v-else>{{ type === 'team' ? (otherInfo.nickName && otherInfo.nickName.slice(0, 1)) : (otherInfo.nick_name || 'TigerMEX_' + otherInfo.user_id || '-').slice(0, 1)}}</p>
         <span v-if="otherInfo.ranking < 4" :class="'img_' + otherInfo.ranking"></span>
       </div>
       <st-row class="detail">
         <div >
           <p>{{ type === 'team' ? '战队名称' : '用户昵称' }}</p>
           <h6>{{ type === 'team' ? otherInfo.name : (otherInfo.nick_name || 'TigerMEX_' + otherInfo.user_id) }}</h6>
         </div>
         <div>
           <p>收益</p>
           <h6>{{ otherInfo.total | splitFormat(4) || otherInfo.PNL | splitFormat(4) || '--'  }}</h6>
         </div>
         <div v-if="type === 'team'">
           <p>战队人数</p>
           <h6>{{ otherInfo.crew  || '--' }}</h6>
         </div>
         <div>
           <p>当前排名</p>
           <h6>{{ otherInfo.ranking || otherInfo.rank || '--' }}</h6>
         </div>
         <div>
           <p>昨日排名</p>
           <h6>{{ otherInfo.last_ranking || '--' }}</h6>
         </div>
       </st-row>
     </st-row>
   </section>
</template>
<script>
export default {
  data() {
    return {
      info: {
        nickName: 'a',
        total: '--',
        number: 234,
        curryRank: 1,
        oldRank: 6,
        img_url: ''
      }
    }
  },
  computed: {
    type() {
      return this.$route.query.type || 'team'
    },
    otherInfo() {
      return this.$store.state.active.otherInfo
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../../assets/css/base.less);
.other-detail {
  background-color: @L10;
  width: 7.9rem;
  height: 2rem;
  .logo {
    position: relative;
    margin: 0 .1rem;
    height: 0.8rem;
    width: 0.8rem;
    background-color: aquamarine;
    border-radius: 50%;
    text-align: center;
    line-height: 0.8rem;
    color: @L10;
    font-size: 20px;
    // overflow: hidden;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .img_1,.img_2,.img_3 {
      position: absolute;
      top: -40%;
      right: 0px;
      display: block;
      width: 28px;
      height: 42px;
      height: 100%;
      background-image: url(../../../assets/img/game/rank/icon-one.png);
      background-position: center center;
      background-repeat: no-repeat;
    }
    .img_2 {
      background-image: url(../../../assets/img/game/rank/icon-tow.png);
    }
    .img_3 {
      background-image: url(../../../assets/img/game/rank/icon-three.png);
    }

  }
  .detail {
    flex: 1;
    div {
      position: relative;
      flex: 1;
      text-align: center;
      line-height: .3rem;
      &:nth-child(n + 2)::after {
        position: absolute;
        display: block;
        content: '';
        top: 10%;
        height: 80%;
        width: 1px;
        background-color: #e6e6e6;
      }
      h6 {
        font-size: 16px;
        color: #499ffc;
        font-weight: 700;
      }
    }
  }
}
</style>
