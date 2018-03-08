import Axios from 'axios'

import store from '../store'
import apiUser from './user'
import localUser from '../local/user'
export const config = {
  BASE_URL: 'http://api.pubu.me:7001/'
}

// 响应拦截（配置请求回来的信息）
Axios.interceptors.response.use(
  _response => {
    return _response
  },
  _error => {
    return Promise.reject(_error)
  })
/******************************************************************
 * AJAX获取数据
 * response.body.code 大于0正确，小于0错误
 */
export function axios(_method, _url, _data, _hasToken) {
  console.log('███████████████████████████████████████████████████████████████')
  console.log('_request.url        = ' + _url)
  _hasToken = _hasToken == null ? true : _hasToken
  // if (localUser.jwt()) {
    // 请求拦截（配置发送请求的信息）
    Axios.interceptors.request.use(
      _config => {
        // _config.headers.token = store.state.user.token
        _config.headers.jwt = store.state.user.jwt
        // let _exp = parseInt((store.state.user.exp - Date.parse(new Date())  ) / 1000) // 过期时间倒计时（s）
        // console.log('_jwt.exp            = ' + _exp + ' s')
        // if (_exp > 0 && _exp < 60 * 30 && store.state.user.token) { // 30分钟内过期则更新jwt
        // if (_exp > 0 && _exp < 60 * 20 && localUser.jwt()){ // 20分钟内过期则更新jwt
        //   localUser.jwt(0) // 避免死循环拉取jwt
        //   apiUser.update_jwt().then((_response) => {
        //     store.dispatch('user/setJWT', _response.data.data.token)
        //   })
        // }
        return _config
      },
      _error => {
        return Promise.reject(_error)
      })
  // }
  return Axios.request({
    baseURL: config.BASE_URL,
    method: _method,
    url: _url,
    // data: Qs.stringify(_data),
    data: _data,
    timeout: 30000,
    // withCredentials: true,
    headers: {
      //  'Content-Type': 'application/json',
      // 'X-Requested-With': 'XMLHttpRequest'
    }
  })
}
