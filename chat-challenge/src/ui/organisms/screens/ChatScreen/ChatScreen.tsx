import { useState, useEffect, useCallback } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { fetchOpenAIResponse } from 'src/apis/openAi'

function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    const fetchInitialMessage = async () => {
      const initialUserMessages: IMessage[] = [
        {
          _id: 1,
          text: 'Start the conversation',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Myself',
          },
        },
      ]

      const aiResponse = await fetchOpenAIResponse(initialUserMessages)

      const aiMessage: IMessage = {
        _id: Math.random().toString(),
        text: aiResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'OpenAI',
          avatar: 'https://avatar.iran.liara.run/public',
        },
      }

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [aiMessage]),
      )
    }

    fetchInitialMessage()
  }, [])

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages),
      )

      const updatedMessages = GiftedChat.append(messages, newMessages)

      if (newMessages.length > 0) {
        const aiResponse = await fetchOpenAIResponse(updatedMessages.reverse())

        const aiMessage: IMessage = {
          _id: Math.random().toString(),
          text: aiResponse,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'OpenAI',
            avatar: 'https://avatar.iran.liara.run/public',
          },
        }

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [aiMessage]),
        )
      }
    },
    [messages],
  )

  return (
    <GiftedChat
      messages={messages}
      renderAvatarOnTop={true}
      onSend={onSend}
      user={{
        _id: 1,
        name: 'Myself',
        avatar: 'https://avatar.iran.liara.run/public',
      }}
    />
  )
}

export { ChatScreen }
