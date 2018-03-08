import {
    axios,
    config
} from './index'
import store from '../store'

let query = {}
/**
 * 数据统计
 * {"code":"1","msg":"success","data":{"account_num":4128768,"balance":0,"nickname":"昵称","total_income":0,"today_income":0,"invite_sum":0,"last_sign_in_at":1515745962000,"phone":"18483666768"}}
 */
query.total = () => {
    return axios('get', `api/channel_user/info`)
}
/**
 * 收益统计
 * {"code":"1","msg":"success","data":[]}
 */
query.income = (_current, _size) => {
    return axios('get', `api/channel_user/income_log/${_current}/${_size}`)
}
/**
 * 推广统计
 * {"code":"1","msg":"success","data":[]}
 */
query.extend = (_current, _size) => {
    return axios('get', `api/channel_user/extension_agent/${_current}/${_size}`)
}
/**
 * 添加推广员
 */
query.extend_add = (_name, _phone, _address, _type) => {
    return axios('post', 'api/channel_user/signup', {
        //推广
        f_uid: String(store.state.user.uid),
        nickname: _name,
        phone: _phone,
        addr: _address,
        type: _type
    })
}

/**
 * 编辑推广员
 *  obj = {account_num: '', remark_name: '', remark_phone: '', remark_addr: ''}
 */
query.extend_modify = (_obj) => {
    delete _obj.created_at
    return axios('patch', `api/extension_user/info`, _obj)
}

/**
 * 删除推广员
 */
query.extend_detele = (_id) => {
    return axios('patch', `api/extension_user/info`, {
        account_num: _id,
        data_status: 0
    })
}
/**
 * 修改资料
 */
query.modify = (_name) => {
    return axios('patch', `api/channel_user/info`, {
        // 修改
        nickname: _name
    })
}
query.modifyPwd = (_old_pwd, _new_pwd) => {
    return axios('patch', `api/channel_user/info`, {
        // 修改
        old_password: _old_pwd,
        new_password: _new_pwd
    })
}
/**
 * 转账
 */
query.transfer = (_id, _money, _pwd) => {
    return axios('post', 'api/channel_user/check_out_log', {
        // 转账
        transfer_amount: _money,
        in_account_num: store.state.user.uid,
        out_account_num: _id,
        password: _pwd
    })
}
/**
 * 结算记录
 */
query.balance = (_current, _size) => {
    return axios('get', `api/channel_user/check_out_log/${_current}/${_size}`)
}
export default query
