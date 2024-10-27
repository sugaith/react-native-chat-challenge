import { FlatList } from 'react-native'
import { IMessage } from 'react-native-gifted-chat'
import { useConversationStore } from 'src/store/ConversationStore'
import { View, Text, Button } from 'tamagui'

type ConversationItemProps = {
  name: IMessage['user']['name']
  lastMessage: IMessage['text']
  timestamp: IMessage['createdAt']
}

const ConversationItem = ({
  name,
  lastMessage,
  timestamp,
}: ConversationItemProps) => (
  <Button
    padding="$2"
    borderBottomWidth={1}
    borderColor="$gray5Light"
    justifyContent="flex-start"
    backgroundColor="$background0"
    borderRadius={0}
  >
    <Text fontWeight="bold" color="$text" marginBottom="$1">
      {name}
    </Text>
    <Text color="$gray8" marginBottom="$1">
      {lastMessage}
    </Text>
    <Text fontSize="$2" color="$gray7">
      {timestamp.toLocaleString()}
    </Text>
  </Button>
)

function ChatListScreen() {
  const conversationList = useConversationStore(
    (state) => state.conversationList,
  )

  return (
    <View flex={1} backgroundColor="$background">
      <FlatList
        data={conversationList}
        keyExtractor={(item) => item.id}
        renderItem={({ item: conversation }) => {
          console.log('conversation')
          console.log(conversation)

          const lastMessage = conversation.messages.at(-1)
          const convoProps: ConversationItemProps = {
            name: lastMessage?.user.name,
            lastMessage: lastMessage?.text || '',
            timestamp: lastMessage?.createdAt || new Date(),
          }

          return <ConversationItem {...convoProps} />
        }}
      />
    </View>
  )
}

export { ChatListScreen }
