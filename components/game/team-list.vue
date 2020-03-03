<template>
 <section>
   <div class="door">
     <!-- @mouseenter="move(true)" @mouseleave="move()" -->
      <div class="door-panel" >
        <div class="page" :style="{left: left + 'px'}">
          <div :key="index" v-for="(personList, index) in list">
          <st-row class="team-list" wrap="wrap">
          <div class="team-info" :key="item.id" v-for="item in personList">
              <div class="logo" v-if="item.img_url">
                <img :src="item.img_url" alt="">
              </div>
              <div class="logo no" v-else></div>
              <h4>{{ item.name }}</h4>
              <h6>{{ item.manifesto }}</h6>
              <st-row class="number">
                <div>
                  <p>{{ item.total }}</p>
                  <p>当前盈利额</p>
                </div>
                 <div>
                  <p>{{ item.crew + '/' + item.crew_max }}</p>
                  <p>人数</p>
                </div>
              </st-row>
              <nuxt-link :to="'/game/team/' + item.id">加入战队</nuxt-link>
          </div>
         </st-row>
        </div>
       </div>
      </div>
      <div class="btn">
         <span @click="changePage('left')"></span>
         <span @click="changePage('right')"></span>
       </div>

   </div>
  
      <div :key="index" v-for="(personList, index) in list" class="door-two">
          <st-row class="team-list" wrap="wrap">
          <div class="team-info" :key="item.id" v-for="item in personList">
              <div class="logo" v-if="item.img_url">
                <img :src="item.img_url" alt="">
              </div>
              <div class="logo no" v-else></div>
              <h4>{{ item.name }}</h4>
              <h6>{{ item.manifesto }}</h6>
              <st-row class="number">
                <div>
                  <p>{{ item.total }}</p>
                  <p>当前盈利额</p>
                </div>
                 <div>
                  <p>{{ item.crew + '/' + item.crew_max }}</p>
                  <p>人数</p>
                </div>
              </st-row>
              <nuxt-link :to="'/game/team/' + item.id">加入战队</nuxt-link>
          </div>
         </st-row>
        </div>
 </section>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      page: 1,
      left: 0,
      maxPage: 0,
      time: null,
      direction: true
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    }
  },
  methods: {
    move(bl) {
      if (bl) {
        clearInterval(this.time)
      } else {
        this.setTime()
      }
    },
    setTime() {
      this.time = setInterval(() => {
        if (this.direction) {
          this.changePage('right')
        } else {
          this.changePage('left')
        }
      }, 6000)
    },
    changePage(type) {
      if (type === 'left') {
        if (this.page > 1) {
          this.page--
        } else {
          this.direction = true
        }
      } else {
        if (this.maxPage > this.page) {
          this.page++
        } else {
          this.direction = false
        }
      }
      this.left = (this.page - 1) * -1160
    },
    getTeams() {
      this.swapsApi.teams().then(res => {
        let list = []
        let len = res.data.length
        let i = parseInt(len / 8)
        let j = len % 8
        this.maxPage = i
        for (let k = 0; k < i; k++) {
          list[k] = res.data.slice(k * 8, (k + 1) * 8)
        }
        if (j) {
          list[i] = res.data.slice(i * 8, i * 8 + j)
          this.maxPage++
        }
        this.list = list
        // this.setTime()
      })
    }
  },
  mounted() {
    this.getTeams()
  }
  // beforeDestroy() {
  //   clearInterval(this.time)
  // }
}
</script>

<style lang="less" scoped>
@import './game.less';
section {
  .door-two {
    display: none;
  }
  .door {
    position: relative;
    margin:  0 auto;
    width: 1160px;
    height: 880px;
    .btn {
      position: absolute;
      width: 100%;
      top: 400px;
      span {
        position: absolute;
        display: block;
        width: 50px;
        height: 160px;
        background-image: url(../../assets/img/game/bt-nor.png);
        cursor: pointer;
        &:last-child {
          transform: rotate(180deg);
          right: -58px;
          background-image: url(../../assets/img/game/bt-sel.png);
        }
        &:hover {
          background-image: url(../../assets/img/game/bt-sel.png);
        }
        &:first-child {
          left: -48px;
        }
      }
    }
  }
  .door-panel {
    margin:  0 auto;
    width: 1160px;
    height: 880px;
    overflow: hidden;
    position: relative;
  }
  .page {
    // width: 100rem;
    position: absolute;
    display: flex;
    transition: left 1s;
  }
  padding-bottom: 160px;
  background-image: url("../../assets/img/game/bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .team-list {
    width: 11.6rem;
    margin: 0 auto;
  .team-info {
    position: relative;
    margin-top: 92px;
    margin-left: 10px;
    padding-top: 84px;
    width: 280px;
    height: 338px;
    background-image: url("../../assets/img/game/TD-BG02.png");
    .logo {
      position: absolute;
      top: -54px;
      left: 50%;
      margin-left: -52px;
      padding: 8px;
      width: 104px;
      height: 104px;
      border-radius: 50%;
      background-image: url("../../assets/img/game/TD-logo.png");
      background-size: 100% 100%;
      &.no {
        background-image: url('../../assets/img/game/mr-tx.png')
      }
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    h4 {
      margin: 0 auto;
      color: #fff;
      font-size: 18px;
      text-align: center;
    }
    h6 {
      padding: 0 .4rem;
      margin: 0 auto;
      font-size: 14px;
     color: @game_color;
     text-align: center;
     word-wrap:break-word;
     overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
    }
    .number {
      margin: 16px auto;
      width: 218px;
      height: 68px;
      background-color: rgba(8,8,8, .3);
      border: 1px solid #1b2a34;
      div {
        position: relative;
        padding-top: 12px;
        width: 109px;
        &:last-child::after {
          position: absolute;
          left: 0px;
          top: 12px;
          content: '';
          display: block;
          width: 1px;
          height: 40px;
          background-color: #1b2a34;
        }
        p {
          &:first-child {
            color: #fff;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
          }
          &:last-child {
            color: @game_color;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
    a {
      display: block;
      margin: 0 auto;
      width: 212px;
      height: 60px;
      text-align: center;
      line-height:  50px;
      color: #fff;
      font-size: 16px;
      background-image: url("../../assets/img/game/TD-BT-1_nor.png");
      &:hover {
        background-image: url("../../assets/img/game/TD-BT-1_sel.png");
      }
    }
  }
}
}

@media screen  and (max-width: 750px) {
  section {
     .door-two {
    display: block;
  }
  .door {
    display: none;
  }
  }

 section .team-list {
   width: 12rem;
   .team-info {
       margin-top: 92px;
       margin-left: 10px;
       padding-top: 1.6rem;
       width: 5.6rem;
       height: 6.78rem;
       background-size: 100%;
       .number {
         width: 4.4rem;
         height: 1.6rem;
        margin: .16rem auto;
       }
   }
 }
}
</style>
