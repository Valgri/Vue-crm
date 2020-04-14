import Vue from 'vue'
import Vuelidate from "vuelidate";
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from "./utils/message.plugin"
import dateFilter from "./filters/date.filter"
import 'materialize-css/dist/js/materialize.min'
import firebase from "firebase/app";
import "firebase/auth"
import "firebase/database"



Vue.config.productionTip = false ;

Vue.filter('date2', dateFilter);
Vue.use(Vuelidate);
Vue.use(messagePlugin);

firebase.initializeApp({
  apiKey: "AIzaSyB0BmVv5cayrKNwn51_F5yuIeQ5sHj-0sk",
  authDomain: "vue-crm-df4f9.firebaseapp.com",
  databaseURL: "https://vue-crm-df4f9.firebaseio.com",
  projectId: "vue-crm-df4f9",
  storageBucket: "vue-crm-df4f9.appspot.com",
  messagingSenderId: "63662926721",
  appId: "1:63662926721:web:987b352729c420fd3e1680"
});

let app;


firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')

  }
});


