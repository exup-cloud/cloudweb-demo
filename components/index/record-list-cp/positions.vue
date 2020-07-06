<template>
      <div class="record-list-data">
        <table >
          <thead>
              <tr>
               <th class="width-560">{{ $t('common.table.contract') }}</th>
               <th class="width-750">{{ $t('common.table.positionQsuantityTwo') }}</th>
               <!-- <th class="hint-father hover width-750"> -->
               <th class="width-750">
                 <p><span>{{ $t('common.table.positionsPrice', {coinName: coinUnit ? getPositionUnit() : productInfo.base_coin}) }}</span></p>
                 <!-- <div class="hint">
                   <p>{{ $t('record.cp.positionsPriceOne') }}</p>
                 </div> -->
               </th>
               <th  class="hint-father hover width-750">
                 <p><span>{{ $t('common.table.avgCost') }}</span></p>
                 <div class="hint">
                    <p>{{ $t('record.cp.avgCostHover') }}</p>
                 </div>
               </th>
               <th class="hint-father hover">
                 <p><span>{{ $t('common.table.unwindPrice') }}</span></p>
                  <div class="hint">
                   <!-- <p v-html="$t('record.cp.unwindPriceOne')"></p>
                   <p v-html="$t('record.cp.unwindPriceTwo')"></p>
                   <p>{{ $t('record.cp.unwindPriceThree') }}</p> -->
                   <p>预估强平价格为参考强平价格，全仓模式下所有全仓仓位共用可用保证金，强平价格会因其他全仓仓位的盈亏而变化。</p>
                   <p>当合理价格达到预估强平价格时仓位将会被系统强平。</p>
                 </div>
               </th>
               <th  class="hint-father hover">
                 <p><span>{{ $t('common.table.margin') }}</span></p>
                 <div class="hint">
                   <p>{{ $t('record.cp.marginHoverOne') }}</p>
                    <p>{{ $t('record.cp.marginHoverTwo') }}</p>
                 </div>
               </th>
               <th>
                 <p>保证金率(实时/维持)</p>
               </th>
               <th class="hint-father hover">
                 <p><span>{{ $t('common.table.rate') }}</span></p>
                 <div class="hint">
                   <!-- <p>{{ $t('submitEntrust.message.b1') }}</p> -->
                   <p v-if="pnlPriceUnit" v-html="$t('record.cp.rateHover1')"></p>
                   <p v-if="!pnlPriceUnit" v-html="$t('record.cp.rateHover2')"></p>
                 </div>
               </th>
               <th class="width-750">
                  <st-row class="hint-father hover">
                     <p><span>{{ $t('record.cp.onMoney') }}</span></p>
                     <div class="hint" style="right: 0px;">
                       <p>{{ $t('record.cp.onMoneyTwo') }}</p>
                     </div>
                 </st-row>
               </th>
                <!-- 止盈/止损 -->
                <th>{{$t('stopProfitLoss.stopProfitLoss')}}</th>

               <th class="width-560">{{ $t('common.table.unwind') }}</th>
              </tr>
            </thead>
            <tbody class="positions" ref="dt">
                  <tr :key="item.pid" v-for="item in list">
                    <td class="width-560 btn" style="cursor: pointer;" @click="IdCopy(item.pid)" :title="'ID:' + item.pid + $t('common.table.clickCopy')">
                      <st-row align="center">
                        <i :class="item.side === 1 ? 'green' : 'red'"></i>
                        <p>{{ productInfo.symbol }}</p>
                      </st-row>
                      <p style="font-size: 11px;color:rgba(151,176,214, 0.7);margin-left: 6px;">{{ $t(`submitEntrust.${item.position_type === 2 ? 'allCabin' : 'partCabin'}`) }}({{$t(`common.position_type_${item.side}`)}})</p>
                    </td>
                    <td  class="hover width-750" @click="setVol($event, item.on_vol)">{{ item.on_vol }}/{{ item.cur_qty }}</td>
                    <!-- <td class="width-750">{{ (coinUnit || IsReverse()) ? item.positionValue : (item.positionValue / ticker.fair_price)|retainDecimals({decimal: com.valueUnit}) }}</td> -->
                    <!-- <td class="width-750">{{ (coinUnit || IsReverse()) ? item.positionValue : Utils.precision.divide(item.positionValue, item.hold_avg_price)|retainDecimals({decimal: com.valueUnit}) }}</td> -->
                    <td class="width-750">{{ (coinUnit || IsReverse()) ? item.positionValue : item.positionValue2|retainDecimals({decimal: com.valueUnit}) }}</td>
                    <td class="width-750">{{ item.avg_cost_px|retainDecimals({decimal:com.pxUnit}) }}</td>
                    <td >{{ item.liquidatePrice|addCommom(com.pxUnit) }}</td>
                    <td class="margin">
                      <!-- <a v-if="item.open_type === 1" @click="showEditMargin(item)"><i></i> {{ item.im|retainDecimals({decimal: com.valueUnit})}}({{ getLeverage(item) }})</a> -->
                      <a @click="showEditMargin(item)"><i></i> {{ item.im|retainDecimals({decimal: com.valueUnit})}}({{ getLeverage(item) }})</a>
                      <!-- <template v-else>
                        {{ item.im|retainDecimals({decimal: com.valueUnit})}}({{ getLeverage(item) }})
                      </template> -->
                    </td>
                    <!-- 保证金率（实时/维持） -->
                    <td>
                      {{item.imrate}}/{{item.maintenance}}
                    </td>
                    <td :class="item.money < 0 ? 'red' : 'green'">{{ LongOrSort(item.money, item.im, item.tax, item.cur_qty, item.close_qty) }}</td>
                    <!-- <td :class="item.money < 0 ? 'red' : 'green'">{{ LongOrSort(item.money, item.oim) }}</td> -->
                    <!-- <td class="width-750" :class="item.realised_pnl < 0 ? 'on-money red' : 'on-money green'"><span>{{ item.realised_pnl|retainDecimals({decimal: com.valueUnit}) }}</span> <i class='fee-q' @click="positionFeeShow(item)"></i></td> -->
                    <!-- <td class="width-750" :class="item.realised_pnl < 0 ? 'on-money red' : 'on-money green'"><span>{{ item.realised_pnl|retainDecimals({decimal: com.valueUnit}) }}</span> <i class='fee-q' @click="openRealisedDetail(item)"></i></td> -->
                    <td class="width-750" :class="item.realised_pnl < 0 ? 'on-money red' : 'on-money green'"><span>{{ Number(item.realised_pnl) > 0 ? Utils.retainDecimals(Number(item.realised_pnl), {decimal: com.valueUnit}) : Utils.mathCeil(Number(item.realised_pnl), com.valueUnit) }}</span> <i class='fee-q' @click="openRealisedDetail(item)"></i></td>
                    <!-- 止盈/止损 -->
                    <td>
                      <a @click="openProfitAndLoss(item)" class="profit-loss">
                        <span>{{item.triggerPricePO || '--'}}/{{item.triggerPriceLO || '--'}}</span>
                        <i class="icon-box b-2-cl">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconedit-line"></use>
                          </svg>
                        </i>
                      </a>
                    </td>
                    <td class="positions-unwind width-560">
                        <div class="positions-unwind-one">
                            <st-row class="positions-unwind-two" justify="between" align="center">
                                <span>{{ $t('common.table.onePrice') }}</span>
                                <div>
                                    <input class="price" @input="iptChange($event, true)" type="text">
                                    <span>{{productInfo.quote_coin}}</span>
                                </div>
                                <a class="green"  @click="closePosition(item, true, $event)">{{ $t('record.cp.limitPricePosition') }}</a>
                            </st-row>
                             <st-row class="positions-unwind-two" justify="between" align="center">
                                <span>{{ $t('common.table.positionsQsuantity') }}</span>
                                <div>
                                    <input class="vol" @input="iptChange($event)" type="text">
                                    <span>{{ coinUnit ? $t('common.pieces') : productInfo.base_coin }}</span>
                                </div>
                                <a class="red"  @click="closePosition(item, false, $event)">{{ $t('common.table.marketPriceUnwind') }}</a>
                            </st-row>
                        </div>
                    </td>
                </tr>
            </tbody>
       </table>
       <st-row direction="column" v-if="!cabinList || !cabinList.length" align="center" class="no-data">
            <img src="../../../assets/img/no-data.png" alt="">
            <p>{{ $t('record.noData') }}</p>
       </st-row>
         <!-- <popup :title="$t('common.unEntrust')"   width="440" :callback="unwindClose" v-if="showUnwind"> -->
         <popup :title="''"   width="440" :callback="unwindClose" v-if="showUnwind">
            <unwind-window :info="isForced ? forcedReminderInfo : info" :isAll="isAll" @submitOrder="submitOrder" :close="unwindClose" :forced="isForced" :confirm="isConfirm"></unwind-window>
       </popup>
        <popup :title="$t('record.cp.eidtMargin')"   width="600" :callback="editMarginColse" v-if="showEditMargn">
            <edit-margin-window @getLiquidate="getLiquidate" :info="marginInfo" :close="editMarginColse"></edit-margin-window>
       </popup>
       <popup :title="$t('record.cp.detailsOfFundingFees')" width="600" v-if="showPositionFee" :callback="positionFeeColse">
            <position-fee-window :close="positionFeeColse" :contractId="contractId"
                :positionId="positionId" :positionCoin="positionCoin" ></position-fee-window>
       </popup>
       <popup :title="''" v-if="forcedReminderShow" :callback="closeForcedReminder">
         <forced-reminder @submitOrder="submitOrder" :info="forcedReminderInfo" :close="closeForcedReminder"></forced-reminder>
       </popup>
       <popup :title="''" v-if="isShownoConfrimForced" :callback="closeNoConfrimForced">
         <no-confrim-forced-window @submitOrder="submitOrder" :isAll="isAll" :info="forcedReminderInfo" :close="closeNoConfrimForced"></no-confrim-forced-window>
       </popup>

       <!-- 止盈止损  -->
       <popup :title="'止盈/止损'" v-if="showProfitAndLoss" :callback="closeProfitAndLoss">
         <stop-profit-and-stop-loss
          :isShow="showProfitAndLoss"
          v-if="showProfitAndLoss"
          :info="profitAndLossInfo"
          :close="closeProfitAndLoss"
          :refreshProfitAndLoss="refreshProfitAndLoss"
        ></stop-profit-and-stop-loss>
       </popup>

       <!-- 已实现盈亏明细 -->
       <popup title="已实现盈亏明细" v-if="showRealisedDetail" :callback="closeRealisedDetail">
         <RealisedDetail :info="realisedInfo" :close="closeRealisedDetail" @positionFeeShow="positionFeeShow"></RealisedDetail>
       </popup>
       <!-- 资金费用明细 -->
       <popup :title="$t('record.cp.detailsOfFundingFees')" width="600" v-if="showPositionFee" :callback="positionFeeColse">
          <position-fee-window :close="positionFeeColse" :contractId="contractId"
            :positionId="positionId" :positionCoin="positionCoin" ></position-fee-window>
       </popup>
      </div>
</template>
<script>
  import ClipboardJS from 'clipboard'
  import Popup from '../../bx-ui/popup'
  import UnwindWindow from './unwind-window'
  import Utils from '../../../assets/js/util.js'
  import Formula from '../../../assets/js/formula/index.js'
  import EditMarginWindow from './edit-margin-window'
  import positionFeeWindow from './position-fee-window'
  import ForcedReminder from './forced-reminder'
  import NoConfrimForcedWindow from './noconfrim-forced-window'
  import StopProfitAndStopLoss from './stop-profit-and-stop-loss.vue';
  import RealisedDetail from './realised-detail.vue';

  export default {
    name: 'deal-record',
    components: {
      Popup,
      UnwindWindow,
      EditMarginWindow,
      positionFeeWindow,
      ForcedReminder,
      NoConfrimForcedWindow,
      StopProfitAndStopLoss,
      RealisedDetail,
    },
    data() {
      return {
        showUnwind: false,
        showEditMargn: false,
        showPositionFee: false,
        offset: 0,
        info: {},
        isAll: false,
        marginInfo: {},
        list: [],
        contractId: 0,
        positionId: 0,
        positionCoin: '', // 保证金币
        forcedReminderShow: false, // 是否强制提醒
        forcedReminderInfo: {}, // 强制提醒需要的信息
        isForced: false, // 收否是强制提醒
        isConfirm: true, // 是否勾选了二次确认中“不再提醒”选项(平仓时的二次提醒)
        isShownoConfrimForced: false, // 勾选了不再提醒后的强制弹框
        Utils: Utils,
        showProfitAndLoss: false, // 止盈止损弹框
        profitAndLossInfo: {},
        showRealisedDetail: false,
        realisedInfo: {},
      }
    },
    computed: {
      pnlPriceUnit() {
        return this.$store.state.market.pnlPriceUnit
      },
      setPrice() {
        return this.$store.state.market.priceTwo
      },
      coinUnit() {
        return this.$store.state.market.coinUnit
      },
      com() {
        return this.$store.state.com
      },
      ticker() {
        return this.$store.state.market.ticker
      },
      tickerList() {
        return this.$store.state.market.tickerList
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      cabinList() {
        return this.$store.state.market.cabinList
      },
      liquidateAssert() {
        return this.$store.state.com.liquidateAssert
      },
      sell() {
        return this.$store.state.market[this.productInfo.instrument_id + '_Order'] ? (this.$store.state.market[this.productInfo.instrument_id + '_Order'].asks || []) : []
      },
      buy() {
        return this.$store.state.market[this.productInfo.instrument_id + '_Order'] ? (this.$store.state.market[this.productInfo.instrument_id + '_Order'].bids || []) : []
      },
      cabinListOther() {
        return this.$store.state.market.cabinListOther;
      },
    },
    watch: {
      setPrice() {
        if (this.setPrice) {
          document.querySelectorAll('table input.price').forEach(element => {
            element.value = this.setPrice
          })
          this.$store.commit('market/SET_MARKET', {
            key: 'priceTwo',
            data: 0
          })
        }
      },
      ticker() {
        this.operationCabinList()
      },
      tickerList() {
        this.$store.dispatch('positionCalculate')
      },
      cabinListOther() {
        this.$store.dispatch('positionCalculate')
      },
      cabinList: {
        handler: 'cabinListChange',
        immediate: true
      },
      coinUnit() {
        document.querySelectorAll('table input').forEach(element => {
          element.value = ''
        })
      },
      pnlPriceUnit() {
        this.operationCabinList()
      },
      liquidateAssert() {
        this.operationCabinList()
      }
    },
    methods: {
      closeRealisedDetail() {
        this.showRealisedDetail = false;
      },
      openRealisedDetail(info) {
        this.showRealisedDetail = true;
        this.realisedInfo = info;
      },
      cabinListChange(val) {
        this.$store.dispatch('positionCalculate')
        this.operationCabinList()
        if (val.length > 0) {
          // 设置止盈止损
          this.setProfitAndLoss()
        }
      },
      // 刷新止盈止损相关数据
      refreshProfitAndLoss() {
        this.resetProfitAndLoss()
        setTimeout(()=> {
          this.setProfitAndLoss()
        }, 500)
      },
      setProfitAndLoss() {
        this.swapsApi.userPlanOrders(this.productInfo.instrument_id, 0, 3, 1000)
        .then(res => {
          let list = res.data.orders || []
          const cabinList = this.cabinList || []
          cabinList.forEach((position) => {
            position['triggerPricePO'] = ''
            position['orderPricePO'] = ''
            position['triggerTypeO'] = ''
            position['plofitPlanOid'] = ''
            position['categoryP'] =''
            position['categoryL'] = ''
            position['triggerPriceLO'] = ''
            position['orderPriceLO'] = ''
            position['lossPlanOid'] = ''
            list.forEach((plan) => {
              if (position.pid === plan.pid) {
                if (plan.type === 1) { // 止盈
                  position['triggerPricePO'] = plan.px
                  position['orderPricePO'] = plan.exec_px
                  position['triggerTypeO'] = plan.trigger_type
                  position['plofitPlanOid'] = plan.oid
                  position['categoryP'] = plan.category
                } else if (plan.type === 2) { // 止损
                  position['triggerPriceLO'] = plan.px
                  position['orderPriceLO'] = plan.exec_px
                  position['triggerTypeO'] = plan.trigger_type
                  position['lossPlanOid'] = plan.oid
                  position['categoryL'] = plan.category
                }
              }
            })
          })
        });
      },
      // 关闭止盈止损弹框
      closeProfitAndLoss() {
        this.showProfitAndLoss = false
      },
      // 打开止盈止损
      openProfitAndLoss(row) {
        this.profitAndLossInfo = {
          triggerPricePO: row.triggerPricePO,
          orderPricePO: row.orderPricePO,
          triggerPriceLO: row.triggerPriceLO,
          orderPriceLO: row.orderPriceLO,
          triggerTypeO: row.triggerTypeO,
          positionQty: row.on_vol,
          side: row.side,
          liquidatePrice: row.liquidatePrice,
          pid: row.pid,
          plofitPlanOid: row.plofitPlanOid,
          lossPlanOid: row.lossPlanOid,
          categoryP: row.categoryP,
          categoryL: row.categoryL,
          avgCostPx: row.avg_cost_px
        }
        this.showProfitAndLoss = true
      },
      resetProfitAndLoss() {
        this.profitAndLossInfo = {
          triggerPricePO: '',
          orderPricePO: '',
          triggerPriceLO: '',
          orderPriceLO: '',
          triggerTypeO: '',
          positionQty: '',
          side: '',
          liquidatePrice: '',
          pid: '',
          plofitPlanOid: '',
          lossPlanOid: ''
        }
      },
      // 复制id
      IdCopy(id) {
        this.copy = new ClipboardJS('.btn', {
          text: function () {
            return id
          }
        })
        this.$alert('s', this.$t('bonus.copyMessage'))
      },
      // 对仓位的强平价格等进行运算
      operationCabinList() {
        this.list = this.cabinList.map(item => {
          // 计算仓位的未实现盈亏
          // item.money = this.ticker.fair_px ? Formula.LongOrSort(item.cur_qty, item.avg_cost_px, this.pnlPriceUnit ? this.ticker.fair_px : this.ticker.last_px, Formula.contractObj.getContract(this.productInfo), item.side === 1) : 0
          item.money = this.ticker.fair_px ? Formula.LongOrSort(item.cur_qty, item.avg_cost_px, this.pnlPriceUnit ? this.ticker.fair_px : this.ticker.last_px, Formula.contractObj.getContract(this.productInfo), item.side === 1) : 0
          item.fairPxMoney = this.ticker.fair_px ? Formula.LongOrSort(item.cur_qty, item.avg_cost_px, this.ticker.fair_px, Formula.contractObj.getContract(this.productInfo), item.side === 1) : 0
          // let moneyWithFairPx = Formula.LongOrSort(item.cur_qty, item.avg_cost_px, this.ticker.fair_px, Formula.contractObj.getContract(this.productInfo), item.side === 1)
          item.liquidatePrice = this.getLiquidate(item.side, item.position_type, item.pid)
          // 仓位价值
          // item.positionValue = this.CalculateContractValue(item.cur_qty, item.avg_open_px, Formula.contractObj.getContract(this.productInfo))
          item.positionValue = this.CalculateContractValue(item.cur_qty, item.avg_cost_px, Formula.contractObj.getContract(this.productInfo))
          // 为币时的仓位价值
          item.positionValue2 = Utils.precision.times(this.productInfo.face_value, item.cur_qty)
          let margin = this.marginRate(item.positionValue)
          item.maintenance = Utils.retainDecimals(Utils.precision.times(margin.maintenance, 100), {decimal: 2}) + '%'
          let imrate = this.getMarginRatio(item);
          item.imrate = imrate;
          item.on_vol = Utils.precision.minus(item.cur_qty, item.freeze_qty)
          return item
        }).sort((a, b) => a.side - b.side)
      },
      // 未实现盈亏
      LongOrSort(money, im, hold_fee, hold_vol, close_vol) {
        im = Number(im)
        hold_fee = Number(hold_fee)
        hold_vol = Number(hold_vol)
        close_vol = Number(close_vol)
        if (!money) {
          return 0
        }
        let rate = (money / (im + hold_fee * (hold_vol / (hold_vol + close_vol)))) * 100
        return `${Utils.retainDecimals(money, {decimal: this.com.valueUnit})}(${Utils.retainDecimals(rate, {decimal: 2})}%)`
      },
      // 计算强评价
      getLiquidate(way, open_type, pid, addIM = 0, info = {liquidatePrice: 0}) {
        let otherPosLoss = 0;
        let otherMoneyWithFairPx = 0;
        this.cabinList.forEach(item => {
          if (item.pid !== pid && item.position_type === 2) {
            otherMoneyWithFairPx = Formula.LongOrSort(item.cur_qty, item.avg_cost_px, this.ticker.fair_px, Formula.contractObj.getContract(this.productInfo), item.side === 1)
          }
        });
        let assets = 0;
        if (Number(otherMoneyWithFairPx) < 0) {
          assets = Number(this.liquidateAssert)+ Number(otherMoneyWithFairPx)
        } else {
          assets = Number(this.liquidateAssert)
        }
        info.liquidatePrice = Formula.CalculatePositionLiquidatePrice(this.positionFn(way, addIM), open_type === 1 ? 0 : Number(assets), this.getContractInfo(), way === 1)
        return info.liquidatePrice
      },
      // 修改保证金弹窗关闭
      editMarginColse() {
        this.showEditMargn = false
      },
      // 是否是反向合约
      IsReverse() {
        return Formula.IsReverse(this.productInfo.quote_coin, this.productInfo.is_reverse ? this.productInfo.quote_coin : this.productInfo.base_coin)
      },
      showEditMargin(item) {
        this.marginInfo = item
        // let value = this.CalculateContractValue(Number(item.cur_qty), Number(item.avg_open_px))
        let value = this.CalculateContractValue(Number(item.cur_qty), Number(item.avg_cost_px))
        let margin = this.marginRate(value)
        this.marginInfo['inital'] = margin.initial
        this.showEditMargn = true
      },
      iptChange(e, isPrice) {
        e.target.value = Utils.retainDecimals(e.target.value, {decimal: isPrice ? (this.com.pxUnit - 1) : (this.coinUnit ? 0 : this.com.valueUnit)}) || ''
      },
      setVol(e, vol) {
        e.target.parentNode.querySelector('.vol').value = vol
      },
      // 获取张数
      getVol(vol) {
        return this.coinUnit ? vol : Formula.CalculateContractBasicValue(vol, this.ticker.fair_px, Formula.contractObj.getContract(this.productInfo), true)
      },
      unwindClose() {
        this.showUnwind = false
      },
      getPositionUnit() {
        return Formula.MarginCoin(this.productInfo.base_coin, this.productInfo.quote_coin, this.productInfo.price_coin)
      },
      // 算仓位价值
      CalculateContractValue(vol, price) {
        return Formula.CalculateContractValue(vol, price, Formula.contractObj.getContract(this.productInfo))
      },
      closePosition(item, type, e) {
        let elements
        elements = e.target.parentNode.parentNode
        if (type) {
          this.info.px = elements.querySelector('.price').value
          this.isAll = false
          this.info.qty = this.getVol(elements.querySelector('.vol').value)
          this.info.category = 1
          // this.showConfirmEntrust = true
        } else {
          this.isAll = true
          this.info.category = 2
          this.info.qty = item.cur_qty - item.freeze_qty
        }
        this.info.instrument_id = item.instrument_id
        this.info.pid = item.pid
        this.info.side = item.side // === 1 ? 3 : 2  // 仓位类型,1:开多,2:开空  // way 订单方向 1:开多,2:平空,3:平多,4:开空
        this.isForced = false
        if (!this.validation(this.info)) {
          return false
        }
        // 强制提醒相关
        // item.side  仓位类型
        let longOrSort = item.side === 1 ? 1 : 0
        let f_type = item.side === 1 ? 'sell' : 'buy'
        let toShowForce = this.isShowForced(longOrSort, f_type, type, e)
        if (toShowForce) {
          this.showForcedWindow(longOrSort, item, e, type)
          return false
        }
        // 强制提醒#######
        // 记住用户是否设置了不再显示弹窗的用户偏好
        let isConfirm = window.localStorage['isConfirm']
        this.isConfirm = isConfirm
        // if (isConfirm === '1' && !type) {
        if (isConfirm === '1' && type) {
          this.submitOrder()
        } else {
          this.showUnwind = true
        }
      },
      // 判断是否需要强制提醒
      isShowForced(longOrSort, type, limitOrMarket, e) { // type买还是卖，limitOrMarket限价还是市价
        let isConfirm = window.localStorage['isConfirm']
        this.isConfirm = isConfirm
        let elements = e.target.parentNode.parentNode
        let price = elements.querySelector('.price').value
        if (limitOrMarket) { // 限价
          if (type === 'buy') { // 开多或平空：若委托价格/最新价 > 103%，则显示强制提示
            if (Utils.precision.divide(price, this.ticker.last_px) > 1.05) {
              return true
            }
          } else if (type === 'sell') { // 开空或平多：若委托价格/最新价<103%，则显示强制提示
            if (Utils.precision.divide(price, this.ticker.last_px) < 0.95) {
              return true
            }
          }
        } else { // 市价
          let e_avg_price = this.getEstimatedAveragePrice(type) // 开仓平仓预估均价
          if (type === 'buy') {
            if (Utils.precision.divide(e_avg_price, Number(this.ticker.last_px)) > 1.03) {
              return true
            }
          } else if (type === 'sell') {
            if (Utils.precision.divide(e_avg_price, Number(this.ticker.last_px)) < 0.97) {
              return true
            }
          }
        }
        return false
      },
      // 获取开仓/平仓预估均价
      getEstimatedAveragePrice(type) {
        // let vol = this.vol
        let vol = this.info.qty
        let resultList = []
        let entrustList = type === 'buy' ? this.sell : this.buy
        for (let i = 0; i < entrustList.length; i++) {
          vol = vol - Number(entrustList[i][2])
          resultList.push({
            price: entrustList[i][1],
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
      showForcedWindow(longOrSort, item, e, type) {
        this.isConfirm = window.localStorage['isConfirm']
        this.isForced = true
        let elements
        elements = e.target.parentNode.parentNode
        this.forcedReminderInfo.px = elements.querySelector('.price').value
        this.forcedReminderInfo.buyOrSell = item.side === 1 ? 'sell' : 'buy'
        if (type) {
          this.isAll = false
          this.forcedReminderInfo.qty = this.getVol(elements.querySelector('.vol').value)
          this.forcedReminderInfo.category = 1
          // this.showConfirmEntrust = true
        } else {
          this.isAll = true
          this.forcedReminderInfo.category = 2
          this.forcedReminderInfo.qty = item.cur_qty - item.freeze_qty
        }
        this.forcedReminderInfo.instrument_id = item.instrument_id
        this.forcedReminderInfo.pid = item.pid
        this.forcedReminderInfo.side = item.side // === 1 ? 3 : 2  // 仓位类型,1:开多,2:开空  // way 订单方向 1:开多,2:平空,3:平多,4:开空
        if (!this.validation(this.forcedReminderInfo)) {
          return false
        }

        if (this.isConfirm) {
          this.showNoConfrimForced()
        } else {
          this.showUnwind = true
        }
      },
      // 关闭强制提醒
      closeForcedReminder() {
        this.forcedReminderShow = false
      },
      submitOrder() {
        this.unwindClose()
        // category 订单类型 1:限价单,2:市价单
        // side 订单方向 1:开多,2:平空,3:平多,4:开空
        // position_type 开仓方式 1:逐仓,2:全仓
        this.info.side = this.info.side === 1 ? 3 : 2
        this.info.nonce = parseInt(Date.now() / 1000) // new Date().valueOf() + '000'
        this.closeNoConfrimForced()
        this.swapsApi.submitOrder(this.info).then(res => {
          if (res.errno === 'OK') {
            this.$alert('s', this.$t('submitEntrust.message.a7'))
          }
        })
      },
      // 获取可平量 freeze_vol
      getCanClosePositionVol(way) {
        let vol = 0
        let position = this.positionFn(way)
        if (position && position.HoldVol) {
          vol = position.HoldVol - position.FreezeVol
        }
        return vol
      },
      // 获取单一方向的仓位
      positionFn(way, addIM) {
        let position
        let that = this.$store.state.market
        position = that.cabinList.filter(item => {
          return item.side === way // 仓位类型,1:开多,2:开空
        })[0]
        if (position) {
          // position = {HoldVol: position.cur_qty, HoldAvgPrice: position.avg_open_px, position_id: position.pid, FreezeVol: position.freeze_qty, IM: Number(position.im) + addIM, MM: Number(position.mm)}
          position = {HoldVol: position.cur_qty, HoldAvgPrice: position.avg_cost_px, position_id: position.pid, FreezeVol: position.freeze_qty, IM: Number(position.im) + addIM, MM: Number(position.mm)}
        }
        return position
      },
      // 获取合约对象
      getContractInfo() {
        return {
          FeeConfig: {TakerFee: Number(this.productInfo.taker_fee_ratio)},
          Contract: Formula.contractObj.getContract(this.productInfo),
          RiskLimit: Formula.contractObj.getRiskLimit(this.productInfo)
        }
      },
      validation(info) {
        if (info.category === 1 && (!info.qty || !info.px)) {
          this.$alert(this.$t('submitEntrust.message.a1'))
          return false
        }
        if (!this.getCanClosePositionVol(info.side)) {
          this.$alert(this.$t('submitEntrust.message.a8'))
          return false
        }
        return true
      },
      // 获取杠杆
      getLeverage(item) {
        let fm = item.position_type === 2 ? (Number(item.money) > 0 ? (Number(this.com.haveAssert) + Number(item.money)) : Number(this.com.haveAssert)) : Number(item.money)
        fm += Number(item.im)
        return Math.ceil(item.positionValue / fm) + 'x'
      },
      getMarginRatio(item) {
        let fm = item.position_type === 2 ? (Number(item.money) > 0 ? (Number(this.com.haveAssert) + Number(item.money)) : Number(this.com.haveAssert)) : Number(item.money)
        fm += Number(item.im)
        // const ratio = item.positionValue / fm
        // const result =Utils.precision.divide(1, Number(ratio))
        const result =Utils.precision.divide(Number(fm), Number(item.positionValue))
        return Utils.retainDecimals(Utils.precision.times(result, 100), {decimal: 2}) + '%'
      },
      // 动态修改盈利
      editPositions(long, sort) {
        let list = []
        let obj = {
          pid: 0,
          // 当前持有量
          cur_qty: 0,
          //  冻结量
          freeze_qty: 0,
          // 已平仓量
          close_qty: 0,
          // 开仓均价
          avg_open_px: 0,
          // 开仓保证金
          im: '1.4096810457344',
          // 维持保证金
          mm: '0.09253671715',
          // 以实现盈亏
          realised_pnl: 0,
          // 仓位类型,1:开多,2:开空
          side: 1,
          // 开仓方式,1:逐仓,2:全仓
          position_type: 1
        }
        let zj
        if (long) {
          zj = Object.assign({}, obj)
          for (let item in long) {
            zj[item] = long[item]
          }
          // let value = this.CalculateContractValue(Number(zj.cur_qty), Number(zj.avg_open_px))
          let value = this.CalculateContractValue(Number(zj.cur_qty), Number(zj.avg_cost_px))
          zj.realised_profit = value * this.productInfo.taker_fee_ratio
          let margin = this.marginRate(value)
          zj.im = value * Math.max(margin.initial, 1 / zj.leverage)
          zj.mm = zj.im / 2
          list.push(zj)
        }
        if (sort) {
          zj = Object.assign({}, obj)
          zj.pid = 1
          for (let item in sort) {
            zj[item] = sort[item]
          }
          zj.side = 2
          // let value = this.CalculateContractValue(Number(zj.cur_qty), Number(zj.avg_open_px))
          let value = this.CalculateContractValue(Number(zj.cur_qty), Number(zj.avg_cost_px))
          let margin = this.marginRate(value)
          zj.im = value * Math.max(margin.initial, 1 / zj.leverage)
          zj.realised_profit = value * this.productInfo.taker_fee_ratio
          zj.mm = zj.im / 2
          list.push(zj)
        }
        this.$store.commit('market/SET_CABINLIST', {
          data: list
        })
        this.operationCabinList()
      },
      // 计算起始和维持保证金率
      marginRate(totalValue) {
        let risk = this.productInfo
        let initial = Number(risk.imr) // 基本开仓保证金率
        let maintenance = Number(risk.mmr) // 基本维持保证金旅
        if (totalValue > risk.risk_limit_base) { // 风险限额基础
          let steps = Math.ceil((totalValue - risk.risk_limit_base) / risk.risk_limit_step)
          initial = Utils.precision.times(steps + 1, initial)
          maintenance = Utils.precision.times(steps + 1, maintenance)
        }
        if (initial > 1) {
          initial = 1
        }
        if (maintenance > 0.5) {
          maintenance = 0.5
        }
        return {initial, maintenance}
      },
      // 打开资金费用明细窗口
      positionFeeShow(item) {
        console.log('没到这里吗###positionFeeShow##', item);
        this.contractId = item.instrument_id
        this.positionId = item.pid
        this.showPositionFee = true
        let positionCoin = this.getPositionUnit()
        this.positionCoin = positionCoin
      },
      // 关闭资金费用明细窗口
      positionFeeColse() {
        this.showPositionFee = false
      },
      showNoConfrimForced() {
        this.isShownoConfrimForced = true
      },
      closeNoConfrimForced() {
        this.isShownoConfrimForced = false
      }
    },
    mounted() {
      console.log('Utils.mathCeil(Number(item.realised_pnl), com.valueUnit)###', Utils.mathCeil(-0.2670781051, this.com.valueUnit));
      this.operationCabinList()
      if (this.cabinList.length > 0) {
        this.setProfitAndLoss()
      }
      // 测试
      // window.position_test = this.editPositions
      console.log('productInfo####', this.productInfo);
    }
  }
</script>
<style lang="less" scoped>
@import "./list";
.hint {
  max-width: 400px;
  p {
    width: 300px;
    word-break: break-all;
    white-space: normal;
    height: auto!important;
  }
}
.record-list-data .positions {
   .margin {
     a {
       color: @L9;
     }
     i {
       display: inline-block;
       vertical-align: sub;
       width: 14px;
       height: 14px;
       background: url('../../../assets/img/icon-adjust_nor.png') no-repeat;
       &:hover {
         background: url('../../../assets/img/icon-adjust_sel.png') no-repeat;
       }
     }
   }
   tr {
       height: 86px;
      .positions-unwind {
           width: 260px;
           .positions-unwind-one {
              margin: 8px 0;
              padding: 0 6px 0 10px;
              width: 260px;
              height: 70px;
              border-left: 1px solid @L3;
              .positions-unwind-two {
                  &:last-child {
                      margin-top: 8px;
                  }
                  &>span {
                      width: 48px;
                      color: @L8;
                  }
                  div {
                      position: relative;
                      input {
                          padding-left: 6px;
                          padding-right: 30px;
                          height: 30px;
                          width: 120px;
                          background: fade(@main-2, 5%);
                          border: 1px solid fade(@main-2, 30%);
                          color:  @L8;
                          outline: none;
                          &:focus {
                            box-shadow: 0px 0px 3px @main-2;
                          }
                      }
                      span {
                          position: absolute;
                          right: 6px;
                          top: 50%;
                          margin-top: -9px;
                          color: @L9;
                      }
                  }
                  a {
                      width: 60px;
                      height: 22px;
                      text-align: center;
                      line-height: 20px;
                      &.red {
                        border: 1px solid #F6412B;
                        color:#F6412B;
                        &:hover {
                            border: 1px solid #F85644;
                            color:#F85644;
                        }
                      }
                      &.green {
                       border: 1px solid #F8B500;
                       color: #F8B500;
                       &.hover {
                          border: 1px solid #3C9FFB;
                          color:  #3C9FFB;
                       }
                      }

                  }
              }
           }
      }
      .on-money {
        *{
          vertical-align: middle;
        }
        i {
          display: inline-block;
          vertical-align: sub;
          width: 12px;
          height: 12px;
          background: url('../../../assets/img/icon-nor.svg') no-repeat;
          background-size: 100% 100%;
          margin-left: 2px;
          cursor: pointer;
          &:hover {
            background: url('../../../assets/img/icon-Q_sel.svg') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .profit-loss {
        display: flex;
        align-items: center;
        color: #D7D7D7;
        cursor: pointer;
        .icon {
          width: 20px;
          height: 20px;
          // vertical-align: -0.15em;
          fill: @main-2;
          overflow: hidden;
        }
      }
   }
}
</style>
