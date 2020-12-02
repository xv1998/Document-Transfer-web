import VueRouter from 'vue-router';
import home from './modules/home';
import send from './modules/sendPage';
import { NAV_SEND } from './common/constants';
// const sendPage = () =>
//   import(/* webpackChunkName: "sendPage" */ './modules/sendPage');
const routes = [
  {
    path: '/home',
    component: home,
    children: [
      { path: '/', redirect: NAV_SEND },
      {
        name: NAV_SEND,
        path: NAV_SEND,
        component: send
      }
    ]
  },
  {path: '/', redirect: 'home'}
]

export const router = new VueRouter({
  routes
});
