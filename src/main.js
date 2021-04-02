import Vue from 'vue'
import VueRouter from 'vue-router';
// import element from './elementUI/index'
import Andt from 'ant-design-vue'
// import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import { router } from './router';
import axios from 'axios';
import './registerServiceWorker'
import { CODE_TAG } from './common/constants';
// import VueAxios from 'vue-axios'

axios.interceptors.response.use(function (response) {
  // 对响应数据做处理
  return new Promise((resolve, reject)=>{
    const { data:res, config,headers } = response;
    console.log(`${config.url}\n返回值:`, res);
    if(res.type === 'application/octet-stream'){
      resolve({res,headers});
    }else if(res.code === CODE_TAG.success){
      resolve(res.data);
    }else {
      reject(res.msg);
    }
  });
}, function (error) {
  // 对响应错误做处理
  return Promise.reject(error);
});

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
