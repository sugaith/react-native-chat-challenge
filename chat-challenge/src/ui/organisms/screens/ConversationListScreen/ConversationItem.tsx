import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import { Conversation, useConversationStore } from 'src/store/ConversationStore'
import { Button, Text } from 'tamagui'

type ConversationItemProps = {
  conversation: Conversation
}

const ConversationItem = ({ conversation }: ConversationItemProps) => {
  const { navigate } = useNavigation()
  const setCurrentConversation = useConversationStore(
    (state) => state.setCurrentConversation,
  )
  const openConversation = useCallback(() => {
    setCurrentConversation(conversation)
    navigate('ChatScreen')
  }, [conversation, navigate, setCurrentConversation])

  const lastMessage = conversation.messages.at(0)

  return (
    <Button
      padding="$2"
      borderBottomWidth={1}
      borderColor="$gray5Light"
      justifyContent="flex-start"
      backgroundColor="$background0"
      borderRadius={0}
      onPress={openConversation}
    >
      <Text fontWeight="bold" color="$text" marginBottom="$1">
        {lastMessage?.user.name}
      </Text>
      <Text
        color="$gray8"
        marginBottom="$1"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {lastMessage?.text.substring(0, 45) + '...'}
      </Text>
      <Text fontSize="$2" color="$gray7">
        {lastMessage?.createdAt.toLocaleString() || new Date().toLocaleString()}
      </Text>
    </Button>
  )
}

export { ConversationItem, ConversationItemProps }
