<template>
   <div class="game-bottom">
          <div class="prize-box">
           <div class="title"><img src="../../assets/img/game/prize/title.png" alt=""/></div>
           <div class="prize-list">
             <div class="team-award">
               <img class="c1" src="../../assets/img/game/prize/c_1.png" alt=""/>
               <img class="c2" src="../../assets/img/game/prize/c_2.png" alt=""/>
               <img class="c3" src="../../assets/img/game/prize/c_3.png" alt=""/>
               <h3>团队奖 TOP5</h3>
               <ul>
                 <li>
                   <div>名次</div>
                   <div>团队</div>
                   <div>人数</div>
                   <div>奖励</div>
                 </li>
                 <li>
                   <div><img src="../../assets/img/game/rank/icon-one.png"/></div>
                   <div>
                     <p>蓝起军团</p>
                     <p>团长：蓝起</p>
                   </div>
                   <div>2000</div>
                   <div>15,000 USDT</div>
                 </li>
                 <li>
                   <div><img src="../../assets/img/game/rank/icon-tow.png"/></div>
                   <div>
                     <p>大熊空军二团归零连</p>
                     <p>团长：hone</p>
                   </div>
                   <div>1731</div>
                   <div>12,000 USDT</div>
                 </li>
                 <li>
                   <div><img src="../../assets/img/game/rank/icon-three.png"/></div>
                   <div>
                     <p>合约精灵敢死队</p>
                     <p>团长：浩子</p>
                   </div>
                   <div>574</div>
                   <div>10,000 USDT</div>
                 </li>
                 <li>
                   <div>4</div>
                   <div>
                     <p>一哥战队</p>
                     <p>团长：一哥</p>
                   </div>
                   <div>649</div>
                   <div>￥40,000等值USDT</div>
                 </li>
                 <li>
                   <div>5</div>
                   <div>
                     <p>金哥飞虎队</p>
                     <p>团长：金哥说币</p>
                   </div>
                   <div>816</div>
                   <div>￥20,000等值USDT</div>
                 </li>
               </ul>
             </div>
             <div class="personal-award">
               <img class="c4" src="../../assets/img/game/prize/c_4.png" alt=""/>
               <img class="c5" src="../../assets/img/game/prize/c_5.png" alt=""/>
               <h3>个人奖 TOP10</h3>
               <ul>
                 <li>
                   <span>名次</span>
                   <span>个人昵称或ID</span>
                   <span>奖励</span>
                 </li>
                 <li>
                   <span><img src="../../assets/img/game/rank/icon-one.png" alt=""/></span>
                   <span>100428228817</span>
                   <span>10,000 USDT</span>
                 </li>
                 <li>
                   <span><img src="../../assets/img/game/rank/icon-tow.png" alt=""/></span>
                   <span>100428142606</span>
                   <span>8,000 USDT</span>
                 </li>
                 <li>
                   <span><img src="../../assets/img/game/rank/icon-three.png" alt=""/></span>
                   <span>100428121649</span>
                   <span>5,000 USDT</span>
                 </li>
                 <li>
                   <span>4</span>
                   <span>100428327782</span>
                   <span>￥10,000等值USDT</span>
                 </li>
                 <li>
                   <span>5</span>
                   <span>100428312651</span>
                   <span>￥9,000等值USDT</span>
                 </li>
                 <li>
                   <span>6</span>
                   <span>向上上</span>
                   <span>￥8,000等值USDT</span>
                 </li>
                 <li>
                   <span>7</span>
                   <span>币圈暴徒</span>
                   <span>￥5,000等值USDT</span>
                 </li>
                 <li>
                   <span>8</span>
                   <span>戏精</span>
                   <span>￥4,000等值USDT</span>
                 </li>
                 <li>
                   <span>9</span>
                   <span>100428298955</span>
                   <span>￥3,000等值USDT</span>
                 </li>
                 <li>
                   <span>10</span>
                   <span>100428168549</span>
                   <span>￥1,000等值USDT</span>
                 </li>
               </ul>
             </div>
           </div>
           <div class="end-time">
             <p>比赛结束时间：2019-01-17 15:00</p>
             <p>成绩公布时间：2019-01-18 15:00</p>
           </div>
         </div>
         <div class="active-main">
           <!-- <h3></h3> -->
           <!-- <h4>活动总奖池</h4> -->
           <h6>
             <!-- <p>2,000,000</p>
             <p>奖池将不断注入新奖励</p> -->
            <!-- <st-row justify="center">
             <span>20万USDT</span>
             <span>100万TNB</span>
             <span>200万RATING</span>
           </st-row> -->
           </h6>
         </div>
         <div class="set">
          <st-row class="team-title" justify="center" align="center">
             <p></p>
              <h4>奖项设置</h4>
             <p></p>
            </st-row>
            <div class="prize">
               <h6>特别奖</h6>
               <div><img src="../../assets/img/game/TD.png" alt=""></div>
               <div class="prize-message">
                 <p>活动期间，用户实盘合约账户充值100USDT以上，且第一位获得100倍收益者</p>
                 <p>奖励5个BTC</p>
               </div>
            </div>
            <st-row class="prize-list"  justify="center">
              <st-row justify="between">
                <div class="prize person-one">
                    <h6 class="max">
                     个人奖
                   </h6>
                   <st-row class="nav" justify="between">
                       <a :class="rankType === 'mouth' && 'active'" @click="rankType = 'mouth'">月榜</a>
                       <a :class="rankType === 'week' && 'active'" @click="rankType = 'week'">周榜</a>
                       <a :class="rankType === 'day' && 'active'" @click="rankType = 'day'">日榜</a>
                     </st-row>
                   <div class="prize-three">
                     <img src="../../assets/img/game/1-3.png" alt="">
                     <template v-if="rankType === 'mouth'">
                         <div>
                       <P>8,000</P>
                        <P>USDT</P>
                     </div>
                     <div>
                       <P>10,000</P>
                        <P>USDT</P>
                     </div>
                     <div>
                       <P>5,000</P>
                        <P>USDT</P>
                     </div>
                     </template>
                    <template v-else-if="rankType === 'week'">
                         <div>
                       <P>5,000</P>
                        <P>TNB</P>
                     </div>
                     <div>
                       <P>10,000</P>
                        <P>TNB</P>
                     </div>
                     <div>
                       <P>5,000</P>
                        <P>TNB</P>
                     </div>
                     </template>
                     <template v-else-if="rankType === 'day'">
                         <div>
                       <P>5,000</P>
                        <P>RATING</P>
                     </div>
                     <div>
                       <P>10,000</P>
                        <P>RATING</P>
                     </div>
                     <div>
                       <P>5,000</P>
                        <P>RATING</P>
                     </div>
                     </template>
                   </div>
                   <div class="prize-ranking" v-if="rankType === 'mouth'">
                     <P>第<span>4</span>名：￥10,000等值USDT</P>
                     <P>第<span>5</span>名：￥9,000等值 USDT</P>
                     <P>第<span>6</span>名：￥8,000等值 USDT</P>
                     <P>第<span>7</span>名：￥5,000等值 USDT</P>
                     <P>第<span>8</span>名：￥4,000等值 USDT</P>
                     <P>第<span>9</span>名：￥3,000等值 USDT</P>
                     <P>第<span>10</span>名：￥1,000等值 USDT</P>
                   </div>
                    <div class="prize-ranking" v-if="rankType === 'week'">
                     <P>第<span>4</span>名：5,000 TNB</P>
                     <P>第<span>5</span>名：5,000 TNB</P>
                     <P>第<span>6</span>名：2,000 TNB</P>
                     <P>第<span>7</span>名：2,000 TNB</P>
                     <P>第<span>8</span>名：2,000 TNB</P>
                     <P>第<span>9</span>名：2,000 TNB</P>
                     <P>第<span>10</span>名：2,000 TNB</P>
                   </div>
                    <div class="prize-ranking" v-if="rankType === 'day'">
                     <P>第<span>4</span>名：5,000 RATING</P>
                     <P>第<span>5</span>名：5,000 RATING</P>
                     <P>第<span>6</span>名：2,000 RATING</P>
                     <P>第<span>7</span>名：2,000 RATING</P>
                     <P>第<span>8</span>名：2,000 RATING</P>
                     <P>第<span>9</span>名：2,000 RATING</P>
                     <P>第<span>10</span>名：2,000 RATING</P>
                   </div>
                  </div>
                  <div class="prize person-one">
               <h6>团队奖</h6>
               <div class="prize-three">
                 <img src="../../assets/img/game/1-3.png" alt="">
                 <div >
                   <P>12,000</P>
                    <P>USDT</P>
                 </div>
                 <div>
                   <P>15,000</P>
                    <P>USDT</P>
                 </div>
                 <div>
                   <P>10,000</P>
                    <P>USDT</P>
                 </div>
                </div>
                 <div class="prize-ranking">
                 <P>第<span>4</span>名：￥40,000等值 USDT</P>
                 <P>第<span>5</span>名：￥20,000等值 USDT</P>
               </div>
               <p class="captain">
                 符合条件的团长，可以创建自己的团队，团队将在TigerMEX官网页面予以展示。团长需要给予团队成员“永续合约的操作指导”，带领团队成员取得更高的收益。
               </p>
                  </div>
              </st-row>
              <st-row  justify="center">
                 <div class="prize">
               <h6>空投糖果</h6>
               <div><img src="../../assets/img/game/KT.png" alt=""></div>
               <div class="prize-message">
                 <p>参与交易的前2000名活跃用户（每天至少有一笔交易），活动结束后（每月为一个周期）</p>
                 <p>瓜分74万个TNB</p>
               </div>
              </div>
              <div class="prize">
               <h6>普惠奖</h6>
               <div><img src="../../assets/img/game/PH.png" alt=""></div>
               <div class="prize-message">
                 <p>所有报名参赛的用户，均可获得该奖励</p>
                 <p>可获得10 USDT的奖励</p>
               </div>
              </div>
              </st-row>
            </st-row>
         </div>
         <div class="reles">
            <st-row class="team-title" justify="center" align="center">
             <p></p>
              <h4>活动规则</h4>
             <p></p>
            </st-row>
            <div class="reles-message">
              <div class="reles-message-item">
                <h5>活动时间</h5>
                <div>
                  <p>2018年11月21日15:00-2019年1月17日15:00。</p>
                  <p>（1）11月21日-12月 1日， 团长招募。</p>
                  <p>（2）12月1日-12月17日， 团长组队，个人报名参赛。</p>
                  <p>（3）12月18日-1月17日， 比赛时间。</p>
                  <p>（4）1月18日-1月25日， 奖项发放。 </p>
                </div>
              </div>
              <div class="reles-message-item">
                 <h5>报名入口</h5>
                 <div>
                    <P>（1）指定币世界为唯一报名入口</P>
                    <P>（2）团员报名：即将公布</P>
                    <P>（3）团长报名：币世界报名</P>
                    <p>（4）新用户下载币世界APP，额外获得5000 TUSD虚拟本金</p>
                    <img src="../../assets/img/game/fbj-sm.png" alt="">
                    <p>（5）比赛特约行情提醒工具：合约精灵（扫码回复“报名”可额外获得5000TUSD虚拟本金）</p>
                    <img src="../../assets/img/game/hyjl.jpg" alt="">
                 </div>
              </div>
              <div class="reles-message-item">
                <h5>比赛办法</h5>
                <div>
                  <p>（1）用户注册TigerMEX即可获得10000 TUSD虚拟本金，通过币世界链接报名，可额外获得5000个 TUSD的虚拟本金。</p>
                  <p>（2）每个参赛用户报名之后可获得邀请链接，每邀请一个人报名参赛，奖励200 TUSD的虚拟本金。</p>
                  <p>（3）本次比赛按照参赛用户或者团队的收益金额，从高到低排名。 </p>
                  <p>（4）个人奖，以日、周、月为单位，选出收益额排行榜前10名用户进行奖励。 </p>
                  <p>（5）团队奖，按照比赛结束结束后，团队的总收益金额排名，取前5名予以奖励。</p>
                  <p>（6）获胜的团队，团长获得团队奖金的30%，剩余70%团队成员平分。</p>
                  <p>（7）活动期间，用户实盘合约账户充值100USDT，第一个获得100倍收益的用户，奖励5个BTC。</p>
                  <p>（8）为防止有人恶意扰乱比赛成绩，团队赛中，我们只选取团队中，个人收益排名前80%的队员计入团队收益。</p>
                  <p>（9）团队获奖，团队中个人收益排名前80%的团员平分团队奖金的70%奖励。</p>
                </div>
              </div>
              <div class="reles-message-item">
                <h5>收益额计算规则</h5>
                <div>
                  <p>（1）日排名：当日盈亏=从活动开始到当前的总盈亏 - 昨日盈亏 （每天15:00统计并快照）。</p>
                  <p>（2）周排名：当周盈亏=从活动开始到当前的总盈亏 - 上周盈亏（每周五15:00统计并快照）。</p>
                  <p>（3）月排名：从活动开始到当月结束时的总盈亏 （每月的最后一天15:00统计并快照）。 </p>
                </div>
              </div>
              <div class="reles-message-item">
                <h5>活动说明</h5>
                <div>
                  <p>（1）TUSD为本次合约模拟交易大赛的虚拟本金，1:1锚定美元，只作用比赛，不能提现。</p>
                  <p>（2）比赛期间，你的初始本金输光，可以通过下载币世界、邀请好友参赛，获得更多虚拟本金。</p>
                  <p>（3）周赛及月赛获奖用户均发放平台特制带编号的荣誉证书，将成为个人在合约交易上代表自身水平的象征。</p>
                  <p>（4）每个参赛用户只能使用一个账号，使用多个账号操作者取消比赛成绩。</p>
                  <p>（5）比赛结束7天内（遇节假日顺延），官方客服人员通过注册邮箱联系获奖用户发放奖金、奖品和证书，奖金将直接打入获奖用户的平台账户中。</p>
                  <p>（6）本届大赛由TigerMEX期货合约模拟交易大赛组委会负责运行，大赛的规则以及各项事项由大赛组委会负责解释。大赛组委会对本次大赛拥有最终解释权。</p>
                </div>
              </div>
            </div>
         </div>
         <div class="partner">
             <st-row class="team-title" justify="center" align="center">
             <p></p>
              <h4>合作伙伴</h4>
             <p></p>
            </st-row>
            <st-row class="partner-list" justify="center">
              <st-row >
                <a target="_blank" href="http://bishijie.com/?src=tigermex.com"><img  src="../../assets/img/game/BiShiJie.png" alt=""></a>
                <a target="_blank" href="https://www.dprating.com/?src=tigermex.com"><img src="../../assets/img/game/DPRating.png" alt=""></a>
              </st-row>
              <st-row >
                  <a target="_blank" href="http://www.linkvc.com/?src=tigermex.com"><img  src="../../assets/img/game/LINKVC.png" alt=""></a>
                  <a target="_blank" href="http://tiger.cloud/"><img  src="../../assets/img/game/Tiger.Cloud.png" alt=""></a>
              </st-row>
            </st-row>
         </div>
      </div>
</template>
<script>
export default {
  data() {
    return {
      rankType: 'mouth'
    }
  }
}
</script>
<style lang="less" scoped>
@import './game.less';
  .game-bottom {
    background-image: url(../../assets/img/game/BG02.png);
    background-size: 100%  100%;
    background-repeat: no-repeat;
    background-position: center;
    padding: .2rem 0 1rem;
    .active-main {
      h4 {
          height: 1.16rem;
          line-height: 1.16rem;
          font-size: 26px;
          text-align: center;
          .font_color_gradient()
      }
      h6 {
        position: relative;
        margin: 0 auto;
        height: 6.24rem;
        width: 9.96rem;
        background-image: url("../../assets/img/game/zjc.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 9.96rem  6.24rem;
      div {
        position: absolute;
        bottom: 1rem;
        margin: 0 auto;
        width: 9.96rem;
        span {
          color: @game_color;
          font-size: 16px;
          &:nth-child(n+2) {
            margin-left: 2.1rem;
          }
        }
      }
      }
    }
    .prize-box {
      width: 100%;
      // height: 300px;
      // background: pink;
      .title {
        text-align: center;
        margin-top: 30px;
      }
      .end-time {
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          color: #fff;
          font-size: 14px;
          margin: 20px;
          padding-bottom: 40px;
        }
      }
      .prize-list {
        // background: orange;
        display: flex;
        justify-content: center;
        font-size: 14px;
        color: #fff;
        margin-top: 10px;
        .team-award {
          width: 480px;
          margin-right: 25px;
          font-weight: 300;
          position: relative;
          .c1,.c2,.c3 {
            position: absolute;
          }
          .c1 {
            left:-30px;
            top: 120px;
          }
          .c2 {
            left: 370px;
            bottom: 5px;
          }
          .c3 {
            left: 400px;
            top: 42px;
          }
          >h3 {
            text-align: center;
            font-size: 24px;
            text-shadow:0 0 0.2em #0084e6,
                -0 -0 0.2em #0084e6;
          }
          >ul {
            width: 100%;
            padding: 0px 15px;
            background: rgba(30,74,108,0.3);
            border: 1px solid #256189;
            padding-bottom: 26px;
            margin-top: 20px;
            border-radius: 4px;
            li {
              display: flex;
              height: 68px;
              align-items: center;
              margin-top: 15px;
              background: rgba(91,172,241,0.1);
              border: 1px solid rgba(48,115,173,0.5);
              border-radius: 2px;
              >div {
                display: inline-block;
                &:nth-of-type(1) {
                  width: 65px;
                  text-align: center;
                  font-size: 20px;
                }
                &:nth-of-type(2) {
                  width: 165px;
                  p {
                    &:nth-of-type(1) {
                      font-size: 16px;
                    }
                    &:nth-of-type(2) {
                      font-size: 12px;
                    }
                  }
                }
                &:nth-of-type(3) {
                  width: 70px;
                }
                &:nth-of-type(4) {
                  flex: 1;
                }
                img {
                  width: 24px;
                }
              }
              &:nth-of-type(1) {
                height: 54px;
                line-height: 54px;
                color: #b7ddff;
                font-size: 14px;
                margin-top: 0px;
                background: none;
                border: none;
                >div {
                  font-size: 14px;
                }
              }
              &:nth-of-type(2) {
                background: rgba(159,136,12,0.3);
                border: 1px solid rgba(255,255,0,0.5);
                margin-top: 0px;
              }
              &:nth-of-type(3) {
                background: rgba(73,61,145,0.3);
                border: 1px solid rgba(137,117,237,0.5);
              }
              &:nth-of-type(4) {
                background: rgba(32,102,160,0.3);
                border: 1px solid rgba(91,172,241,0.5);
              }
            }
          }
        }
        .personal-award {
          width: 480px;
          margin-left: 25px;
          position: relative;
          .c4,.c5 {
            position: absolute;
          }
          .c4 {
            left: -10px;
            bottom: 200px;
          }
          .c5 {
            right: -5px;
            top: 50px;
          }
          >h3 {
            text-align: center;
            font-size: 24px;
            color: #fff;
            // -webkit-text-stroke: 1px #673c7a;
            // text-shadow: 0px 0px 5px #6b3c98;
            text-shadow:0 0 0.2em #a105e6,
                -0 -0 0.2em #a105e6;
          }
          >ul {
            background: rgba(53,35,93,0.3);
            border: 1px solid #673c7a;
            padding: 0px 15px;
            padding-bottom: 10px;
            margin-top: 20px;
            border-radius: 4px;
            li {
              display: flex;
              height: 38px;
              background: rgba(50,36,82,0.2);
              border: 1px solid rgba(142,62,184,0.3);
              align-items: center;
              margin-top: 5px;
              border-radius: 2px;
              >span {
                display: block;
                img {
                  width: 20px;
                }
                &:nth-of-type(1) {
                  width: 90px;
                  text-align: center;
                  font-size: 16px;
                }
                &:nth-of-type(2) {
                  width: 200px;
                  padding-left: 10px;
                }
                &:nth-of-type(3) {
                  // width: 160px;
                  flex: 1;
                }
              }
              &:nth-of-type(1) {
                height: 40px;
                background: none;
                border: none;
                color: #eadeff;
                font-size: 14px;
                >span {
                  font-size: 14px;
                }
              }
              &:nth-of-type(2) {
                background: rgba(159,136,12,0.3);
                border: 1px solid rgba(255,255,0,0.5);
                margin-top: 0px;
              }
              &:nth-of-type(3) {
                background: rgba(73,61,145,0.3);
                border: 1px solid rgba(137,117,237,0.5);
              }
              &:nth-of-type(4) {
                background: rgba(32,102,160,0.3);
                border: 1px solid rgba(91,172,241,0.5);
              }
            }
          }
        }
      }
    }
    .team-title {
      .team-title()
    }
    .partner {
      .partner-list {
        padding-top: .4rem;
        div {
            &:nth-child(n+2) {
             margin-left: 32px;
           }
        }
        a {
           height: 120px;
           width: 240px;
           color: #202e35;
           text-align: center;
          //  line-height:138px;
          //  font-size: 24px;
          //  border: 2px solid #202e35;
           box-shadow: 1px 1px 5px #0a0d0f ;
           &:nth-child(n+2) {
             margin-left: 32px;
           }
           background-color: #fff;
           img {
             display: block;
             height: 120px;
             width: 240px;
           }
          //  img {
          //    background-color: #fff;
          //  }
        }
      }
    }
    .set {
      .prize{
        margin: 0 auto;
        padding-top: .3rem;
        height: 5.58rem;
        width: 3.98rem ;
        background-image: url(../../assets/img/game/JX-bg.png);
        background-size: 100% 5.58rem;
        h6 {
          width: 80%;
          margin: 0 auto 0.1rem;
          height: .6rem;
          font-size: .26rem;
          text-align: center;
          line-height: .6rem;
          .font_color_gradient();
          &::after {
            width: 100%;
            height: 14px;
            display: block;
            content: '';
            background-image: url(../../assets/img/game/zs-02.png);
            background-size: 100%;
            background-position: top;
            background-repeat: no-repeat;
          }
        }
        div {
          text-align: center;
          img {
            margin: .2rem 0;
            // width: 40%;
             width: 1.47rem;
            height: 2.07rem;
          }
        }
        .prize-message {
          p {
            margin: 0 auto .2rem;
            width: 70%;
            &:last-child {
              padding: .1rem 0;
              color: #ffbc00;
              font-size: 0.16rem;
              border-top: 1px solid #515a69;
              border-bottom: 1px solid #515a69;
            }
            &:first-child {
              line-height: .3rem;
              color: #edf4ff;
              font-size: 12px;
            }
          }
        }
      }
      .prize-list {
        margin: 0 auto;
        width: 12rem;
         display: flex;
        .prize {
          width: 3rem;
           img {
            width: 2.4rem;
            height: 1.56rem;
          }
        }
        .person-one {
          position: relative;
          h6.max {
            position: relative;
            margin: 0 auto;
            height: 1.10rem;
            &::after {
              position: absolute;
              bottom: 0px;
            }
          }
          .nav {
            position: absolute;
            top: 90px;
            width: 100%;
            padding: 0 40px;
            a {
                height: 25px;
                width: 54px;
                font-size: 14px;
                text-align: center;
                line-height: 25px;
                color: @game_color;
                &.active {
                  color: #fff;
                  background-color: #1e4053;
                }
              }
          }
          .prize-three {
            position: relative;
            color: #fff;
            font-size: .14rem;
            div {
              position: absolute;
              text-align: center;
              &:nth-child(2) {
                  top: 1.26rem;
                  left: 0.56rem;
              }
               &:nth-child(3) {
                  top: 1rem;
                  left: 1.3rem;
              }
               &:nth-child(4) {
                  top: 1.28rem;
                  left: 1.94rem;
              }
            }
          }
          .prize-ranking {
            margin-top: -10px;
            p {
              height: 26px;
              line-height: 26px;
              font-size: 12px;
              color: #edf4ff;
              &:nth-child(2n - 1) {
                margin: 0 auto;
                width: 80%;
                background-color: rgba(33,51,61, .3);
              }
              span {
                display: inline-block;
                margin: 0 6px;
                width: 20px;
                height: 20px;
                line-height: 20px;
                background-color: #171f2a;
                border-radius: 50%;
                vertical-align: middle;
              }
            }
          }
          .captain {
            margin: .1rem auto;
            width: 70%;
            line-height: 24px;
            font-size: 12px;
            text-align: center;
            color: @game_color;
          }
        }
      }
    }
    .reles {
      .reles-message {
        margin: .6rem auto;
        padding: .4rem 0 0.4rem 0.4rem;
        width: 11rem;
        background-image: url(../../assets/img/game/bg-k-3.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .reles-message-item {
          margin: 10px;
          div {
            padding-left: 16px;
          }
          h5 {
            padding-left: 16px;
            position: relative;
            line-height: 28px;
            font-size: 14px;
            &::before {
              position: absolute;
              content: '';
              left: 0px;
              top: 8px;
              display: block;
              height: 6px;
              width: 6px;
              background-color: @game_color;
              border-radius: 50%;
            }
          }
          p {
            line-height: 24px;
            font-size: 12px;
          }
          img {
            margin: 10px;
            display: block;
            width: 100px;
            height: 100px;
            background-color: #fff;
          }
          color: @game_color;
        }
      }
    }
  }
  @media screen  and (max-width: 750px) {
    .game-bottom {
      .active-main {
        h6 {
          div {
            width: 8.96rem;
            margin-left: .7rem;
            span {
              // margin-left: 1.3rem;
              &:nth-child(n+2) {
                margin-left: 1.2rem;
              }
            }
          }
        }
      }
      .prize-box {
        .title {
          margin-top: 10px;
        }
        .end-time {
          flex-direction: column;
          p {
            margin: 5px;
          }
        }
        .prize-list {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .team-award {
            width: 90%;
            margin-right: 0px;
          }
          .personal-award {
            width: 90%;
            margin-left: 0px;
          }
        }
      }
      .set {
        display: none;
      }
      .set .prize {
        padding-top: .6rem;
        // height: 8rem;
        // width: 6rem ;
        width: 60%;
        background-size: 100% 8rem;
        .prize-message {
            p:first-child {
              line-height: .6rem;
            }
            p:last-child {
              font-size: .32rem;
            }
          }
      }
      .set .prize-list {
        flex-wrap: wrap;
        flex-direction: column;
        >div {
          flex-direction: column;
        }
        .prize {
          padding-top: .6rem;
          // width: 5.6rem;
          width: 100%;
          margin: 0 auto;
          // height: 10rem;
          background-size: 100% 10rem;
          .nav {
            top: 1.2rem;
          }
          h6 {
            font-size: .4rem;
          }
         h6.max {
           height: 1.6rem;
         }
         &.person-one {
           img {
             width: 3.81rem;
             height: 2.4rem;
           }
         }
         .prize-three {
          //  display: none;
           div {
             p {
               line-height: 14px;
             }
               &:nth-child(2) {
                  top: 1.82rem;
                  left: 1.2rem;
              }
               &:nth-child(3) {
                  top: 1.4rem;
                  left: 2.4rem;
              }
               &:nth-child(4) {
                  top: 1.9rem;
                  left: 3.6rem;
              }
           }
         }
        }
      }
      .partner .partner-list {
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        div {
           &:nth-child(n+2) {
             margin-top: 20px;
             margin-left: 0px;
           }
        }
        a {
          // width: 10rem;
          height: 2rem;
          width: 4rem;
          img {
            // width: 20rem;
            height: 2rem;
            width: 4rem;
          }
        }
      }
    }
  }
</style>
