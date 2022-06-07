import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index.js';
import store from './store/index.js';
import Axios from 'axios';
import './rules/rules';



const app = createApp(App)

app.config.globalProperties.$http = Axios;
app.use(router);
app.use(store);


app.mount('#app')
