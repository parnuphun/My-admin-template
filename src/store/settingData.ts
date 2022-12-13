import { webSetting } from "./theme/themeData"
import { reactive, ref } from "vue"

export const isRail = ref<boolean>(true)
export let setting : webSetting = reactive({
    theme : 'light'
})


