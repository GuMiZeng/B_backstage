<template>
    <div class="admin_panel">
        <div class="header">
            <i-menu mode="horizontal" @on-select="contentSwitch($event)">
                <Menu-item name="1" key="help" style="margin-left: 20px;">
                    <Tooltip content="游 你，游 我，我 游 我 精 彩！" placement="right">
                        <Icon type="coffee" style="font-size: 24px;"></Icon>
                        <span>&nbsp;瀑&nbsp;布&nbsp;竞&nbsp;技</span>
                    </Tooltip>
                </Menu-item>
                <span class="nav">
                    <Submenu name="my">
                        <template slot="title">
                            <Icon type="ios-person"></Icon>
                            <span>我的</span>
                        </template>
                        <Menu-item name="/manage/modify">
                            <span>修改资料</span>
                        </Menu-item>
                        <Menu-item name="/manage/modifyPwd">
                            <span>修改密码</span>
                        </Menu-item>
                        <Menu-item name="/login">
                            <span @click="logout()">退出登录</span>
                        </Menu-item>
                    </Submenu>
                </span>
            </i-menu>
        </div>
        <div class="content">
            <Row type="flex">
                <i-ol class-name="left" span="4">
                    <i-menu @on-select="contentSwitch($event)" :active-name="$route.path" width="auto">
                        <Menu-item name="/manage/begin">首页</Menu-item>
                        <Menu-item name="/manage/income">收益</Menu-item>
                        <Menu-item name="/manage/extend">推广</Menu-item>
                        <Menu-item name="/manage/transfer">结算</Menu-item>
                        <Menu-item name="/manage/balance_log">结算记录</Menu-item>
                    </i-menu>
                </i-ol>
                <i-col class-name="right" span="20">
                    <router-view></router-view>
                </i-col>
            </Row>
        </div>
        <div class="footer">
            ©2017 PUBU.ME
        </div>
    </div>
</template>
<script>
'use strict'
import store from '../../store'
export default {
    computed: {
        c_jwt: {
            get() {
                return this.$store.state.user.jwt
            },
            set(newVal) {
                this.$store.dispatch('user/setJWT', newVal)
            }
        }
    },
    methods: {
        contentSwitch(_page) {
            this.$router.push({ path: _page })
        },
        logout() {
            this.c_jwt = 0
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
.admin_panel {
  background: #eee;
  min-height: 100vh;
}

.header {
  .nav {
    position: absolute;
    right: 20px;
    height: inherit;
  }
}

.content {
  width: 90%;
  margin: 30px auto;
  overflow: hidden;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
}

.footer {
  text-align: center;
  padding-bottom: 20px;
  color: #999;
}

.left {
  padding: 15px 0;
}

.right {
  padding: 50px 30px 150px;
  .breadcrumb {
    margin-bottom: 20px;
  }
  &:after {
    content: "";
    display: block;
    width: 1px;
    background: #d7dde4;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1px;
  }
}
</style>