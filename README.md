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
- การเพิ่ม route => /prugin/routes.ts (lazyload)
```ruby
    routes: [
        // default redirect
        { path: '/' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,

        { path: '/dashBoard' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,
        ],
```
- การเพิ่มเมนูที่ Sidebar => /prugin/navigationData.ts
```ruby
    {
        id: 'dashboard' ,
        title : 'แดชบอร์ด' ,
        icon : 'monitor-dashboard' ,
        link : '/dashBoard' ,
        group : false
    },
 ```
## Tailwind Responsive Breakpoint
```ruby
    screens: {
        'MB' : '200px',
        'TL' : '640px',
        'LT': '1024px',
        'DT' : '1536px',
    }
```
