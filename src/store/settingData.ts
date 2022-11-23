import { webSetting } from "./theme/themeData"
import { reactive, ref } from "vue"

export let setting : webSetting = reactive({
    theme : 'light'
})


console.log('setting' , setting.theme);


