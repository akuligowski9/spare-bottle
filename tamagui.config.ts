import { createTamagui } from 'tamagui'
import { tokens } from '@tamagui/themes'

export const config = createTamagui({
  tokens,

    themes: {
    light: {
        background: '#ffffff',
        color: '#111111',

        cardBackground: '#f8f9f8',   // muted sage / off-white
        borderColor: '#e2e5e2',

        muted: '#6b7280',            // calm gray-blue
        accentColor: '#4f7d6b',      // muted sage green
    },
    dark: {
        background: '#0f1412',
        color: '#ffffff',

        cardBackground: '#151a18',
        borderColor: '#2a332f',

        muted: '#9aa3a0',
        accentColor: '#7fb8a2',
    },
    }   
})

export type AppConfig = typeof config
