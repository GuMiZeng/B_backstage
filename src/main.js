import Vue from 'vue'
import App from './App'
import Axios from 'axios'

import router from './router'

import store from './store'


Vue.config.productionTip = false
Vue.config.debug = true // 开启debug模式

/* eslint-disable no-new */
let iview_app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// iview 全局配置
iview_app.$Notice.config({
  top: 90,
  duration: 3
})

iview_app.$Message.config({
  duration: 3
})

// 响应拦截（配置请求回来的信息）
Axios.interceptors.response.use(
  _response => {
    console.log('_response.data.code = ' + _response.data.code)
    console.log('_response.data.msg  = ' + _response.data.msg)
    console.log(_response.data)
    // 如果jwt无效 跳转登录界面
    if (_response.data.code == -10000) router.push({ path: '/login' })
    return _response
  },
  _error => {
    console.log(_error)
    iview_app.$Message.destroy()
    iview_app.$Message.error({
      content: 'Server Error',
      duration: 3
    })
    return Promise.reject(_error)
  })