<template>
    <section class="competition-homepage">
        <div class="awards-box">
            <div class="awards-title-m">
                <h3 class="awards-title">奖项设置</h3>
                <p>参加比赛赢取奖励</p>
            </div>
            <ul class="awards-list">
                <li class="title">
                    <h3>奖项设置</h3>
                    <p>参加比赛赢取奖励</p>
                </li>
                <li class="one">
                    <div class="border">
                        <h3 class="title">模拟体验赛奖项</h3>
                        <img src="../../assets/img/competition/CT-01.png"/>
                        <p>模拟赛每天盈利额排名前50名，每人获得300IOST奖励</p>
                        <a>总量88888IOST</a>
                    </div>
                </li>
                <li class="two">
                    <div class="border">
                        <h3 class="title">实盘个人奖</h3>
                        <div class="tab">
                            <a :class="isTotal?'active':''" @click="selectTab(true)">总榜</a>
                            <a :class="!isTotal?'active':''" @click="selectTab(false)">日榜</a>
                        </div>
                        <div class="tab-list-box">
                            <div class="total-box" v-if="isTotal">
                                <ul class="total">
                                    <li>
                                        <img src="../../assets/img/competition/icon-one.png" />
                                        <span>5000 USDT</span>
                                    </li>
                                    <li>
                                        <img src="../../assets/img/competition/icon-tow.png" />
                                        <span>3000 USDT</span>
                                    </li>
                                    <li>
                                        <img src="../../assets/img/competition/icon-three.png" />
                                        <span>2000 USDT</span>
                                    </li>
                                </ul>
                                <p class="p-text">第4-10名：每人500 USDT</p>
                                <p class="describe">用户充值任意金额都可参与个人实盘赛，个人实盘赛以用户盈利额数据排名，充值本金越大，理论上交易更有优势，但是也需要用户注意风险，合理控制交易仓位。</p>
                            </div>
                            <div class="day-box" v-if="!isTotal">
                                <img src="../../assets/img/competition/USDT.png" />
                                <p>每日盈利额前10名,每人获赠10USDT</p>
                                <a>10 USDT</a>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="three">
                    <div class="border">
                        <h3 class="title">实盘团队奖</h3>
                        <div class="team-prize">
                            <a class="total-rank-title">总榜</a>
                            <p class="explain">
                                符合条件的团长，可以创建自己的团队，团队将在TigerMEX官网页面予以展示，团长需要给予团队成员“永续合约的操作指导”，带领团队成员取得更高的收益。
                            </p>
                            <ul class="prize-list">
                                <li>
                                    <img src="../../assets/img/competition/icon-one.png" />
                                    <span>10,000 USDT</span>
                                </li>
                                <li>
                                    <img src="../../assets/img/competition/icon-tow.png" />
                                    <span>9000 USDT</span>
                                </li>
                                <li>
                                    <img src="../../assets/img/competition/icon-three.png" />
                                    <span>8000 USDT</span>
                                </li>
                                <li>
                                    <p>四等奖：￥40,000等值 USDT</p>
                                </li>
                                <li>
                                    <p>五等奖：￥20,000等值 USDT</p>
                                </li>
                            </ul>
                            <p class="care">获胜团队，团长获得团队奖金的30%，剩余70%由所有团队成员平分</p>
                        </div>
                    </div>
                </li>
                <li class="four">
                    <div class="border">
                        <h3 class="title">特别奖</h3>
                        <div class="special-award">
                            <img src="../../assets/img/competition/CT-03.png"/>
                            <p>活动期间，用户实盘合约账户充值100USDT以上，第一个获得100倍收益的用户，奖励10个BTC。</p>
                            <a>奖励10BTC</a>
                        </div>
                    </div>
                </li>
            </ul>
            <img class="line" src="../../assets/img/competition/CT-04.png"/>
        </div>
        <div class="competition-text-box">
            <div class="competition-rule">
                <h3 class="title">活动规则</h3>
                <p class="sub-title">2019币快报&TigerMEX永续合约交易大赛 </p>
                <dl>
                    <dt>活动介绍</dt>
                    <dd>TigerMEX联合币快报举办“2019永续合约交易大赛”，为广大用户提供专业的永续合约交易场所。</dd>
                    <dt>活动时间</dt>
                    <dd>2019年1月21日-2019年3月14日</dd>
                    <dd>1月21日-2月20日，团长招募。</dd>
                    <dd>2月14日-3月14日，团长组队，个人报名参赛（团长在整个活动时间都可以招募团员）。</dd>
                    <dd>2月14日 15:00-2月20日 15:00 永续合约模拟盘体验（体验时间6天）</dd>
                    <dd>2月20日 15:00-3月14日 15:00，永续合约实盘大赛（比赛时间22天）</dd>
                    <dd>3月15日-3月22日，奖项发放。</dd>
                    <dt>报名入口</dt>
                    <dd>币快报官方报名指定渠道</dd>
                    <dd>
                        <img src="../../assets/img/competition/bkb-qr-code.png"/>
                    </dd>
                    <dd><p class="bkb-qr-code-text">币快报App</p></dd>
                    <dd>币快报团长招募链接（2月20日截止）：<a href="http://beenews2018.mikecrm.com/m9RzvNL" target="_blank">http://beenews2018.mikecrm.com/m9RzvNL</a></dd>
                    <dt>比赛规则</dt>
                    <dd>(1) 用户注册TigerMEX即可获得15000 TUSD虚拟本金，活动期间用户可以随意体验模拟交易。</dd>
                    <dd>(2) 本次比赛按照参赛用户或者团队的收益金额，从高到低排名。</dd>
                    <dd>(3) 本次比赛实盘合约交易标的为TigerMEX所有以USDT为结算币种的合约，目前包括BTCUSDT、ETHUSDT、EOSUSDT、BCHUSDT、XRPUSDT、TRXUSDT、BCHUSDT、ETCUSDT、LTCUSDT、ONTUSDT共10种合约。</dd>
                    <dd>(4) 个人实盘奖，以日榜、总榜为单位，选出收益额排行榜前10名用户进行奖励。</dd>
                    <dd>(5) 团队实盘奖，按照比赛结束后，团队的总收益金额排名，取前5名予以奖励。</dd>
                    <dd>(6) 活动期间，用户实盘合约账户充值100USDT以上，第一个获得100倍收益的用户，奖励10个BTC。</dd>
                    <dd>(7) 原先参加过TigerMEX&币世界模拟合约大赛的团长如也报名此次比赛，团队成员报名参赛后仅需点击加入该团队即可。</dd>
                    <dt>收益额计算规则</dt>
                    <dd>(1) 日排名：当日盈亏=从活动开始到当前的总盈亏 - 昨日盈亏（每天15:00统计并快照）。</dd>
                    <dd>(2) 总排名：从活动开始到结束时的总盈亏（活动最后一天15:00统计并快照）。</dd>
                    <dt>永续合约模拟体验赛奖项</dt>
                    <dd>模拟体验赛时间：2019-02-14 15:00 - 02-20 15:00（共6天）</dd>
                    <dd>奖励：模拟赛每天盈利额排名前50名，每人获得300IOST奖励，总量88888IOST</dd>
                    <dt>永续合约实盘大赛奖项</dt>
                    <dd>实盘大赛时间：2019-02-20 15:00 - 03-14 15:00（共22天）</dd>
                    <dd>【个人奖】</dd>
                    <dd>(1) 日排名</dd>
                    <dd>每日盈利额前10名，每人获赠10USDT</dd>
                    <dd>(2) 总排名</dd>
                    <dd>第1名：5000 USDT</dd>
                    <dd>第2名：3000 USDT</dd>
                    <dd>第3名： 2000 USDT</dd>
                    <dd>第4-10名：每人500 USDT</dd>
                    <dd>【团队奖】</dd>
                    <dd>获胜团队，团长获得团队奖金的30%，剩余70%由所有团队成员平分。（相应获奖成员都应有至少一笔实盘交易，否则将取消获奖资格，应分配奖励收归TigerMEX平台）</dd>
                    <dd>一等奖：10,000 USDT</dd>
                    <dd>二等奖：9000 USDT</dd>
                    <dd>三等奖：8000 USDT</dd>
                    <dd>四等奖：￥40，000等值 USDT</dd>
                    <dd>五等奖：￥20，000等值 USDT</dd>
                    <dd>获胜团队，团长获得团队奖金的30%，剩余70%由所有团队成员平分。</dd>
                    <dd>【特别奖】</dd>
                    <dd>活动期间，用户实盘合约账户充值100USDT以上（含充值、C2C场外购入2种形式），第一个获得100倍收益的用户，奖励10BTC。</dd>
                </dl>
            </div>
            <div class="activity-description">
                <h3 class="title">活动说明</h3>
                <p>比赛结束7天内（遇节假日顺延），官方客服人员通过注册邮箱、电话联系获奖用户发放奖金，奖金将直接打入获奖用户的TigerMEX平台账户中。所有获奖用户如需提现比赛奖励都需要完成KYC身份信息认证。</p>
                <p>大赛组委会鼓励所用用户正当公平参与合约比赛，严禁采用各种非常规手段干扰大赛，大赛组委会保留随时取消相应不合规用户比赛资格，取消奖励，封禁账户等权利。</p>
                <p>本届大赛由TigerMEX合约交易大赛组委会负责运行，大赛的规则以及各项事项由大赛组委会负责解释。大赛组委会对本次大赛拥有最终解释权。</p>
            </div>
        </div>

    </section>
</template>
<script>
export default {
  data() {
    return {
      isTotal: true
    }
  },
  methods: {
    selectTab(flag) {
      this.isTotal = flag
    }
  }
}
</script>
<style lang="less" scoped>
.competition-homepage {
    h1,h2,h3,h4,h5,h6,a,p,th,span{
        font-weight: 400!important;
    }
    .awards-box {
        height: 700px;
        width: 100%;
        // height: 200px;
        // background: -webkit-linear-gradient(left,#8E1305, #C7312E, #8E1305); /* Safari 5.1 - 6.0 */
        // background: -o-linear-gradient(left,#8E1305, #C7312E, #8E1305); /* Opera 11.1 - 12.0 */
        // background: -moz-linear-gradient(left,#8E1305, #C7312E, #8E1305); /* Firefox 3.6 - 15 */
        background: linear-gradient(to left,#8E1305, #C7312E, #8E1305);
        padding-top: 55px;
        position: relative;
        .awards-title-m {
            display: none;
        }
        .awards-list {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            >li {
                flex: 1;
                height: 532px;
                margin-left: 10px;
                padding: 5px;
                background: #f9edd7;
                text-align: center;
                &.title {
                    flex: none;
                    flex-basis: 160px;
                    width: 160px;
                    background: linear-gradient(#ab201b,#d0322f,#ab201b);
                    border: 1px solid transparent;
                    border-image: linear-gradient(top, rgba(213,136,108,1), rgba(213,136,108,0));
                    border-image-slice: 1;
                    margin-left: 0px;
                    padding-top: 40px;
                    font-family: "SimSun";
                    >h3,>p {
                        writing-mode:tb-rl;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    >h3 {
                        width: 78px!important;
                        margin: 0 auto;
                        font-size: 34px;
                        color: #feecbc;
                        letter-spacing: 15px;
                        padding: 20px 0px;
                        position: relative;
                        font-weight: 400;
                        &::before {
                            content: "";
                            width: 20px;
                            height: 20px;
                            border-top: 1px solid #fbe3b5;
                            border-left: 1px solid #fbe3b5;
                            position: absolute;
                            left: 0px;
                            top: 0px;
                        }
                        &::after {
                            content: "";
                            width: 20px;
                            height: 20px;
                            border-bottom: 1px solid #fbe3b5;
                            border-right: 1px solid #fbe3b5;
                            position: absolute;
                            right: 0px;
                            bottom: 0px;
                        }
                    }
                    >p {
                        width: 100%;
                        font-size: 16px;
                        color: #f7d8ac;
                        letter-spacing: 6px;
                        padding-top: 30px;
                    }
                }
                .border {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #b72a23;
                    padding-top: 24px;
                    .title {
                        width: 100%;
                        height: 82px;
                        text-align: center;
                        line-height: 82px;
                        color: #c21a00;
                        font-size: 20px;
                        font-weight: 500!important;
                        position: relative;
                        font-family: "SimSun";
                        &::before,&::after {
                            content: "";
                            display: block;
                            width: 111px;
                            height: 16px;
                            position: absolute;
                            background: url("../../assets/img/competition/CT-02.png")left top no-repeat;
                            background-size: 100% 100%;
                        }
                        &::before {
                            left: 0px;
                            top: 0px;
                        }
                        &::after {
                            right: 0px;
                            bottom: 0px;
                        }

                    }
                }
                &.one {
                    img {
                        // width: 160px;
                        margin-top: 70px;
                    }
                    p {
                        color: #c63425;
                        padding-top: 78px;
                    }
                    a {
                        color: #fff;
                        display: block;
                        width: 200px;
                        height: 36px;
                        line-height: 36px;
                        background: url("../../assets/img/competition/BTN-03.png") left top no-repeat;
                        background-size: 100% 100%;
                        margin: 0 auto;
                        margin-top: 20px;
                    }
                }
                &.two {
                    .tab {
                        padding-top: 15px;
                        a {
                            display: inline-block;
                            width: 100px;
                            height: 32px;
                            line-height: 32px;
                            background: url("../../assets/img/competition/BTN-02.png") left top no-repeat;
                            color: #c63425;
                            margin: 0px 5px;
                            &.active {
                                background: url("../../assets/img/competition/BTN-01.png") left top no-repeat;
                                color: #fff8ee;
                            }
                        }
                    }
                    .tab-list-box {
                        .total-box {
                            padding-top: 25px;
                            .total {
                                >li {
                                    width: 220px;
                                    height: 34px;
                                    line-height: 34px;
                                    vertical-align: middle;
                                    margin: 0 auto;
                                    background: #fae5ca;
                                    margin-top: 5px;
                                    color: #c11c06;
                                    img {
                                        width: 20px;
                                        margin-right: 40px;
                                    }
                                }
                            }
                            .p-text {
                                width: 220px;
                                margin: 0 auto;
                                text-align: center;
                                color: #c32615;
                                padding: 10px 0px;
                            }
                            .describe {
                                font-size: 12px;
                                text-align: left;
                                color: #8e6c63;
                                padding: 10px;
                            }
                        }
                        .day-box {
                            padding-top: 50px;
                            p {
                                padding-top: 82px;
                                font-size: 14px;
                                color: #c63425;
                            }
                            a {
                                display: block;
                                width: 200px;
                                height: 36px;
                                line-height: 36px;
                                background: url("../../assets/img/competition/BTN-03.png") left top no-repeat;
                                background-size: 100% 100%;
                                color: #fff5ef;
                                text-align: center;
                                margin: 0 auto;
                                margin-top: 20px;
                            }
                        }
                    }
                }
                &.three {
                    .team-prize {
                        padding: 10px;
                        padding-top: 15px;
                        .total-rank-title {
                            display: block;
                            width: 100px;
                            height: 32px;
                            line-height: 32px;
                            margin: 0 auto;
                            text-align: center;
                            background: url("../../assets/img/competition/BTN-01.png") left top no-repeat;
                            background-size: 100% 100%;
                            color: #fff8ee;
                        }
                        .explain {
                            font-size: 12px;
                            color: #845e55;
                            text-align: left;
                            padding-top: 15px;
                        }
                        .prize-list {
                            li {
                                width: 220px;
                                height: 34px;
                                line-height: 34px;
                                vertical-align: middle;
                                margin: 0 auto;
                                background: #fae5ca;
                                margin-top: 5px;
                                color: #c11c06;
                                // display: flex;
                                // align-items: center;
                                // justify-content: center;
                                img {
                                    width: 20px;
                                }
                                >span {
                                    display: inline-block;
                                    width: 100px;
                                    text-align: left;
                                    margin-left: 40px;
                                }
                                &:nth-of-type(4), &:nth-of-type(5) {
                                    background: none;
                                    text-align: center;
                                    // height: 28px;
                                    // line-height: 28px;
                                    // margin-top: 0px;
                                }
                            }
                        }
                        .care {
                            font-size: 12px;
                            text-align: left;
                            color: #845e55;
                            padding-top: 20px;
                        }
                    }
                }
                &.four {
                    .special-award {
                        padding: 10px;
                        img {
                            margin-top: 40px;
                        }
                        >p {
                            font-size: 12px;
                            color: #c63425;
                            text-align: left;
                            padding: 10px;
                            padding-top: 30px;
                            line-height: 1.8;
                        }
                        >a {
                            color: #fff;
                            display: block;
                            width: 200px;
                            height: 36px;
                            line-height: 36px;
                            background: url(/_nuxt/img/BTN-03.a1eb315.png) left top no-repeat;
                            background-size: 100% 100%;
                            margin: 0 auto;
                            margin-top: 25px;
                        }
                    }
                }
            }
        }
        .line {
            position: absolute;
            bottom: 28px;
            width: 90%;
            left: 5%;
        }
    }
    .competition-text-box {
        width: 100%;
        background: #fff2df;
    }
    .competition-rule,.activity-description {
        padding-top: 35px;
        width: 1200px;
        margin: 0 auto;
        color: #83450a;
        .title {
            color: #c21a00;
            font-size: 32px;
            width: 180px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin: 0 auto;
            position: relative;
            font-weight: 400;
            font-family: "SimSun";
            &::before, &::after {
                content: "";
                display: block;
                width: 14px;
                height: 14px;
                position: absolute;
            }
            &::before {
                left: 0px;
                top: 0px;
                border-top: 1px solid #c21a00;
                border-left: 1px solid #c21a00;
            }
            &::after {
                right: 0px;
                bottom: 0px;
                border-bottom: 1px solid #c21a00;
                border-right: 1px solid #c21a00;
            }
        }
        .sub-title {
            background: #b52620;
            color: #fef5e3;
            width: 320px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin: 0 auto;
            font-size: 16px;
            margin-top: 20px;
        }
        >dl {
            padding-top: 30px;
            dt {
                display: inline-block;
                color: #fef5e3;
                background: #b72a23;
                padding: 5px 20px;
                font-size: 14px;
                // font-weight: 300;
                margin: 15px 0px;
            }
            dd {
                font-size:12px;
                // font-weight: 300;
                img {
                    width: 150px;
                }
                .bkb-qr-code-text {
                    width: 150px;
                    text-align: center;
                }
                a {
                    // color: #fef5e3;
                }
            }
        }
    }
    .activity-description {
        padding-bottom: 90px;
        .title {
            margin-bottom: 30px;
        }
        p {
            font-size: 12px;
            line-height: 2;
        }
    }
}
@media screen and (max-width:750px){
    .competition-homepage {
        .awards-box {
            height: auto;
            padding-top: 20px;
            .awards-title-m{
                display: block;
                color: #fdebbb;
                text-align: center;
                >h3 {
                    font-size: 16px;
                }
                >p {
                    padding-top: 5px;
                    padding-bottom: 20px;
                    color: #fdebbb;;
                    font-size: 12px;
                }
            }
            .awards-list {
                width: 100%;
                display: block;
                padding-bottom: 20px;
                >li {
                    width: 90%;
                    margin: 0 auto;
                    margin-bottom: 20px;
                    &.title {
                        display: none;
                    }
                    &:last-child {
                        margin-bottom: 0px;
                    }
                }
            }
        }
        .competition-text-box {
            .competition-rule,.activity-description {
                width: 90%;
                margin: 0 auto;
                .title {
                    width: 150px;
                    font-size: 18px;
                    height: 40px;
                    line-height: 40px;
                }
                .sub-title {
                    width: auto;
                    font-size: 14px;
                    padding: 0px 10px;
                    margin-top: 10px;
                    width: 280px;
                }
                >dl {
                    padding-top: 20px;
                    dt {
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
</style>
