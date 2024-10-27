import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ChatListScreen } from '../organisms/screens/ChatListScreen'
import { ChatScreen } from '../organisms/screens/ChatScreen'

const Stack = createStackNavigator()

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ChatScreen"
        // screenOptions={homeScreenOptions}
      >
        <Stack.Screen
          name="ChatListScreen"
          component={ChatListScreen}
          options={{ title: 'Your Chats' }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          // options={{ title: 'Your Chats' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export { Navigation }
