import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from "./auth/store";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Import the Auth0 configuration and plugin
//import { domain, clientId } from "../auth_config.json";
//import { Auth0Plugin } from '@/auth/auth0-plugin';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import Vuelidate from 'vuelidate';
import VueMask from 'v-mask'
console.log(store.state)
const base = axios.create({
  baseURL: "http://localhost:3000/api"
});

Vue.use(VueMask);
Vue.component('vue-phone-number-input', VuePhoneNumberInput);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.prototype.$http = base;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
