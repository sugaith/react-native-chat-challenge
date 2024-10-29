import { CameraCapturedPicture } from 'expo-camera'
import { create } from 'zustand'

type CameraStore = {
  image: CameraCapturedPicture | null
  setImage: (img: CameraCapturedPicture | null) => void
}

const useCameraStore = create<CameraStore>((set) => ({
  image: null,
  setImage: (img) => set({ image: img }),
}))

export { useCameraStore }
