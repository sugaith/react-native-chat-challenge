import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ConversationListScreen } from '../organisms/screens/ConversationListScreen'
import { ChatScreen } from '../organisms/screens/ChatScreen'

type StackNavigatorScreens = {
  ConversationListScreen: undefined
  ChatScreen: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackNavigatorScreens {}
  }
}

const Stack = createStackNavigator<StackNavigatorScreens>()

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ConversationListScreen">
        <Stack.Screen
          name="ConversationListScreen"
          component={ConversationListScreen}
          options={{ title: 'Your Chats' }}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export type { StackNavigatorScreens }
export { Navigation }
