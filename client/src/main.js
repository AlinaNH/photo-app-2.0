import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from 'vuestic-ui'
import router from './router'
import 'vuestic-ui/dist/vuestic-ui.css'

createApp(App)
  .use(router)
  .use(VuesticPlugin)
  .mount('#app')