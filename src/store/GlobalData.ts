import { webSetting } from "./theme/themeData"
import { reactive, ref } from "vue"

export const isRail = ref<boolean>(true)

export let setting :webSetting = reactive({
    theme : 'light'
})

export let userData = ref()

// export const credentialData = reactive(JSON.parse(localStorage.getItem('credential')||''))

