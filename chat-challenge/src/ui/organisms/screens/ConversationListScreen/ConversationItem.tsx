import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import { IMessage } from 'react-native-gifted-chat'
import { Button, Text } from 'tamagui'

type ConversationItemProps = {
  name: IMessage['user']['name']
  lastMessage: IMessage['text']
  timestamp: IMessage['createdAt']
}

const ConversationItem = ({
  name,
  lastMessage,
  timestamp,
}: ConversationItemProps) => {
  const { navigate } = useNavigation()
  const openConversation = useCallback(() => {
    navigate('ChatScreen')
  }, [navigate])

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
}

export type { ConversationItemProps }
export { ConversationItem }
