import Vue from 'vue'
import VueRouter from 'vue-router';
import element from './elementUI/index'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import { router } from './router';

Vue.config.productionTip = false
Vue.use(element);
Vue.use(VueRouter);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
