<template>
    <div class="guide-container">
        <h1 class="title">保证金</h1>
        <div class="text-box">
            <h3>保证金</h3>
            <p>TigerMEX Swap内的所有合约均需要一定的保证金，保证金交易也使你的合约有着更大的杠杆。</p>
            <br />
            <p>在保证金交易的过程中，有以下几个点需要着重关注。</p>
            <br />
            <p class="last"><span>起始保证金：</span> 开出仓位要求的最低保证金金额，同时起始保证金率（开仓仓位价值/仓位保证金）也表现了你的杠杆倍数。</p>
            <p class="last"><span>维持保证金：</span>维持仓位的最低的保证金要求，低于这个比例将触发强平事件或部分强平事件。</p>
            <p class="last"><span>开仓成本：</span> 开仓总共需要的冻结资产，包含了开仓的起始保证金和可能的手续费。</p>
            <p><span>实际杠杆率：</span> 当前仓位包含未实现盈亏的杠杆率。</p>
            <p><span>风险限额</span></p>
            <p>TigerMEX Swap对于所有的交易账户使用风险限额，这样可以减少巨大强制平仓发生的可能性。</p>
            <br />
            <p class="last">如果一些用户拥有巨大头寸，他们将给其他用户带来风险，如果他们的仓位被强平，其他用户可能会经历自动减仓事件。 风险限额递增模式将帮助避免这种情况的发生，它会提高巨大头寸的保证金要求。</p>
            <h3>动态风险限额</h3>
            <p>每种合约拥有基础风险限额和递增额。 这些参数，结合了维持保证金和起始保证金要求，被用于计算每个仓位完整的保证金要求。</p>
            <p>随着仓位的增加，维持保证金和起始保证金要求也会提高。 保证金率将随着风险限额的改变而提高或降低。</p>
            <br />
            <p>当前合约的风险限额等级：</p>
            <div class="formula">
              <p>风险限额等级 = （仓位价值+未成交委托价值-基础风险限额）/递增额+1</p>
            </div>
            <p>注：风险限额等级向上取整</p>
            <p>各合约产品的保证金要求如下：</p>
            <div class="formula">
              <p>起始保证金：IMR= 风险限额等级 *0.01=[(仓位价值+未成交委托价值-基础风险限额)/递增额+1] *0.01</p>
              <p>维持保证金：MMR=风险限额等级 *0.005=[(仓位价值+未成交委托价值-基础风险限额)/递增额+1] *0.005</p>
            </div>
            <p>各合约产品的风险限额如下:</p>
            <table>
                <tbody>
                    <tr>
                      <td>合约</td>
                      <td>基础风险限额</td>
                      <td>风险限额递增额</td>
                    </tr>
                    <tr>
                      <td>BTCUSDT 永续合约</td>
                      <td>200,000 USDT</td>
                      <td>100,000 USDT</td>
                    </tr>
                    <tr>
                      <td>ETHUSDT 永续合约</td>
                      <td>100,000 USDT</td>
                      <td>50,000 USDT</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
  name: 'guide-margin',
  head() {
    return {
      title: '保证金'
    }
  },
  layout: 'information'
}
</script>

<style lang="less" scoped>
@import "../../../assets/css/guide.less";
</style>
