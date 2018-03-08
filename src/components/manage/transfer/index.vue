<template>
    <div class="transfer" @keydown.enter="sureTransfer()">
        <Card class="personal">
            <p slot="title" class="title">
                <span>余额：</span>
                <span v-text="d_surplus + '点券'"></span>
            </p>
            <div>
                <i-form ref="d_form" label-position="right" :label-width="80" :model="d_form" :rules="d_form_check">
                    <Form-item prop="id" label="收账人:">
                        <div class="form_input">
                            <Input v-model="d_form.id" type="text" @on-blur="inputFilter()" :maxlength="16" placeholder="收账人id"></Input>
                        </div>
                    </Form-item>
                    <Form-item prop="money" label="转账金额:">
                        <div class="form_input">
                            <Input v-model="d_form.money" type="text" @on-blur="inputFilter()" :maxlength="11" placeholder="转账金额"></Input>
                        </div>
                    </Form-item>
                    <Form-item prop="pwd" label="当前密码:">
                        <div class="form_input">
                            <Input v-model="d_form.pwd" type="password" :maxlength="16" placeholder="当前密码"></Input>
                        </div>
                    </Form-item>
                    <Form-item>
                        <div class="form_button">
                            <Button type="primary" @click="sureTransfer()">确认结算</Button>
                        </div>
                    </Form-item>
                </i-form>
            </div>
        </Card>
    </div>
</template>

<script>
/* eslint-disable */
import apiUser from "../../../api/user"
import apiQuery from "../../../api/query"
import { trimAll, onlyNum } from '../../../libs/function'

/* eslint-enable */
export default {
    data() {
        return {
            d_surplus: 0,
            d_form: {
                id: "",
                money: "",
                pwd: ""
            },
            d_form_check: {
                id: [
                    {
                        trigger: "change",
                        validator: (rule, value, callback) => {
                            // 禁止空
                            if (!value) {
                                return callback(new Error("转账人不能为空"))
                            }
                            return callback();
                        }
                    }
                ],
                money: [
                    {
                        trigger: "change",
                        validator: (rule, value, callback) => {
                            // 禁止空
                            if (!value) {
                                return callback(new Error("转账金额不能为空"))
                            }
                            return callback();
                        }
                    }
                ],
                pwd: [
                    {
                        trigger: "change",
                        validator: (rule, value, callback) => {
                            // 禁止空
                            if (!value) {
                                // this._message('error', '密码不能为空')
                                return callback(new Error("密码不能为空"))
                            }
                            // 长度必须为4
                            if (value.length < 6) {
                                // this._message('error', '输入6-14字符的密码')
                                return callback(new Error("输入6-14字符的密码"))
                            }
                            return callback()
                        }
                    }
                ]
            }
        }
    },
    methods: {
        inputFilter() {
            this.d_form.id = trimAll(this.d_form.id)
            this.d_form.money = trimAll(this.d_form.money)
            this.d_form.money = onlyNum(this.d_form.money)
            this.d_form.pwd = trimAll(this.d_form.pwd)
        },
        _message(_type = 'success', _str = 'success', _destroy = true, _onClose) {
            if (_destroy) this.$Message.destroy()
            this.$Message[_type]({
                content: _str,
                onClose: _onClose
            })
        },
        sureTransfer() {
            this.$refs.d_form.validate((valid) => {
                if (valid) {
                    apiQuery.transfer(Number(this.d_form.id), Number(this.d_form.money), this.d_form.pwd).then((_response) => {
                        switch (_response.data.code) {
                            case '1':
                                this.d_surplus = _response.data.data.in_account_balance //刷新支出方余额
                                this._message('success', '转账成功')
                                break
                            case '1004':
                                this._message('error', '身份过期，请退出重新登录')
                            case '1015':
                                this._message('error', '余额不足')
                                break
                            case '1006':
                                this._message('error', '收账用户不存在')
                                break
                            case '1000':
                                this._message('error', '用户名或密码错误')
                                break
                            default:
                                this._message('error', '服务器错误')
                        }
                    })
                }
            })
        },
        getData() {
            // 用户信息获取
            apiUser.profile().then((_response) => {
                if (_response.data.code === '1') {
                    this.d_surplus = _response.data.data.balance
                } else if (_response.data.code === '1004') {
                    this._message('error', '身份过期，请退出重新登录')
                } else {
                    this._message('error', '服务器错误')
                }
            })
        }
    },
    created() {
        this.getData()
    }
};
</script>

<style lang="less" scoped>
.personal {
  text-align: left;
  .title {
    margin: 10px 0;
    color: #2d8cf0;
  }
  .form_input {
    display: inline-block;
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .form_button {
    width: 380px;
    text-align: right;
  }
}
</style>