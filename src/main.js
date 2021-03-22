import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import echarts from 'echarts'
import XLSX from 'xlsx'

import 'element-ui/lib/theme-chalk/index.css';
import "./assets/styles/base.scss"
import "./assets/styles/mixin.scss"
import "@/assets/styles/normalize.css"
import "@/assets/iconfont/iconfont.css"

Vue.use(ElementUI);
Vue.use(XLSX)
// Vue.use(myCharts)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
