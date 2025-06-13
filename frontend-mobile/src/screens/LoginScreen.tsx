import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../context/AuthContext"
import FptLogo from "../assets/fpt-logo.png";

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const navigation = useNavigation()

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setError("")
    const success = await login(email, password)

    if (success) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" as never }],
      })
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-white">
      <ScrollView contentContainerClassName="flex-grow justify-center">
        <View className="flex-1 justify-center items-center p-6">
          <Image
            source={FptLogo}
            className="w-40 h-40 mb-8"
            resizeMode="contain"
          />

          <View className="w-full mb-6">
            <Text className="text-gray-700 mb-2 font-medium">Email</Text>
            <TextInput
              className="w-full bg-gray-100 rounded-lg px-4 py-3 mb-4"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text className="text-gray-700 mb-2 font-medium">Password</Text>
            <TextInput
              className="w-full bg-gray-100 rounded-lg px-4 py-3 mb-2"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity className="self-end mb-4">
              <Text className="text-primary">Forgot Password?</Text>
            </TouchableOpacity>

            {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

            <TouchableOpacity
              className="w-full bg-primary rounded-lg py-3 items-center"
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-white font-bold text-lg">Login</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text className="text-gray-500 text-center mt-4">© 2025 FPT University Ho Chi Minh City</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
