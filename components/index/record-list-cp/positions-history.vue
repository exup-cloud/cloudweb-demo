loss<template>
      <div class="record-list-data">
        <table >
          <thead>
              <tr>
                <!-- 合约 -->
               <th>{{ $t('common.table.contract') }}</th>
               <!-- 平仓时间 -->
               <th>{{ $t('record.cp.unwindTime') }}</th>
               <!-- 开仓均价 -->
               <th>{{ $t('common.table.openPrice') }}</th>
               <!-- 平仓均价 -->
               <th>{{ $t('common.table.closeAvgPrice') }}</th>
               <th>
                 <div class="hint-father hover">
                     <p style="text-align: right;"><span>{{ $t('record.cp.onMoney') }}</span></p>
                     <div class="hint">
                       <p>{{ $t('record.cp.onMoneyOne') }}</p>
                     </div>
                 </div>
               </th>
              </tr>
            </thead>
            <tbody class="current-entrust">
                  <tr :key="item.pid" v-for="item in list">
                    <td class="btn" style="cursor: pointer;" @click="IdCopy(item.pid)" :title="'ID:' + item.pid + $t('common.table.clickCopy')">
                      <st-row align="center">
                        <i :class="item.side === 1 ? 'green' : 'red'"></i>
                        <p>{{ productInfo.symbol }}</p>
                      </st-row>
                    </td>
                    <td>{{ item.updated_at|timeFormat }}</td>
                    <td class="width-750">{{ item.avg_open_px|retainDecimals({decimal:com.pxUnit}) }}</td>
                    <td v-if="item.errno === 5 || item.errno === 6">--</td>
                    <td v-else>{{ item.avg_close_px | retainDecimals({decimal:com.pxUnit}) }}</td>
                    <td style="text-align: right;" class="on-money"><span>{{ item.realised_pnl|retainDecimals({decimal: com.valueUnit}) }} </span><i class='fee-q' @click="positionFeeShow(item)"></i></td>
                </tr>
            </tbody>
       </table>
        <st-row direction="column" v-if="!list || !list.length" align="center" class="no-data">
            <img src="../../../assets/img/no-data.png" alt="">
            <p>{{ $t('record.noData') }}</p>
       </st-row>
       <popup :title="'资金费用明细'" width="600" v-if="showPositionFee" :callback="positionFeeColse">
            <position-fee-window :close="positionFeeColse" :contractId="contractId"
            :positionId="positionId" :positionCoin="positionCoin"></position-fee-window>
       </popup>
      </div>
</template>
<script>
import ClipboardJS from 'clipboard'
import Popup from '../../bx-ui/popup'
import positionFeeWindow from './position-fee-window'
import Formula from '../../../assets/js/formula/index.js'
export default {
  components: {
    Popup,
    positionFeeWindow
  },
  data() {
    return {
      list: [],
      offset: 0,
      showPositionFee: false,
      contractId: 0,
      positionId: 0,
      positionCoin: '' // 保证金币
    }
  },
  computed: {
    com() {
      return this.$store.state.com
    },
    token() {
      return this.$store.state.auth.token
    },
    productInfo() {
      return this.$store.state.market.productInfo
    },
    coinUnit() {
      return this.$store.state.market.coinUnit
    }
  },
  methods: {
    // 复制id
    IdCopy(id) {
      this.copy = new ClipboardJS('.btn', {
        text: function () {
          return id
        }
      })
      this.$alert('s', this.$t('bonus.copyMessage'))
    },
    getList() {
      this.swapsApi.getUserPositions(this.productInfo.instrument_id, 4, this.offset, 10).then(res => {
        this.list = res.data.positions
      })
    },
    getPositionUnit() {
      return Formula.MarginCoin(this.productInfo.base_coin, this.productInfo.quote_coin, this.productInfo.price_coin)
    },
    // 打开资金费用明细窗口
    positionFeeShow(item) {
      this.contractId = item.instrument_id
      this.positionId = item.pid
      let positionCoin = this.coinUnit ? this.getPositionUnit() : this.productInfo.base_coin
      this.positionCoin = positionCoin
      this.showPositionFee = true
      // console.log('positionFeeShow####', item)
    },
    // 关闭资金费用明细窗口
    positionFeeColse() {
      this.showPositionFee = false
    }
  },
  created() {
    if (this.token) {
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
@import "./list";
.record-list-data {
   tr {
       height: 50px;
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
   }
}
</style>
