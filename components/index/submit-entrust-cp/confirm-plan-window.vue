
<template>
  <div class="confirm-plan-window">
    <p>{{ deviation ? $t('submitEntrust.maxMessage') :  $t('submitEntrust.minMeaage') }}</p>
    <st-row class="btn" justify="between">
      <a @click="close" >{{ $t('submitEntrust.cancel') }}</a>
       <a @click="submit">{{ $t('submitEntrust.confirm') }}</a>
    </st-row>
  </div>
</template>

<script>
  export default {
    name: 'confirm-plan-window',
    props: ['close', 'deviation', 'submitOrder'],
    data() {
      return {
      }
    },
    methods: {
      submit() {
        this.$emit('submitOrder')
        this.close()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
 @import "../../../assets/css/base";
.confirm-plan-window {
  .btn {
    padding: 0 40px;
  }
  p {
    margin: 30px 80px 10px;
    color: @L1;
    text-align: center;
  }
      a {
        margin-top: 30px;
        // margin-left: 37px;
        display: block;
        width: 160px;
        height: 48px;
        background-color: @main-2;
        font-size: 18px;
        text-align: center;
        line-height: 48px;
        color: @L10;
        border-radius: 2px;
        &:hover {
            background-color: @mainHover;
        }
        &:first-child {
          background-color: #ECF2F7;
          border: 1px solid @main-2;
          color: @main-2;
          &:hover {
            border-color: @mainHover;
            color: @mainHover;
          }
        }
    }
}
</style>
