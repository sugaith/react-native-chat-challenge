import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import config from './tamagui.config'
import { TamaguiProvider, View } from '@tamagui/core'

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <View width={200} height={200} backgroundColor="$green10Light">
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </TamaguiProvider>
  )
}
