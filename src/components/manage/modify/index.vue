<style lang="less" scoped>
@import "./personal_form.less";
</style>

<template>
  <div class="modify" @keydown.enter="saveinfo()">
    <Card class="personal">
      <p class="title">
        <Icon type="person"></Icon>
        <span v-text="'个人信息'"></span>
      </p>
      <div>
        <i-form ref="d_form" :model="d_form" label-position="right" :label-width="80" :rules="d_form_check">
          <Form-item prop="phone" label="手机号:">
            <div class="form_input">
              <!-- <Input disabled ref="d_form.phone" v-model="d_form.phone" type="text" :maxlength="11" placeholder="手机号"> -->
              <span v-text="d_form.phone"></span>
              <!-- </Input> -->
            </div>
          </Form-item>
          <Form-item prop="name" label="昵称:">
            <div class="form_input">
              <Input v-model="d_form.name" type="text" @on-blur="inputFilter()" :maxlength="14" placeholder="昵称">
              </Input>
            </div>
          </Form-item>
          <div class="form_button">
            <Button type="primary" :loading="savePassLoading" @click="saveinfo()" v-text="'保存'"></Button>
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
        name: "",
        phone: ""
      },
      d_form_check: {
        // phone: [
        //   {
        //     trigger: "change",
        //     validator: (rule, value, callback) => {
        //       // 禁止空
        //       if (!value) {
        //         return callback(new Error("手机号不能为空"));
        //       }
        //       // 检查格式
        //       if (!/^1[34578]{1}\d{9}$/.test(value)) {
        //         return callback(new Error("输入正确手机号码"));
        //       }
        //       return callback();
        //     }
        //   }
        // ],
        name: [
          {
            trigger: "change",
            validator: (rule, value, callback) => {
              // 禁止空
              if (!value) {
                return callback(new Error("昵称不能为空"))
              }
              return callback();
            }
          }
        ]
      },
      savePassLoading: false
    }
  },
  methods: {
    inputFilter() {
      this.d_form.name = trimAll(this.d_form.name)
    },
    _message(_type = 'success', _str = 'success', _destroy = true, _onClose) {
      if (_destroy) this.$Message.destroy()
      this.$Message[_type]({
        content: _str,
        onClose: _onClose
      })
    },
    saveinfo() {
      this.$refs.d_form.validate((valid) => {
        if (valid) {
          this.savePassLoading = true
          apiQuery
            .modify(this.d_form.name).then((_response) => {
              if (_response.data.code === '1') {
                this._message('success', '修改成功')
                this.savePassLoading = false
                // 清空表单
                this.$refs.d_form.resetFields()
              }
            })
        }
      })
    },
    getData() {
      apiUser.profile().then((_response) => {
        if (_response.data.code === '1') {
          // this.d_form.name = _response.data.data.nick_name
          this.d_form.phone = _response.data.data.phone
        } else if (_response.data.code === '1004') {
          this._message('error', '身份过期，请退出重新登录')
        } else {
          this.$Message.error('服务器错误')
        }
      })
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="less">
.personal {
  text-align: left;
  .title {
    margin: 10px 0;
    color: #2d8cf0;
  }
  .form_input {
    display: inline-block;
    width: 300px;
  }
  .form_button {
    width: 380px;
    text-align: right;
  }
}
</style>