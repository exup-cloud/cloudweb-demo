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
                  <p>{{ item.total | splitFormat(2) }}</p>
                  <p>当前盈利额</p>
                </div>
                 <div>
                  <p>{{ item.crew }}</p>
                  <p>人数</p>
                </div>
              </st-row>
              <nuxt-link :to="'/competition/team/' + item.id">加入战队</nuxt-link>
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

  <!-- 移动端 -->
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
                  <p>{{ item.total | splitFormat(2) }}</p>
                  <p>当前盈利额</p>
                </div>
                 <div>
                  <p>{{ item.crew + '/' + item.crew_max }}</p>
                  <p>人数</p>
                </div>
              </st-row>
              <nuxt-link :to="'/competition/team/' + item.id">加入战队</nuxt-link>
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
      this.left = (this.page - 1) * -1110
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
@import '../game/game.less';
section {
  .door-two {
    display: none;
  }
  .door {
    position: relative;
    margin:  0 auto;
    width: 1110px;
    height: 880px;
    .btn {
      position: absolute;
      width: 100%;
      top: 332px;
      span {
        position: absolute;
        display: block;
        width: 40px;
        height: 130px;
        cursor: pointer;
        // background-image: url(../../assets/img/game/bt-nor.png);
        // cursor: pointer;
        // &:last-child {
        //   transform: rotate(180deg);
        //   right: -58px;
        //   background-image: url(../../assets/img/game/bt-sel.png);
        // }
        // &:hover {
        //   background-image: url(../../assets/img/game/bt-sel.png);
        // }
        // &:first-child {
        //   left: -48px;
        // }
        &:first-child {
          background: url("../../assets/img/competition/switch-L_nor.png") left top no-repeat;
          background-size: 100% 100%;
          left: -55px;
          &:hover {
            background: url("../../assets/img/competition/switch-L_sel.png") left top no-repeat;
            background-size: 100% 100%;
          }
        }
        &:last-child {
          background: url("../../assets/img/competition/switch-R_nor.png") left top no-repeat;
          background-size: 100% 100%;
          right: -55px;
          &:hover {
            background: url("../../assets/img/competition/switch-R_sel.png") left top no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .door-panel {
    margin:  0 auto;
    width: 1110px;
    height: 880px;
    overflow: hidden;
    position: relative;
  }
  .page {
    position: absolute;
    display: flex;
    transition: left 1s;
  }
  // padding-bottom: 160px;
  background: linear-gradient(to left, #8E1305, #C7312E, #8E1305);
  .team-list {
    width: 1110px;
    margin: 0 auto;
    padding-top: 30px;
  .team-info {
    position: relative;
    margin-top: 10px;
    margin-left: 10px;
    padding-top: 30px;
    width: 270px;
    height: 354px;
    background: url("../../assets/img/competition/list-bg.jpg") left top no-repeat;
    background-size: 100% 100%;
    &:nth-of-type(4n+1) {
      margin-left: 0px;
    }
    .logo {
      // position: absolute;
      // top: -54px;
      // left: 50%;
      // margin-left: -52px;
      padding: 8px;
      width: 90px;
      height: 90px;
      margin: 0 auto;
      border-radius: 50%;
      // background-image: url("../../assets/img/game/TD-logo.png");
      background-size: 100% 100%;
      &.no {
        background-image: url('../../assets/img/competition/mr-tx.png')
      }
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        border: 1px solid #ffffff;
      }
    }
    h4 {
      margin: 0 auto;
      color: #dd1b00;
      font-size: 18px;
      text-align: center;
      padding: 0px 30px;
      padding-top: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    h6 {
      padding: 5px 20px;
      margin: 0 auto;
      font-size: 14px;
      color:#7a514b;
      text-align: center;
      word-wrap:break-word;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .number {
      margin: 12px auto;
      width: 194px;
      height: 70px;
      // background-color: rgba(8,8,8, .3);
      // border: 1px solid #1b2a34;
      div {
        position: relative;
        padding-top: 16px;
        width: 109px;
        p {
          &:first-child {
            color: #dd1b00;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
          }
          &:last-child {
            color: #7a514b;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
    a {
      display: block;
      margin: 0 auto;
      width: 200px;
      height: 34px;
      text-align: center;
      line-height:  34px;
      color: #FFF454;
      font-size: 16px;
      background: url("../../assets/img/competition/list-btn_nor.png") left top no-repeat;
      background-size: 100% 100%;
      margin-top: 22px;
      &:hover {
        background-image: url("../../assets/img/competition/list-btn_sel.png");
        color: #F8D79D;
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
   width: 90%;
   margin: 0 auto;
   padding-top: 20px;
   flex-direction: column;
   align-items: center;
   padding-bottom: 20px;
   .team-info {
       margin-top: 10px;
       margin-left: 0px;
   }
 }
}
</style>
