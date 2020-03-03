export default {
  // 获取合约信息
  getContract(productInfo) {
    return {contractSize: Number(productInfo.face_value), quoteCoin: productInfo.quote_coin, priceCoin: productInfo.is_reverse ? productInfo.quote_coin : productInfo.base_coin}
  },
  // 获取合约系数
  getRiskLimit(risk_limit) {
    return {BaseLimit: Number(risk_limit.risk_limit_base), Step: Number(risk_limit.risk_limit_step), InitialMargin: Number(risk_limit.imr), MaintenanceMargin: Number(risk_limit.mmr)}
  }
}
