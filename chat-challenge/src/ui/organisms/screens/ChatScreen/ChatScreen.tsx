import { useState, useEffect, useCallback, useRef } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { fetchOpenAIResponse } from 'src/apis/openAi'
import { startConversationMessage } from 'src/store/constants'
import { useConversationStore } from 'src/store/ConversationStore'
import { AGENT_USER, MYSELF_USER } from 'src/utils'

function ChatScreen() {
  const currentConversation = useConversationStore(
    (state) => state.currentConversation,
  )
  const saveConversation = useConversationStore(
    (state) => state.saveConversation,
  )
  const messagesRef = useRef(currentConversation.messages)
  const [messages, setMessages] = useState(messagesRef.current)

  useEffect(() => {
    const fetchInitialMessage = async () => {
      const aiResponse = await fetchOpenAIResponse(startConversationMessage)

      const aiMessage: IMessage = {
        _id: Math.random().toString(),
        text: aiResponse,
        createdAt: new Date(),
        user: AGENT_USER,
      }

      messagesRef.current = GiftedChat.append(messagesRef.current, [aiMessage])
      setMessages(messagesRef.current)
    }

    if (!messagesRef.current.length) {
      fetchInitialMessage()
    }
  }, [])

  useEffect(
    () => () => {
      saveConversation({
        id: currentConversation.id,
        messages: messagesRef.current,
      })
    },
    [currentConversation.id, saveConversation],
  )

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    messagesRef.current = GiftedChat.append(messagesRef.current, newMessages)
    setMessages(messagesRef.current)

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

      messagesRef.current = GiftedChat.append(messagesRef.current, [aiMessage])
      setMessages(messagesRef.current)
    }
  }, [])

  return (
    <GiftedChat
      messages={messages}
      renderAvatarOnTop={true}
      onSend={onSend}
      user={MYSELF_USER}
    />
  )
}

export { ChatScreen }
