import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Clock, FileText, Download, Users, CheckCircle, AlertTriangle } from "lucide-react-native";
import { RootStackParamList } from "../types/route"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PracticalDetailRouteProp = RouteProp<RootStackParamList, "PracticalDetail">;

export default function PracticalDetailScreen() {
  const route = useRoute<PracticalDetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { id, title } = route.params;

  const practicalDetails = {
    id,
    title,
    description: "Design and implementation of combinational logic circuits using digital ICs and breadboard.",
    objectives: [
      "Understand the principles of combinational logic design",
      "Implement basic logic gates using ICs",
      "Design and build a 4-bit adder circuit",
      "Verify circuit operation using logic analyzers",
    ],
    equipment: [
      "74LS00 (NAND Gate)",
      "74LS02 (NOR Gate)",
      "74LS04 (NOT Gate)",
      "74LS08 (AND Gate)",
      "Breadboard",
      "Jumper wires",
      "Logic analyzer",
    ],
    instructions: [
      "Set up the breadboard with power connections",
      "Design the truth table for your circuit",
      "Implement the circuit using the provided ICs",
      "Test each gate individually before connecting",
      "Verify the complete circuit operation",
      "Document your results and observations",
    ],
    dueDate: "May 25, 2025",
    submissionType: "Report + Demo",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop",
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <Image source={{ uri: practicalDetails.image }} className="w-full h-48" resizeMode="cover" />

      <View className="p-4">
        <Text className="text-2xl font-bold">{practicalDetails.title}</Text>
        <Text className="text-gray-600 mt-1">{practicalDetails.description}</Text>

        <View className="flex-row items-center mt-3 mb-4">
          <Clock size={16} color="#6B7280" />
          <Text className="text-gray-600 ml-1">Due: {practicalDetails.dueDate}</Text>
          <Text className="text-gray-600 ml-4">Submission: {practicalDetails.submissionType}</Text>
        </View>

        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            className="bg-primary rounded-lg py-2 px-4 flex-row items-center"
            onPress={() => navigation.navigate("SubmitReport")} // Direct navigation to SubmitReport
          >
            <FileText size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-2">Submit Report</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-secondary rounded-lg py-2 px-4 flex-row items-center" onPress={() => { }}>
            <Download size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-2">Download Materials</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
          <Text className="text-lg font-bold mb-2">Learning Objectives</Text>
          {practicalDetails.objectives.map((objective, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <CheckCircle size={16} color="#16A34A" className="mr-2 mt-1" />
              <Text className="text-gray-700 flex-1">{objective}</Text>
            </View>
          ))}
        </View>

        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
          <Text className="text-lg font-bold mb-2">Required Equipment</Text>
          {practicalDetails.equipment.map((item, index) => (
            <Text key={index} className="text-gray-700 mb-1">
              • {item}
            </Text>
          ))}
        </View>

        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
          <Text className="text-lg font-bold mb-2">Instructions</Text>
          {practicalDetails.instructions.map((instruction, index) => (
            <View key={index} className="mb-3">
              <Text className="text-gray-700 font-medium">Step {index + 1}</Text>
              <Text className="text-gray-600">{instruction}</Text>
            </View>
          ))}
        </View>

        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
          <Text className="text-lg font-bold mb-2">Your Lab Group</Text>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate("GroupInfo")} // Direct navigation to GroupInfo
          >
            <View className="bg-orange-100 p-2 rounded-full mr-3">
              <Users size={20} color="#FF6600" />
            </View>
            <View className="flex-1">
              <Text className="font-bold">Group 3</Text>
              <Text className="text-gray-600">4 members</Text>
            </View>
            <Text className="text-primary">View</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-red-50 p-4 rounded-xl mb-6 flex-row items-center"
          onPress={() => navigation.navigate("ReportIncident")} 
        >
          <AlertTriangle size={24} color="#DC2626" className="mr-3" />
          <View className="flex-1">
            <Text className="font-bold text-red-600">Report an Incident</Text>
            <Text className="text-gray-600">Having issues with equipment or safety concerns?</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}