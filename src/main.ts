import { createApp } from 'vue'
import { init } from '@neutralinojs/lib'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

init()
