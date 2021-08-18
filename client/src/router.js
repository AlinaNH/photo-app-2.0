import { createRouter, createWebHistory } from 'vue-router';
import UploadForm from './components/UploadForm';
import EditingForm from './components/EditingForm';
import Entry from './components/Entry';
import LogOut from './components/LogOut';
import MainPage from './components/MainPage';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadForm
  },
  {
    path: '/editing',
    name: 'EditingForm',
    component: EditingForm
  },
  {
    path: '/auth/:type',
    name: 'Entry',
    component: Entry
  },
  {
    path: '/logout',
    name: 'LogOut',
    component: LogOut
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;