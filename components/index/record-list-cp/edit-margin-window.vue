
<template>
  <div class="edit-margin-window">
    <st-row class="title">
      <a @click="changeMargin(true)" :class="addOrReduce ? 'sel' : 'nosel'">{{ $t('record.cp.add') }}</a>
      <a @click="changeMargin(false)" :class="addOrReduce ? 'nosel' : 'sel'">{{ $t('record.cp.reduce') }}</a>
    </st-row>
    <table>
      <tr>
        <td>{{ $t('record.cp.curryPositions') }}</td>
        <td>{{ info.cur_qty }} {{ $t('common.pieces') }}</td>
      </tr>
      <tr>
        <td>{{ $t('record.cp.curryPositionsMargin') }}</td>
        <td>{{ info.im|retainDecimals({decimal: com.valueUnit}) }} {{com.marginUnit}}</td>
      </tr>
      <!-- <tr>
        <td>{{ $t('record.cp.onMargin') }}</td>
        <td>{{ com.haveAssert|retainDecimals({decimal: com.valueUnit}) }} {{com.marginUnit}}</td>
      </tr> -->
      <tr>
        <td>{{ $t('record.cp.curryPirce') }}</td>
        <td>{{ info.liquidatePrice|retainDecimals({decimal: com.pxUnit}) }} {{productInfo.quote_coin}}</td>
      </tr>
    </table>
    <div class="content">
      <div class="ipt">
        <st-row justify="between">
          <p class="ipt-name">{{ $t(`record.cp.${addOrReduce ? 'add' : 'reduce'}`) + $t('record.cp.margin') }}：</p>
          <div class="ipt-value">
            <div class="ipt-ipt"><input v-model="value" @input="priceChange" maxlength="16" type="text"><span>{{com.marginUnit}}</span></div>
          </div>
        </st-row>
        <st-row class="maximum" justify="end">
          <p>
            <a v-if="addOrReduce" @click="maximumClick(1)">{{$t('record.cp.maximum1')}}: {{com.haveAssert|retainDecimals({decimal: com.valueUnit})}}</a>
            <a v-else @click="maximumClick(2)">{{$t('record.cp.maximum2')}}: {{this.maximum|retainDecimals({decimal: com.valueUnit})}}</a>
          </p>
        </st-row>
        <st-row class="ipt-message" justify="end">
            <p>{{ $t('record.cp.editMarginPrice') }}</p>
            <p v-if="liquidatePrice !== -1">{{ liquidatePrice|retainDecimals({decimal: com.pxUnit - 1}) }}({{ ((liquidatePrice - info.liquidatePrice) > 0 ? '+' : '') }}{{liquidatePrice - info.liquidatePrice|retainDecimals({decimal: com.pxUnit - 1})}}) {{productInfo.quote_coin}}</p>
            <p v-else>-- {{productInfo.quote_coin}}</p>
        </st-row>

      </div>
    <div>
       <st-row justify="between" class="unwind-window-btn">
            <a @click="close">{{ $t('common.cancel') }}</a><a @click="submit">{{  $t('record.cp.confirm')}}</a>
         </st-row>
    </div>
    </div>
  </div>
</template>

<script>
  import Util from '../../../assets/js/util.js'
  // import Formula from '../../../assets/js/formula/index.js'
  // import SwapsApi from '../../../assets/js/api/swapsApi'
  export default {
    name: 'edit-margin-window',
    props: ['close', 'info'],
    data() {
      return {
        addOrReduce: true,
        value: '',
        liquidatePrice: 0,
        maximum: 0
      }
    },
    async mounted() {
      // let obj = {
      //   'mask': 64,
      //   'positons': [{
      //     'contract_id': this.id,
      //     // 'long_position': {
      //     //   'position_id': this.info.position_id,
      //     //   'hold_vol': this.info.hold_vol,
      //     //   'hold_avg_price': this.info.hold_avg_price,
      //     //   'im': this.info.im,
      //     //   'mm': this.info.mm,
      //     //   'open_type': this.info.open_type,
      //     //   'position_type': this.info.position_type
      //     // }
      //     'short_position': {
      //       'position_id': this.info.position_id
      //     }

      //   }]
      // }
      // console.log('this.info####', this.info)
      // try {
      //   let res = await SwapsApi.caculateLiquidation(obj)
      //   let maximumList = res.data.positions
      //   for (let i = 0; i < maximumList.length; i++) {
      //     if (this.info.position_id === maximumList[i].short_position.position_id) {
      //       this.maximum = maximumList[i].short_position.deductible_margin
      //     }
      //   }
      // } catch (err) {

      // }
      // let quote_coin = this.productInfo && this.productInfo.quote_coin
      // let price_coin = this.productInfo && this.productInfo.price_coin
      // let isReverse = Formula.IsReverse(quote_coin, price_coin)

      // if (!isReverse) {
      this.maximum = Number(this.info.im) - Number(this.info.positionValue) * Number(this.info.inital)
        // this.maximum = this.maximum > 0 ? this.maximum : 0
        // console.log('非币本位####this.maxImum###', this.maximum)
      // } else {
      //   this.maximum = Number(this.info.im) - Number(this.info.positionValue) * Number(this.info.inital)
      //   console.log('币本位####this.maxImum###', this.maximum)
      // }

      // console.log('this.info.im#####', this.info.im)
      // console.log('this.info.hold_avg_price####', this.info.hold_avg_price)
      // // console.log('this.info.hold_vol######', this.info.hold_vol)
      // console.log('this.info.positionValue#####', this.info.positionValue)
      // console.log('this.info.inital######', this.info.inital)
      // console.log('this.maximum#####', this.maximum)
    },
    computed: {
      com() {
        return this.$store.state.com
      },
      productInfo() {
        return this.$store.state.market.productInfo
      },
      id() {
        return Number(this.$route.query.id)
      }
    },
    methods: {
      // 价格改变事件
      priceChange() {
        this.value = Util.retainDecimals(this.value, {integer: 8, decimal: this.com.valueUnit}) || ''
        this.$emit('getLiquidate', this.info.side, this.info.position_type, this.addOrReduce ? Number(this.value) : -this.value, this)
      },
      changeMargin(bl) {
        if (bl === this.addOrReduce) {
          return false
        } else {
          this.addOrReduce = bl
          this.value = ''
          this.priceChange()
        }
      },
      submit() {
        if (!this.value) {
          this.$alert(this.$t('record.message.a1'))
          return false
        }
        if (Number(this.value) <= 0) {
          this.$alert(this.$t('record.message.a2'))
          return false
        }
        if (this.addOrReduce) {
          if (Number(this.value) > Number(this.com.haveAssert)) {
            this.$alert(this.$t('record.message.a4'))
            return false
          }
        } else {
          if (Number(this.value) > this.info.im) {
            this.$alert(this.$t('record.message.a5'))
            return false
          }
        }
        this.swapsApi.marginOper(this.productInfo.instrument_id, this.info.pid, this.value, this.addOrReduce ? 1 : 2)
        .then(res => {
          if (res.errno === 'OK') {
            this.$alert('s', this.$t('record.message.a3'))
            this.close()
          }
        })
      },
      maximumClick(type) {
        if (type === 1) {
          this.value = Util.retainDecimals(this.com.haveAssert, {decimal: this.com.valueUnit})
        } else {
          this.value = Util.retainDecimals(this.maximum, {decimal: this.com.valueUnit})
        }
      }
    },
    created() {
      this.liquidatePrice = this.info.liquidatePrice
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 @import "../../../assets/css/base";
.edit-margin-window {
    .title {
      padding: 0 20px;
      a {
         width: 280px;
         height: 58px;
         font-size: 18px;
         text-align: center;
         line-height: 58px;
         color: #000;
         &.sel {
           line-height: 56px;
           border-top: 2px solid  @main-2a;
         }
         &.nosel {
           border: 1px solid rgba(151,176,214, 0.2);
           background-color: #dbe5f0;
         }
      }
    }
    table {
      margin: 16px 130px;
      width: 340px;
      tr {
        height: 34px;
        line-height: 34px;
        color: @L6;
        td:last-child {
          text-align: right
        }
      }
    }
    .content {
      margin: 0 20px;
      padding: 32px 56px 0;
      border-top: 1px solid rgba(151, 176, 214, .5);
      .ipt {
        margin-bottom: 12px;
        .ipt-name {
          height: 48px;
          line-height: 48px;
          font-size: 16px;
          color: #000;
        }
        .maximum {
          p {
            padding-top: 10px;
          }
        }
        .ipt-message {
          p:first-child {
            margin-right: 10px;
          }
          p {
            // height: 40px;
            // line-height: 40px;
            padding-top: 5px;
            color: @L6;
          }
        }
        .ipt-value {
          input {
            padding: 20px;
            width: 338px;
            height: 48px;
            font-size: 16px;
            border: 1px solid #d9dfe7;
          }
        }
        .ipt-ipt {
          position: relative;
          span {
            position: absolute;
            right: 10px;
            top: 50%;
            margin-top: -12px;
            font-size: 16px;
          }
        }
      }
    }
    .unwind-window-btn a{
      width: 200px;
      height: 50px;
      text-align: center;
      line-height: 48px;
      font-size: 18px;
      border-radius: 2px;
      &:first-child {
        border: 1px solid @main-2;
        color: @main-2;
        &:hover {
           border-color: @mainHover;
           color: @mainHover;
        }
      }
      &:last-child {
          background-color: @main-2;
          color: @L10;
        &:hover {
           background-color: @mainHover;
        }
      }
    }
}
</style>
