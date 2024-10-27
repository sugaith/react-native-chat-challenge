import React from 'react'
import { StatusBar } from 'expo-status-bar'
import config from './tamagui.config'
import { TamaguiProvider } from '@tamagui/core'
import { Navigation } from 'src/ui/navigation/Navigation'

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <Navigation />
      <StatusBar style="auto" />
    </TamaguiProvider>
  )
}
