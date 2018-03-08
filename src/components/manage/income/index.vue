<template>
  <div id="income">
      <Table :loading="d_loading" border :columns="d_columns" :data="d_data"></Table>
      <br><br>
      <Page
        v-if="d_page.total > 0 "
        :current="d_page.current"
        :total="d_page.total"
        :page-size="d_page.size"
        @on-change="pageSwitch($event)"
        @on-page-size-change="pageSizeSwitch($event)"
        show-total show-sizer></Page>
  </div>
</template>
<script>
/* eslint-disable */
import apiQuery from '../../../api/query'
import { stamp2utc, stamp2local } from '../../../libs/function'
/* eslint-enable */
export default {
  data() {
    return {
      d_loading: true,
      d_data: [],
      d_page: {
        current: 1,
        total: 1,
        size: 40
      },
      d_columns: [
        {
          title: '收益<点券>',
          key: 'income',
          sortable: true
        },
        {
          title: '充值<点券>',
          key: 'amount',
          sortable: true
        },
        {
          title: '充值用户',
          key: 'nickname'
        },
        {
          title: '充值时间',
          key: 'created_at',
          sortable: true,
          render: (h, params) => {
            return stamp2local(params.row.created_at / 1000)
          }
        },
        {
          title: '推广负责人',
          key: 'invitor'
        }
      ]
    }
  },
  methods: {
    _message(_type = 'success', _str = 'success', _destroy = true, _onClose) {
      if (_destroy) this.$Message.destroy()
      this.$Message[_type]({
        content: _str,
        onClose: _onClose
      })
    },
    // 翻页控制
    pageSwitch(_new_page) {
      window.scrollTo(0, 0)
      this.d_page.current = _new_page
      this.getData()
    },
    // 每页显示条数控制
    pageSizeSwitch(_new_size) {
      window.scrollTo(0, 0)
      this.d_page.size = _new_size
      this.getData()
    },
    // 获取充值数据
    getData() {
      this.d_loading = true
      apiQuery.income(this.d_page.current, this.d_page.size).then((_response) => {
        if (_response.data.code === '1') {
          this.d_data = _response.data.data
          this.d_loading = false
        } else if (_response.data.code === '1004') {
          this._message('error', '身份过期，请退出重新登录')
        } else {
          this._message('error', '服务器错误')
        }
      })
    },
  },
  created() {
    this.getData()
  },
}
</script>
