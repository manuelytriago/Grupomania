import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import store from "./auth/store";
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
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
Vue.use(Vuelidate)
Vue.prototype.$http = base;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
