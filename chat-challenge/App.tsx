import React from 'react'
import { StatusBar } from 'expo-status-bar'
import config from './tamagui.config'
import { TamaguiProvider } from '@tamagui/core'
import { useFonts } from 'expo-font'
import { Navigation } from './src'

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <TamaguiProvider config={config}>
      <Navigation />
      <StatusBar style="auto" />
    </TamaguiProvider>
  )
}
