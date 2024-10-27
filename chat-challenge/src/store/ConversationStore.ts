import { IMessage } from 'react-native-gifted-chat'
import { create } from 'zustand'
import { conversationMock } from './mocks'

type Conversation = {
  id: string
  messages: IMessage[]
}

type ConversationStore = {
  conversationList: Conversation[]
  // setConversationList: (conversationList: Conversation[]) => void

  // currentConversation: Conversation
  // setCurrentConversation: (currentConversation: Conversation) => void
}

const useConversationStore = create<ConversationStore>((set) => ({
  conversationList: [conversationMock],
}))

export type { Conversation, ConversationStore }
export { useConversationStore }
