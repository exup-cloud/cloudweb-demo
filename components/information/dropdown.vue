<template>
    <div class="information-dropdown">
        <div class="dropdown-mask" @click="show = false" v-if="show"></div>
        <div class="dropdown-name" @click="show = !show">
          <span>{{currentName}}</span>
          <i class="iconfont icon-sort"></i>
        </div>
        <div class="dropdown-list" v-if="show">
            <div class="dropdown-search">
                <input type="text" @input="searchInput($event)"/>
                <i></i>
            </div>
            <ul>
              <li :key="item.id" v-for="item in list" @click = "changeIndex(item.index_id, item.name)">
                <!-- <nuxt-link :to="`/information/index/${item.index_id}`">{{item.name}} 指数</nuxt-link> -->
                {{item.name}}  指数
              </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Util from '../../assets/js/util'
export default {
  name: 'information-dropdown',
  props: ['info'],
  data() {
    return {
      show: false,
      list: [],
      originList: [],
      currentName: ''
    }
  },
  computed: {
    locale() {
      return this.$store.state.auth.locale
    }
  },
  methods: {
    hideDropdown() {
      this.show = false
    },
    changeIndex(id, name) {
      this.show = false
      this.$router.push({
        query: {id}
      })
      this.currentName = name + ' 指数'
      // window.location.href = url + `?lang=${this.locale}`
    },
    searchInput: Util.debounce(function (e) {
      let result = []
      if (e.target.value.length > 0) {
        this.originList.forEach((item) => {
          if (item.name.indexOf(e.target.value.toUpperCase()) > -1) {
            result.push(item)
          }
        })
      } else {
        result = this.originList
      }
      this.list = [...result]
    }, 500),
    getIndexName(id) {
      for (let i = 0; i < this.list.length; i++) {
        if (Number(this.list[i].index_id) === Number(id)) {
          return this.list[i].name
        }
      }
      return false
    }
  },
  mounted() {
    this.list = [...this.info]
    this.originList = [...this.info]

    if (!this.$route.query.id) {
      this.currentName = this.list[0].name + '指数'
      let id = this.list[0].index_id
      this.$router.push({
        query: {id}
      })
    } else {
      this.currentName = this.getIndexName(this.$route.query.id)
    }
  }
}
</script>
<style lang="less" scoped>
.information-dropdown {
  position: relative;
  .dropdown-mask {
    position: fixed;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    // background: rgba(0,0,0,0.2);
    z-index: 1;
  }
  .dropdown-name {
    width: 260px;
    height: 40px;
    display: flex;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 10;
    justify-content: space-between;
    border: 1px solid rgba(151, 176, 214, .2);
    align-items: center;
    padding: 0px 10px;
    border-radius: 6px;
    background: #ffffff;
    i {
      width: 16px;
      height: 16px;
      background: url("../../assets/img/demo-sort.svg") left top no-repeat;
      background-size: 100% 100%;
    }
  }
  .dropdown-list {
    width: 260px;
    max-height: 424px;
    border: 1px solid rgba(151, 176, 214, .2);
    position: absolute;
    left: 0px;
    top: 50px;
    background: #ffffff;
    overflow-y: auto;
    z-index: 10;
    .dropdown-search {
      // padding: 10px 6px;
      display: flex;
      border-radius: 20px;
      border: 1px solid rgba(151, 176, 214, .2);
      align-items: center;
      width: 240px;
      margin: 0 auto;
      margin-top: 10px;
      input {
        flex: 1;
        height: 40px;
        border-radius: 20px;
        border: none;
        outline: none;
        padding: 0px 10px;
      }
      i {
        width: 20px;
        height: 20px;
        background: url("../../assets/img/demo-search.svg") left top no-repeat;
        background-size: 100% 100%;
        margin: 0px 15px;
      }
    }
    ul {
      width: 100%;
      margin-top: 10px;
      li {
        border-top: 1px solid rgba(151, 176, 214, .2);
        height: 40px;
        line-height: 40px;
        padding: 0px 10px;
        &:hover {
          background: rgba(151, 176, 214, .1);
        }
        a {
          color: #333;
          display: block;
          height: 40px;
          width: 100%;

        }
      }
    }
  }
}
</style>
