import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { TamaguiProvider } from 'tamagui'
import { config } from '../tamagui.config'

import { useColorScheme } from '@/hooks/use-color-scheme'

export const unstable_settings = {
  anchor: '(tabs)',
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <TamaguiProvider config={config} defaultTheme={isDark ? 'dark' : 'light'}>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TamaguiProvider>
  )
}
