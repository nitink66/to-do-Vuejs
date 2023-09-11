import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/tailwind.css'
import moment from 'moment'

Vue.config.productionTip = false
Vue.config.devtools = true;


Vue.prototype.moment = moment

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
