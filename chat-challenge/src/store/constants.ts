import { IMessage } from 'react-native-gifted-chat'
import { Conversation } from './ConversationStore'
import { MYSELF_USER } from '../utils'

const startConversationMessage: IMessage[] = [
  {
    _id: Math.random().toString(),
    text: 'You are a dev called Thiago and you will be interviewed by Sebastian for TrashLab (automations/inovations for collection, Haulers, recyclers). Say hello, use emoji',
    createdAt: new Date(),
    user: MYSELF_USER,
  },
]

const newConversation: Conversation = {
  id: null,
  messages: [],
}

export { newConversation, startConversationMessage }
