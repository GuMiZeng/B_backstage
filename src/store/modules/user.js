/* eslint-disable */
import apiUser from '../../api/user'
import localUser from '../../local/user'
import base64 from 'base64-url'

const state = {
  exp: 0,
  uid: 0,
  jwt: 0,
  type: null,
  typeList: [
    {
      value: 4,
      label: ' 代理'
    },
    {
      value: 3,
      label: '渠道'
    },
    {
      value: 2,
      label: '网吧'
    },
    {
      value: 1,
      label: '推广员'
    }
  ]
}

const getters = {

}

const mutations = {
  typeList(state, _str) {
    state.type = _str
  },
  type(state, _str) {
    state.type = _str
  },
  token(state, _str) {
    state.token = _str
  },
  jwt(state, _str) {
    if (_str) { // 退出登录需要设置jwt为零
      let _arr = _str.split('.')
      let _obj = JSON.parse(base64.decode(_arr[1]))
      state.exp = _obj.exp
      state.uid = _obj.account_num // 用户ID
    }
    state.jwt = _str
  },
  profile(state, _str) {
    state.profile = _str
  }
}

const actions = {
  /**
   * 初始化 token
   * @param {*} param0
   * @param {*} _str
   */
  initToken({
    commit
  }) {
    if (!state.token) {
      apiUser.token().then((_response) => {
        commit('token', _response.data.data.auth_id)
      })
    }
  },

  /**
   * 初始化 jwt
   * @param {*} param0
   * @param {*} _str
   */
  initJWT({
    commit
  }) {
    let loc_jwt = localUser.jwt()
    if (loc_jwt) commit('jwt', loc_jwt) // ls转vuex
  },

  /**
   * 设置 jwt
   * @param {*} param0
   * @param {*} _str
   */
  setJWT({
    commit
  }, _str) {
    commit('jwt', _str) // 设定jwt
    localUser.jwt(_str)
  },
  setTYPE({
    commit
  }, _str) {
    commit('type', _str) // 设定type
    localUser.type(_str)
  },
  /**
   * 更新 user_info
   * @param {*} param
   * @param {*} _obj
   */
  updateProfile({
    state,
    commit
  }) {
    if (!state.jwt) {
      apiUser.profile().then((_response) => { // 从服务器拉取数据
        commit('profile', _response.data.data)
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}