<template>
    <div class="guide-container">
        <h1 class="title">合理价格</h1>
        <div class="text-box">
            <h3>为什么要采用合理价格计算盈亏和强平？</h3>
            <p class="last">TigerMEX永续合约采用独特设计的合理价格标记系统，以避免在高杠杆产品上发生不必要的强制平仓。 如果没有这个系统，那么标记价格可能会由于市场被操纵或是缺乏流动性而与价格指数发生不必要的偏差，从而导致不必要的强制平仓。 此系统将标记价格设置为合理价格而非最新交易价格，由此避免不必要的强平。</p>
            <br />
            <h3>合理标记价格的机制</h3>
            <p>对于永续合约，其合理价格等于标的指数价格加上随时间递减的资金费用基差。</p>
            <p>所有的自动减仓合约都使用合理价格标记方法。 此外请注意，此方法只影响强平价格以及未实现盈亏，它并不影响已实现盈亏。</p>
            <p class="last"><span>注意：</span>这意味着当你的委托执行后，你可能立即会看到正的或负的未实现盈亏。 发生这种情况的原因是合理价格与成交价格的略微偏差。 这是正常现象，并不意味着你损失了资金，但一定要留意你的强平价格，避免过早地被强制平仓。</p>
            <h3>计算永续掉期合约的合理价格</h3>
            <p>永续掉期合约的合理价格使用资金费用基差率计算：</p>
            <div class="formula">
              <p>资金费用基差率 = 资金费率 * (至下一个缴付资金费用的时间 / 资金费用时间间隔)</p>
              <p>合理价格       = 指数价格 * (1 + 资金费用基差率)</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'guide-fair-price',
  head() {
    return {
      title: '合理价格'
    }
  },
  layout: 'information'
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/guide.less";
</style>
