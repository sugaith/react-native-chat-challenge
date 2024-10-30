import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useConversationStore } from 'src/store/ConversationStore'
import { YStack, Input, Spacer, Text, Button, View } from 'tamagui'
import { ConversationItem } from './ConversationItem'
import { Plus } from '@tamagui/lucide-icons'
import { useNavigation } from '@react-navigation/native'
import { useCameraPermissions } from 'expo-camera'
import { SearchInput } from 'src/ui/atoms'
import { NewConversationButton } from 'src/ui/atoms/NewButton'

function ConversationListScreen() {
  const [permission, requestPermission] = useCameraPermissions()
  useEffect(() => {
    if (!permission) {
      requestPermission()
    }
  }, [permission, requestPermission])

  const conversationList = useConversationStore(
    (state) => state.conversationList,
  )

  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = conversationList.filter((conversation) => {
    const lastMessageText = conversation.messages.at(-1)?.text || ''
    return lastMessageText.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4">
      {!conversationList.length ? (
        <View justifyContent="center" alignItems="center" flex={1}>
          <Text>Start a new conversation</Text>
        </View>
      ) : (
        <>
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <FlatList
            data={filteredConversations}
            keyExtractor={(item) => item.id || Math.random().toString()}
            renderItem={({ item: conversation }) => (
              <ConversationItem conversation={conversation} />
            )}
            ItemSeparatorComponent={() => <Spacer size="$1s" />}
          />
        </>
      )}

      <NewConversationButton />
    </YStack>
  )
}

export { ConversationListScreen }
