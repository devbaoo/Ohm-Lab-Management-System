import React from "react"
import { View, Text, ScrollView, Image, TouchableOpacity, Switch } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { User, Settings, Bell, Moon, LogOut, ChevronRight, Shield, HelpCircle, BookOpen } from "lucide-react-native"
import { useAuth } from "../context/AuthContext"
import { RootStackParamList } from "../types/route"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native-safe-area-context"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const { user, logout } = useAuth()
  const navigation = useNavigation<NavigationProp>();
  const [darkMode, setDarkMode] = React.useState(false)
  const [notifications, setNotifications] = React.useState(true)

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="bg-primary p-6 items-center">
          <Image
            source={{ uri: user?.avatar || "https://i.pravatar.cc/150" }}
            className="w-24 h-24 rounded-full border-4 border-white mb-3"
          />
          <Text className="text-white text-xl font-bold">{user?.name}</Text>
          <Text className="text-white opacity-80">{user?.studentId}</Text>
          <Text className="text-white opacity-80">{user?.email}</Text>
        </View>

        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm mb-4">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-full mr-3">
                  <User size={20} color="#0047CC" />
                </View>
                <Text className="font-medium">Edit Profile</Text>
              </View>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-between p-4 border-b border-gray-100"
              onPress={() => navigation.navigate("Grades")}
            >
              <View className="flex-row items-center">
                <View className="bg-purple-100 p-2 rounded-full mr-3">
                  <BookOpen size={20} color="#7E22CE" />
                </View>
                <Text className="font-medium">My Grades</Text>
              </View>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <View className="bg-green-100 p-2 rounded-full mr-3">
                  <Settings size={20} color="#16A34A" />
                </View>
                <Text className="font-medium">Account Settings</Text>
              </View>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-xl shadow-sm mb-4">
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="bg-yellow-100 p-2 rounded-full mr-3">
                  <Bell size={20} color="#F59E0B" />
                </View>
                <Text className="font-medium">Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#D1D5DB", true: "#FF8533" }}
                thumbColor={notifications ? "#FF6600" : "#F3F4F6"}
              />
            </View>

            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <View className="bg-gray-100 p-2 rounded-full mr-3">
                  <Moon size={20} color="#6B7280" />
                </View>
                <Text className="font-medium">Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#D1D5DB", true: "#FF8533" }}
                thumbColor={darkMode ? "#FF6600" : "#F3F4F6"}
              />
            </View>
          </View>

          <View className="bg-white rounded-xl shadow-sm mb-4">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="bg-red-100 p-2 rounded-full mr-3">
                  <Shield size={20} color="#DC2626" />
                </View>
                <Text className="font-medium">Privacy Policy</Text>
              </View>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-full mr-3">
                  <HelpCircle size={20} color="#0047CC" />
                </View>
                <Text className="font-medium">Help & Support</Text>
              </View>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-red-50 p-4 rounded-xl flex-row items-center justify-center mb-6"
            onPress={handleLogout}
          >
            <LogOut size={20} color="#DC2626" className="mr-2" />
            <Text className="font-medium text-red-600">Logout</Text>
          </TouchableOpacity>

          <Text className="text-center text-gray-500 mb-6">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}
