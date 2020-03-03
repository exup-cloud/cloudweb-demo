export const state = () => ({
  teamList: null,
  userList: null,
  teamUser: null,
  myInfo: {
    user_id: 0,
    nick_name: '--',
    name: '--',
    rank: 0,
    total: '--'
  },
  otherInfo: {
    img_url: ''
  },
  myTeam: {
    name: '--'
  },
  historyList: null
})
export const mutations = {
  SET_ACTIVE(state, payload) {
    for (let item in payload) {
      state[item] = payload[item]
    }
  }
}
