import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import App from './App.vue'
import router from './router'
import store from "./auth/store";
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import Vuelidate from 'vuelidate'
import VueMask from 'maska'
const base = axios.create({
  baseURL: "http://localhost:3000/api"
});
const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueAxios, axios)
app.use(VueMask)
app.use(Vuelidate) 
app.use(VueTelInput);
app.config.globalProperties.$http = base;
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-')
app.mount('#app')
/*
const base = axios.create({
  baseURL: "http://localhost:3000/api"
});
const app = createApp({router,store,App})
app.use(VueMask);
app.use(Vuelidate)
app.component('vue-phone-number-input', VuePhoneNumberInput);
app.config.globalProperties.$http = base;
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-')
app.mount('#app')
/*
createApp( 
  router,
  store,
  App
  ).mount('#app')*/

/*import Vue from 'vue' 
import {createApp} from 'vue';
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

createApp.use(VueMask);
createApp.component('vue-phone-number-input', VuePhoneNumberInput);
createApp.use(Vuelidate)
createApp.prototype.$http = base;
createApp.config.productionTip = false
new createApp({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
*/