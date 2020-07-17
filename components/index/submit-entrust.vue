<template>
    <div class='submit-entrust'>
        <st-row class="submit-entrust-title" justify="between" align="center">
          <h3 >{{ $t('submitEntrust.submitEntrust') }}</h3>
          <st-row v-show="way" class="leverage">
            <div class="hint-father hover">
              <p>{{ $t('submitEntrust.leverage') }}</p>
               <div class="hint">
                   <p>{{ $t('submitEntrust.leverageHover') }}</p>
               </div>
            </div>
            <div class="leverage-sel">
              <div class="Sel-mask" v-if="leverageShow" @click="leverageShow = false"></div>
                 <span class="Sel-name"  @click="way && (leverageShow = !leverageShow)">
                   <span>{{ leverageInfo.name === 'allCabin' ? $t('submitEntrust.allCabin') : leverageInfo.name}}</span>
                 </span>
                 <ul class="Sel-list" v-if="leverageShow">
                    <li  :key="item.name" v-for="item in leverageList" :class="item.name === leverageInfo.name ? 'active' : '' " @click="changeLeverage(item.name)">
                       {{ item.name === 'allCabin' ? $t('submitEntrust.allCabin') : item.name}}
                    </li>
                 </ul>
            </div>
          </st-row>
       </st-row>
       <div class='submit-entrust-content'>
          <st-row justify="between" class='submit-entrust-content-storehouse'><a :class="{active: way}" @click="changWay(true)">{{ $t('submitEntrust.open') }}</a><span></span><a :class="{active: !way}"  @click="changWay(false)">{{ $t('submitEntrust.unwind') }}</a></st-row>
          <st-row justify="between" align="center" class="submit-entrust-content-entrust-type">
            <p>{{ $t('submitEntrust.entrustType') }}</p>
              <div class="leverage-sel">
              <div class="Sel-mask" v-if="entrusTypeShow" @click="entrusTypeShow = false"></div>
                 <span class="Sel-name" @click="entrusTypeShow = !entrusTypeShow">
                   <span>{{ $t(`submitEntrust.price${entrusTypeId}`) }}</span>
                 </span>
                 <ul class="Sel-list" v-if="entrusTypeShow">
                    <li  :key="item" v-for="item in entrusTypeList" :class="item === entrusTypeId ? 'active' : '' " @click="changeEntrusType(item)">
                       {{ $t(`submitEntrust.price${item}`) }}
                    </li>
                 </ul>
            </div>
          </st-row>
          <!-- 限价委托类型（限价委托/高级限价委托） -->
          <st-row justify="between" class="submit-entrust-limit-type" v-if="entrusTypeId === 1">
              <div class="leverage-sel">
              <div class="Sel-mask" v-if="limitShow" @click="limitShow = false"></div>
                 <span class="Sel-name" @click="limitShow = !limitShow">
                   <span>{{ $t(`submitEntrust.limit${currentLimit}`) }}</span>
                 </span>
                 <ul class="Sel-list" v-if="limitShow">
                    <li  :key="item" v-for="item in limitList" :class="item === currentLimit ? 'active' : '' " @click="changeLimit(item)">
                       {{ $t(`submitEntrust.limit${item}`) }}
                    </li>
                 </ul>
              </div>
          </st-row>
          <!-- 计划委托 -->
          <div v-if="entrusTypeId === 3"  class="submit-entrust-content-input plan">
            <st-row justify="between">
              <div class="plan-set-price">
                <span>{{ $t('submitEntrust.marketSet') + $t('newsDeal.price') }}</span>
                <div class="desc">
                  <p v-html="$t('submitEntrust.planSetPriceDesc',{type: String($t('submitEntrust.priceType_' + planInfo.priceTypeValue)).toLowerCase()})"></p>
                </div>
              </div>
              <div>
                <input maxlength="16" @input="triggerPriceChange" v-model="triggerPrice" type="text">
                <span>{{productInfo.quote_coin}}</span>
              </div>
            </st-row>
            <st-row justify="between">
              <p>{{$t('submitEntrust.orderPrice')}}</p>
              <div class="plan-maket-price" v-if="planStrategyValue === 2">
                <span>{{$t('submitEntrust.marketPrice2')}}</span>
                <a @click="changeStrategy(1)">{{$t('submitEntrust.price2')}}</a>
              </div>
              <div v-else class="plan-order-price">
                <input maxlength="16" @input="priceChange" v-model="price" type="text">
                <span class="right">
                  <span>{{productInfo.quote_coin}}</span>
                  <a @click="changeStrategy(2)">{{$t('submitEntrust.price2')}}</a>
                </span>
              </div>
            </st-row>
            <st-row justify="between">
              <p>{{ $t('submitEntrust.performNumber') }}</p>
              <div>
                <input maxlength="16" @input="volChange" v-model="vol" type="text">
                <span>{{ coinUnit ? $t('common.pieces') : productInfo.base_coin }}</span>
              </div>
            </st-row>
          <p>≈ {{openValue(!this.coinUnit)|addCommom(6) }}  {{(coinUnit ? productInfo.base_coin : $t('common.pieces'))}}</p>
            <st-row class="set" justify="end">
              <a @click="planSetShow = true"><span></span>{{ $t('submitEntrust.set') }}</a>
            </st-row>
          </div>
          <!-- 普通委托 -->
          <div v-else class="submit-entrust-content-input">
            <st-row justify="between" class="order-option" v-if="entrusTypeId === 1 && currentLimit === 2">
              <p>{{ $t('submitEntrust.orderOption') }}</p>
              <div class="order-option-sel">
                <div class="Sel-mask" v-if="limitTypeShow" @click="limitTypeShow = false"></div>
                 <span class="Sel-name" @click="limitTypeShow = !limitTypeShow">
                   <span>{{ $t(`submitEntrust.limitType${currentLimitType}`) }}</span>
                 </span>
                 <ul class="Sel-list" v-if="limitTypeShow">
                    <li  :key="item" v-for="item in limitTypeList" :class="item === currentLimitType ? 'active' : '' " @click="changeLimitType(item)">
                       {{ $t(`submitEntrust.limitType${item}`) }}
                    </li>
                 </ul>
              </div>
            </st-row>
            <st-row justify="between">
              <p>{{ $t('submitEntrust.price') }}</p>
              <div class="marketPrice" v-if="entrusTypeId === 2">{{ $t('submitEntrust.curryMarket') }}</div>
              <div v-else>
                <input maxlength="16" @input="priceChange" v-model="price" type="text">
                <span>{{productInfo.quote_coin}}</span>
              </div>
            </st-row>
            <st-row justify="between">
              <p>{{ $t('submitEntrust.positions') }}</p>
              <div>
                <input maxlength="16" @input="volChange" v-model="vol" type="text">
                <span>{{ coinUnit ? $t('common.pieces') : productInfo.base_coin }}</span>
              </div>
            </st-row>
          <p>≈ {{openValue(!this.coinUnit)|addCommom(6) }}  {{(coinUnit ? productInfo.base_coin : $t('common.pieces'))}}</p>
          </div>
          <!-- 开仓 -->
          <div v-if="way" class="submit-entrust-content-button">
            <a @click="openWindow(true, 'buy')">
              <st-row justify="between">
                <span>{{ $t('submitEntrust.buy') }}</span><span>{{ $t('submitEntrust.seeRose') }}</span>
              </st-row>
            </a>
            <st-row justify="between"><p>{{ $t('submitEntrust.margin') }}: <span>{{ openPositionsCost(true)|addCommom }} {{ com.marginUnit }}</span></p><p class="cus" @click="setSumVol(CalculateVolume(true, coinUnit))">{{ $t('submitEntrust.onOpen') }}: <span>{{ CalculateVolume(true, coinUnit)|addCommom(coinUnit ? 0 : com.valueUnit) }} {{ coinUnit ? $t('common.pieces') : productInfo.base_coin }}</span></p></st-row>
             <a @click="openWindow(false, 'sell')" class="red">
              <st-row justify="between">
                <span>{{ $t('submitEntrust.sell') }}</span><span>{{ $t('submitEntrust.sellFall') }}</span>
              </st-row>
            </a>
            <st-row justify="between"><p>{{ $t('submitEntrust.margin') }}: <span>{{ openPositionsCost()|addCommom }} {{ com.marginUnit }}</span></p><p class="cus" @click="setSumVol(CalculateVolume(false, coinUnit))">{{ $t('submitEntrust.onOpen') }}: <span>{{  CalculateVolume(false, coinUnit)|addCommom(coinUnit ? 0 : com.valueUnit) }} {{ coinUnit ? $t('common.pieces') : productInfo.base_coin }}</span></p></st-row>
          </div>
          <!-- 开仓 -->
          <!-- 平仓 -->
         <div v-else class="submit-entrust-content-button">
            <a @click="openWindow(false, 'buy')">
              <st-row justify="center">
                <span>{{ $t('submitEntrust.buyClose') }}</span>
              </st-row>
            </a>
            <st-row justify="between"><p>{{ $t('submitEntrust.sortClose') }}: <span>{{ (coinUnit ? getCanPositionVol() : changUnitGetVol(getCanPositionVol())) | addCommom(coinUnit ? 0 : com.valueUnit) }}  {{ coinUnit ? $t('common.pieces') : productInfo.base_coin }}</span></p><p class="cus" @click="setSumVol(coinUnit ? getCanClosePositionVol() : changUnitGetVol(getCanClosePositionVol()))">{{ $t('submitEntrust.canClose') }}: <span>{{ (coinUnit ? getCanClosePositionVol() : changUnitGetVol(getCanClosePositionVol()))|addCommom(coinUnit ? 0 : com.valueUnit) }} {{ coinUnit ? $t('common.pieces') : productInfo.base_coin }}</span></p></st-row>
             <a @click="openWindow(true, 'sell')" class="red">
              <st-row justify="center">
                <span>{{ $t('submitEntrust.sellClose') }}</span>
              </st-row>
            </a>
            <st-row justify="between"><p>{{ $t('submitEntrust.longClose') }}: <span>{{ coinUnit ? getCanPositionVol(true) : changUnitGetVol(getCanPositionVol(true)) | addCommom(coinUnit ? 0 : com.valueUnit) }}  {{ coinUnit ? $t('common.pieces') : productInfo.base_coin }}</span></p><p class="cus" @click="setSumVol(coinUnit ? getCanClosePositionVol(true) : changUnitGetVol(getCanClosePositionVol(true)))">{{ $t('submitEntrust.canClose') }}: <span>{{ coinUnit ? getCanClosePositionVol(true) : changUnitGetVol(getCanClosePositionVol(true))|addCommom(coinUnit ? 0 : com.valueUnit) }} {{ coinUnit ? $t('common.pieces') : productInfo.base_coin }}</span></p></st-row>
          </div>
          <!-- 平仓 -->
          <st-row align="center" justify="between" class="submit-entrust-content-balance">
            <div class="hint-father hover">
              <p>{{ $t('submitEntrust.balance') }}</p>
               <div class="hint">
                   <p>{{ $t('submitEntrust.balanceHover') }}</p>
               </div>
            </div>
            <h6>{{ com.haveAssert| addCommom(com.valueUnit) }} {{ com.marginUnit }}</h6>
          </st-row>
          <st-row class="submit-entrust-content-money" justify="end">
            <a @click="transferShowFn"><i></i>{{ $t('submitEntrust.money') }}</a>
          </st-row>
       </div>
        <popup :title="''"  width="440" :callback="confirmEntrustClose" v-if="showConfirmEntrust">
          <forced-reminder @submitOrder="submitOrder" :info="info" :close="confirmEntrustClose" :type="1"></forced-reminder>
       </popup>
        <popup :title="''"   width="440" :callback="unwindClose" v-if="showUnwind">
          <unwind-window :info="isForced ? forcedReminderInfo : info" @submitOrder="submitOrder" :close="unwindClose" :forced="isForced" :confirm="isConfirm"></unwind-window>
       </popup>
        <popup :title="$t('submitEntrust.money')"  width="600" :callback="transferClose" v-if="transferShow">
           <transfer-window :close="transferClose"></transfer-window>
       </popup>
        <popup :title="$t('submitEntrust.planSet')"  width="440" :callback="planSetClose" v-if="planSetShow">
           <set-plan-window @changePlan="changePlan" :close="planSetClose"></set-plan-window>
       </popup>
        <popup :title="deviation ? $t('submitEntrust.max') : $t('submitEntrust.min')"  width="440" :callback="deviationClose" v-if="deviationShow">
           <confirm-plan-window @submitOrder="submitPlanOrder" :deviation="deviation" :close="deviationClose"></confirm-plan-window>
       </popup>
       <popup :title="''" v-if="forcedReminderShow" :callback="closeForcedReminder">
         <forced-reminder @submitOrder="submitOrder" :info="forcedReminderInfo" :close="closeForcedReminder" :type="2"></forced-reminder>
       </popup>
       <popup :title="''" v-if="isShownoConfrimForced" :callback="closeNoConfrimForced">
         <no-confrim-forced-window @submitOrder="submitOrder" :info="forcedReminderInfo" :close="closeNoConfrimForced"></no-confrim-forced-window>
       </popup>

       <div class="no-login" v-if="!token">
         <p>{{$t('submitEntrust.nologin1')}}</p>
         <a class="login" @click="getUrl('login')">{{$t('header.LOGIN')}}</a>
         <a class="signup" @click="getUrl('register')">{{$t('header.SIGNUP')}}</a>
       </div>
    </div>
</template>
<script>
  import Popup from '../bx-ui/popup'
  import ConfirmEntrustWindow from './record-list-cp/confirm-entrust-window'
  import UnwindWindow from './record-list-cp/unwind-window'
  import TransferWindow from './submit-entrust-cp/transfer-window'
  import Utils from '../../assets/js/util.js'
  import Formula from '../../assets/js/formula/index.js'
  import ApiConfig from '../../config/api.config'
  import SetPlanWindow from './submit-entrust-cp/set-plan-window'
  import ConfirmPlanWindow from './submit-entrust-cp/confirm-plan-window'
  import ForcedReminder from './record-list-cp/forced-reminder'
  import NoConfrimForcedWindow from './record-list-cp/noconfrim-forced-window'
  export default {
    name: 'submit-entrust',
    components: {
      Popup,
      ConfirmEntrustWindow,
      UnwindWindow,
      TransferWindow,
      SetPlanWindow,
      ConfirmPlanWindow,
      ForcedReminder,
      NoConfrimForcedWindow
    },
    data() {
      let list = [
        {name: 'allCabin', value: 100},
        {name: '100x', value: 100},
        {name: '50x', value: 50},
        {name: '20x', value: 20},
        {name: '10x', value: 10}
      ]
      return {
        showConfirmEntrust: false, // 开仓弹窗
        showUnwind: false, // 平仓弹窗
        way: true, // true 开仓 false 平仓
        levisForcederageInfo: null,
        leverageShow: false,
        leverageListSource: list,
        leverageList: list,
        entrusTypeId: 1,
        entrusTypeShow: false,
        entrusTypeList: [1, 2, 3], // 限价，市价， 计划
        limitList: [1, 2], // 限价委托，高级限价委托
        limitShow: false,
        currentLimit: 1,
        limitTypeList: [1, 2, 3], //只做Maker, 全部成交或立即取消, 立即成交并取消剩余
        limitTypeShow: false,
        currentLimitType: 1,
        transferShow: false,
        planSetShow: false,
        price: '',
        vol: '',
        MarginCoin: Formula.MarginCoin,
        info: {},
        // 计划委托偏差， true为过大
        deviation: false,
        deviationShow: false,
        // 触发价
        triggerPrice: '',
        // 价格方向,1:看涨,2:看跌
        price_way: '',
        planInfo: {
          priceTypeValue: 1,
          // strategyValue: 1,
          timeListValue: 24
        },
        // 多或者空，true为多
        options: true,
        // 是否强制提醒
        forcedReminderShow: false,
        forcedReminderInfo: {}, // 强制提醒需要的信息
        planStrategyValue: 1, // 计划委托策略，市价，限价
        isConfirm: true, // 是否勾选了二次确认中“不再提醒”选项
        isForced: false,  // 收否是强制提醒
        isShownoConfrimForced: false // 勾选了不再提醒后的强制弹框
      }
    },
    computed: {
      locale() {
        return this.$store.state.auth.locale
      },
      token() {
        return this.$store.state.auth.token
      },
      com() {
        return this.$store.state.com
      },
      cabinList() {
        return this.$store.state.market.cabinList
      },
      ticker() {
        return this.$store.state.market.ticker
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      coinUnit() {
        return this.$store.state.market.coinUnit
      },
      accounts() {
        return this.$store.state.auth.accounts || {}
      },
      setPrice() {
        return this.$store.state.market.price
      },
      setVol() {
        return this.$store.state.market.vol
      },
      sell() {
        return this.$store.state.market[this.productInfo.instrument_id + '_Order'] ? (this.$store.state.market[this.productInfo.instrument_id + '_Order'].asks || []) : []
      },
      buy() {
        return this.$store.state.market[this.productInfo.instrument_id + '_Order'] ? (this.$store.state.market[this.productInfo.instrument_id + '_Order'].bids || []) : []
      },
      id() {
        return Number(this.$route.query.id)
      }
    },
    watch: {
      productInfo() {
        let leverage = window.localStorage['t_leverage' + this.id]
        this.editLeverage()
        if (leverage) {
          this.leverageInfo = this.leverageList.filter(item => {
            return item.name === leverage
          })[0] || this.leverageList[this.leverageList.length - 1]
        }
      },
      setPrice() {
        if (this.setPrice && this.isPrice()) {
          this.price = this.setPrice
          this.$store.commit('market/SET_MARKET', {
            key: 'price',
            data: 0
          })
        }
      },
      setVol() {
        if (this.setVol) {
          this.vol = this.setVol
          this.$store.commit('market/SET_MARKET', {
            key: 'vol',
            data: 0
          })
        }
      },
      coinUnit() {
        // this.changeInit()
        this.vol = ''
      }
    },
    methods: {
      changePlan(info) {
        this.planInfo = info
      },
      deviationClose() {
        this.deviationShow = false
      },
      planSetClose() {
        this.planSetShow = false
      },
      // 修改杠杆
      editLeverage() {
        if (!this.productInfo.max_leverage) {
          return false
        }
        this.leverageList = this.leverageListSource.filter(item => {
          return (!~item.name.indexOf('x')) || item.value <= Number(this.productInfo.max_leverage)
        })
        this.leverageList[0].value = this.leverageList[1].value
        // this.leverageInfo = this.leverageList[0]
        this.leverageInfo = this.leverageList[this.leverageList.length - 1]
        this.$store.commit('com/SET_COMMON', {
          leverageList: this.leverageList.map(item => {
            return {name: item.name, value: item.value}
          })
        })
      },
      // 资金划转
      transferShowFn() {
        if (this.token) {
          this.transferShow = true
        } else {
          window.location.href = `${ApiConfig.mainDomain}/login?lang=${this.locale}&path=${escape(window.location.href)}`
        }
      },
      // // 给数字加逗号
      // addCommom(num, len) {
      //   console.log(num, len)
      //   return Utils.addCommom(num, len)
      // },
      // 设置数量
      setSumVol(vol) {
        vol = this.coinUnit ? vol : Utils.retainDecimals(vol, {decimal: this.com.valueUnit})
        this.vol = Number(vol) || ''
      },
      // 开仓弹窗
      confirmEntrustClose() {
        this.showConfirmEntrust = false
      },
      // 平仓弹窗
      unwindClose() {
        this.showUnwind = false
      },
      // 判断是否是限价
      isPrice() {
        return this.entrusTypeId === 1
      },
      // 平仓和开仓切换
      changWay(bl) {
        this.way = bl
        // this.changeInit()
      },
      changeLeverage(name) {
        this.leverageShow = false
        this.leverageInfo = this.leverageList.filter(item => { return item.name === name })[0]
        window.localStorage.setItem('t_leverage' + this.id, name)
        // this.changeInit()
      },
      changeEntrusType(value) {
        this.entrusTypeShow = false
        this.entrusTypeId = value
        this.price = ''
        this.$store.commit('com/SET_COMMON', {
          isPlan: Number(value) === 3
        })

        if (value === 2) { //市价
          this.$store.commit('com/SET_COMMON', {
            limitType: 3
          })
        } else if (value === 1) { //限价
          this.$store.commit('com/SET_COMMON', {
            limitType: this.currentLimit
          })
        }
        // setTimeout(() => {
        //   this.$emit('move')
        // }, 50)
        // this.changeInit()
      },
      changeLimit(value) { // 限价委托/高级限价委托
        this.limitShow = false
        this.currentLimit = value
        this.$store.commit('com/SET_COMMON', {
          limitType: value
        })
      },
      changeLimitType(value) { // 只做Maker/全部成交或立即取消/立即成交并取消剩余
        this.limitTypeShow = false
        this.currentLimitType = value
      },
      transferClose() {
        this.transferShow = false
      },
      // 获取开仓类型：全仓或逐仓
      openType() {
        return this.leverageInfo.name !== 'allCabin' ? 1 : 2 // 1:逐仓,2:全仓
      },
      // 打开弹窗
      openWindow(longOrSort, type) { // type:买卖类型buy,sell
        this.isConfirm = window.localStorage['isConfirm']
        this.options = longOrSort
        if (!this.validation(longOrSort)) {
          return false
        }

        // 强制提醒相关
        // console.log('longOrSort###', longOrSort)
        let toShowForce = this.isShowForced(longOrSort, type)
        if (toShowForce) {
          this.showForcedWindow(longOrSort, type)
          return false
        }
        // 强制提醒#######

        // 处理计划委托
        if (this.entrusTypeId === 3) {
          switch (this.planInfo.priceTypeValue) {
            case 1:
              this.price_way = this.ticker.last_px
              break
            case 2:
              this.price_way = this.ticker.fair_px
              break
            case 4:
              this.price_way = this.ticker.index_px
              break
          }
          if (Math.abs(this.triggerPrice - this.price_way) < Number(this.productInfo.plan_order_price_min_scope)) {
            this.deviationShow = true
          } else {
            this.submitPlanOrder()
          }
          return false
        }

        // 记住用户是否设置了不再显示弹窗的用户偏好
        // let isConfirm = window.localStorage['isConfirm']
        if (this.isConfirm === '1') {
          this.submitOrder(longOrSort)
        } else {
          let vol = this.getVol()
          this.info.qty = vol
          this.info.px = this.price
          this.info.category = this.entrusTypeId
          this.info.longOrSort = longOrSort
          if (this.way) {
            this.showConfirmEntrust = true
            this.info.side = longOrSort ? 1 : 4
            this.info.leverageName = this.leverageInfo.name
            this.info.leverage = this.leverageInfo.value
            this.info.jz = (this.coinUnit ? Utils.addCommom(this.openValue(false), this.com.valueUnit) : this.vol) + ' ' + this.productInfo.base_coin
            this.info.cb = this.openPositionsCost(longOrSort) + ' ' + this.com.marginUnit
            this.info.ye = Utils.addCommom(this.com.haveAssert, this.com.pxUnit) + ' ' + this.accounts.coin_code
            this.info.size = Number(this.getCanPositionVol(longOrSort)) + Number(vol)
          } else {
            this.isForced = false
            this.showUnwind = true
            this.info.side = longOrSort ? 3 : 2
          }
        }
      },
      // 判断是否需要强制提醒
      isShowForced(longOrSort, type) {
        if (this.entrusTypeId === 1) { // 限价
          if (type === 'buy') { // 开多或平空：若委托价格/最新价 > 103%，则显示强制提示
            if (Utils.precision.divide(this.price, this.ticker.last_px) > 1.05) {
              return true
            }
          } else if (type === 'sell') { // 开空或平多：若委托价格/最新价<103%，则显示强制提示
            if (Utils.precision.divide(this.price, this.ticker.last_px) < 0.95) {
              return true
            }
          }
        } else if (this.entrusTypeId === 2) { // 市价
          let e_avg_price = this.getEstimatedAveragePrice(type) // 开仓平仓预估均价
          // console.log('this.ticker.last_px###', this.ticker.last_px)
          // console.log('e_avg_price####', e_avg_price)
          if (type === 'buy') {
            if (Utils.precision.divide(e_avg_price, Number(this.ticker.last_px)) > 1.03) {
              return true
            }
          } else if (type === 'sell') {
            // console.log('sell')
            if (Utils.precision.divide(e_avg_price, Number(this.ticker.last_px)) < 0.97) {
              return true
            }
          }
        }
        return false
      },
      // 获取开仓/平仓预估均价
      getEstimatedAveragePrice(type) {
        let vol = this.vol
        let resultList = []
        let entrustList = type === 'buy' ? this.sell : this.buy
        for (let i = 0; i < entrustList.length; i++) {
          // vol = vol - Number(entrustList[i].vol)
          vol = vol - Number(entrustList[i][2])
          resultList.push({
            // price: entrustList[i].price,
            price: entrustList[i][1],
            // vol: entrustList[i].vol
            vol: entrustList[i][2]
          })
          // resultList.push(entrustList[i])
          if (vol < 1) {
            resultList[i].vol = Number(resultList[i].vol) + Number(vol)
            break
          }
        }
        let vol_sum, mul_sum, result
        vol_sum = 0
        mul_sum = 0
        result = 0
        resultList.forEach((item) => {
          vol_sum = vol_sum + Number(item.vol)
          mul_sum = mul_sum + Utils.precision.times(Number(item.price), Number(item.vol))
        })
        result = Utils.precision.divide(mul_sum, vol_sum)
        return result
      },
      // 设置强制提醒框显示的内容
      showForcedWindow(longOrSort, type) {
        this.isConfirm = window.localStorage['isConfirm']
        let vol = this.getVol()
        this.forcedReminderInfo.qty = vol
        this.forcedReminderInfo.px = this.price
        this.forcedReminderInfo.category = this.entrusTypeId
        this.forcedReminderInfo.longOrSort = longOrSort
        this.forcedReminderInfo.type = this.way  // 是开仓还是平仓
        this.forcedReminderInfo.buyOrSell = type // 买或卖

        if (this.way && !this.isConfirm) {
          this.forcedReminderInfo.leverageName = this.leverageInfo.name
          this.forcedReminderInfo.leverage = this.leverageInfo.value
          this.forcedReminderInfo.jz = (this.coinUnit ? Utils.addCommom(this.openValue(false), this.com.valueUnit) : this.vol) + ' ' + this.productInfo.base_coin
          this.forcedReminderInfo.cb = this.openPositionsCost(longOrSort) + ' ' + this.com.marginUnit
          this.forcedReminderInfo.ye = Utils.addCommom(this.com.haveAssert, this.com.pxUnit) + ' ' + this.accounts.coin_code
          this.forcedReminderInfo.size = Number(this.getCanPositionVol(longOrSort)) + Number(vol)
          this.forcedReminderInfo.side = longOrSort ? 1 : 4
          this.forcedReminderShow = true
        } else {
          this.isForced = true
          this.forcedReminderInfo.side = longOrSort ? 3 : 2
          if (this.isConfirm) {
            this.showNoConfrimForced()
          } else {
            this.showUnwind = true
          }
        }
      },
      // 显示强制提醒
      // showForcedWindow(longOrSort) {
      //   this.setForcedReminderInfo(longOrSort)
      //   console.log('this.forcedReminderInfo###', this.forcedReminderInfo)
      //   this.forcedReminderShow = true
      // },
      // 关闭强制提醒
      closeForcedReminder() {
        this.forcedReminderShow = false
      },
      // 获取张数
      getVol() {
        return this.coinUnit ? this.vol : Formula.CalculateContractBasicValue(this.vol, this.getPrice(), Formula.contractObj.getContract(this.productInfo), true)
      },
      // 提交计划委托
      submitPlanOrder() {
        let obj = {}
        obj.nonce = parseInt(Date.now() / 1000)
        obj.instrument_id = this.productInfo.instrument_id
        // obj.category = this.planInfo.strategyValue
        obj.category = this.planStrategyValue
        obj.leverage = String(this.leverageInfo.value)
        // 价类型,1:交易价,2:标记价;4:指数价,否则返回无效参数
        obj.trigger_type = this.planInfo.priceTypeValue
        // 价格方向,1:看涨,2:看跌
        obj.trend = Number(this.price_way) < Number(this.triggerPrice) ? 1 : 2

        // obj.open_type = this.openType()
        // if (this.planInfo.strategyValue === 1) {
        if (this.planStrategyValue === 1) {
          // 执行价格
          obj.exec_px = this.price
        }
        obj.px = this.triggerPrice
        obj.qty = this.getVol()
        // 委托周期，单位小时
        obj.cycle = this.planInfo.timeListValue
        if (this.way) {
          obj.side = this.options ? 1 : 4
          obj.position_type = this.openType()
        } else {
          obj.side = this.options ? 3 : 2
        }

        this.swapsApi.submitPlanOrder(obj).then(res => {
          if (res.errno === 'OK') {
            this.changeInit()
            this.$alert('s', this.$t('submitEntrust.message.a7'))
          }
        })
      },
      // 提交订单
      // longOrSort true 多 false 空
      submitOrder(longOrSort) {
        if (this.price && Number(this.price) > 100000000) {
          this.$alert('s', '价格不能超过100000000');
          return;
        }
        // category 订单类型 1:限价单,2:市价单
        // side 订单方向 1:开多,2:平空,3:平多,4:开空
        // position_type 开仓方式 1:逐仓,2:全仓
        // leverage  杠杆
        let obj = {}
        obj.nonce = parseInt(Date.now() / 1000) // new Date().valueOf() + '000'
        obj.instrument_id = this.productInfo.instrument_id
        if (this.way) {
          obj.side = longOrSort ? 1 : 4
          obj.position_type = this.openType()
          obj.leverage = Number(this.leverageInfo.value)
        } else {
          obj.side = longOrSort ? 3 : 2
          obj.position_id = this.positionFn(longOrSort).position_id
        }
        obj.category = this.entrusTypeId
        obj.qty = this.getVol()
        if (this.entrusTypeId === 1 && this.isPrice()) {
          obj.px = this.price
        }

        if (this.entrusTypeId !== 2 && this.currentLimit === 2) {
          switch(this.currentLimitType) {
            case 1: // 只做maker
              obj.category = 7
              break
            case 2: // 全部成交或转撤销;
              obj['time_in_force'] = 2
              break
            case 3: // 立即成交或转撤销
              obj['time_in_force'] = 3
              break
            default:
              break
          }
        }

        this.way ? this.confirmEntrustClose() : this.unwindClose()
        this.closeForcedReminder()
        this.closeNoConfrimForced()
        this.swapsApi.submitOrder(obj).then(res => {
          if (res.errno === 'OK') {
            this.changeInit()
            this.$alert('s', this.$t('submitEntrust.message.a7'))
          }
        })
      },
      // 价格改变事件
      priceChange() {
        this.price = Utils.retainDecimals(this.price, {decimal: this.com.pxUnit - 1}) || ''
      },
      // 触发价改变事件
      triggerPriceChange() {
        this.triggerPrice = Utils.retainDecimals(this.triggerPrice, {decimal: this.com.pxUnit - 1}) || ''
      },
      // 量改变事件
      volChange() {
        let vol_unit = this.coinUnit ? 0 : this.com.valueUnit
        this.vol = Utils.retainDecimals(this.vol, {decimal: vol_unit}) || ''
      },
      // 仓位价值
      openValue(coinUnit) {
        let value = 0
        if (this.vol) {
          value = this.changUnitGetVol(this.vol, coinUnit)
        }
        return value
      },
      // 张和base_coin单位的切换
      changUnitGetVol(vol, coinUnit) {
        let ut = this.coinUnit
        if (typeof coinUnit === 'boolean') {
          ut = coinUnit
        }
        return Formula.CalculateContractBasicValue(vol, this.getPrice(), Formula.contractObj.getContract(this.productInfo), ut)
      },
      // 开仓成本
      openPositionsCost(longOrSort) {
        let Price = this.price || this.ticker.fair_px
        if (!this.vol || !Price) {
          return 0
        }
        let vol = this.getVol()
        let order = {Vol: Number(vol), Price: Number(Price), Leverage: this.leverageInfo.value, TakeFeeRatio: this.productInfo.taker_fee_ratio}
        let cb = Formula.CalculateAdvanceOpenCost(order, this.positionFn(longOrSort), this.openOrderSizeFn(longOrSort), Formula.contractObj.getContract(this.productInfo), Formula.contractObj.getRiskLimit(this.productInfo), longOrSort)
        return Utils.retainDecimals(cb, {decimal: this.com.valueUnit})
      },
      // 获取单一方向的仓位
      positionFn(longOrSort) {
        let position
        if (!this.token || !this.cabinList) {
          return position
        }
        position = this.cabinList.filter(item => {
          return item.side === (longOrSort ? 1 : 2) // 仓位类型,1:开多,2:开空
        })[0]
        if (position) {
          // cur_qty 当前持有量
          // position = {HoldVol: position.cur_qty, HoldAvgPrice: position.avg_open_px, position_id: position.pid, FreezeVol: position.freeze_qty}
          position = {HoldVol: position.cur_qty, HoldAvgPrice: position.avg_cost_px, position_id: position.pid, FreezeVol: position.freeze_qty}
        }
        return position
      },
      // 获取单一方向的委托
      openOrderSizeFn(longOrSort) {
        let openOrderSize
        if (!this.token) {
          return openOrderSize
        }
        // 只算委托中开多或开空单一方向
        let that = this.$store.state.market
        let way = longOrSort ? 1 : 4
        let entrustInfo = that.curryEntrustList.filter(item => {
          return item.side === way    // 1:开多,2:平空,3:平多,4:开空
        })
        if (entrustInfo.length) {
          let Vol = 0
          let Amount = 0
          entrustInfo.forEach(item => {
            //cum_qty 成交量
            Amount += item.px * (item.qty - item.cum_qty)
            Vol += Number(item.qty)
          })
          openOrderSize = {Amount, Vol}
        }
        return openOrderSize
      },
      // 提交订单验证
      validation(longOrSort) {
        if (!this.token) {
          this.$alert(this.$t('submitEntrust.message.a9'))
          return false
        }
        let isPlan = this.entrusTypeId === 3
        if (!this.vol || (this.isPrice() && !this.price)) {
          this.$alert(this.$t('submitEntrust.message.a1'))
          return false
        }
        if (isPlan && !this.triggerPrice) {
          this.$alert(this.$t('submitEntrust.message.a1'))
          return false
        }
        if (this.way || isPlan) {
          let contract = this.productInfo
          let vol = Number(this.getVol())
          if (Number(contract.min_qty) && vol < Number(contract.min_qty)) {
            this.$alert(this.$t('submitEntrust.message.a2', {minVol: contract.min_qty}))
            return false
          }
          if (Number(contract.max_qty) && vol > Number(contract.max_qty)) {
            this.$alert(this.$t('submitEntrust.message.b5', {maxVol: contract.max_qty}))
            return false
          }
          if (!isPlan) {
            let maxVol = this.CalculateVolume(longOrSort, true)
            if (vol > maxVol) {
              this.$alert(this.$t('submitEntrust.message.a3', { maxVol }))
              return false
            }
            let assert = Number(this.com.haveAssert)
            if (assert <= 0) {
              this.$alert(this.$t('submitEntrust.message.a4'))
              return false
            }
            let positionLiquidatePrice = Formula.CalculateOrderLiquidatePrice(this.getOrder(), assert, this.getContractInfo(), longOrSort)
            if (Formula.IsLiquidate(longOrSort, positionLiquidatePrice, Number(this.ticker.fair_px))) {
              this.$alert(this.$t('submitEntrust.message.a5'))
              return false
            }
          }
        } else {
          if (!this.getCanClosePositionVol(longOrSort)) {
            this.$alert(this.$t('submitEntrust.message.a6'))
            return false
          }
        }
        return true
      },
      // 获取持仓量
      getCanPositionVol(longOrSort) {
        let vol = 0
        let position = this.positionFn(longOrSort)
        if (position && position.HoldVol) {
          vol = position.HoldVol
        }
        return vol
      },
      // 获取可平量 freeze_vol
      getCanClosePositionVol(longOrSort) {
        let vol = 0
        let position = this.positionFn(longOrSort)
        if (position && position.HoldVol) {
          vol = position.HoldVol - position.FreezeVol
        }
        return vol
      },
      // 获取价格
      getPrice() {
        return Number(this.price) || this.ticker.fair_px
      },
      // 获取当前订单信息（验证）
      getOrder() {
        return {
          OpenType: this.leverageInfo.name === 'allCabin',
          Leverage: this.leverageInfo.value,
          Vol: this.vol,
          Price: this.getPrice()
        }
      },
      // 获取用户可用余额
      // getCanAssert() {
      //   let assert = this.accounts.available_vol
      //   let money = this.$store.state.market.longOptions + this.$store.state.market.sortOptions
      //   return money < 0 ? (assert - money) : assert
      // },
      // 获取精度
      gePrecision(value, unit, integer = 8) {
        let _unit = this.com[unit]
        return Utils.retainDecimals(value, { decimal: _unit})
      },
      changeInit() {
        this.price = ''
        this.vol = ''
      },
      // 获取可开张数 bl 为true时求价值
      CalculateVolume(longOrSort, bl) {
        let Price = this.price || this.ticker.fair_px
        if (!Number(this.accounts.available_vol) || !Number(Price)) {
          return 0
        }

        let contractInfo = this.getContractInfo()
        // 获取可开张数
        let value = Formula.CalculateVolume(Number(this.gePrecision(this.com.haveAssert, 'valueUnit')), this.openOrderSizeFn(longOrSort), this.positionFn(longOrSort), Number(Price), contractInfo, longOrSort, this.leverageInfo.value)
       if (!bl) {
          value = Formula.CalculateContractBasicValue(value, this.getPrice(), Formula.contractObj.getContract(this.productInfo))
        }
        return value
      },
      // 获取合约对象
      getContractInfo() {
        return {
          FeeConfig: {TakerFee: Number(this.productInfo.taker_fee_ratio)},
          Contract: Formula.contractObj.getContract(this.productInfo),
          RiskLimit: Formula.contractObj.getRiskLimit(this.productInfo)
        }
      },
      getUrl(type) {
        window.location.href = `${ApiConfig.mainDomain}/${type}?lang=${this.locale}&path=${escape(window.location.href)}`
      },
      // 修改计划委托策略  市价或限价
      changeStrategy(value) {
        this.planStrategyValue = value
      },
      showNoConfrimForced() {
        this.isShownoConfrimForced = true
      },
      closeNoConfrimForced() {
        this.isShownoConfrimForced = false
      }
    },
    created() {
      // this.leverageInfo = this.leverageList[0]
      this.leverageInfo = this.leverageList[this.leverageList.length - 1]
      this.entrusTypeId = this.entrusTypeList[0]
    },
    mounted() {
      let leverage = window.localStorage['t_leverage' + this.id]
      this.editLeverage()
      // if (leverage) {
      //   this.leverageInfo = this.leverageList.filter(item => {
      //     return item.name === leverage
      //   })[0] || this.leverageList[0]
      // }
      if (leverage) {
        this.leverageInfo = this.leverageList.filter(item => {
          return item.name === leverage
        })[0] || this.leverageList[this.leverageList.length - 1]
      }
      let planInfo = window.localStorage.getItem('planInfo')
      if (planInfo) {
        this.planInfo = JSON.parse(planInfo)
      }
    }
  }
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.submit-entrust {
  // margin-left: 10px ;
  width: 280px;
  // height: 480px;
  background-color: @L2;
  border-radius: 2px;
  padding-bottom: 18px;
  position: relative;
  .submit-entrust-title {
      padding: 0 12px;
      height: 42px;
      font-weight: 300;
      background-color:  rgba(33,42,48, 0.2);
      h3 {
         margin-bottom: 0px;
         color: @L9;
         font-size: 16px;
      }
      .leverage {
        font-size: 14px;
        p {
          margin-right: 2px;
          color: @L8;
        }
        .leverage-sel {
          position: relative;
          // padding-right: 20px;
          color: @L9;
          cursor: pointer;
        }
      }
  }
  .submit-entrust-content {
    padding: 16px 10px 0;
    .submit-entrust-content-storehouse {
      span {
        display: block;
        width: 40px;
      }
       a {
          //  width: 126px;
           flex: 1;
           height: 34px;
           color: @L10;
           background-color: @L4;
           text-align: center;
           line-height: 34px;
           border-radius: 2px;
          &.active {
             background-color: @main-2a;
           }
       }
    }
    .submit-entrust-content-entrust-type,
    .submit-entrust-limit-type {
      height: 48px;
       p {
          margin-right: 12px;
          color: @L8;
        }
        .leverage-sel {
          position: relative;
          // padding-right: 20px;
          color: @L9;
          cursor: pointer;
        }
    }
    .submit-entrust-limit-type  {
      .leverage-sel {
        .Sel-name {
          border: 1px solid @L8;
          text-align: left;
          padding-left: 5px;
          width: 140px;
          color: @L8;
        }
        .Sel-list {
          width: 120px;
          margin-right: -60px;
          text-align: left;
          padding-left: 5px;
        }
      }
    }

    .submit-entrust-content-input {
      &>p {
        height: 34px;
        line-height: 34px;
        font-size: 12px;
        color:  @L8;
        margin-left: 50px;
      }
      .set>a {
        color: @L9;
        margin-bottom: 10px;
        span {
              display: inline-block;
              width: 18px;
              height: 18px;
              vertical-align: middle;
              background-image: url("../../assets/img/icon-Setup_nor.png");
              background-size: 100% 100%;
          }
            &:hover {
                color: @mainHover;
                span {
                  background-image: url("../../assets/img/icon-Setup_sel.png");
                  background-size: 100% 100%;
               }
              }
      }
      .marketPrice {
        width: 210px;
        height: 34px;
        background-color: @L4;
        color: @L9;
        text-align: center;
        line-height: 34px;
      }
      &>div {
         &:nth-child(n + 2) {
            margin-top: 15px;
          }
          &.set {
            margin-top: 0;
          }
        p {
          height: 34px;
          line-height: 34px;
          color: @L8;
        }
        div {
          position: relative;
          input {
            padding-left: 6px;
            padding-right: 30px;
            width: 210px;
            height: 34px;
            background: fade(@main-2, 5%);
            border: 1px solid fade(@main-2, 30%);
            color:  @L8;
            outline: none;
            // background: red;
            &:focus {
              box-shadow: 0px 0px 3px @main-2;
            }
          }
          span {
             position: absolute;
             right: 6px;
             top: 50%;
             margin-top: -9px;
             color: @L8;
          }
        }
      }
      &.plan>div {
        div {
          input {
            width: 170px;
          }
        }
        .marketPrice {
          width: 170px;
        }
        .plan-set-price {
            display: flex;
            height: 34px;
            align-items: center;
            >span {
              white-space: nowrap;
              position: static;
              margin-top: 0px;
            }
            .desc {
              display: inline-block;
              position: relative;
              width: 14px;
              height: 14px;
              line-height: normal;
              margin-left: 2px;
              margin-top: 1px;
              cursor: pointer;
              background: url("../../assets/img/icon-info-1.svg") left top no-repeat;
              background-size: 100% 100%;
              &:hover {
                background: url("../../assets/img/icon-info-2.svg") left top no-repeat;
                background-size: 100% 100%;
                >p {
                  display: block;
                }
              }
              >p {
                display: none;
                width: 252px;
                height: auto;
                padding: 5px 10px;
                position: absolute;
                z-index: 1;
                font-size: 12px;
                line-height: 1.8;
                background: #283049;
                border: 1px solid #36405f;
                color: #93abd0;
                bottom: 22px;
                left: 50%;
                margin-left: -70px;
                &::after {
                  content: "";
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  background: #283049;
                  transform: rotate(45deg);
                  position: absolute;
                  left: 50%;
                  margin-left: -61px;
                  bottom: -5px;
                  border-right: 1px solid #36405f;
                  border-bottom: 1px solid #36405f;
                }
              }
            }

        }
        .plan-maket-price {
          width: 170px;
          height: 34px;
          display: flex;
          background: @L4;
          border: 1px solid @L4;
          align-items: center;
          position: relative;
          span {
            position: static;
            margin: 0px;
            padding-left: 6px;
            color: #cdd5df;
          }
          a {
            display: inline-block;
            padding: 0px 10px;
            border: 1px solid #F8B500;
            // color: #F8B500;
            background: #F8B500;
            color: #ffffff;
            height: 34px;
            line-height: 34px;
            box-sizing: border-box;
            position: absolute;
            right: 0px;
            top: -1px;
          }
        }
        .plan-order-price { //限价
          .right {
            position: absolute;
            right: 0px;
            top: 0px;
            margin-top: 0px;
            span {
              position: static;
              margin-right: 5px;
            }
            a {
              display: inline-block;
              padding: 0px 10px;
              border: 1px solid #F8B500;
              color: #F8B500;
              height: 34px;
              line-height: 34px;
              box-sizing: border-box;
              cursor: pointer;
              &:hover {
                border: 1px solid #40a9ff;
                color: #40a9ff;
              }
            }
          }
        }
        .plan-market-price {

        }
      }
      &.plan>p {
        margin-left: 90px;
      }

      // 生成机制
      .order-option {
        .order-option-sel {
          width: 180px;
          height: 34px;
          background: fade(@main-2, 5%);
          border: 1px solid fade(@main-2, 30%);
          color:  @L8;
          .Sel-name {
            width: 100%;
            height: 100%;
            line-height: 34px;
            text-align: left;
            left: 0px;
            top: 0px;
            margin-top: 0px;
            span {
              left: 0px;
              top: 0px;
              margin-top: 0px;
              height: 100%;
              padding-left: 5px;
            }
          }
          .Sel-list {
            width: 180px;
            right: 0px;
            margin-right: 0px;
            top: 34px;
            text-align: left;
            padding-left: 5px;
          }
        }
      }
    }
    .submit-entrust-content-button {
      p.cus {
        cursor: pointer;
      }
      &>a {
        display: block;
        padding: 0 16px;
        // width: 260px;
        height: 40px;
        line-height: 40px;
        border-radius: 2px;
        background-color: #4EA800;
        color: @L10;
        font-size: 16px;
        &:hover {
          background-color: #489604;
        }
        &.red {
          background-color: #E61652;
          &:hover {
            background-color: #F81F5D;
          }
        }
      }
      &>div {
        height: 35px;
        line-height: 35px;
        font-size: 12px;
        p {
          color: @L8;
          span {
            color: @L9;
          }
        }
      }
    }
    .submit-entrust-content-balance {
      margin: 3px 0;
      p {
        color: @L8;
        font-size: 14px;
      }
      h6 {
        color: @L9;
        font-size: 14px;
      }
    }
    .submit-entrust-content-money {
      margin-top: 10px;
      a {
        i {
          display: inline-block;
          margin-right: 6px;
          width: 16px;
          height: 14px;
          background: url("../../assets/img/icon-funds_nor.png") left center no-repeat;
        }
        &:hover {
            i {
              background: url("../../assets/img/icon-funds_sel.png") left center no-repeat;
            }
        }
      }
    }
  }
  .no-login {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(@L3,0.8);
    left: 0px;
    top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    >p {
      display: block;
      padding: 6px 16px;
      // border: 1px solid #4f5561;
      text-align: center;
      color: #e4e4e5;
      background:rgba(33,42,48,0.4);
      border-radius: 2px;
      font-size: 14px;
    }
    >a {
      display: block;
      height: 34px;
      width: 222px;
      text-align: center;
      line-height: 34px;
      margin: 0 auto;
      margin-top: 20px;
      &.login {
        border: 1px solid @main-2a;
        color: @main-2a;
        &:hover {
          border: 1px solid @mainHover;
          color: @mainHover;
        }
      }
      &.signup {
        background: @main-2a;
        color: #fff;
        &:hover {
          background: @mainHover;
        }
      }
    }
  }
}

   .Sel-name{
        position: relative;
        display: inline-block;
        width: 80px;
        padding-right: 20px;
        cursor: pointer;
        text-align: right;
        &::after{
            content: '';
            position: absolute;
            margin-left: 8px;
            top: 50%;
            right: 2px;
            margin-top: -2px;
            display: block;
            border-width:6px 6px 0;
            border-style:solid;
            border-color:#cad2dc transparent transparent;/*灰 透明 透明 */
        }
    }
    .Sel-list {
        display: inline-block;
        position: absolute;
        border: 1px solid @hintBorder;
        background: @hintBack;
        width: 70px;
        text-align: center;
        right: 50%;
        margin-right: -30px;
        top: 30px;
        font-size: 12px;
        z-index: 1000;
        li {
            height: 30px;
            line-height: 30px;
            cursor: pointer;
            color: @hintColor;
            &:hover,&.active {
                background: @hintHoverBack;
            }
        }
    }
    .Sel-mask {
        position: fixed;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
    }
</style>
