<template>
    <div class="home-main">
        <Row :gutter="10">
            <i-col :md="24" :lg="20">
                <Row type="flex" align="bottom" style="text-align: left">
                    <i-col :xs="24" :sm="24" :lg="6">
                        <p class="username info" v-text="d_name"></p>
                    </i-col>
                    <i-col :xs="24" :sm="24" :lg="6">
                        <p class="info" v-text="'账号：' + d_id"></p>
                    </i-col>
                    <i-col :xs="24" :sm="24" :lg="12">
                        <p class="info" v-text="'上次登录时间：' + d_old_time"></p>
                    </i-col>
                </Row>
            </i-col>
        </Row>
        <Row type="flex" align="middle">
            <i-col :xs="24" :sm="24" :md="8" :style="{margin: '50px 0'}">
                <infor-card id-name="user_created_count" :end-val="count.createUser" iconType="ios-personadd" color="#2d8cf0" intro-text="注册人数"></infor-card>
            </i-col>
        </Row>
        <Row>
            <i-col :xs="24" :sm="24" :md="8" :style="{margin: '50px 100px 50px 0'}">
                <infor-card id-name="collection_count" :end-val="count.day_income" iconType="ios-time-outline" color="#8bc34a" intro-text="今日收益"></infor-card>
            </i-col>
            <i-col :xs="24" :sm="24" :md="8" :style="{margin: '50px 0'}">
                <infor-card id-name="visit_count" :end-val="count.all_income" iconType="ios-calendar-outline" color="#ff6709" intro-text="总收益"></infor-card>
            </i-col>
        </Row>
    </div>
</template>

<script>
/* eslint-disable */
import inforCard from './inforCard.vue'
import apiQuery from '../../../api/query'
import { stamp2local } from '../../../libs/function' //时间戳处理
/* eslint-enable */
export default {
    components: {
        inforCard
    },
    data() {
        return {
            d_id: '',
            d_name: '',
            d_old_time: '',
            count: {
                createUser: 0,
                day_income: 0,
                all_income: 0
            },
        };
    },
    created() {
        this.getData()

    },
    methods: {
        _message(_type = 'success', _str = 'success', _destroy = true, _onClose) {
            if (_destroy) this.$Message.destroy()
            this.$Message[_type]({
                content: _str,
                onClose: _onClose
            })
        },
        getData() {
            apiQuery.total().then((_respose) => {
                if (_respose.data.code === '1') {
                    this.d_id = _respose.data.data.account_num
                    this.d_name = _respose.data.data.nickname
                    this.d_old_time = stamp2local(_respose.data.data.last_sign_in_at / 1000)
                    this.count.createUser = _respose.data.data.invite_sum
                    this.count.day_income = _respose.data.data.today_income
                    this.count.all_income = _respose.data.data.total_income
                } else if (_respose.data.code === '1004') {
                    this._message('error', '身份过期，请退出重新登录')
                } else {
                    this._message('error', '服务器错误')
                }

            })
        }
    }
};
</script>
<style lang="scss" scoped>
.info {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.username {
  font-size: 2em;
  color: #2d8cf0;
  font-weight: bold;
}
</style>

