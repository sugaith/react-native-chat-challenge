import { CameraView, CameraType } from 'expo-camera'
import { LegacyRef, useCallback, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, View } from 'tamagui'
import { Camera, Circle } from '@tamagui/lucide-icons'
import { useCameraStore } from './CameraStore'
import { useNavigation } from '@react-navigation/native'

function CameraScreen() {
  const { goBack } = useNavigation()

  const cameraRef = useRef<CameraView>()
  const [facing, setFacing] = useState<CameraType>('back')

  const toggleCameraFacing = useCallback(() => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'))
  }, [])

  const takePicture = useCallback(async () => {
    try {
      if (!cameraRef.current) return

      const image = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.6,
      })

      if (!image) {
        console.warn(
          'Warning: Camera did not returned a picture for some reason',
        )
        return
      }

      useCameraStore.getState().setImage(image)
      goBack()
    } catch (error) {
      console.error('Error on takePictureAsync(): ', error)
    }
  }, [goBack])

  return (
    <View flex={1} justifyContent="center">
      <CameraView
        ref={cameraRef as LegacyRef<CameraView>}
        style={styles.camera}
        facing={facing}
      >
        <Button
          onPress={takePicture}
          scaleIcon={1.5}
          scale={1.5}
          borderRadius={'$12'}
          position="absolute"
          alignSelf="center"
          bottom="$8"
          icon={Circle}
        />

        <Button
          onPress={toggleCameraFacing}
          scaleIcon={1.5}
          scale={1.5}
          borderRadius={'$12'}
          position="absolute"
          right="$8"
          top="$8"
          icon={Camera}
        />
      </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
})

export { CameraScreen }
