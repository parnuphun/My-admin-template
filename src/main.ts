import { createApp } from 'vue'
import App from './App.vue'
import axios , {AxiosRequestConfig} from 'axios'

// route
import routes from './plugin/routes'

// tailwind css
import './assets/style/tailwind.css'

// Vuetify
import vuetify from './plugin/vuetify/vuetify'

// v-calendar
import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css'

// sweet alert 2
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// moment js : set thai date globally
import moment from 'moment'
import 'moment/dist/locale/th'
moment.locale('th')

// interceptor
import { interceptor } from './services/Interceptor'
// axios.interceptors.request.use(interceptor)

// marquee slide
import Vue3Marquee from 'vue3-marquee'


createApp(App)
    .use(VCalendar)
    .use(vuetify)
    .use(routes)
    .use(VueSweetalert2)
    .use(Vue3Marquee)
    .mount('#app')
