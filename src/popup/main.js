import Vue from 'vue'
import App from './App.vue'
import store from '../store/index'
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
import { Row, Col, Button, Avatar, Link, Skeleton, SkeletonItem, Loading, Message, Autocomplete, Tabs, TabPane } from "element-ui"
import langEN from 'element-ui/lib/locale/lang/en'
import langJA from 'element-ui/lib/locale/lang/ja'
import locale from 'element-ui/lib/locale'

import { getLocalStorage } from '../js/browser/api'
import { vLang } from '../js/utils/common'

Vue.prototype.$http = axios;

Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.use(Avatar);
Vue.use(Link);
Vue.use(Skeleton);
Vue.use(SkeletonItem);
Vue.use(Autocomplete);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
switch (vLang()) {
  case "en": locale.use(langEN); break;
  case "ja": locale.use(langJA); break;
  case "zh":
  default:
    break;
}

/* eslint-disable no-new */
getLocalStorage(["options"]).then((res) => {
  if (res.options) {
    store.commit("setOptions", res.options);
  }
  new Vue({
    el: '#app',
    store,
    render: h => h(App)
  });
});
