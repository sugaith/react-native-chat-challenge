import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { useCameraStore } from '../CameraScreen'
import { fetchOpenAIResponse, IMessageBase64 } from 'src/apis/openAi'
import { AGENT_USER, MYSELF_USER } from 'src/utils'
import { IMessage } from 'react-native-gifted-chat'
import { startConversationMessage } from 'src/store/constants'
import { useConversationStore } from 'src/store/ConversationStore'
import { useNavigation } from '@react-navigation/native'
import { CameraType, CameraView } from 'expo-camera'

type MessageAppenderFunc = (msgs: IMessageBase64[]) => IMessageBase64[]

const useConversationStartUp = (
  shouldStartChat: boolean,
  messageAppender: MessageAppenderFunc,
) => {
  useEffect(() => {
    if (shouldStartChat) {
      const fetchInitialMessage = async () => {
        const aiResponse = await fetchOpenAIResponse(startConversationMessage)

        const aiMessage: IMessage = {
          _id: Math.random().toString(),
          text: aiResponse,
          createdAt: new Date(),
          user: AGENT_USER,
        }

        messageAppender([aiMessage])
      }

      fetchInitialMessage()
    }
  }, [messageAppender, shouldStartChat])

  return null
}

const useNewCameraPictureHandle = (messageAppender: MessageAppenderFunc) => {
  const newCameraPicture = useCameraStore((state) => state.image)

  useEffect(() => {
    if (newCameraPicture) {
      useCameraStore.getState().setImage(null)

      const imageMessage: IMessageBase64 = {
        _id: Math.random().toString(),
        text: '',
        createdAt: new Date(),
        image: newCameraPicture.uri,
        user: MYSELF_USER,
        base64: newCameraPicture.base64,
      }

      fetchOpenAIResponse(messageAppender([imageMessage]).reverse()).then(
        (aiResponse) => {
          const aiMessage: IMessage = {
            _id: Math.random().toString(),
            text: aiResponse,
            createdAt: new Date(),
            user: AGENT_USER,
          }

          messageAppender([aiMessage])
        },
      )
    }
  }, [messageAppender, newCameraPicture])

  return null
}

const useSaveConversationOnExit = (finalMessages: IMessageBase64[]) => {
  const saveConversation = useConversationStore(
    (state) => state.saveConversation,
  )
  const currentConversation = useConversationStore(
    (state) => state.currentConversation,
  )

  useEffect(
    () => () => {
      saveConversation({
        id: currentConversation.id,
        messages: finalMessages,
      })
    },
    [currentConversation.id, finalMessages, saveConversation],
  )

  return null
}

const useOnSend = (messageAppender: MessageAppenderFunc) => {
  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      const newMsgs = messageAppender(newMessages)

      if (newMessages.length > 0) {
        const aiResponse = await fetchOpenAIResponse(newMsgs.reverse())

        const aiMessage: IMessage = {
          _id: Math.random().toString(),
          text: aiResponse,
          createdAt: new Date(),
          user: AGENT_USER,
        }

        messageAppender([aiMessage])
      }
    },
    [messageAppender],
  )

  return onSend
}

const useCameraActions = (
  cameraRef: MutableRefObject<CameraView | undefined>,
) => {
  const { goBack } = useNavigation()

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
  }, [cameraRef, goBack])

  const [facing, setFacing] = useState<CameraType>('back')
  const toggleCameraFacing = useCallback(() => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'))
  }, [])

  return { takePicture, toggleCameraFacing, facing }
}

export {
  useNewCameraPictureHandle,
  useConversationStartUp,
  useSaveConversationOnExit,
  useOnSend,
  useCameraActions,
}
