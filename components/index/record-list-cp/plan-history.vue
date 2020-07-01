<template>
      <div ref="dt" class="record-list-data">
        <table >
          <thead>
              <tr>
               <th style="width: 150px;">{{ $t('common.table.contract') }}</th>
               <th>{{ $t('common.table.direction') }}</th>
               <th>{{ $t('common.table.triggerType') }}</th>
               <th>{{ $t('common.table.setPrice') }}</th>
               <th>{{ $t('submitEntrust.orderPrice') }}</th>
               <th>{{ $t('submitEntrust.performNumber') }}</th>
               <th>{{ $t('common.table.status') }}</th>
               <th style="width: 150px;">{{ $t('common.table.time') }}</th>
               <th>{{ $t('common.table.options') }}</th>
              </tr>
            </thead>
            <tbody class="current-entrust">
                  <tr :key="item.oid" v-for="item in list">
                    <td class="btn" style="cursor: pointer;" @click="IdCopy(item.oid)" :title="'ID:' + item.oid + $t('common.table.clickCopy')"><st-row align="center"><i :class="~[1, 2].indexOf(item.side) ? 'green' : 'red'"></i> <span>{{ productInfo.symbol }}</span></st-row></td>
                    <td>{{ $t(`common.positions_${item.side}`) }}</td>
                    <td>{{ $t(`submitEntrust.priceType_${item.trigger_type}`) }}</td>
                    <td>{{ item.px }}</td>
                     <td>{{ item.exec_px }}</td>
                     <td>{{ item.qty }}</td>
                    <td>
                      <span>{{ $t(`record.errno.plan_${item.errno ? '00' : 0}`) }}</span>
                      <!-- <span v-if="!item.errno">{{$t('record.errno.plan_0')}}</span>
                      <div v-if="item.errno" class="trigger-failure">
                        <a>{{$t('record.errno.plan_00')}}</a>
                        <p class="hint" v-html="$t('record.errno.failure', {time: `<span>${Util.timeFormat(item.finished_at)}</span>`, contract: productInfo[locale === 'zh-cn' ? 'name_zh' : 'name_en'], priceType: $t('submitEntrust.priceType_' + item.price_type), downOrUp: Number(item.price_way) === 1 ? $t('record.cp.on') : $t('record.cp.down'), errno: $t('record.errno.plan_' + item.errno), price: `<span>${item.price}</span>`})"></p>
                      </div> -->
                    </td>
                    <td>
                      {{item.finished_at|timeFormat}}
                    </td>
                    <td class="options">
                        <a v-if="item.errno !== 1 && item.errno !== 2" @click="errnoFn(item)">{{ $t('common.table.see') }}</a>
                    </td>
                </tr>
                  <!-- <tr>
                    <td><st-row align="center"><i class="red"></i> <span>XBTUSD</span></st-row></td>
                    <td>平仓开多</td>
                    <td>-1,000,000</td>
                    <td>10,000</td>
                    <td>10,000</td>
                    <td>1,000,00</td>
                    <td>100.0000</td>
                    <td>限价</td>
                    <td>安卓</td>
                    <td>
                        <p>2018/03/08</p>
                        <p>12:30:55</p>
                    </td>
                    <td class="options">
                        <a class="green" href="">{{ $t('common.table.cancel') }}</a>
                    </td>
                </tr> -->
            </tbody>
       </table>
          <st-row direction="column" v-if="!list || !list.length" align="center" class="no-data">
            <img src="../../../assets/img/no-data.png" alt="">
            <p>{{ $t('record.noData') }}</p>
       </st-row>
         <popup :title="$t('common.table.see')" height="200"  width="440" :callback="erronClsoe" v-if="erronShow">
            <errno-window :info="info" :close="erronClsoe"></errno-window>
       </popup>
      </div>
</template>
<script>
import ClipboardJS from 'clipboard'
import ErrnoWindow from './errno-window'
import Util from '../../../assets/js/util.js'
export default {
  components: {
    ErrnoWindow
  },
  data() {
    return {
      offset: 0,
      list: [],
       // 是否已经完成一次请求
      isOk: true,
      erronShow: false,
      info: null,
      Util: Util
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    },
    com() {
      return this.$store.state.com
    },
    productInfo() {
      return this.$store.state.market.productInfo
    },
    locale() {
      return this.$store.state.auth.locale
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
    erronClsoe() {
      this.erronShow = false
    },
    getList() {
      this.swapsApi.userPlanOrders(this.productInfo.instrument_id, this.offset, 4)
      .then(res => {
        if (res.data.orders && res.data.orders.length) {
          this.isOk = res.data.orders.length === 10
          this.list = [...this.list, ...res.data.orders]
        } else {
          this.isOk = false
        }
      })
    },
    confirmEntrustClose() {
      this.showConfirmEntrust = false
    },
    unwindClose() {
      this.showUnwind = false
    },
    errnoFn(info) {
      this.info = info
      this.erronShow = true
    }
  },
  mounted() {
    if (this.token) {
      this.getList()
      this.$refs.dt.onscroll = (e) => {
        if (this.isOk && e.target.scrollHeight > e.target.offsetHeight && e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight < 20) {
          this.isOk = false
          this.offset += 10
          this.getList()
        }
      }
    }
  }
  // created() {
  //   console.log(this.curryEntrustList)
  // }
}
</script>

<style lang="less" scoped>
@import "./list";
.record-list-data .current-entrust {
   tr {
       height: 50px;
       td {
           p {
               text-align: center;
           }
           .trigger-failure {
             position: relative;
             a {
                // color: rgba(151, 176, 214, .7);
                color: #cdd5df;
                // border-bottom: 1px dotted rgba(151, 176, 214, .7);
                border-bottom: 1px dotted #cdd5df;
              }
             > p {
               position: absolute;
               top: 25px;
               left: 50%;
               width: 240px;
               margin-left: -140px;
               text-align: left;
               &.hint {
                 display: block;
               }
               &::after {
                 content: "";
                 width: 10px;
                 height: 10px;
                 background: @hintBack;
                 border-left: 1px solid #F8B500;
                 border-top: 1px solid #F8B500;
                 position: absolute;
                 left: 50%;
                 top: -5px;
                 margin-left: -8px;
                 transform: rotate(45deg);
               }
             }
           }
       }
        .options {
            width: 70px;
          a {
            display: block;
            margin: 0 auto;
            text-align: center;
            width: 60px;
            height: 20px;
            line-height: 18px;
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
</style>
