// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import global from './assets/Global'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VideoPlayer from 'vue-video-player'
// axios.defaults.baseURL = 'http://81.68.199.189:9091/'

import jquery from 'jquery'

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

var axios = require('axios')

axios.defaults.baseURL = 'http://120.76.73.122:9092/'
Vue.prototype.$ = jquery

// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.Global = global

Vue.use(ViewUI)
Vue.use(VideoPlayer)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
