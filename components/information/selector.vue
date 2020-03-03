<template>
    <div class='information-selector'>
        <div class="Sel-mask" v-if="contractShow" @click="contractShow = false"></div>
            <div class="Sel-name"  @click="contractShow = !contractShow">
              <span>{{ info[locale === 'zh-cn' ? 'name_zh' : 'name_en'] }}</span>
              <i></i>
            </div>
            <ul class="Sel-list" v-if="contractShow">
               <li  :key="item.instrument_id" v-for="item in productList" :class="item.instrument_id === info.instrument_id ? 'active' : '' " @click="changeContract(item.instrument_id)">
                  {{item[locale === 'zh-cn' ? 'name_zh' : 'name_en']}}
               </li>
          </ul>
        </div>
</template>
<script>

export default {
  name: 'information-selector',
  data() {
    return {
      contractShow: false,
      info: {}
    }
  },
  computed: {
    locale() {
      return this.$store.state.auth.locale
    },
    productList() {
      return this.$store.state.market.productList
    }
  },
  methods: {
    // 改变合约
    changeContract(id) {
      this.contractShow = false
      let info = this.productList.filter(element => {
        return element.instrument_id === id
      })[0]
      this.info = info
      this.$router.push({
        query: {id}
      })
    }
  },
  mounted() {
    let info = this.productList[0]
    let id = this.$route.query.id
    if (id) {
      info = this.productList.filter(element => {
        return element.instrument_id === Number(id)
      })[0]
    }
    this.info = info
  }
}
</script>
<style lang="less" scoped>
 @import "../../assets/css/base";
.information-selector{
    position: relative;
      .Sel-list {
        display: inline-block;
        position: absolute;
        border: 1px solid @main-2a;
        border-top: none;
        background: #fff;
        width: 152px;
        text-align: center;
        font-size: 12px;
        z-index: 1000;
        li {
            height: 30px;
            line-height: 30px;
            cursor: pointer;
            color: @L4;
            font-size: 14px;
            &:hover,&.active {
                background: rgba(151,176,214, 0.1);
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
    .Sel-name {
        position: relative;
        padding-right: 30px;
        display: block;
        width: 180px;
        height: 30px;
        border: 1px solid @main-2a;
        background: rgba(151,176,214, 0.1);
        font-size: 14px;
        color: @L4;
        text-align: center;
        line-height: 30px;
        i {
           position: absolute;
           right: 0px;
           width: 28px;
           height: 28px;
           background: @main-2a;
            &::after {
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -4px;
                margin-left: -7px;
                content: '';
                display: block;
                width: 14px;
                height: 14px;
                border-width: 7px;
                border-style: solid;
                border-color: #fff transparent transparent transparent;
           }
        }
    }
}
</style>
