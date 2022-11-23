// setting theme
export type layOutTheme = 'dark' | 'light'
export interface webSetting {
    theme : layOutTheme
}

//viewtify theme mode
export const vuetifyThemeMode = {
    light: {
        dark : false ,
        colors : {
            background : '#f3f4f6',
        }
    },
    dark : {
        dark : true ,
        colors : {
            background : '#121212'
        }
    },
    orangeLight : {
        dark : true ,
        colors : {
            pirmeOne : '#ED6F25',
        }
    },
}
