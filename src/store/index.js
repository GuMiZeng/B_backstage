import Vuex from 'vuex'
// import logger from 'vuex/dist/logger'

import modules from './modules'

const debug = process.env.NODE_ENV !== 'production'

// if (debug) {
//   console.log(modules)
// }


export default new Vuex.Store({
  modules,
  strict: debug, // 严格模式
  // plugins: debug ? [logger()] : []
})
