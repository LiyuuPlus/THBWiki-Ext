import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { mixin } from '@/utils/mixin';
import App from './App.vue'

const app = createApp(App)
app.use(Antd)
app.mixin(mixin);
app.mount('#app')
