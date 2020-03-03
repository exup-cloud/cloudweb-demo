<template>
    <div class="guide-container">
        <h1 class="title">计划委托</h1>
        <div class="text-box">
            <h3>认识计划委托</h3>
            <p>计划委托是一种根据市场条件自动将计划转化成委托的订单类型。区别于普通订单，它不会直接发生成交，而是当触发条件生效后转化成委托订单实现成交，也就是说在提交计划委托后，首先执行的是触发委托而不是在深度中成交。</p>
            <p class="last">计划委托订单的优势在于只要当你设置好需要的计划，当行情触发到相应的条件，你就能立即完成相关的申报，而不需要人工操作干预。你可以用计划委托在进行止盈止损操作，也可以在行情达到到你预期的点位后，进行开仓赚取利润。</p>
            <h3>如何使用计划委托进行操作？</h3>
            <p>i.在提交委托时选择计划委托类型，如下图</p>
            <div class="img-text">
                <div class="block">
                    <div class="img-box">
                        <img src="../../../assets/img/guide/plan-1.png"/>
                    </div>
                    <div class="right">
                      <p class="last"><span>开仓计划委托</span></p>
                      <p>选择【开仓】->【计划委托】，则可设置开仓计划委托</p>
                      <p class="last"><span>止盈止损</span></p>
                      <p>选择【平仓】->【计划委托】，则可设置仓位的止盈止损委托</p>
                    </div>
                </div>
                <p>ii.输入触发价格、执行价格和执行数量等</p>
                <div class="block">
                    <div class="img-box">
                        <img src="../../../assets/img/guide/plan-2.png"/>
                    </div>
                    <div class="right">
                      <p class="last"><span>触发价格</span></p>
                      <p>触发价格分为最新价格、<a href="/information/guide/fair_price">合理价格</a>、指数价格，如设置为指数价格，则在指数价格达到设置位置时，会将该委托进行提交。触发价格可以在【设置】中进行修改。</p>
                      <p class="last"><span>执行价格</span></p>
                      <p>触发委托时，委托单的价格，即下单价格，可以选择触发时的<span>市价</span>下单或者<span>限价</span>下单。</p>
                      <p class="last"><span>执行数量</span></p>
                      <p>触发委托时，委托单的数量，即下单数量。若委托时余额不足或者平仓单不足，则不足的部分会转为撤销状态。</p>
                      <p class="last"><span>设置</span></p>
                      <p>计划委托的默认有效期为 7 天，可以在【设置】中进行修改。</p>
                    </div>
                </div>
                
            </div>
            <p>iii.设置完成并提交计划委托后，在计划委托中查看当前的计划委托，在计划历史中查看历史的计划委托。（注意：务必确认你执行时的资产充足，否则计划委托可能会在触发时执行失败。）</p>
            <img src="../../../assets/img/guide/plan-3.png"/>
            <h3>计划委托的是否额外收费？</h3>
            <p>计划委托不收取任何费用，订单实际的手续费以当时成交为准。</p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'guide-plan',
  head() {
    return {
      title: '计划委托'
    }
  },
  layout: 'information'
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/guide.less";
</style>
