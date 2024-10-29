import { useState, useCallback, useRef } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { IMessageBase64 } from 'src/apis/openAi'
import { useConversationStore } from 'src/store/ConversationStore'
import { MYSELF_USER } from 'src/utils'
import { Button } from 'tamagui'
import { Camera } from '@tamagui/lucide-icons'
import { useNavigation } from '@react-navigation/native'
import {
  useConversationStartUp,
  useNewCameraPictureHandle,
  useOnSend,
  useSaveConversationOnExit,
} from './helpers'

function ChatScreen() {
  const { navigate } = useNavigation()

  const initialChat = useConversationStore((state) => state.currentConversation)
  const messagesRef = useRef(initialChat.messages)
  const [messages, setMessages] = useState(messagesRef.current)

  const appendMessage = useCallback((newMessages: IMessageBase64[]) => {
    messagesRef.current = GiftedChat.append(messagesRef.current, newMessages)
    setMessages(messagesRef.current)

    return [...messagesRef.current]
  }, [])

  useConversationStartUp(!initialChat.messages.length, appendMessage)

  useNewCameraPictureHandle(appendMessage)

  useSaveConversationOnExit(messagesRef.current)

  const onSend = useOnSend(appendMessage)

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
