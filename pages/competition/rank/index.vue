<template>
  <section class="rank">
      <st-row class="rank-layout">
        <div class="left">
          <my-user></my-user>
          <rank-list></rank-list>
        </div>
        <div class="right">
          <other-detail></other-detail>
          <income-map></income-map>
        </div>
      </st-row>
  </section>
</template>
<script>
import MyUser from '../../../components/competition/rank/my-user'
import RankList from '../../../components/competition/rank/rank-list'
import OtherDetail from '../../../components/competition/rank/other-detail'
import IncomeMap from '../../../components/competition/rank/income-map'
export default {
  components: {
    MyUser,
    RankList,
    OtherDetail,
    IncomeMap
  }
}
</script>
<style lang="less" scoped>
.rank {
  // background-color: #f8f8f8;
  padding: .1rem 0;
  background-image: url(../../../assets/img/competition/rank/long.jpg);
  background-position: center center;
  .rank-layout {
    width: 12rem;
    margin: 0 auto;
    .left {
      margin-right: .1rem;
      &>section:last-child {
        margin-top: .1rem;
      }
    }
    .right {
      &>section:last-child {
        margin-top: .1rem;
      }
    }
  }
}
@media screen  and (max-width: 750px)  {
  .right {
    display: none;
  }
}
</style>
