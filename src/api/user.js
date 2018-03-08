import {
    axios,
    config
} from './index'
import store from '../store'

let user = {}
/**
 * 临时token
 * {"code": "0", "msg": "OK", "data": {"auth_id": "1c48ddbc87ef5627c4c20e4cf5eb1b02fe01b7bc"}}
 */
// user.token = () => {
//     return axios('get', 'api/authorization/request_auth_id', {}, false)
// }


/**
 * 检查手机号、密码，执行登, 获取jwt
 * {"code":"1","msg":"success","data":{"account_num":6684672,"nickname":"151","type":4,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1YTYwMGZkYjExMTZiYTJjOWI5ZjgyZmYiLCJhY2NvdW50X251bSI6NjY4NDY3MiwiZXhwIjoxNTIyNDUyNjc5MTM2LCJpYXQiOjE1MTcxOTY2NzkxMzZ9.WkpTlEQTZG-jQnYjXTWb1As_g4MyirL9hM1-76plugM","last_sign_in_at":"2018-01-29T03:28:39.677Z"}}
 *
 */
user.login = (_phone, _pwd) => {
    return axios('post', 'api/channel_user/signin', {
        account: _phone,
        password: _pwd
    })
}

/**
 * 检查手机号、密码，执行登, 获取jwt
 * {"code":"1","msg":"success","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1YTUwNjgyYjE1NDQyNTJiZjhiZTBjOTEiLCJhY2NvdW50X251bSI6MjAzMTYxNiwiZXhwIjoxNTE1MzE2NDIyNTI3LCJpYXQiOjE1MTUzMTI4MjI1Mjd9.KpQTLa3LL_9Gfn5fEtPa71LPN3UWIilJSovE5CjJSA4"}}
 */
user.update_jwt = () => {
    return axios('get', 'api/channel_user/jwt')
}

/**
 * 用户信息获取
 * {"code":"1","msg":"success","data":{"account_num":4128768,"balance":0,"nickname":"页面修改昵称","total_income":0,"today_income":0,"invite_sum":0,"last_sign_in_at":1515745962000,"phone":"18483666768"}}
 */
user.profile = () => {
    return axios('get', `api/channel_user/info`)
}

export default user
