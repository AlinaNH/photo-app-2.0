import { createRouter, createWebHistory } from 'vue-router';
import UploadForm from './components/UploadForm';
import EditingForm from './components/EditingForm';

const routes = [
  {
    path: '/',
    name: 'UploadForm',
    component: UploadForm
  },
  {
    path: '/editing',
    name: 'EditingForm',
    component: EditingForm
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;