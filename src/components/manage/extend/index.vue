<style lang="less">
@import "./components/table.less";
.add {
  padding: 10px 0;
  text-align: left;
}
</style>
<template>
  <div>
    <Row class="margin-top-10">
      <i-col class="add">
        <i-button type="primary" size="large" icon="plus" @click="addExtendModal = !addExtendModal">添加推广员</i-button>
      </i-col>
      <Card>
        <div>
          <can-edit-table :loading="d_loading" refs="table2" v-model="d_data" :columns-list="d_columns" @on-cell-change="handleCellChange" @on-change="extendModify" @on-delete="extendDetele"></can-edit-table>
          <br><br>
          <Page v-if="d_page.total > 0" :current="d_page.current" :total="d_page.total" :page-size="d_page.size" @on-change="pageSwitch" @on-page-size-change="pageSizeSwitch" show-total  show-sizer></Page>
        </div>
      </Card>
      </i-col>
    </Row>
    <Modal v-model="addExtendModal" :closable='false' :mask-closable="false" :width="500">
      <h3 slot="header" style="color:#2D8CF0">渠道信息</h3>
      <i-form ref="d_form" :model="d_form" :label-width="80" label-position="right" :rules="d_form_check">
        <Form-item label="类型" prop="type">
          <i-select v-model="d_form.type">
            <i-option v-for="item in $store.state.user.typeList" :value="item.value" :key="item.value" v-show="item.value < $store.state.user.type" v-text="item.label"></i-option>
          </i-select>
        </Form-item>
        <Form-item label="姓名" prop="name">
          <Input v-model="d_form.name" placeholder="姓名" @on-blur="inputFilter()" :maxlength="16"></Input>
        </Form-item>
        <Form-item label="电话" prop="phone">
          <Input v-model="d_form.phone" placeholder="手机号码" @on-blur="inputFilter()" :maxlength="11"></Input>
        </Form-item>
        <Form-item label="地址" prop="address">
          <Input v-model="d_form.address" placeholder="联系地址" @on-blur="inputFilter()" @on-enter="extend_add()"></Input>
        </Form-item>
      </i-form>
      <div slot="footer">
        <Button type="text" @click="addExtendModal = false">取消</Button>
        <Button type="primary" @click="extend_add()">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
/* eslint-disable */
import localUser from '../../../local/user'
import canEditTable from "./components/canEditTable.vue"
import apiQuery from "../../../api/query"
import { stamp2local, trimAll } from '../../../libs/function' //时间戳处理
/* eslint-disable */
export default {
  components: {
    canEditTable
  },
  data() {
    return {
      d_form: {
        type: null,
        name: '',
        phone: "",
        address: ""
      },
      d_loading: false,
      d_page: {
        current: 1,
        total: 1,
        size: 40
      },
      d_data: [],
      d_columns: [
        {
          title: "推广ID",
          key: "account_num"
        },
        {
          title: '渠道类型',
          key: 'type'
        },
        {
          title: "推广姓名",
          key: "remark_name",
          sortable: true,
          editable: true
        },
        {
          title: "联系电话",
          key: "remark_phone",
          editable: true
        },
        {
          title: "地址",
          key: "remark_addr",
          editable: true
        },
        {
          title: "加入时间",
          key: "created_at",
          sortable: true,
          render: (h, params) => {
            return stamp2local(params.row.created_at / 1000)
          }
        },
        {
          title: "操作",
          align: "center",
          width: 190,
          key: "handle",
          handle: ["edit", "delete"]
        }
      ],
      addExtendModal: false, // 添加推广员模态框
      d_form_check: {
        name: [
          {
            trigger: "change",
            validator: (rule, value, callback) => {
              // 禁止空
              if (!value) {
                return callback(new Error("姓名不能为空"))
              }
              return callback();
            }
          }
        ],
        phone: [
          {
            trigger: "change",
            validator: (rule, value, callback) => {
              // 禁止空
              if (!value) {
                return callback(new Error("手机号不能为空"))
              }
              // 检查格式
              if (!/^1[34578]{1}\d{9}$/.test(value)) {
                return callback(new Error("输入正确手机号码"))
              }
              return callback()
            }
          }
        ],
        address: [
          {
            trigger: "change",
            validator: (rule, value, callback) => {
              // 禁止空
              if (!value) {
                return callback(new Error("联系地址不能为空"))
              }
              return callback()
            }
          }
        ]
      }
    }
  },
  methods: {
    inputFilter(value) {
      this.d_form.name = trimAll(this.d_form.name)
      this.d_form.phone = trimAll(this.d_form.phone)
      this.d_form.address = trimAll(this.d_form.address)
    },
    _message(_type = 'success', _str = 'success', _destroy = true, _onClose) {
      if (_destroy) this.$Message.destroy()
      this.$Message[_type]({
        content: _str,
        onClose: _onClose
      })
    },
    // 编辑资料
    extendModify(data, index) {
      apiQuery.extend_modify(data[index]).then((_response) => {
        // 更新表格
        this._message('success', '保存成功')
        this.getData()
        this.d_loading = false
      });
    },
    // 删除推广员
    extendDetele(data, index) {
      apiQuery.extend_detele(data[index].account_num).then((_response) => {
        // 更新表格
        this._message('success', '删除成功')
        this.getData()
        this.d_loading = false
      })
    },
    // 翻页控制
    pageSwitch(_new_page) {
      window.scrollTo(0, 0);
      this.d_page.current = _new_page;
      this.getData()
    },
    // 每页显示条数控制
    pageSizeSwitch(_new_size) {
      window.scrollTo(0, 0);
      this.d_page.size = _new_size;
      this.getData()
    },
    getData() {
      this.d_loading = true
      apiQuery.extend(this.d_page.current, this.d_page.size).then((_response) => {
        if (_response.data.code === '1') {
          this.d_data = _response.data.data
          this.d_loading = false
        } else if (_respose.data.code === '1004') {
          this._message('error', '身份过期，请退出重新登录')
        } else {
          this._message('error', '服务器错误')
        }
      })
    },
    // 添加推广员
    extend_add() {
      this.$refs.d_form.validate((valid) => {
        if (valid) {
          apiQuery.extend_add(this.d_form.name, this.d_form.phone, this.d_form.address, this.d_form.type).then((_response) => {
            if (_response.data.code === '1') {
              // 完成 提示成功 关闭模态框
              this._message('success', '添加成功！！！')
              this.addExtendModal = false
              // 更新表格
              this.getData()
              // 清空表单
              this.$refs.d_form.resetFields()
            } else if (_response.data.code === '1003') {
              this._message('error', '用户已存在')
            } else {
              this._message('error', '服务器错误')
            }
          })
        }
      })
    }
  },
  created() {
    this.getData()
    if(!this.$store.state.user.type){ // 从本地取出
      this.$store.state.user.type = localUser.type()
    }
  }
}
</script>
