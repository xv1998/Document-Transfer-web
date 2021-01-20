import Vue from 'vue'
import VueRouter from 'vue-router';
import element from './elementUI/index'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import { router } from './router';
import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(element);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
