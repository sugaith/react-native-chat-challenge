import { IMessage } from 'react-native-gifted-chat'
import { Conversation } from './ConversationStore'
import { MYSELF_USER } from '../utils'

const startConversationMessage: IMessage[] = [
  {
    _id: Math.random().toString(),
    text: 'Start the conversation',
    createdAt: new Date(),
    user: MYSELF_USER,
  },
]

const newConversation: Conversation = {
  id: null,
  messages: [],
}

export { newConversation, startConversationMessage }
