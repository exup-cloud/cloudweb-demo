import { swapsAxios } from '../axiosConfig'
// import axios from 'axios'
let ifaccount = 'v1/ifaccount'
let ifcontract = 'ifcontract'
let ifactivity = 'v1/ifactivity'
let swap = ''
let swapsApi = {
  login(obj) {
    return swapsAxios.post(ifaccount + '/login', obj);
  },
  // 获取k线数据
  getBar(code, type, unit, start, end) {
    // end = end ? end : Date.parse(String(new Date()).replace(/-/g, '/'))
    // end = Date.parse(String(new Date()).replace(/-/g, '/'))
    // if (isIncremental) { // 增量查询
    //   start = end - 10000
    // } else { // 查询全部
    //   start = start || (end - 86400000)
    // }
    start = parseInt(start / 1000);
    end = parseInt(end / 1000);
    code = code || 1;
    type = type || '';
    code = String(code);
    let getUrl;
    getUrl =
      swap +
      '/kline?instrumentID=' +
      code +
      '&startTime=' +
      start +
      '&endTime=' +
      end +
      '&resolution=' +
      type +
      '&unit=' +
      unit;
    return swapsAxios.get(getUrl);
  },
  // 退出
  userLogout() {
    // https://devapi.tigermex.com/v1/ifaccount/logout?t=1569379449433
    return swapsAxios.get(ifaccount + '/logout');
  },
  // 获得用户信息(已替换新接口)
  getAssets() {
    // return swapsAxios.get(ifaccount + '/users/me');
    return swapsAxios.get('v1/ifaccount/users/me');
  },
  getContracts(instrumentID) {
    // return swapsAxios.get(swap + '/instruments', {
    return swapsAxios.get(swap + '/instruments', {
      params: {instrumentID},
    });
  },
  // 获取当前委托和历史委托(已替换新接口)
  // 订单状态 1:申报中 2:委托中 4:完成 如果请求参数status=3,标识同时请求申报中和委托中的订单,如果请求参数status=0或者7,标识同时请求所有状态的订单
  getUserOrders(instrumentID, status, offset, size) {
    // return swapsAxios.get(ifcontract + '/userOrders', {
    return swapsAxios.get(swap + '/userOrders', {
      params: {
        instrumentID,
        offset,
        size,
        status,
      },
    });
  },
  // 获取仓位和历史仓位 (已替换新接口)
  //  1:持仓中 2:系统委托中 4:已平仓 如果请求参数中的status值为3,标识同时请求持仓中和系统委托中的仓位 如果请求参数中的status值为0或者7,标识同时请求所有状态的仓位
  getUserPositions(instrumentID, status, offset, size) {
    // return swapsAxios.get(ifcontract + '/userPositions', {
    return swapsAxios.get(swap + '/userPositions', {
      params: {
        // contractID,
        instrumentID,
        offset,
        size,
        status,
      },
    });
  },
  // 提交订单(已替换新接口)
  submitOrder(obj) {
    // return swapsAxios.post(ifcontract + '/submitOrder', obj);
    return swapsAxios.post(swap + '/submitOrder', obj);
  },
  // 取消订单(支持批量取消) (已替换新接口))
  cancelOrders(obj) {
    // return swapsAxios.post(ifcontract + '/cancelOrders', obj);
    return swapsAxios.post(swap + '/cancelOrders', obj);
  },
  // 深度(已替换新接口)
  // depth(obj) {
  //   return swapsAxios.get(ifcontract + '/depth', { params: obj });
  // },
  depth(obj) {
    return swapsAxios.get(swap + '/depth', {
      params: obj,
    });
  },
  // 获取合约的交易记录(已替换新接口)
  trades(instrumentID) {
    // return swapsAxios.get(ifcontract + '/trades', { params: { contractID } });
    return swapsAxios.get(swap + '/trades', {params: {instrumentID}});
  },
  // 获取用户的交易记录(已替换新接口)
  userTrades(instrumentID, offset, size) {
    // return swapsAxios.get(ifcontract + '/userTrades', {
    //   params: { contractID, offset, size }
    // });
    return swapsAxios.get(swap + '/userTrades', {
      params: {instrumentID, offset, size},
    });
  },
  // 获取用户资产(已替换新接口)
  accounts(coinCode) {
    // return swapsAxios.get(ifcontract + '/accounts', { params: { coinCode } });
    return swapsAxios.get(swap + '/accounts', {params: {coinCode}});
  },
  // 获取行情(已替换新接口)
  // getTickers(contractID) {
  //   return swapsAxios.get(ifcontract + '/tickers', { params: { contractID } });
  // },
  getTickers(instrumentID) {
    return swapsAxios.get(swap + '/tickers', {
      params: {instrumentID},
    });
  },
  // 获取用户的爆仓记录(已替换新接口, 接口文档里还可以传个instrumentID)
  userLiqRecords(oid) {
    // return swapsAxios.get(ifcontract + '/userLiqRecords', {
    //   params: { orderID }
    // });
    return swapsAxios.get(swap + '/userLiqRecords', {
      params: {oid},
    });
  },
  // 获取用户一个订单的详细交易记录(已替换新接口)
  orderTrades(instrumentID, oid) {
    // return swapsAxios.get(ifcontract + '/orderTrades', {
    //   params: { contractID, orderID }
    // });
    return swapsAxios.get(swap + '/orderTrades', {
      params: {instrumentID, oid},
    });
  },
  // 获取合约仓位的自动减仓排序表(已替换新接口)
  pnls(instrumentID) {
    // return swapsAxios.get(ifcontract + '/pnls', { params: { contractID } });
    return swapsAxios.get(swap + '/pnls', {params: {instrumentID}});
  },
  // 转账接口 'type':1  1 交易所=>合约  2 合约=>交易所
  transferFunds(coin_code, vol, type) {
    return swapsAxios.post(swap + '/transferFunds', {
      coin_code,
      vol,
      type,
    });
  },
  //  获取指数列表(已替换新接口)
  getIndexList() {
    // return swapsAxios.get(ifcontract + '/indexes');
    return swapsAxios.get(swap + '/indexes');
  },
  // 获取指数k线数据(已替换新接口)
  getIndexBar(code, type, unit, start, end) {
    start = parseInt(start / 1000);
    end = parseInt(end / 1000);
    code = code || 1;
    type = type || '';
    code = String(code);
    let getUrl;
    getUrl =
      // ifcontract +
      // '/indexquote?indexID=' +
      swap +
      '/indexkline?indexID=' +
      code +
      '&startTime=' +
      start +
      '&endTime=' +
      end +
      '&resolution=' +
      type +
      '&unit=' +
      unit;
    return swapsAxios.get(getUrl);
  },
  // 获取合理价格k线数据
  getFpBar(code, type, unit, start, end) {
    start = parseInt(start / 1000);
    end = parseInt(end / 1000);
    code = code || 1;
    type = type || '';
    code = String(code);
    let getUrl;
    getUrl =
      swap +
      '/fpkine?instrumentID=' +
      code +
      '&startTime=' +
      start +
      '&endTime=' +
      end +
      '&resolution=' +
      type +
      '&unit=' +
      unit;
    return swapsAxios.get(getUrl);
  },
  // 给逐仓仓位追加或减少保证金 oper_type 1:追加保证金,2:减少保证金 (已替换新接口)
  marginOper(instrument_id, pid, vol, side) {
    let nonce = parseInt(Date.now() / 1000);
    // return swapsAxios.post(ifcontract + '/marginOper', {
    //   contract_id,
    //   position_id,
    //   vol,
    //   oper_type,
    //   nonce
    // });
    return swapsAxios.post(swap + '/changeMargin', {
      instrument_id,
      pid,
      vol,
      side,
      nonce,
    });
  },
  // 获取资金费率(已替换新接口)
  fundingrate(instrumentID, offset, size = 10) {
    // return swapsAxios.get(ifcontract + '/fundingrate', {
    //   params: { contractID, offset, size }
    // });
    return swapsAxios.get(swap + '/fundingrate', {
      params: {instrumentID, offset, size},
    });
  },
  // 创建合约账号(已替换新接口)
  createContractAccount(instrumentID) {
    // return swapsAxios.get(ifcontract + '/createContractAccount', {
    //   params: { contractID }
    // });
    return swapsAxios.get(swap + '/createAccount', {
      params: {instrumentID},
    });
  },
  // 获取合约的保险金记录
  riskReserves(instrumentID, offset, size = 10) {
    return swapsAxios.get(swap + '/riskReserves', {
      params: {instrumentID, offset, size},
    });
  },
  // 检查合约账户开通奖励是否被领取 action=check 领取合约账户开通奖励 action=receive
  openAccountReward(action, coin_code) {
    return swapsAxios.get(swap + '/activity/openAccountReward', {
      params: {action, coin_code},
    });
  },
  // 检查合约充值奖励是否被领取 action=check 领取合约充值奖励 action=receive
  depositReward(action) {
    return swapsAxios.get(swap + '/activity/depositReward', {
      params: {action},
    });
  },
  // 获取邀请返佣人数
  rebates() {
    return swapsAxios.get(swap + '/rebates');
  },
  // 提交计划委托(已替换新接口)
  submitPlanOrder(info) {
    // return swapsAxios.post(ifcontract + '/submitPlanOrder', info);
    return swapsAxios.post(swap + '/submitPlanOrder', info);
  },
  // 取消计划委托(已替换新接口)
  cancelPlanOrders(info) {
    // return swapsAxios.post(ifcontract + '/cancelPlanOrders', info);
    return swapsAxios.post(swap + '/cancelPlanOrders', info);
  },
  //  获取用户计划委托记录(已替换新接口)
  userPlanOrders(instrumentID, offset, status = 0, size = 10) {
    // return swapsAxios.get(ifcontract + '/userPlanOrders', {
    //   params: { contractID, offset, size, status }
    // });
    return swapsAxios.get(swap + '/userPlanOrders', {
      params: {instrumentID, offset, size, status},
    });
  },
  //  获取用户计划委托记录(已替换新接口) 查询订单详情
  userOrderInfo(instrumentID, oid) {
    // return swapsAxios.get(ifcontract + '/userOrderInfo', {
    //   params: { contractID, orderID }
    // });
    return swapsAxios.get(swap + '/queryOrder', {
      params: {instrumentID, oid},
    });
  },
  // 获取币种详情
  coinBrief(coinCode) {
    return swapsAxios.get('/ifglobal/coinBrief', {params: {coinCode}});
  },
  // -------------------------------- 活动接口 --------------
  // 获取所有团队列表
  teams() {
    return swapsAxios.get(ifactivity + '/teams');
  },
  // 获取团队
  team(team_id) {
    return swapsAxios.get(ifactivity + '/team', {params: {team_id}});
  },
  // 是否可以加入团队
  isTeamUser(team_id) {
    return swapsAxios.get(ifactivity + '/teamUser', {
      params: {team_id, action: 'check'},
    });
  },
  // 加入团队
  addTeamUser(team_id) {
    return swapsAxios.post(
      ifactivity + `/teamUser?team_id=${team_id}&action=add`
    );
  },
  // 获取个人列表
  usersRank(coin_code = 'TUSD', rank_type = 'day') {
    return swapsAxios.get(
      ifactivity + `/usersRank?coin_code=${coin_code}&rank_type=${rank_type}`
    );
  },
  //  获取团队列表
  teamsRank(coin_code = 'TUSD', rank_type = 'day') {
    return swapsAxios.get(
      ifactivity + `/teamsRank?coin_code=${coin_code}&rank_type=${rank_type}`
    );
  },
  // 获取个人关系
  teamUser(rank_type = 'day') {
    return swapsAxios.get(ifactivity + `/teamUser/me?rank_type=${rank_type}`);
  },
  // 个人历史排名
  userHistoryRanks(user_id, rank_type = 'day', coinCode = 'TUSD') {
    return swapsAxios.get(
      ifactivity +
        `/userHistoryRanks?user_id=${user_id}&rank_type=${rank_type}&coin_code=${coinCode}`
    );
  },
  // 团队历史排名
  teamHistoryRanks(team_id, rank_type = 'day', coinCode = 'TUSD') {
    return swapsAxios.get(
      ifactivity +
        `/teamHistoryRanks?team_id=${team_id}&rank_type=${rank_type}&coin_code=${coinCode}`
    );
  },
  // 获取仓位资金费用(1016加) (已替换新接口)
  positionFee(instrument_id, pid) {
    return swapsAxios.get(
      // ifcontract +
      // `/positionFee?contractID=${contract_id}&positionID=${position_id}`
      `${swap}/positionTax?instrumentID=${instrument_id}&pid=${pid}`
    );
  },
  //  签到任务
  signTask(name = 'CheckInTask') {
    return swapsAxios.get(ifactivity + `/task/complete?name=${name}`);
  },
  // 是否完成签到任务
  checkSignTask() {
    return swapsAxios.get(ifactivity + '/task/check?name=CheckInTask');
  },
  /** 检测是否完成赠金里的活动
  // name参数解析
  // DepositTradeTask   首次入金+ 成交两笔任务
  // TradeVolTask   交易金额满2万任务
  // AccountLevelTask   提升手续费级别任务
  */
  checkBonusTask(name) {
    return swapsAxios.get(ifactivity + `/task/check?name=${name}`);
  },
  /** 领取赠金活动里的奖励
  // name参数解析
  // DepositTradeTask   首次入金+ 成交两笔任务
  // TradeVolTask   交易金额满2万任务
  // AccountLevelTask   提升手续费级别任务
  */
  receiveReward(name) {
    return swapsAxios.get(ifactivity + `/task/complete?name=${name}`);
  },
  caculateLiquidation(obj) {
    return swapsAxios.post(swap + '/calculate', obj);
  },
};
export default swapsApi
