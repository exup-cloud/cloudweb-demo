<template>
    <div class="guide-container">
        <h1 class="title">强制平仓</h1>
        <div class="text-box">
            <h3>1.使用合理价格的强制平仓</h3>
            <p>TigerMEX 使用合理价格标记方法来避免由于缺乏流动性或市场操纵而引起的强制平仓。</p>
            <p>附强制平仓的计算方式</p>
            <p>逐仓条件下的正向合约：</p>
            <div class="formula">
              <p><span>多仓</span>  Lp=Hp*Vol*S - (IM-MM)/[(1-R)*VOL*S]</p>
              <p><span>空仓</span>  Lp=Hp*Vol*S +(IM-MM)/[(1+R)*VOL*S]</p>
            </div>
            <br />
            <p>全仓条件下的正向合约：</p>
            <div class="formula">
              <p><span>多仓</span>  Lp=Hp*Vol*S - (可用余额+IM-MM)/[(1-R)*VOL*S]</p>
              <p><span>空仓</span>  Lp=Hp*Vol*S +(可用余额+IM-MM)/[(1+R)*VOL*S]</p>
            </div>
            <p class="last">Lp：强平价格 ；Hp：持仓均价；Vol：持仓量（张） ；S：合约面值；IM：起始保证金；MM：维持保证金 R：吃单手续费率</p>
            <h3>2.风险限额要求仓位越大需要的保证金水平更高</h3>
            <p>仓位大的时候一旦触发强平很可能出现无法安全强平的风险，从而对市场产生影响，而TigerMEX 的强平引擎可以使用更多的保证金来有效的大量平仓。</p>
            <p>如果强平被触发，TigerMEX 将取消该合约的所有未成交委托，以释放保证金并保持仓位。 其他合约的委托不受影响。</p>
            <p class="last">TigerMEX 使用部分强平方法，此方法会自动尝试减少维持保证金要求而避免全部仓位被强平。</p>
            <h3>3.使用最低风险限额的用户</h3>
            <p>TigerMEX 取消此合约的所有未成交委托。</p>
            <p class="last">如果此时还未能满足维持保证金要求，此仓位被强平引擎于破产价格接管。</p>
            <h3>4.使用高风险限额的用户</h3>
            <p>强平引擎将会用以下方法尝试降低用户的风险限额，从而降低保证金要求：</p>
            <p>&nbsp;&nbsp;1）取消未成交委托，但保留现有仓位，而降低用户的风险限额。</p>
            <p>&nbsp;&nbsp;2）提交 FillOrKill（全数执行或立刻取消）委托，此委托的价值等于目前的仓位价值和符合目前保证金要求的风险限额值之差，从而避免进一步被强平。</p>
            <p>&nbsp;&nbsp;3）如果仓位仍然处于强平状态，那么全部仓位将被强平引擎以破产价格接管。</p>
            <p>更详细了解风险限额，请参考<a href="/information/guide/margin">保证金</a></p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'guide-forced-liquidation',
  head() {
    return {
      title: '强制平仓'
    }
  },
  layout: 'information'
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/guide.less";
</style>
