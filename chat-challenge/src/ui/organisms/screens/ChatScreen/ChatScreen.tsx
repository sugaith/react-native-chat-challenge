import { useState, useEffect, useCallback, useRef } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { fetchOpenAIResponse, IMessageBase64 } from 'src/apis/openAi'
import { startConversationMessage } from 'src/store/constants'
import { useConversationStore } from 'src/store/ConversationStore'
import { AGENT_USER, MYSELF_USER } from 'src/utils'
import { Button } from 'tamagui'
import { Camera } from '@tamagui/lucide-icons'
import { useNavigation } from '@react-navigation/native'
import { useCameraStore } from '../CameraScreen'

function ChatScreen() {
  const { navigate } = useNavigation()
  const currentConversation = useConversationStore(
    (state) => state.currentConversation,
  )
  const saveConversation = useConversationStore(
    (state) => state.saveConversation,
  )
  const messagesRef = useRef(currentConversation.messages)
  const [messages, setMessages] = useState(messagesRef.current)

  const appendMessage = useCallback((newMessages: IMessage[]) => {
    messagesRef.current = GiftedChat.append(messagesRef.current, newMessages)
    setMessages(messagesRef.current)
  }, [])

  useEffect(() => {
    const fetchInitialMessage = async () => {
      const aiResponse = await fetchOpenAIResponse(startConversationMessage)

      const aiMessage: IMessage = {
        _id: Math.random().toString(),
        text: aiResponse,
        createdAt: new Date(),
        user: AGENT_USER,
      }

      appendMessage([aiMessage])
    }

    if (!messagesRef.current.length) {
      fetchInitialMessage()
    }
  }, [appendMessage])

  useEffect(
    () => () => {
      saveConversation({
        id: currentConversation.id,
        messages: messagesRef.current,
      })
    },
    [currentConversation.id, saveConversation],
  )

  const newCameraPicture = useCameraStore((state) => state.image)

  useEffect(() => {
    if (newCameraPicture) {
      useCameraStore.getState().setImage(null)

      console.log('Received image:', newCameraPicture)

      const imageMessage: IMessageBase64 = {
        _id: Math.random().toString(),
        text: '',
        createdAt: new Date(),
        image: newCameraPicture.uri,
        user: MYSELF_USER,
        base64: newCameraPicture.base64,
      }

      appendMessage([imageMessage])

      fetchOpenAIResponse([...messagesRef.current].reverse()).then(
        (aiResponse) => {
          const aiMessage: IMessage = {
            _id: Math.random().toString(),
            text: aiResponse,
            createdAt: new Date(),
            user: AGENT_USER,
          }

          appendMessage([aiMessage])
        },
      )
    }
  }, [appendMessage, newCameraPicture])

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      appendMessage(newMessages)

      if (newMessages.length > 0) {
        const aiResponse = await fetchOpenAIResponse(
          [...messagesRef.current].reverse(),
        )

        const aiMessage: IMessage = {
          _id: Math.random().toString(),
          text: aiResponse,
          createdAt: new Date(),
          user: AGENT_USER,
        }

        appendMessage([aiMessage])
      }
    },
    [appendMessage],
  )

  const renderCameraButton = useCallback(
    () => (
      <Button
        icon={Camera}
        scaleIcon={1.5}
        onPress={() => navigate('CameraScreen')}
      />
    ),
    [navigate],
  )

  return (
    <GiftedChat
      messages={messages}
      renderAvatarOnTop={true}
      onSend={onSend}
      user={MYSELF_USER}
      renderActions={renderCameraButton}
    />
  )
}

export { ChatScreen }
