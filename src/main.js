// imports used to create the project
import { createApp } from 'vue'
import App from './App.vue'

// imports tailwind directives inside the index.css file
import './index.css'

// imports router from separate file - vueRouter is used to define routes in the SPA
import router from './router/index.js';

// imports store from separate file - VueX is used for global state management in the application
import store from './store/index.js';

// imports axios to perform get requests to the CoinGecko API
import Axios from 'axios';

// imports rules from separate file - Vee-validate serves to make form validations
// The current project allows, but does not currently use any validations
import './rules/rules';



const app = createApp(App)

//defines Axios as a default property for the project
//this allows for us to call axios globally in any component by calling:
// this.$http.get  or this.$http.post and so on.
app.config.globalProperties.$http = Axios;

app.use(router);
app.use(store);


app.mount('#app')
