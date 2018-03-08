/* eslint-disable */
const state = {
  modal_user_login: false,
  modal_wallet_recharge: false,
  modal_wallet_transfer: false,
}

const getters = {

}

const mutations = {
  modal_user_login(state, _bool) {
    state.modal_user_login = _bool
  },
  modal_wallet_recharge(state, _bool) {
    state.modal_wallet_recharge = _bool
  },
  modal_wallet_transfer(state, _bool) {
    state.modal_wallet_transfer = _bool
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}