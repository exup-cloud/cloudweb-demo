<template>
    <div class="guide-container">
        <h1 class="title">自动减仓(ADL)</h1>
        <div class="text-box">
          <br />
          <p class="last" style="padding-top: 25px;">当投资者被强制平仓时，他们的剩余仓位将被TigerMEX Swap的强平系统接管。 如果强平仓位未能够在市场平仓，并且当标记价格达到破产价格时，自动减仓系统将会对持有反方向仓位的投资者进行减仓。减仓的先后顺序将根据杠杆和盈利比率决定。</p>
          <h3>减仓的过程如下：</h3>
          <p>根据交易员强平仓位的破产价格进行平仓，此时保险基金仍不足时，触发自动减仓策略。</p>
          <p>对手方通过收益率和有效杠杆计算出有效杠杆的PnL排名。 交易策略激进且盈利最多的交易员将被ADL序列优先标记。</p>
          <p>将ADL被执行方与有效杠杆盈亏排名靠前的交易员以破产价格进行自动减仓。</p>
          <br />
          <div class="one-img-center">
            <p>注：在盘口中央的ADL指示灯会根据你持有该合约的所有仓位（取最高）的排序，对您的仓位进行ADL预警。</p>
            <p><img src="../../../assets/img/guide/adl-1.png"/></p>
          </div>
          <h3>自动减仓机制的排序</h3>
          <p><span>盈亏计算：</span></p>
          <div class="formula">
            <p>排序 = 盈利百分比 * 有效杠杆 (如果盈利)</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 盈利百分比 / 有效杠杆 (如果亏损)</p>
          </div>
          <p><span>其中：</span></p>
          <div class="formula">
            <p>有效杠杆 = abs(标记价值) / (标记价值 - 破产价值)</p>
            <p>盈利百分比 = (标记价值 - 平均开仓价值) / abs(平均开仓价值)</p>
            <p>标记价值 = 位于标记价格时的仓位价值</p>
            <p>破产价值 = 位于破产价格时的仓位价值</p>
            <p>平均开仓价值 = 位于平均开仓价格时的仓位价值</p>
          </div>
          <p class="last">当投资者被强制平仓时，他们的剩余仓位将被TigerMEX Swap的强平系统接管。 如果强平仓位未能够在市场平仓，并且当标记价格达到破产价格时，自动减仓系统将会对持有反方向仓位的投资者进行减仓。减仓的先后顺序将根据杠杆和盈利比率决定。</p>
          <h3>减仓的过程如下：</h3>
          <p>根据交易员强平仓位的破产价格进行平仓，此时保险基金仍不足时，触发自动减仓策略。</p>
          <p>对手方通过收益率和有效杠杆计算出有效杠杆的PnL排名。 交易策略激进且盈利最多的交易员将被ADL序列优先标记。</p>
          <p>将ADL被执行方与有效杠杆盈亏排名靠前的交易员以破产价格进行自动减仓。</p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'guide-adl',
  head() {
    return {
      title: '自动减仓'
    }
  },
  layout: 'information'
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/guide.less";
</style>
