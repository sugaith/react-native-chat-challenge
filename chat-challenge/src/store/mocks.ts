import { IMessage } from 'react-native-gifted-chat'
import { Conversation } from './ConversationStore'

const messagesMock: IMessage[] = [
  {
    _id: 1,
    text: 'Hello, how are you?',
    createdAt: new Date(Date.UTC(2023, 9, 21, 14, 30, 0)),
    user: {
      _id: 1,
      name: 'Myself',
      avatar: 'https://avatar.iran.liara.run/public',
    },
    sent: true,
    received: true,
    pending: false,
  },
  {
    _id: 2,
    text: 'I am good, thanks! How about you?',
    createdAt: new Date(Date.UTC(2023, 9, 21, 14, 35, 0)),
    user: {
      _id: 2,
      name: 'Jane Smith',
      avatar: 'https://example.com/avatar/janesmith.png',
    },
    sent: true,
    received: false,
    pending: false,
  },
  {
    _id: 3,
    text: 'Doing well, just working on our project.',
    createdAt: new Date(Date.UTC(2023, 9, 21, 14, 40, 0)),
    user: {
      _id: 1,
      name: 'Myself',
      avatar: 'https://avatar.iran.liara.run/public',
    },
    sent: true,
    received: true,
    pending: true,
  },
]

const conversationMock: Conversation = {
  id: 'asdOIJsdoifjosdjfosidjf',
  messages: messagesMock,
}

export { conversationMock, messagesMock }
