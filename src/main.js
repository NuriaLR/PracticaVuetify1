import './assets/main.css'
import vuetify from '../vuetify/vuetify'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')
