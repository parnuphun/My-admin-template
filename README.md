## Tools
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

## VSCode Extentions
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
    - ลงตัวนี้เสร็จให้ทำ Take over mode ด้วยจะเป็นการใช้ typescript ของ volar แทน typescript ของ vs code
        1. ไปที่ Tab extension vscode
        2. ค้นหา @builtin typescript จะเจอ TypeScript and JavaScript Language Features
        3. กดที่รูปเฟืองแล้วเลือก Disable(Workspace)
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
    - auto complete ของ tailwind
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
    - ไว้สำหรับไฟล์ .editorconfig ใช่กำหนดพวก tab ระยะห่างต่างๆ
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Auto-Save on Window Change](https://marketplace.visualstudio.com/items?itemName=mcright.auto-save)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

## Files
- เพิ่ม route (lazyload) => [src/prugin/routes.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/plugin/routes.ts)
- เพิ่มเมนูที่ Sidebar => [src/prugin/navigationData.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/plugin/navigationData.ts)
- เพิ่ม page => [src/views/finalject/main](https://github.com/parnuphun/ResearchProgressTrackingSystem/tree/master/src/views)
- เพิ่ม component => [src/components/](https://github.com/parnuphun/ResearchProgressTrackingSystem/tree/master/src/components)
- เปลี่ยนสี theme => [src/store/theme/themeData.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/store/theme/themeData.ts)
- เพิ่ม service
    - เพิ่มฟังก์ชัน SweetAlert => [src/services/msgAlert.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/services/msgAlert.ts)
    - เพิ่ม api => [src/services/apiRPTS.ts](https://github.com/parnuphun/ResearchProgressTrackingSystem/blob/master/src/services/apiRPTS.ts)

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

## Vuetify Standard Color 
```ruby
  theme: {
    themes: {
      light: {
        primary: "#14C6FF",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        lightblue: "#14c6FF",
        yellow: "#FFCF00",
        pink: "#FF1976",
        orange: "#FF8657",
        magenta: "#C33AFC",
        darkblue: "#1E2D56",
        gray: "#909090",
        neutralgray: "#9BA6C1",
        green: "#2ED47A",
        red: "#FF5c4E",
        darkblueshade: "#308DC2",
        lightgray: "#BDBDBD",
        lightpink: "#FFCFE3",
        white: "#FFFFFF"
      }
    }
  }
```

## Note 
- [แก้ CORS ด้วย Proxy](https://vitejs.dev/config/server-options.html#server-proxy)
