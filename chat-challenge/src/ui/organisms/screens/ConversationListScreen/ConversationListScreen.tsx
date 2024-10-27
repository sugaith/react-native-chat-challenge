import { FlatList } from 'react-native'
import { useConversationStore } from 'src/store/ConversationStore'
import { View } from 'tamagui'
import { ConversationItem, ConversationItemProps } from './ConversationItem'

function ConversationListScreen() {
  const conversationList = useConversationStore(
    (state) => state.conversationList,
  )

  return (
    <View flex={1} backgroundColor="$background">
      <FlatList
        data={conversationList}
        keyExtractor={(item) => item.id}
        renderItem={({ item: conversation }) => {
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

export { ConversationListScreen }
