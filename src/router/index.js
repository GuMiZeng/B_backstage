import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import apiUser from '../api/user'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: (resolve) => require(['@/components/login'], resolve)
  },
  {
    path: '/login',
    component: (resolve) => require(['@/components/login'], resolve)
  },
  {
    path: '/manage',
    component: (resolve) => require(['@/components/manage'], resolve),
    redirect: '/manage/begin',
    children: [
      {
        path: '/manage/begin',
        component: (resolve) => require(['@/components/manage/begin'], resolve)
      },
      {
        path: '/manage/income',
        component: (resolve) => require(['@/components/manage/income'], resolve)
      },
      {
        path: '/manage/extend',
        component: (resolve) => require(['@/components/manage/extend'], resolve)
      },
      {
        path: '/manage/modify',
        component: (resolve) => require(['@/components/manage/modify'], resolve)
      },
      {
        path: '/manage/modifyPwd',
        component: (resolve) => require(['@/components/manage/modify/modify_pwd'], resolve)
      },
      {
        path: '/manage/transfer',
        component: (resolve) => require(['@/components/manage/transfer'], resolve)
      },
      {
        path: '/manage/balance_log',
        component: (resolve) => require(['@/components/manage/transfer/balance_log'], resolve)
      }
    ]
  }
]
// 滚动行为
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return {
      y: 0
    }
  }
}

const router = new Router({
  routes,
  scrollBehavior,
  linkActiveClass: 'active'
})

// 钩子
router.beforeEach((to, from, next) => {
  console.log('❤')
  // if (!store.state.user.jwt) router.push({path: '/login'})
  // iView.LoadingBar.start()
  // window.document.title = to.meta.title
  // if (store.getters.getRoutesBtn) {
  //   store.dispatch('routesBtnReset', false)
  // } else {
  //   store.dispatch('routesRecord', to)
  // }
  // 初始化 token
  // store.dispatch('user/initToken')
  // 初始化 jwt
  store.dispatch('user/initJWT')
  // 未登录 默认跳转
  if (!store.state.user.jwt && to.path !== '/login') {
    router.push('/login')
  }
  next()
  // 禁止
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
  });
})

router.afterEach((to, from, next) => {
  // iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
