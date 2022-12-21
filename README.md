## Tools
### Frameworks / Packages 
- [vue3 composition api ](https://vuejs.org/guide/introduction.html#what-is-vue)
- [vuetify3](https://next.vuetifyjs.com/en/getting-started/installation/)
- [material design icon (ไอคอน)](https://materialdesignicons.com/)
- [v-calendar (ปฏิทิน)](https://vcalendar.io/)
- [sweetalert2 (การแจ้งเตือน)](https://sweetalert2.github.io/)
- [vue-echart (กราฟ)](https://echarts.apache.org/examples/en/index.html#chart-type-scatter)
- [tailwind css](https://tailwindcss.com/docs/installation)
- [storyset (ภาพประกอบเว็บ)](https://storyset.com/online)
- [axios (ไว้เรียก API)](https://devahoy.com/blog/fetch-api-with-axios)
- [moment js (ไว้ Format Date มีภาษาไทย)](https://momentjs.com/)
- [vue3-otp-input](https://www.npmjs.com/package/vue3-otp-input)

## Files
- เพิ่ม route (lazyload) => [src/prugin/routes.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/plugin/routes.ts)
- เพิ่มเมนูที่ Sidebar => [src/prugin/navigationData.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/plugin/navigationData.ts)
- เพิ่ม page => [src/views/finalject/main](https://github.com/parnuphun/ResearchProgressTrackingSystem/tree/master/src/views)
- เพิ่ม component => [src/components/](https://github.com/parnuphun/ResearchProgressTrackingSystem/tree/master/src/components)
- เปลี่ยนสี theme => [src/store/theme/themeData.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/store/theme/themeData.ts)
- เพิ่ม service
    - SweetAlert => [src/services/msgAlert.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/services/msgAlert.ts)
    - API => [src/services/apiRPTS.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/services/apiRPTS.ts)
    - Form Validation => [src/services/validationRules.ts](https://github.com/parnuphun/ReseachProgressTrackingSystem/blob/master/src/services/validationRules.ts)
- เพิ่ม Breakpoint tailwind [tailwind.config.cjs](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/tailwind.config.cjs)
```ruby
    screens: {
        'MB' : '200px',
        'TL' : '640px',
        'LT': '1024px',
        'DT' : '1536px',
    }
```

## Note 
- [แก้ CORS ด้วย Proxy](https://vitejs.dev/config/server-options.html#server-proxy)
- [Vuetify Standard Color](https://stackoverflow.com/questions/52258669/how-to-change-the-text-color-of-a-vuetify-button)
- [Vuetify Transition](https://www.youtube.com/watch?v=z9DxKjnpjnI)
