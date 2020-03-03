<template>
    <div id="echarts">
        <div id="myChart"></div>
    </div>
</template>

<script>
export default {
  name: 'Echarts',
  props: ['cdata'],
  data() {
    return {}
  },
  computed: {
    historyData() {
      //  console.log('this.$store.state.active.historyList####', this.$store.state.active.historyList)
      return this.$store.state.active.historyList
    }
  },
  watch: {
    historyData(value) {
      // console.log('this.historyData###', this.historyData)
      if (value) {
        let data = this.formatCdata(value)
        this.echartsInit(data)
      }
    }
  },
  methods: {
    echartsInit(data) {
      let myChart = this.$echarts.init(document.getElementById('myChart'))

      myChart.setOption({
        grid: {
          borderColor: '#fcecd3'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#c3a27f'
          },
          axisLine: {
            lineStyle: {
              color: '#fcecd3'
            }
          },
          // splitLine: {
          //   show: true,
          //   interval: 'auto',
          //   lineStyle: {
          //     color: '#fcecd3'
          //   }
          // },
          axisTick: {
            show: false
          }
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#c3a27f'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#fcecd3'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            show: false
          }
        ],
        tooltip: {
          show: true,
          trigger: 'item',
          position: function (pt) {
            return [pt[0] - 32, pt[1] - 60]
          },
          formatter: function (params) {
            //  console.log('param####', params)
            let dArray = params.data[0].split('-')
            let y = dArray[0]
            let m = dArray[1]
            let d = dArray[2]
            let dString = y + '年' + m + '月' + d + '日'
            return '<div><span style="color:#adadad">' + dString + '</span><br /><span style="color: #666666">' + params.data[1] + '</span></div>'
          },
          backgroundColor: '#ffffff',
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);'
        },
        series: [{
          type: 'line',
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: {
            color: '#eb4745'
          },
          lineSyle: {
            color: '#eb4745'
          },
          areaStyle: {
            color: 'rgba(235,71,69,0.1)'
          },
          data: data
          // data: [
          //     ['9-07', 1],
          //     ['9-08', 3],
          //     ['9-09', 5],
          //     ['9-10', 4],
          //     ['9-11', 6],
          //     ['9-12', 5],
          //     ['9-13', 7],
          //     ['9-14', 7],
          //     ['9-15', 6],
          //     ['9-16', 5],
          //     ['9-17', 7],
          //     ['9-18', 9],
          //     ['10-07', 1],
          //     ['10-08', 3],
          //     ['10-09', 5],
          //     ['10-10', 4],
          //     ['10-11', 6],
          //     ['10-12', 5],
          //     ['10-13', 7],
          //     ['10-14', 7],
          //     ['10-15', 6],
          //     ['10-16', 5],
          //     ['10-17', 7],
          //     ['10-18', 9],
          //     ['10-17', 1],
          //     ['10-18', 3],
          //     ['10-19', 5],
          //     ['10-20', 4],
          //     ['10-21', 6],
          //     ['10-22', 5],
          //     ['10-23', 7],
          //     ['10-24', 7],
          //     ['10-25', 6],
          //     ['10-26', 5],
          //     ['10-27', 7],
          //     ['10-28', 9]
          // ]
        }]
      })
    },
    formatCdata(list) {
      let result = []
      list.forEach((item) => {
        result.push([
          item.date, item.PNL
        ])
      })
      return result
    }
  },
  mounted() {
    // this.echartsInit()
  }
}
</script>
<style lang="less" scoped>
  #myChart {
    width: 790px;
    height: 400px;
  }
</style>
