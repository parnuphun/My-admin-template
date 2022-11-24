import { createApp } from 'vue'
import App from './App.vue'
import routes from './plugin/routes'

// v-calendar
import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';


//tailwind
import './assets/style/tailwind.css'

// Vuetify
import vuetify from './plugin/vuetify/vuetify'


createApp(App)
    .use(VCalendar)
    .use(vuetify)
    .use(routes)
    .mount('#app')
