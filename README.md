## Tools
- [vue3 composition api ](https://vuejs.org/guide/introduction.html#what-is-vue)
- [vuetify3](https://next.vuetifyjs.com/en/getting-started/installation/)
- [material design icon (ไอคอน)](https://materialdesignicons.com/)
- [v-calendar (ปฏิทิน)](https://vcalendar.io/)
- [sweetalert2 (การแจ้งเตือน)](https://sweetalert2.github.io/)
- [vue-echart (กราฟ)](https://echarts.apache.org/examples/en/index.html#chart-type-scatter)
- [tailwind css](https://tailwindcss.com/docs/installation)
- [storyset (ภาพประกอบเว็บ)](https://storyset.com/online)

## Files
- เพิ่ม route (lazyload) => [src/prugin/routes.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/plugin/routes.ts)
- เพิ่มเมนูที่ Sidebar => [src/prugin/navigationData.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/plugin/navigationData.ts)
- เพิ่ม page (สร้าง folder project แยกในโฟลเดอร์ views ก๋ได่)=> [src/views/finalject/main](https://github.com/parnuphun/ResearchProgressTrackingSystem/tree/master/src/views)
- เพิ่ม component => [src/components/](https://github.com/parnuphun/ResearchProgressTrackingSystem/tree/master/src/components)
- เปลี่ยนสี theme => [src/store/theme/themeData.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/store/theme/themeData.ts)
- เพิ่ม service
    - เพิ่มฟังก์ชัน SweetAlert => [src/services/msgAlert.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/services/msgAlert.ts)

## Tailwind Responsive Breakpoint
- แก้ที่ไฟล์ [tailwind.config.cjs](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/tailwind.config.cjs)
```ruby
    screens: {
        'MB' : '200px',
        'TL' : '640px',
        'LT': '1024px',
        'DT' : '1536px',
    }
```
