import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,

  theme: {
    themes: {
        light: {
            dark : false ,
            colors : {
                background : '#f3f4f6'
            }
        },
        dark : {
            dark : true ,
            colors : {
                // background : '#111827'
            }
        },
        orangeLight : {
            dark : true ,
            colors : {
                pirmeOne : '#ED6F25'
            }
        },
    },
  },
})
