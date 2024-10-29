import { useState, useCallback, useRef } from 'react'
import {
  GiftedChat,
  IMessage,
  Message,
  MessageProps,
} from 'react-native-gifted-chat'
import { IMessageBase64 } from 'src/apis/openAi'
import { useConversationStore } from 'src/store/ConversationStore'
import { MYSELF_USER } from 'src/utils'
import { Button, View } from 'tamagui'
import { Camera, HeartPulse, HeartOff } from '@tamagui/lucide-icons'
import { useNavigation } from '@react-navigation/native'
import {
  useConversationStartUp,
  useNewCameraPictureHandle,
  useOnSend,
  useSaveConversationOnExit,
} from './helpers'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

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

  const renderMessage = useCallback((props: MessageProps<IMessage>) => {
    const doubleTap = Gesture.Tap()
      .numberOfTaps(2)
      .onStart(() => {
        console.log('Yay, double tap!')
      })

    const shouldSupportLikeAction =
      props.currentMessage.user._id !== MYSELF_USER._id

    return (
      <GestureDetector gesture={doubleTap}>
        <View backgroundColor={'$background05'}>
          <Message
            {...props}
            containerStyle={{ left: { flex: 1 }, right: { flex: 1 } }}
          />
          {shouldSupportLikeAction ? (
            <HeartPulse
              position="absolute"
              right="$9"
              bottom="$3"
              color={'$black025'}
              fill={'red'}
            />
          ) : null}
        </View>
      </GestureDetector>
    )
  }, [])

  return (
    <GiftedChat
      messages={messages}
      renderAvatarOnTop={true}
      onSend={onSend}
      user={MYSELF_USER}
      renderActions={renderCameraButton}
      renderMessage={renderMessage}
    />
  )
}

export { ChatScreen }
