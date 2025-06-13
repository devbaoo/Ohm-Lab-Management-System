import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Bell, Calendar, BookOpen, AlertTriangle, Award, Users } from "lucide-react-native";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/route";
import { SafeAreaView } from "react-native-safe-area-context";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const upcomingLabs = [
    {
      id: "1",
      title: "Digital Circuit Design",
      date: "Today, 13:30 - 15:30",
      location: "Lab 305, Building A",
      course: "ELE201",
    },
    {
      id: "2",
      title: "Microcontroller Programming",
      date: "Tomorrow, 09:30 - 11:30",
      location: "Lab 401, Building A",
      course: "ELE305",
    },
  ];

  const notifications = [
    {
      id: "1",
      title: "Report Submission Reminder",
      message: "Your Digital Circuit Design report is due tomorrow",
      time: "2 hours ago",
      type: "reminder",
    },
    {
      id: "2",
      title: "New Practical Assignment",
      message: "New assignment added for Microcontroller Programming",
      time: "1 day ago",
      type: "assignment",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Welcome Section */}
        <View className="bg-primary p-6 rounded-b-3xl">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-white text-lg">Welcome back,</Text>
              <Text className="text-white text-xl font-bold">{user?.name}</Text>
              <Text className="text-white opacity-80">{user?.studentId}</Text>
            </View>
            <TouchableOpacity>
              <Image
                source={{ uri: user?.avatar || "https://i.pravatar.cc/150" }}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="p-4">
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity
              className="bg-white rounded-xl p-4 items-center shadow-sm w-[23%]"
              onPress={() => navigation.navigate("Schedule")}
            >
              <View className="bg-blue-100 p-2 rounded-full mb-2">
                <Calendar size={20} color="#0047CC" />
              </View>
              <Text className="text-xs text-center">Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-xl p-4 items-center shadow-sm w-[23%]"
              onPress={() => navigation.navigate("Practical")}
            >
              <View className="bg-green-100 p-2 rounded-full mb-2">
                <BookOpen size={20} color="#16A34A" />
              </View>
              <Text className="text-xs text-center">Practicals</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-xl p-4 items-center shadow-sm w-[23%]"
              onPress={() => navigation.navigate("Reports")}
            >
              <View className="bg-red-100 p-2 rounded-full mb-2">
                <AlertTriangle size={20} color="#DC2626" />
              </View>
              <Text className="text-xs text-center">Reports & Incidents</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-xl p-4 items-center shadow-sm w-[23%]"
              onPress={() => navigation.navigate("Grades")}
            >
              <View className="bg-purple-100 p-2 rounded-full mb-2">
                <Award size={20} color="#7E22CE" />
              </View>
              <Text className="text-xs text-center">Grades</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Labs */}
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold">Upcoming Labs</Text>
            <TouchableOpacity>
              <Text className="text-primary">See All</Text>
            </TouchableOpacity>
          </View>

          {upcomingLabs.map((lab) => (
            <TouchableOpacity key={lab.id} className="bg-white p-4 rounded-xl mb-3 shadow-sm">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="font-bold text-base">{lab.title}</Text>
                  <Text className="text-gray-600 mt-1">{lab.date}</Text>
                  <Text className="text-gray-600">{lab.location}</Text>
                  <View className="bg-blue-100 self-start px-2 py-1 rounded mt-2">
                    <Text className="text-blue-800 text-xs">{lab.course}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="bg-primary px-3 py-1 rounded"
                  onPress={() => navigation.navigate("PracticalDetail", { id: lab.id, title: lab.title })}
                >
                  <Text className="text-white">View</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Group Information */}
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold">My Lab Group</Text>
            <TouchableOpacity onPress={() => navigation.navigate("GroupInfo")}>
              <Text className="text-primary">Details</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-white p-4 rounded-xl mb-3 shadow-sm"
            onPress={() => navigation.navigate("GroupInfo")}
          >
            <View className="flex-row items-center mb-2">
              <View className="bg-orange-100 p-2 rounded-full mr-3">
                <Users size={20} color="#FF6600" />
              </View>
              <View>
                <Text className="font-bold">Group 3 - Digital Circuit Design</Text>
                <Text className="text-gray-600">4 members</Text>
              </View>
            </View>
            <View className="flex-row mt-2">
              {[1, 2, 3, 4].map((i) => (
                <Image
                  key={i}
                  source={{ uri: `https://i.pravatar.cc/150?img=${i}` }}
                  className="w-8 h-8 rounded-full mr-1 border border-white"
                />
              ))}
            </View>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View className="p-4 mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold">Notifications</Text>
            <TouchableOpacity>
              <Text className="text-primary">Clear All</Text>
            </TouchableOpacity>
          </View>

          {notifications.map((notification) => (
            <TouchableOpacity key={notification.id} className="bg-white p-4 rounded-xl mb-3 shadow-sm">
              <View className="flex-row">
                <View className="flex-1">
                  <Text className="font-bold">{notification.title}</Text>
                  <Text className="text-gray-600 mt-1">{notification.message}</Text>
                  <Text className="text-gray-400 text-xs mt-2">{notification.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}