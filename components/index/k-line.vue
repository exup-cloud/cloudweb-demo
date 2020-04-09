<template>
    <div class='k-line'>
      <!-- <a target="_blank" class="aicoin">{{ $t('typeTitle.aicoin') }}</a> -->
      <!-- <a target="_blank" class="lxcj" :href="`https://k.chainfor.com/?k=249-${productInfo.name}`">{{ $t('typeTitle.lxcj') }}</a> -->
      <div class="kline-header">
        <div class="header-interval">
          <span class="interval" :class="{'active': item.active, 'will-hidden': index > 4}" v-for="(item,index) in kLineType" :key="item.name" @click="changeInterval(item,index)">
            {{item.buttonName }}
          </span>
          <span class="interval more">
            {{$t('common.more')}}
            <ul class="more-list">
              <li v-if="index > 4" :class="{'active': item.active}" v-for="(item, index) in kLineType" :key="item.name" @click="changeInterval(item,index)">{{item.buttonName }}</li>
            </ul>
          </span>
        </div>
        <div class="header-tool">
          <span class="setting" @click="executeActionById('chartProperties')">
          </span>
          <span class="index" @click="executeActionById('insertIndicator')">
            <div class="hint">
              <div class="triangle"></div>
              <div class="opcity-rect"></div>
              <!-- {{$t('common.indicators')}} -->
            </div>
          </span>
          <span class="fullscreen" @click="toFullScreen('tv_chart_container')">
            <div class="hint">
              <div class="triangle"></div>
              <div class="opcity-rect"></div>
              <!-- {{$t('common.fullscreen')}} -->
            </div>
          </span>
        </div>

      </div>
      <div class="kline-box">
        <div id="tv_chart_container"></div>
      </div>
    </div>
</template>
<script>
  import DataFeeds from '../../assets/js/datafeed'
  import Formula from '../../assets/js/formula/index.js'
  export default {
    name: 'submit-entrust',
    data() {
      return {
        clear: null,
        isShow: false,
        kLineType: [
          {
            id: 0,
            name: '0',
            buttonName: this.$t('common.timeSharing'),
            period: '1min',
            step: 1 * 60 * 1000,
            bit: 1,
            type: 'M',
            firstTime: '',
            lastTime: '',
            cache: [],
            noData: false, // 是否是第一次请求
            isIncremental: true, // 是否是第一次增量,
            active: false
          },
          {
            id: 0,
            name: '1',
            buttonName: '1' + this.$t('common.minute'),
            period: '1min',
            step: 1 * 60 * 1000,
            bit: 1,
            type: 'M',
            firstTime: '',
            lastTime: '',
            cache: [],
            noData: false,
            isIncremental: true, // 是否是第一次增量
            active: false
          },
          {
            id: 1,
            name: '5',
            buttonName: '5' + this.$t('common.minute'),
            period: '5min',
            step: 5 * 60 * 1000,
            bit: 5,
            type: 'M',
            firstTime: '',
            lastTime: '',
            cache: [],
            noData: false,
            isIncremental: true, // 是否是第一次增量
            active: true
          },
          {
            id: 2,
            name: '15',
            buttonName: '15' + this.$t('common.minute'),
            period: '15min',
            step: 15 * 60 * 1000,
            type: 'M',
            bit: 15,
            firstTime: '',
            lastTime: '',
            cache: [],
            noData: false,
            isIncremental: true // 是否是第一次增量
          },
          {
            id: 3,
            name: '30',
            buttonName: '30' + this.$t('common.minute'),
            period: '30min',
            step: 30 * 60 * 1000,
            type: 'M',
            bit: 30,
            firstTime: '',
            lastTime: '',
            cache: [],
            noData: false,
            isIncremental: true, // 是否是第一次增量
            active: false
          },
          {
            id: 4,
            name: '60',
            buttonName: '1' + this.$t('common.hour'),
            period: '1hour',
            step: 60 * 60 * 1000,
            type: 'H',
            bit: 1,
            firstTime: '',
            lastTime: '',
            cache: [],
            noData: false,
            isIncremental: true, // 是否是第一次增量
            active: false
          },
          {
            id: 5,
            name: '120',
            buttonName: '2' + this.$t('common.hour'),
            period: '2hour',
            step: 2 * 60 * 60 * 1000,
            type: 'H',
            bit: 2,
            firstTime: '',
            lastTime: '',
            cache: [],
            noData: false,
            isIncremental: true, // 是否是第一次增量
            active: false
          },
          {
            id: 6,
            name: '240',
            buttonName: '4' + this.$t('common.hour'),
            period: '4hour',
            step: 4 * 30 * 60 * 1000,
            type: 'H',
            bit: 4,
            firstTime: '',
            lastTime: '',
            cache: [],
            noData: false,
            isIncremental: true, // 是否是第一次增量
            active: false
          },
          {
            id: 7,
            name: '360',
            buttonName: '6' + this.$t('common.hour'),
            period: '6hour',
            step: 6 * 30 * 60 * 1000,
            type: 'H',
            bit: 6,
            firstTime: '',
            lastTime: '',
            cache: [],
            noData: false,
            isIncremental: true, // 是否是第一次增量
            active: false
          },
          {
            id: 8,
            name: '720',
            buttonName: '12' + this.$t('common.hour'),
            period: '12hour',
            step: 12 * 60 * 60 * 1000,
            type: 'H',
            bit: 12,
            firstTime: '',
            lastTime: '',
            cache: [],
            noData: false,
            isIncremental: true, // 是否是第一次增量
            active: false
          },
          {
            id: 9,
            name: 'D',
            buttonName: '1' + this.$t('common.day'),
            period: '1day',
            step: 1440 * 60 * 1000,
            type: 'D',
            bit: 1,
            firstTime: '',
            lastTime: '',
            cache: [],
            noData: false,
            isIncremental: true, // 是否是第一次增量
            active: false
          },
          {
            id: 10,
            name: 'W',
            buttonName: '1' + this.$t('common.week'),
            period: '1week',
            step: 7 * 1440 * 60 * 1000,
            type: 'D',
            bit: 7,
            firstTime: '',
            lastTime: '',
            cache: [],
            noData: false,
            isIncremental: true, // 是否是第一次增量
            active: false
          }
        ]
      }
    },
    watch: {
      productInfo() {
        // if (this.clear) {
        //   this.clear()
        // }
        // this.widget.setSymbol(this.productInfo.instrument_id, this.widget.chart().resolution().toString())
        // if (!this.widget) {
        //   this.init();
        // } else {
        //   let symbol = JSON.stringify(JSON.parse(this.productInfo.instrument_id))
        //   console.log('this.widget#####', this.widget);
        //   if (this.widget._innerAPI()) {
        //     this.widget.chart().setSymbol(
        //       symbol,
        //       () => {
        //       console.warn('kline new symbol setled');
        //       // this.init()
        //     });
        //   }
        // }
        if (!this.widget) {
          this.init();
        } else {
          this.kLineType.forEach(v => {
            v.active = false;
            v.cache = [];
            v.noData = false;
            v.isIncremental = false;
            if (
              window.localStorage.getItem("kLine") &&
              window.localStorage.getItem("kLine") != "0"
            ) {
              if (v.name == window.localStorage.getItem("kLine")) {
                v.active = true;
              }
            } else {
              this.kLineType[2].active = true;
            }
          });
          let symbol = JSON.stringify(JSON.parse(this.productInfo.instrument_id))
          if (this.widget._innerAPI()) {
            this.widget.chart().setSymbol(
              symbol,
              () => {
              console.warn('kline new symbol setled');
            });
          }
        }

      },
      '$i18n.locale'() {
        // this.widget.setLanguage(this.changeLocale())
        try {
          this.widget.remove()
        } catch (error) {
          console.log(error)
        }
        this.init()
        // console.log(this.widget)
      }
    },
    computed: {
      locale() {
        return this.$store.state.auth.locale
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      productList() {
        return this.$store.state.market.productList
      }
    },
    methods: {
      init() {
        const themeColor = '#21242A';
        // const gridColor = '#33424d';
        const gridColor = 'rgba(50, 69, 101, 0.15)';
        const crossHairColor = '#767988';
        const mainGreen = '#4EA800';
        const mainRed = '#D8003E';
        // const textColor = '#7f868f';
        const textColor = '#727479';
        const axisColor = '#45515b';
        const disabledFeatures = [
          'header_widget',
          'header_screenshot',
          'header_saveload',
          'header_symbol_search',
          'header_saveload_to_the_right',
          'header_compare',
          'compare_symbol',
          'symbol_search_hot_key',
          'edit_buttons_in_legend',
          'volume_force_overlay',
          'display_market_status',
          'timeframes_toolbar',
          'go_to_date',
          'countdown',
          'use_localstorage_for_settings'
        ]
        const enabledFeatures = []
        let interval = this.kLineType.filter(v => {
          return v.active == true
        })[0].name
        let coinPair = this.productInfo.instrument_id
        let lang = this.locale
        let langObj = {
          'zh-cn': 'zh',
          'zh-tw': 'en',
          'en-us': 'en'
        }
        let getChartproperties = JSON.parse(window.localStorage.getItem('tradingview.chartproperties'))
        if (getChartproperties && getChartproperties.paneProperties && getChartproperties.paneProperties.background !== '#21242A') {
          getChartproperties.paneProperties.background = '#21242A'
          window.localStorage.setItem('tradingview.chartproperties', JSON.stringify(getChartproperties))
        }
        // console.log()
        let TradingView = window.TradingView
        let dataFeeds = new DataFeeds(this.kLineType, this.productList, this.swapsApi.getBar, 'QuoteBin')
        this.clear = () => {
          dataFeeds.unsubscribeBars()
        }
        let widget = this.widget = window.tvWidget = new TradingView.widget({
          width: '100%',
          // 高度大于460才显示工具栏，在1.14版本才修复
          height: '100%',
          symbol: coinPair,
          interval: interval,
          allow_symbol_change: true,
          timezone: 'Asia/Hong_Kong',
          container_id: 'tv_chart_container',
          // BEWARE: no trailing slash is expected in feed URL
          datafeed: dataFeeds,
          library_path: '/js/charting_library/',
          locale: langObj[lang] || 'en', // this.changeLocale() || 'zh',
          custom_css_url: 'styles/dark.css',
          debug: false,
          toolbar_bg: themeColor,
          // Regression Trend-related functionality is not implemented yet, so it's hidden for a while
          drawings_access: {
            type: 'black',
            tools: [
              { name: 'Regression Trend' }
            ]
          },
          // disabled_features: ['legend_context_menu', 'volume_force_overlay', 'timeframes_toolbar', 'display_market_status', 'compare_symbol', 'go_to_date', 'header_chart_type', 'header_compare', 'header_interval_dialog_button', 'header_screenshot', 'header_symbol_search', 'header_undo_redo', 'show_hide_button_in_legend', 'show_interval_dialog_on_key_press', 'snapshot_trading_drawings', 'symbol_info', 'border_around_the_chart', 'remove_library_container_border', 'header_saveload', 'show_interval_dialog_on_key_press', 'header_interval_dialog_button', 'header_resolutions'],
          // enabled_features: ['move_logo_to_main_pane', 'dont_show_boolean_study_arguments', 'hide_last_na_study_output', 'hide_left_toolbar_by_default'],
          disabled_features: disabledFeatures,
          enabled_features: enabledFeatures,
          charts_storage_api_version: '1.1',
          client_id: 'tigermex.com',
          user_id: 1, // public_user_id
          loading_screen: {
            backgroundColor: themeColor
          },
          // overrides: {
          //   'volumePaneSize': 'medium',
          //   'paneProperties.background': '#21242A', // 整个背景
          //   'paneProperties.horzGridProperties.color': 'rgba(50,69,101,0.15)', // grid 横线
          //   'paneProperties.vertGridProperties.color': 'rgba(50,69,101,0.15)', // grid 竖线
          //   'paneProperties.crossHairProperties.color': '#CDD5DF', // 交叉轴
          //   'paneProperties.topMargin': 30,
          //   'paneProperties.legendProperties.showSeriesTitle': false,
          //   // Candles styles
          //   'mainSeriesProperties.candleStyle.drawBorder': true,
          //   'mainSeriesProperties.candleStyle.borderUpColor': 'rgb(49, 158, 92)', // 蜡烛边框
          //   'mainSeriesProperties.candleStyle.borderDownColor': 'rgb(184, 58, 58)', // 蜡烛边框
          //   'mainSeriesProperties.candleStyle.upColor': 'rgb(49, 158, 92)', // 蜡烛 升
          //   'mainSeriesProperties.candleStyle.downColor': 'rgb(184, 58, 58)', // 蜡烛 降
          //   'mainSeriesProperties.candleStyle.wickUpColor': 'rgb(49, 158, 92)', // 蜡烛成交上线颜色
          //   'mainSeriesProperties.candleStyle.wickDownColor': 'rgb(184, 58, 58)', // 蜡烛成交下颜色
          //   'mainSeriesProperties.candleStyle.barColorsOnPrevClose': true,
          //   'paneProperties.priceAxisProperties.alignLabels': true,
          //   'paneProperties.legendProperties.showLegend': false,
          //   'scalesProperties.lineColor': 'rgba(50,69,101,0.5)', // 内部 边框线
          //   'scalesProperties.fontSize': 12,
          //   'scalesProperties.textColor': '#7A8F9F', // 字母和数字
          //   'mainSeriesProperties.barStyle.downColor': '#ffff00', // #d32f2f
          //   'mainSeriesProperties.haStyle.upColor': '#DC143C',
          //   'mainSeriesProperties.haStyle.downColor': '#d75442', // ---------------------
          //   'mainSeriesProperties.areaStyle.color1': 'rgba(95,142,212, 0.05)', // 分时颜色上
          //   'mainSeriesProperties.areaStyle.color2': 'rgba(95,142,212, 0.05)', // 分时颜色下
          //   'mainSeriesProperties.areaStyle.linecolor': 'rgba(95,142,212, 0.8)', // 分时线颜色
          //   'mainSeriesProperties.areaStyle.linewidth': 0.5  // 分时线宽度
          // },
          // studies_overrides: {
          //   'volume.volume.color.0': '#874755', // 倒影
          //   'volume.volume.color.1': '#0a6b61', // 倒影
          //   'volume.volume.transparency': 50,
          //   'volume.show ma': true,
          //   'volume.volume ma.color': '#7e9efd',
          //   'volume.volume ma.plottype': 'line',
          //   'volume.volume ma.linewidth': 2,
          //   'Moving Average.precision': 4 // 加号中的位数
          // }
          overrides: {
            'paneProperties.background': themeColor,
            'paneProperties.vertGridProperties.color': gridColor,
            'paneProperties.horzGridProperties.color': gridColor,
            'paneProperties.crossHairProperties.color': crossHairColor,
            'paneProperties.legendProperties.showLegend': false,
            'scalesProperties.lineColor': axisColor,
            'scalesProperties.textColor': textColor,
            'paneProperties.topMargin': 30,
            volumePaneSize: 'medium',
            'scalesProperties.showSeriesLastValue': false,
            'mainSeriesProperties.showPriceLine': false,
            'mainSeriesProperties.style': 1,
            'mainSeriesProperties.candleStyle.upColor': mainGreen,
            'mainSeriesProperties.candleStyle.downColor': mainRed,
            "mainSeriesProperties.candleStyle.wickUpColor": mainGreen, // 蜡烛成交上线颜色
            "mainSeriesProperties.candleStyle.wickDownColor": mainRed, // 蜡烛成交下颜色
            "mainSeriesProperties.candleStyle.borderUpColor": mainGreen, // 蜡烛边框
            "mainSeriesProperties.candleStyle.borderDownColor": mainRed, // 蜡烛边框
            'mainSeriesProperties.candleStyle.drawWick': true,
            'mainSeriesProperties.candleStyle.drawBorder': false,
            'scalesProperties.fontSize': 12,
          },
          studies_overrides: {
            'volume.volume.color.1': mainGreen,
            'volume.volume.color.0': mainRed,
            'volume.volume.transparency': 50,
          },
        })
        // widget.onChartReady(() => {
        //   widget.chart().executeActionById('drawingToolbarAction')
        // })
        widget.onChartReady(() => {
          widget.chart().createStudy('Moving Average', false, false, [5], null, {
            'Plot.color.0': '#ff9500',
            'Plot.linewidth': 2
          })
          widget.chart().createStudy('Moving Average', false, false, [10], null, {
            'Plot.color.0': '#d32f2f',
            'Plot.linewidth': 2
          })
          widget.chart().createStudy('Moving Average', false, false, [20], null, {
            'Plot.color.0': '#b4ad14',
            'Plot.linewidth': 2
          })
          widget.chart().createStudy('Moving Average', false, false, [60], null, {
            'Plot.color.0': '#107efa',
            'Plot.linewidth': 2
          })
          // let buttonList = this.kLineType.map((item, i) => {
          //   return widget.createButton()
          //     .data('interval', item.name)
          //     .on('click', (e) => {
          //       buttonList.map(item => {
          //         item.removeClass('selected')
          //       })
          //       buttonList[i].addClass('selected')
          //       widget.chart().setChartType(item.name === '0' ? 3 : 1)
          //       widget.chart().getAllStudies().map(items => {
          //         if (items.name === 'Moving Average') {
          //           widget.chart().setEntityVisibility(items.id, item.name !== '0')
          //         }
          //       })
          //       if (item.name === '0' || item.name === '5') { // 点击分时
          //         if (widget.chart().resolution() !== '0' && widget.chart().resolution() !== '5') widget.chart().setResolution(item.name)
          //       } else widget.chart().setResolution(item.name)
          //     }) //
          //     .append(window.$('<a class="time-interval" id=interval' + item.name + '>' + item.buttonName + '</a>'))
          // })
          // buttonList.map(item => {
          //   if (item.data('interval') === widget.chart().resolution()) {
          //     item.addClass('selected')
          //   }
          // })
          // widget.createButton()
          // // .append(window.$('<a class="time-interval" id=interval' + 12 + '>' + this.$t('typeTitle.lxcj') + '</a>'))
          // .append(window.$('<a class="time-interval" target="_blank"  style="border-bottom: 1px dotted rgba(151,176,214, 0.7)" href="' + `https://k.chainfor.com/?k=249-${this.productInfo.name}` + '">' + this.$t('typeTitle.lxcj') + '</a>'))
        });
        window['tv_chart_ready'] = true;
        // 尝试解决iframe加载白屏问题
        // setTimeout(() => {
        //   this.isShow = true
        // }, 2200)

        // let t
        // let klineIfarme = document.querySelector('#' + widget.id)
        // klineIfarme.style.visibility = 'hidden'
        // let isLoad = () => {
        //   if (klineIfarme.contentWindow && klineIfarme.contentWindow.document.readyState === 'complete') {
        //     klineIfarme.style.visibility = ''
        //     clearInterval(t)
        //   }
        // }
        // t = setInterval(isLoad, 1000)
      },
      executeActionById(id) {
        this.widget.chart().executeActionById(id);
      },
      changeInterval(item, index){
        let widget = this.widget
        this.kLineType.forEach(item => {
          item.active = false
        })
        window.localStorage.setItem("kLine", item.name)
        this.kLineType[index].active = true
        widget.chart().setChartType(item.name === '0' ? 3 : 1)
        widget.chart().getAllStudies().map(items => {
          if (items.name === 'Moving Average') {
            widget.chart().setEntityVisibility(items.id, item.name !== '0')
          }
        })
        if (item.name === '0' || item.name === '5') { // 点击分时
          if (widget.chart().resolution() !== '0' && widget.chart().resolution() !== '5') widget.chart().setResolution(item.name)
        } else widget.chart().setResolution(item.name)
      },
      aicoinUrl() {
        let contract = this.productInfo
        return (contract.base_coin + (Formula.IsReverse(contract.quote_coin, contract.price_coin) ? 'rev' : 'pc') + contract.quote_coin).toLowerCase()
      },
      toFullScreen(id) {
        const dom = document.getElementById(id || 'root');
        if (dom.requestFullscreen) {
          return dom.requestFullscreen();
        } else if (dom.webkitRequestFullScreen) {
          return dom.webkitRequestFullScreen();
        } else if (dom.mozRequestFullScreen) {
          return dom.mozRequestFullScreen();
        } else {
          return dom.msRequestFullscreen();
        }
      }
    },
    mounted() {
      if (JSON.stringify(this.productInfo)!=='{}') {
        this.init();
      }
    },
    beforeDestroy() {
      if (this.clear) {
        this.clear()
      }
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.k-line {
  position: relative;
    // margin-right: 10px;
    height: 480px;
    flex: 1;
    background-color: @L2;
    border-radius: 2px;

    .lxcj, .aicoin{
      position: absolute;
      right: 40px;
      top: 10px;
      color: @L8;
      font-size: 12px;
      border-bottom: 1px dotted @L8;
    }
    .aicoin {
      right: 50px;
    }
    .kline-box {
      width: 100%;
      height: 460px;
      position: absolute;
      left: 0px;
      top: 20px;
    }
    #tv_chart_container {
      height: 100%;
    }
    .kline-header {
      width: 100%;
      height: 30px;
      display: flex;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 1;
      background: @L1;
    }
    .header-tool{
      display: flex;
      align-items: center;
      >span{
        display: inline-block;
        margin: 6px 8px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        position: relative;
        &:hover .hint{
          visibility: visible;
          opacity: 1;
        }
      }
      .setting{
        background: url(../../assets/img/setting-nor.png) center no-repeat;
        background-size: 100% auto;
        &:hover{
          background-image: url(../../assets/img/setting-hover.png);
        }
      }
      .index{
        background: url(../../assets/img/index-nor.png) center no-repeat;
        background-size: 100% auto;
        &:hover{
          background-image: url(../../assets/img/index-hover.png);
        }
      }
      .fullscreen{
        background: url(../../assets/img/fullscreen-nor.png) center no-repeat;
        background-size: 100% auto;
        position: absolute;
        right: 0px;
        top: 0px;
        &:hover{
          background-image: url(../../assets/img/fullscreen-hover.png);
        }
      }
    }
    // .header-interval {
    //   display: flex;
    //   height: 30px;
    //   line-height: 30px;
    //   span {
    //     font-size: 14px;
    //     color: @L9;
    //     padding: 0px 3px;
    //     margin-left: 10px;
    //     cursor: pointer;
    //     &:hover, &.active {
    //       background: @i-main-2a;
    //       color: @L10;
    //     }
    //   }
    // }
    .header-interval{
      display: flex;
      .interval{
        cursor: pointer;
        padding: 6px 8px;
        color: @L9;
        font-size: 12px;
        transform: all 0.3s;
        &:hover{
          color: @main-2;
        }
      }
      .more{
        display: none;
        position: relative;
        &:hover{
          .more-list{
            display: block;
          }
        }
        .more-list{
          position: absolute;
          display: none;
          background-color: @L1;
          border: 1px solid @L3;
          // background: #2D3A43;
          width: 70px;
          text-align: center;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          z-index: 1000;
          li{
            height: 30px;
            line-height: 30px;
            cursor: pointer;
            color: @L9;
            &:hover{
              background: @L3;
            }
          }
          li.active{
            background: #293742;
            color: @main-2;
          }
        }
      }
      .active.interval{
        color: @main-2;
      }
    }
    @media screen and (max-width:750px) {
      .lxcj, .aicoin{
        display: none;
      }
    }
}

@media screen and (max-width: 1658px) {
  .more {
    display: block!important;
  }
  .will-hidden{
    display: none;
  }
}
</style>
