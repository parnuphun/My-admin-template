import { webSetting } from "./theme/themeData"
import { reactive } from "vue"
export let setting : webSetting = reactive({
    theme : 'light'
})

console.log(setting.theme + 'setting Data');

