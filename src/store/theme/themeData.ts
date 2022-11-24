// setting theme
export type layOutTheme = 'dark' | 'light' | 'orangeLight' | 'orangeDark'
export interface webSetting {
    theme : layOutTheme
}

const orangeLight = {
    background : '#ffedd5',
    primary: '#ea580c',
    secondary : '#f97316',
}

const greenLight = {
    background : '#ecfccb',
    primary: '#a3e635',
    secondary : '#bef264',
}

const dark = {
    background : '#121212',
    primary: '#212121',
    secondary : '#0c0f21',
}


//viewtify theme mode
export const vuetifyThemeMode = {
    light: {
        dark : false ,
        // colors : orangeLight
    },
    dark : {
        dark : true ,
        // colors : dark
    },
}

// tailwind theme mode
export const tailwindThemeMode = {

}
