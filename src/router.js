import VueRouter from 'vue-router';
import home from './pages/index'
// import home from './modules/home';
import upload from './components/FileUpload'
import download from './components/FileDownload'
// import send from './modules/sendPage';
// import receive from './modules/receivePage';
import record from './modules/recordPage';
import { NAV_UPLOAD, NAV_DOWNLOAD,  NAV_RECORD} from './common/constants';
// const sendPage = () =>
//   import(/* webpackChunkName: "sendPage" */ './modules/sendPage');
const routes = [
  {
    path: '/home',
    component: home,
    children: [
      { path: '/', redirect: NAV_UPLOAD },
      {
        name: NAV_UPLOAD,
        path: NAV_UPLOAD,
        component: upload
      },
      {
        name: NAV_DOWNLOAD,
        path: NAV_DOWNLOAD,
        component: download
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
