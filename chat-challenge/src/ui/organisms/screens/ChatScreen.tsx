import { useState, useCallback } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: 'Hello developerdfdf',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://avatar.iran.liara.run/public',
      },
    },
  ])

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <GiftedChat
      messages={messages}
      renderAvatarOnTop={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
        name: 'Myself',
        avatar: 'https://avatar.iran.liara.run/public',
      }}
    />
  )
}

export { ChatScreen }
