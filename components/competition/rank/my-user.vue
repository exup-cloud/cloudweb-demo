<template>
  <section class="my-user">
    <div class="my-user-top">
       <h6>我的模拟赛</h6>
       <st-row align="center">
         <div>{{ myInfo.nick_name.slice(0, 1) }}</div>
         <h4>{{ myInfo.nick_name }}</h4>
       </st-row>
    </div>
    <st-row class="my-user-bottom" justify="between">
       <div>
         <p>战队</p>
         <h6>{{ myTeam.name }}</h6>
       </div>
         <div>
         <p>当前排名</p>
         <h6>第{{ myInfo.rank || '--' }}名</h6>
       </div>
        <div>
         <p>净值变化</p>
         <h6>{{ myInfo.total | splitFormat(4) }} USDT</h6>
        </div>
    </st-row>
  </section>
</template>
<script>
export default {
  computed: {
    myInfo() {
      return this.$store.state.active.myInfo
    },
    myTeam() {
      return this.$store.state.active.myTeam
    }
  },
  watch: {
    myInfo() {
      // console.log('myInfo####', this.myInfo)
    },
    myTeam() {
      // console.log('myInfo####', this.myTeam)
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../../assets/css/base.less);
 .my-user {
   width: 4rem;
   color: #f9edd7;
   background-image: url(../../../assets/img/competition/rank/bg.png);
   background-size: 100% 100%;
  .my-user-top {
    margin-left: .2rem;
    height: 1rem;
    h6 {
      height: 0.4rem;
      line-height: .4rem;
      font-size: 14px
    }
    div {
      div {
        height: 0.5rem;
        width: 0.5rem;
        line-height: 0.5rem;
        text-align: center; 
        background-color: aquamarine;
        border-radius: 50%;
        font-size: 24px;
      }
      h4 {
        margin-left: .2rem;
        font-size: 18px;
      }
    }
  }
  .my-user-bottom {
    position: relative;
    height: 1rem;
    text-align: center;
     &::after {
        position: absolute;
        display: block;
        content: '';
        height: 1px;
        width: 90%;
        margin-left: 5%;
        background-color: #f25e5e;
      }
    div {
      flex: 1;
      padding-top: .2rem;
      &:nth-child(n + 2)::after {
        position: absolute;
        top: 15%;
        display: block;
        content: '';
        height: 70%;
        width: 1px;
        background-color: #f25e5e;
      }
      p,h6 {
        line-height: .3rem;
      }
      p {
        font-size: 12px;
        color: #f6cb96;
      }
      h6 {
        font-size: 14px;
      }
    }
  }
 }
 @media screen  and (max-width: 750px)  {
   .my-user {
    width: 12rem;
      .my-user-top {
        margin-left: .6rem;
        height: 3rem;
        h6 {
          height: 1.2rem;
          line-height: 1.2rem;
          font-size: .3rem;
        }
        div {
          div {
            height: 1.5rem;
            width: 1.5rem;
            line-height: 1.5rem;
          }
        }
      }
      .my-user-bottom {
         height: 3rem;
         div {
           p,h6 {
             line-height: .9rem;
           }
           p {
             font-size: .3rem;
           }
           h6 {
             font-size: .36rem;
           }
         }
      }
  }
}
</style>
