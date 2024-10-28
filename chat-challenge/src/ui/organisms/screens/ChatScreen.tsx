import { useState, useEffect, useCallback } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import OpenAI from 'openai'
import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions'

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY || process.env.EXPO_PUBLIC_OPENAI_KEY,
  timeout: 9000,
})

async function fetchOpenAIResponse(messages: IMessage[]): Promise<string> {
  try {
    const formattedMessages: ChatCompletionCreateParamsBase['messages'] =
      messages.map((message) => ({
        role: message.user._id === 1 ? 'user' : 'assistant',
        content: message.text,
      }))

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use the appropriate model for chat
      messages: formattedMessages,
    })

    return response.choices[0]?.message?.content?.trim() || ''
  } catch (error) {
    console.error('Error fetching AI response:', error)
    return 'Error: Could not communicate with OpenAI.'
  }
}

function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    // Fetch the initial message from OpenAI
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
