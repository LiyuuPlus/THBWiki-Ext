import Vue from 'vue'
import App from './App.vue'
import store from '../store/index'
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
import { Row, Col, Button, Avatar, Link, Loading, Message } from "element-ui"

Vue.prototype.$http = axios;

Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.use(Avatar);
Vue.use(Link);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
