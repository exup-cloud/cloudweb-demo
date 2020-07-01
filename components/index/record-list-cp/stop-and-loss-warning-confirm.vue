<template>
<div class="stop-and-loss-warning-confirm">
  <p class="content">{{content}}</p>
  <st-row justify="between" class="btn-box">
    <a @click="close">{{ $t('common.cancel') }}</a><a @click="confirm">{{  $t('record.cp.confirm')}}</a>
  </st-row>
</div>
</template>
<script>
export default {
  name: 'stop-and-loss-warning-confirm',
  props: ['content', 'close', 'confirm'],
  data() {
    return {

    }
  },
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/base";
.content {
  padding: 0px 20px;
  min-height: 100px;
  padding-top: 20px;
}
.btn-box {
  padding: 0px 20px;
}
.btn-box a{
  width: 200px;
  height: 50px;
  text-align: center;
  line-height: 48px;
  font-size: 18px;
  border-radius: 2px;
  &:first-child {
    border: 1px solid @main-2;
    color: @main-2;
    margin-right: 20px;
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
</style>
