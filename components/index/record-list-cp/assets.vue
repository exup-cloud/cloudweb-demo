<template>
      <div class="record-list-data">
        <table >
          <thead>
              <tr>
              <th class="hint-father hover">
                 <p><span>{{ $t('record.cp.interestsUser') }}</span></p>
                 <div class="hint">
                    <p>{{ $t('record.cp.interestsUserHover') }}</p>
                 </div>
               </th>
               <th>{{ $t('record.cp.balanceUser') }}</th>
               <th>{{ $t('record.cp.marginUser') }}</th>
               <th style="width: 160px;">{{ $t('record.cp.noMoneyTwo') }}</th>
               <th>{{ $t('record.cp.freezeVol') }}</th>
              </tr>
            </thead>
            <tbody class="current-entrust">
                  <tr v-if="token">
                    <td>{{ userSumAssert|retainDecimals({decimal: com.valueUnit}) }}</td>
                    <td>{{ com.haveAssert|retainDecimals({decimal: com.valueUnit}) }}</td>
                    <td>{{ com.imTotal|retainDecimals({decimal: com.valueUnit}) }}</td>
                    <td>{{ com.PNL|retainDecimals({decimal: com.valueUnit}) }}</td>
                    <td>{{ accounts.freeze_vol |retainDecimals({decimal: com.valueUnit}) }} {{ accounts.coin_code }}</td>
                </tr>
            </tbody>
       </table>
      </div>
</template>
<script>
export default {
  name: 'assets',
  data() {
    return {
      userSumAssert: '', // 账户权益
    };
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    },
    com() {
      return this.$store.state.com
    },
    ticker() {
      return this.$store.state.market.ticker
    },
    productInfo() {
      return this.$store.state.market.productInfo
    },
    accounts() {
      return this.$store.state.auth.accounts || {}
    },
    cabinList() {
      return this.$store.state.market.cabinList
    },
    tickerList() {
      return this.$store.state.market.tickerList;
    },
    cabinListOther() {
      return this.$store.state.market.cabinListOther;
    },
  },
  watch: {
    tickerList() {
      this.$store.dispatch('positionCalculate');
      this.getUserSumAssert();
    },
    cabinList() {
      this.$store.dispatch('positionCalculate');
      this.getUserSumAssert();
    },
    cabinListOther() {
      this.$store.dispatch('positionCalculate');
      this.getUserSumAssert();
    },
  },
  methods: {
    // 获取账户权益
    getUserSumAssert() {
      // 可用 + 冻结 + 未实现盈亏
      this.userSumAssert = Number(this.accounts.available_vol) + Number(this.accounts.freeze_vol) + this.com.PNL + this.com.imTotal
    },
  },
  mounted() {
    this.getUserSumAssert();
  },
}
</script>

<style lang="less" scoped>
@import "./list";
.record-list-data {
   tr {
       height: 50px;
       th, td {
          //  text-align: center
          &:last-child {
            width: 120px;
            text-align: right;
          }
       }
   }
}
</style>
