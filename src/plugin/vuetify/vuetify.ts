import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { vuetifyThemeMode } from '../../store/theme/themeData'
export default createVuetify({
  components,
  directives,
  ssr: true,
  theme: {
    themes: vuetifyThemeMode
  },
})
