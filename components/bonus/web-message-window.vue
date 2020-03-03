
<template>
  <div class="messag-window">
      <p>{{info.message}}</p>
      <st-row justify="center">
        <a target="_blank" @click="go(info.type, info.href)">{{ info.hrefTitle }}</a>
      </st-row>
  </div>
</template>

<script>
  export default {
    name: 'messag-window',
    props: ['close', 'info'],
    data() {
      return {
      }
    },
    mounted() {
    },
    computed: {
      locale() {
        return this.$store.state.auth.locale
      }
    },
    methods: {
      go(type, href) {
        this.$emit('go', type, href)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
 @import "../../assets/css/base";
.messag-window {
    padding-top: 20px;
    p {
        position: relative;
        padding: 20px 30px;
        color: @L4;
        text-align: center;
    }
    a {
        margin-top: 20px;
        // margin-left: 37px;
        display: block;
        width: 166px;
        height: 50px;
        background-color: @i-main-2;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        color: @L10;
        &:hover {
            background-color: @mainHover;
        }
    }
}
</style>
