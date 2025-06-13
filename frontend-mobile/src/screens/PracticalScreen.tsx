import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BookOpen, Clock, ChevronRight } from "lucide-react-native";
import { RootStackParamList } from "../types/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PracticalScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const practicals = [
    {
      id: "1",
      title: "Digital Circuit Design",
      description: "Design and implementation of combinational logic circuits",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop",
      progress: 75,
      dueDate: "May 25, 2025",
      course: "ELE201",
    },
    {
      id: "2",
      title: "Microcontroller Programming",
      description: "Programming Arduino for sensor interfacing and control",
      image: "https://images.unsplash.com/photo-1553406830-ef409b4a1171?q=80&w=2070&auto=format&fit=crop",
      progress: 30,
      dueDate: "May 28, 2025",
      course: "ELE305",
    },
    {
      id: "3",
      title: "Electronic Devices",
      description: "Characterization of semiconductor devices and circuits",
      image: "https://images.unsplash.com/photo-1563770557593-8f81e11a6ff6?q=80&w=2070&auto=format&fit=crop",
      progress: 0,
      dueDate: "June 2, 2025",
      course: "ELE203",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        <ScrollView className="p-4">
          <Text className="text-lg font-bold mb-3">Current Practicals</Text>

          {practicals.map((practical) => (
            <TouchableOpacity
              key={practical.id}
              className="bg-white rounded-xl mb-4 shadow-sm overflow-hidden"
              onPress={() =>
                navigation.navigate("PracticalDetail", { id: practical.id, title: practical.title })
              }
            >
              <Image source={{ uri: practical.image }} className="w-full h-40" resizeMode="cover" />

              <View className="p-4">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="font-bold text-lg">{practical.title}</Text>
                    <Text className="text-gray-600 mt-1">{practical.description}</Text>
                  </View>
                  <View className="bg-blue-100 self-start px-2 py-1 rounded">
                    <Text className="text-blue-800 text-xs">{practical.course}</Text>
                  </View>
                </View>

                <View className="flex-row items-center mt-3">
                  <Clock size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-1">Due: {practical.dueDate}</Text>
                </View>

                <View className="mt-3">
                  <View className="bg-gray-200 h-2 rounded-full w-full">
                    <View
                      className={`h-2 rounded-full ${practical.progress === 0
                        ? "bg-gray-400"
                        : practical.progress < 50
                          ? "bg-yellow-500"
                          : "bg-green-500"
                        }`}
                      style={{ width: `${practical.progress}%` }}
                    />
                  </View>
                  <Text className="text-gray-600 text-xs mt-1">
                    {practical.progress === 0 ? "Not started" : `${practical.progress}% complete`}
                  </Text>
                </View>

                <View className="flex-row justify-end mt-2">
                  <View className="flex-row items-center">
                    <Text className="text-primary font-medium mr-1">View Details</Text>
                    <ChevronRight size={16} color="#FF6600" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <Text className="text-lg font-bold mb-3 mt-2">Past Practicals</Text>

          <TouchableOpacity className="bg-white rounded-xl mb-4 shadow-sm overflow-hidden">
            <View className="p-4">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="font-bold text-lg">Basic Circuit Analysis</Text>
                  <Text className="text-gray-600 mt-1">Measurement of voltage, current, and resistance</Text>
                </View>
                <View className="bg-blue-100 self-start px-2 py-1 rounded">
                  <Text className="text-blue-800 text-xs">ELE101</Text>
                </View>
              </View>

              <View className="flex-row items-center mt-3">
                <BookOpen size={16} color="#16A34A" />
                <Text className="text-green-600 ml-1">Completed</Text>
              </View>

              <View className="mt-3">
                <View className="bg-gray-200 h-2 rounded-full w-full">
                  <View className="h-2 rounded-full bg-green-500 w-full" />
                </View>
                <Text className="text-gray-600 text-xs mt-1">100% complete</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}