import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { StatusBar } from "expo-status-bar"
import { AuthProvider } from "./src/context/AuthContext"
import LoginScreen from "./src/screens/LoginScreen"
import MainNavigator from "./src/navigation/MainNavigator"
import { RootStackParamList } from "./src/types/route"

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}
