import Vue from 'vue'
import VueRouter from 'vue-router';
// import element from './elementUI/index'
import Andt from 'ant-design-vue'
// import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import { router } from './router';
import axios from 'axios';
// import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
// Vue.use(element);
Vue.use(VueRouter);
Vue.use(Andt);
// Vue.use(VueAxios, axios);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
