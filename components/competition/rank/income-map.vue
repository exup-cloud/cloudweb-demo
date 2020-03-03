<template>
  <section class="income-map">
    <st-row class="income-map-title" justify="between" align="center">
      <h4>收益值（USDT）</h4>
      <st-row>
        <a :class="(curry === 'day') && 'active'" @click="selectCurry('day')">日</a>
        <a :class="(curry === 'week') && 'active'" @click="selectCurry('week')">周</a>
        <!-- <a :class="(curry === 'week') && 'active'" class="not-allowed">周</a> -->
        <a :class="(curry === 'total') && 'active'" @click="selectCurry('total')">全部</a>
        <!-- <a :class="(curry === 'total') && 'active'" class="not-allowed">全部</a> -->
      </st-row>
    </st-row>
    <div class="income-map-cas">
      <div :style="{top: dot.y + 'px', left: dot.x + 'px'}"  class="detail" v-if="info">
          <p>{{ info.time }}</p>
          <h6>{{ info.number }}</h6>
      </div>
      <!-- <canvas id="cas"></canvas> -->
      <v-chart></v-chart>

      <p class="income-map-info">注：北京时间每天15点更新收益统计</p>
    </div>
  </section>
</template>
<script>
import Vchart from '../../vchart'
export default {
  components: {
    'v-chart': Vchart
  },
  computed: {
    time() {
      return this.$route.query.time || 'day'
    },
    tid() {
      return Number(this.$route.query.team_id)
    },
    uid() {
      return Number(this.$route.query.user_id)
    },
    type() {
      return this.$route.query.type || 'team'
    }
  },
  watch: {
    time(time) {
      this.curry = time
    }
  },
  data() {
    return {
      curry: 'day',
      list: [
        {
          time: '12.20',
          number: 0
        },
        {
          time: '12.21',
          number: '3'
        },
        {
          time: '12.22',
          number: '6'
        },
        {
          time: '12.23',
          number: '7'
        },
        {
          time: '12.24',
          number: '5'
        },
        {
          time: '12.25',
          number: '8'
        },
        {
          time: '12.26',
          number: '10'
        },
        {
          time: '12.27',
          number: '9'
        },
        {
          time: '12.28',
          number: '7'
        }
      ],
      dot: {
        x: 0,
        y: 0
      },
      info: null,
      chartData: {
        grid: {
          width: '790px',
          height: '400px'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  methods: {
    selectCurry(time) {
      this.curry = time
      if (this.type === 'team') {
        this.list = this.$store.state.active.teamList
        if (this.tid) {
          this.swapsApi.teamHistoryRanks(this.tid, time, 'USDT').then(res => {
            this.setHistoryList(res.data.ranks)
          })
        } else {
          this.swapsApi.teamHistoryRanks(this.list[0].team_id, time, 'USDT').then(res => {
            this.setHistoryList(res.data.ranks)
          })
        }
      } else if (this.type === 'personal') {
        this.list = this.$store.state.active.userList
        if (this.uid) {
          this.swapsApi.userHistoryRanks(this.uid, time, 'USDT').then(res => {
            this.setHistoryList(res.data)
          })
        } else {
          this.swapsApi.userHistoryRanks(this.list[0].user_id, time, 'USDT').then(res => {
            this.setHistoryList(res.data)
          })
        }
      }
    },
    setHistoryList(list) {
      let historyList = list
      //  console.log('historyList###', historyList)
      this.$store.commit('active/SET_ACTIVE', { historyList })
    }
    // casInit() {
    //   let initObj = {
    //     marign_left: 50,
    //     margin_bootom: 30,
    //     deviation: 0.5
    //   }
    //   const cas = document.querySelector('#cas')
    //   // cas.width = cas.width
    //   // cas.width = 790 + 'px'
    //   const c = cas.getContext('2d')
    //   const w = c.canvas.width = 790
    //   const h = c.canvas.height = 400
    //   let min = this.list[0].number
    //   let max = this.list[0].number
    //   let len = this.list.length
    //   this.list.forEach(item => {
    //     if (item.number > max) {
    //       max = item.number
    //     }
    //     if (item.number < min) {
    //       min = item.number
    //     }
    //   })
    //   c.lineWidth = 1
    //   c.strokeStyle = '#f3f3f3'
    //   c.textBaseline = 'middle'
    //   c.textAlign = 'center'
    //   c.fillStyle = '#bababa'
    //   let step_vol = (max - min) / 9
    //   let step = parseInt(h / 12)
    //   for (let i = 0; i < 12; i++) {
    //     c.beginPath()
    //     c.moveTo(initObj.marign_left - initObj.deviation, h - initObj.margin_bootom - initObj.deviation - i * step)
    //     c.lineTo(w - initObj.deviation, h - initObj.margin_bootom - initObj.deviation - i * step)
    //     c.stroke()
    //     i & 1 || c.fillText((step_vol * i + Number(min)).toFixed(2), initObj.marign_left - initObj.deviation - 10, h - initObj.margin_bootom - initObj.deviation - i * step)
    //     c.closePath()
    //   }
    //   let step_w = parseInt(w / (len * 2 + 1))
    //   let info
    //   let dotList = []
    //   let dot
    //   // let oldDot
    //   for (let i = 2; i <= len * 2; i++) {
    //     c.beginPath()
    //     c.moveTo(i * step_w, h - initObj.margin_bootom - initObj.deviation)
    //     c.lineTo(i * step_w, 0)
    //     c.stroke()
    //     if (!(i & 1)) {
    //       info = this.list[i / 2 - 1]
    //       c.beginPath()
    //       dot = {
    //         x: i * step_w,
    //         y: h - initObj.margin_bootom - (info.number - min) / step_vol * step
    //       }
    //       // if (dotList.length) {
    //       //   oldDot = dotList[dotList.length - 1]
    //       //   c.beginPath()
    //       //   c.strokeStyle = '#499ffc'
    //       //   c.moveTo(oldDot.x, oldDot.y)
    //       //   c.lineTo(dot.x, dot.y)
    //       //   c.stroke()
    //       //   c.closePath()
    //       // }
    //       dotList.push(dot)
    //       // c.beginPath()
    //       // c.arc(dot.x, dot.y, 8, 0, 2 * Math.PI)
    //       // c.fillStyle = 'rgba(73,159,252,0.3)'
    //       // c.fill()
    //       // c.beginPath()
    //       // c.arc(dot.x, dot.y, 4, 0, 2 * Math.PI)
    //       // c.fillStyle = '#499ffc'
    //       // c.fill()
    //       c.fillStyle = '#bababa'
    //       c.strokeStyle = '#f3f3f3'
    //       c.fillText(info.time, i * step_w, h - initObj.margin_bootom - initObj.deviation + 12)
    //     }
    //   }
    //   c.beginPath()
    //   // len = dotList.length
    //   // for (let i = 0; i < len; i++) {
    //   //   dot = dotList[i]
    //   //   if (!i) {
    //   //     c.moveTo(dot.x, dot.y)
    //   //     oldDot = dot
    //   //   } else {
    //   //     c.lineTo(dot.x, dot.y)
    //   //   }
    //   // }
    //   // dot = dotList[len - 1]
    //   // c.lineTo(dot.x, oldDot.y)
    //   // c.lineTo(oldDot.x, oldDot.y)
    //   // c.fillStyle = 'rgba(73,159,252,0.1)'
    //   // c.fill()
    //   // c.closePath()
    //   // let bl
    //   // cas.addEventListener('mousemove', (e) => {
    //   //   bl = true
    //   //   for (let i = 0; i < len; i++) {
    //   //     dot = dotList[i]
    //   //     if (e.offsetX < dot.x + 8 && dot.x - 8 < e.offsetX && e.offsetY < dot.y + 8 && e.offsetY > dot.y - 8) {
    //   //       this.dot = dot
    //   //       this.info = this.list[i]
    //   //       bl = false
    //   //     }
    //   //   }
    //   //   if (bl) {
    //   //     this.info = null
    //   //   }
    //   // })
    // }
  }
}
</script>

<style lang="less" scoped>
@import url(../../../assets/css/base.less);
@milkyWhite: #fcf4e7;
.income-map {
  height: 4.8rem;
  width: 7.9rem;
  background-color: @milkyWhite;
  color: #623305;
  .income-map-title {
    margin: 0 .1rem;
    height: 0.6rem;
    h4 {
      font-size: 16px;
    }
    div {
      a {
        margin-right: .2rem;
        display: block;
        height: 0.25rem;
        width: 0.6rem;
        line-height: 0.25rem;
        text-align: center;
        color: #714a2d;
        border: 1px solid #e6cb9e;
        border-radius: .125rem;
        &.active{
          color: #ed706a;
          border-color: #ec4e4d;
        }
        &.not-allowed {
          cursor: not-allowed;
          color: #a8a8a8;
          border: 1px solid #a8a8a8;
        }
      }
    }
  }
  .income-map-cas {
    position: relative;
    .detail {
      position: absolute;
      padding-top: .1rem;
      width: 1.22rem;
      height: 0.6rem;
      margin-left: -.61rem;
      margin-top: .12rem;
      background-color: #fff;
      text-align: center;
      h6 {
        font-size: 18px;
      }
      &::after {
        position: absolute;
        top: -.64rem;
        left: 50%;
        margin-left: -6px;
        content: '';
        display: block;
         width:0;
        height:0;
        border-width:0 6px 6px;
        border-style:solid;
        border-color:transparent transparent #fff;/*透明 透明  灰*/
        position:relative;
      }
    }
    #cas {
      // width: 7.9rem;
      // height: 3.9rem;
    }
    .income-map-info {
      color: rgba(0, 0, 0, .65);
      height: 40px;
      background: @milkyWhite;
      padding: 0.1rem;
      font-size: 12px;
    }
  }
  .line-chart-box {
    width: 790px;
    height: 400px;
  }
}
</style>
