import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './element-ui'
import '@/style/base.less'
import '@/components/register-global'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  mounted() {
  },
}).$mount('#app')
