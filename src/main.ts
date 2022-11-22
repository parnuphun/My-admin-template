import { createApp } from 'vue'
import App from './App.vue'
import routes from './plugin/routes'

//tailwind
import './assets/style/tailwind.css'

// Vuetify
import vuetify from './plugin/vuetify/vuetify'


createApp(App)
    .use(vuetify)
    .use(routes)
    .mount('#app')
