import VueRouter from 'vue-router';
import home from './modules/home';
import send from './modules/sendPage';
import receive from './modules/receivePage';
import record from './modules/recordPage';
import { NAV_SEND, NAV_RECEVICE,  NAV_RECORD} from './common/constants';
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
      },
      {
        name: NAV_RECEVICE,
        path: NAV_RECEVICE,
        component: receive
      },
      {
        name: NAV_RECORD,
        path: NAV_RECORD,
        component: record
      },
    ]
  },
  {path: '/', redirect: 'home'}
]

export const router = new VueRouter({
  routes
});
