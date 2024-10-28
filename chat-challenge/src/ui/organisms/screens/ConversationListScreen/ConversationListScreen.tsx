import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { useConversationStore } from 'src/store/ConversationStore'
import { YStack, Input, Spacer, Text, Button } from 'tamagui'
import { ConversationItem, ConversationItemProps } from './ConversationItem'
import { Plus } from '@tamagui/lucide-icons'
import { useNavigation } from '@react-navigation/native'

function ConversationListScreen() {
  const { navigate } = useNavigation()
  const conversationList = useConversationStore(
    (state) => state.conversationList,
  )
  const createNewConversation = useConversationStore(
    (state) => state.createNewConversation,
  )

  const [searchQuery, setSearchQuery] = useState('')
  const filteredConversations = conversationList.filter((conversation) => {
    const lastMessageText = conversation.messages.at(-1)?.text || ''
    return lastMessageText.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const createNewConversationAndNavigate = () => {
    createNewConversation()
    navigate('ChatScreen')
  }

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4">
      {/* TODO MOVE THESE COMPONENTS TO ATOMS */}
      {/* Search Box */}
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        borderWidth={1}
        borderColor="$gray300"
        borderRadius="$4"
        marginBottom="$4"
        padding="$3"
        backgroundColor="$gray100"
        placeholderTextColor="$gray10"
      />

      {/* Conversation List */}
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={({ item: conversation }) => {
          const lastMessage = conversation.messages.at(-1)

          const convoProps: ConversationItemProps = {
            name: lastMessage?.user.name,
            lastMessage: lastMessage?.text || '',
            timestamp: lastMessage?.createdAt || new Date(),
          }

          return <ConversationItem {...convoProps} />
        }}
        ItemSeparatorComponent={() => <Spacer size="$2" />}
      />

      {/* new convo button */}
      <Button
        onPress={createNewConversationAndNavigate}
        position="absolute"
        bottom="$6"
        right="$6"
        backgroundColor="$blue10Light"
        borderRadius="$12"
        alignItems="center"
        justifyContent="center"
        icon={Plus}
        scaleIcon={1.5}
        color={'white'}
      >
        <Text color="white" marginLeft="$2">
          New
        </Text>
      </Button>
    </YStack>
  )
}

export { ConversationListScreen }
