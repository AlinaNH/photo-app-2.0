
import { createApp } from 'vue';
import App from './App.vue';
import { VuesticPlugin } from 'vuestic-ui';
import Toaster from '@meforma/vue-toaster';
import router from './router';
import 'vuestic-ui/dist/vuestic-ui.css';

createApp(App)
  .use(router)
  .use(VuesticPlugin)
  .use(Toaster)
  .mount('#app');
