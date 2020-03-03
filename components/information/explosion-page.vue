<template>
    <div class='insure-page'>
       <h4>{{$t('informationPage.explosion.title')}}</h4>
       <!-- <div class="insure-page-message">
           <h6>{{ $t('informationPage.funding.historyTable') }}</h6>
           <p>{{ $t('informationPage.funding.messageOne') }}</p>
           <p>{{ $t('informationPage.funding.messageTwo') }}</p>
       </div> -->
       <st-row justify="between" align="center" class="insure-page-opctions">
          <information-selector></information-selector>
          <div class="insure-page-opctions-count">{{ $t('informationPage.insure.show') }} {{( this.getPage - 1) * 10 + 1 }} - {{ this.getPage * 10 }}</div>
          <page :isDown="isDown"></page>
       </st-row>
       <div class="insure-page-list">
           <table>
                  <thead>
                      <tr>
                        <th>{{ $t('informationPage.time') }}</th>
                        <th>{{ $t('common.table.type') }}</th>
                        <th>{{ $t('common.table.entrustPrice')}}({{quoteCoin}})</th>
                        <th>{{ $t('common.table.entrustNumber') }}</th>
                        <th>{{ $t('informationPage.explosion.status') }}</th>
                    </tr>
                  </thead>
                 <tbody>
                    <tr :key="item.timestamp" v-for="item in list">
                        <td> {{ item.created_at|timeFormat }}</td>
                        <td>{{ $t(`common.positions_${item.way}`) }}</td>
                        <td>{{ item.price|retainDecimals({decimal: com.pxUnit}) }}</td>
                        <td>{{ item.vol }}</td>
                        <td>{{item.status === 4 ? $t('informationPage.explosion.filled') : $t('informationPage.explosion.open')}}</td>
                    </tr>
                 </tbody>
            </table>
       </div>
    </div>
</template>
<script>
import InformationSelector from './selector'
import Page from '../bx-ui/page'
export default {
  name: 'funding-page',
  components: {
    InformationSelector,
    Page
  },
  data() {
    return {
      isDown: false,
      name: '',
      list: null,
      deliveryCycle: null,
      quoteCoin: ''
    }
  },
  computed: {
    productList() {
      return this.$store.state.market.productList
    },
    getPage() {
      return this.$route.query.page || 1
    },
    productInfo() {
      return this.$store.state.market.productInfo
    },
    com() {
      return this.$store.state.com
    }
  },
  watch: {
    '$route'() {
      this.getList()
    }
  },
  methods: {
    getList() {
      let contract_id = this.$route.query.id || this.productList[0].contract.contract_id
      this.getQuoteCoin(contract_id)
    //   this.deliveryCycle = this.productList.filter(item => { return item.contract.contract_id === Number(contract_id) })[0].contract.delivery_cycle
    //   this.swapsApi.fundingrate(contract_id, (this.getPage - 1) * 10)
    //   .then(res => {
    //     if (res.data.length !== 10) {
    //       this.isDown = true
    //     } else {
    //       this.isDown = false
    //     }
    //     this.name = this.productList.filter(item => {
    //       return item.contract.contract_id === Number(contract_id)
    //     })[0].contract.name
    //     this.list = res.data
    //   })
    // }
      this.swapsApi.getUserOrders(contract_id, 0, (this.getPage - 1) * 10, 10).then(res => {
        if (res.data.orders && res.data.orders.length) {
        // this.isOk = res.data.orders.length === 10
        // this.list = [...this.list, ...res.data.orders]
          if (res.data.orders.length !== 10) {
            this.isDown = true
          } else {
            this.isDown = false
          }
          this.name = this.productList.filter(item => {
            return item.contract.contract_id === Number(contract_id)
          })[0].contract.name
        //   this.list = res.data.orders
        //   console.log('res.data.orders###', res.data.orders)
          this.getBlowing(res.data.orders)
        } else {
        // this.isOk = false
          this.list = []
        }
      })
    },
    getBlowing(orders) {
      let result = []
      orders.forEach((item) => {
        // if (this.isBlowing(item.category, item.make_fee) || this.getType(item.category) === 2) {
        if (this.isBlowing(item.category, item.make_fee)) {
          result.push(item)
        }
      })
      this.list = result
    },
    getQuoteCoin(id) {
      let item
      for (let i = 0; i < this.productList.length; i++) {
        item = this.productList[i]
        if (item.contract.contract_id === Number(id)) {
          this.quoteCoin = item.contract.quote_coin
          return
        }
      }
    },
    // 是否是爆仓
    isBlowing(category, make_fee) {
      let n = Math.pow(2, 7)
      let m = Math.pow(2, 8)
      let l = Math.pow(2, 9)
      return ((n & category) === n) || ((m & category) === m) || (((l & category) === l) && !Number(make_fee))
    },
    // 获取订单的基本类型
    getType(category) {
      return parseInt(category.toString(2).slice(-5), 2)
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
 @import "./information.less";
</style>
