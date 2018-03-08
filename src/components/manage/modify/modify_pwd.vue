<style lang="less" scoped>
@import "./personal_form.less";
</style>
<template>
  <div class="modify_pwd" @keydown.enter="saveinfo()">
    <Card class="personal">
      <p class="title">
        <Icon type="person"></Icon>
        <span v-text="'个人信息'"></span>
      </p>
      <div>
        <i-form ref="d_form" :model="d_form" label-position="right" :label-width="80" :rules="d_form_check">
          <Form-item prop="pwd" label="当前密码:">
            <div class="form_input">
              <Input ref="d_form.pwd" v-model="d_form.pwd" @on-blur="inputFilter()" type="password" :maxlength="16" placeholder="当前密码">
              </Input>
            </div>
          </Form-item>
          <Form-item prop="new_pwd" label="新密码:">
            <div class="form_input">
              <Input ref="d_form.new_pwd" v-model="d_form.new_pwd" @on-blur="inputFilter()" type="password" :maxlength="16" placeholder="新密码">
              </Input>
            </div>
          </Form-item>
          <Form-item prop="sure_pwd" label="确认密码:">
            <div class="form_input">
              <Input ref="d_form.sure_pwd" v-model="d_form.sure_pwd" @on-blur="inputFilter()" type="password" :maxlength="16" placeholder="确认密码">
              </Input>
            </div>
          </Form-item>
          <div class="form_button">
            <Button type="primary" :loading="savePassLoading" @click="saveinfo" v-text="'保存'"></Button>
          </div>
        </i-form>
      </div>
    </Card>
  </div>
</template>

<script>
/* eslint-disable */
import apiUser from "../../../api/user"
import apiQuery from '../../../api/query'
import { trimAll } from '../../../libs/function'
/* eslint-enable */
export default {
  data() {
    return {
      d_form: {
        pwd: "",
        new_pwd: "",
        sure_pwd: ""
      },
      d_form_check: {
        pwd: [
          {
            trigger: "change",
            validator: (rule, value, callback) => {
              // 禁止空
              if (!value) {
                return callback(new Error("密码不能为空"));
              }
              // 长度必须为4
              if (value.length < 6) {
                return callback(new Error("输入6-14字符的密码"));
              }
              return callback()
            }
          }
        ],
        new_pwd: [
          {
            trigger: "change",
            validator: (rule, value, callback) => {
              // 禁止空
              if (!value) {
                return callback(new Error("密码不能为空"))
              }
              // 长度必须为4
              if (value.length < 6) {
                return callback(new Error("输入6-14字符的密码"))
              }
              return callback()
            }
          }
        ],
        sure_pwd: [
          {
            trigger: "change",
            validator: (rule, value, callback) => {
              // 禁止空
              if (!value) {
                return callback(new Error("密码不能为空"))
              }
              // 相同密码
              if (value !== this.d_form.new_pwd) {
                return callback(new Error("两次密码不相同"))
              }
              return callback()
            }
          }
        ]
      },
      savePassLoading: false
    }
  },
  methods: {
    inputFilter(value) {
      this.d_form.pwd = trimAll(this.d_form.pwd)
      this.d_form.new_pwd = trimAll(this.d_form.new_pwd)
      this.d_form.sure_pwd = trimAll(this.d_form.sure_pwd)
    },
    _message(_type = 'success', _str = 'success', _destroy = true, _onClose) {
      if (_destroy) this.$Message.destroy()
      this.$Message[_type]({
        content: _str,
        onClose: _onClose
      })
    },
    saveinfo(name) {
      this.$refs.d_form.validate((valid) => {
        if (valid) {
          this.savePassLoading = true
          apiQuery
            .modifyPwd(this.d_form.pwd, this.d_form.new_pwd).then((_response) => {
              this.savePassLoading = false
              if (_response.data.code === '1') {
                this._message('success', '修改成功')
                // 清空表单
                this.$refs.d_form.resetFields()
                this.$router.push('/login')
              } else if (_response.data.code === '1013') {
                this._message('error', '密码错误')
              } else if (_response.data.code === '1004') {
                this._message('error', '身份过期，请退出重新登录')
              } else {
                this._message('error', '服务器错误')
              }
            })
        }
      })
    }
  },
  created() {
  }
}
</script>
<style lang="less">

</style>