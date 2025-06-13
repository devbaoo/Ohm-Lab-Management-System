import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native"
import { Mail, Phone, MessageCircle } from "lucide-react-native"

export default function GroupInfoScreen() {
  const groupMembers = [
    {
      id: "1",
      name: "Nguyen Van A",
      studentId: "SE123456",
      role: "Group Leader",
      email: "anv@fpt.edu.vn",
      phone: "0901234567",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      name: "Tran Thi B",
      studentId: "SE123457",
      role: "Member",
      email: "btt@fpt.edu.vn",
      phone: "0901234568",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: "3",
      name: "Le Van C",
      studentId: "SE123458",
      role: "Member",
      email: "clv@fpt.edu.vn",
      phone: "0901234569",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: "4",
      name: "Pham Thi D",
      studentId: "SE123459",
      role: "Member",
      email: "dpt@fpt.edu.vn",
      phone: "0901234570",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  ]

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
          <Text className="text-xl font-bold mb-2">Group 3</Text>
          <Text className="text-gray-600 mb-4">Digital Circuit Design (ELE201)</Text>

          <View className="flex-row items-center mb-4">
            <View className="bg-blue-100 px-3 py-1 rounded-full">
              <Text className="text-blue-800">4 Members</Text>
            </View>
            <View className="bg-green-100 px-3 py-1 rounded-full ml-2">
              <Text className="text-green-800">Active</Text>
            </View>
          </View>

          <Text className="font-medium mb-2">Lecturer in Charge</Text>
          <View className="flex-row items-center mb-4">
            <Image source={{ uri: "https://i.pravatar.cc/150?img=60" }} className="w-10 h-10 rounded-full mr-3" />
            <View>
              <Text className="font-bold">Dr. Nguyen Minh Tuan</Text>
              <Text className="text-gray-600">tuannm@fpt.edu.vn</Text>
            </View>
          </View>
        </View>

        <Text className="text-lg font-bold mb-3">Group Members</Text>

        {groupMembers.map((member) => (
          <View key={member.id} className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <View className="flex-row">
              <Image source={{ uri: member.avatar }} className="w-16 h-16 rounded-full mr-4" />
              <View className="flex-1">
                <Text className="font-bold text-lg">{member.name}</Text>
                <Text className="text-gray-600">{member.studentId}</Text>
                <View className="bg-orange-100 self-start px-2 py-1 rounded mt-1">
                  <Text className="text-orange-800 text-xs">{member.role}</Text>
                </View>
              </View>
            </View>

            <View className="mt-4 pt-4 border-t border-gray-200">
              <View className="flex-row items-center mb-2">
                <Mail size={16} color="#6B7280" className="mr-2" />
                <Text className="text-gray-600">{member.email}</Text>
              </View>
              <View className="flex-row items-center">
                <Phone size={16} color="#6B7280" className="mr-2" />
                <Text className="text-gray-600">{member.phone}</Text>
              </View>
            </View>

            <View className="flex-row mt-4">
              <TouchableOpacity className="bg-primary rounded-lg py-2 px-4 flex-row items-center mr-2">
                <Mail size={16} color="#FFFFFF" />
                <Text className="text-white font-medium ml-2">Email</Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-secondary rounded-lg py-2 px-4 flex-row items-center">
                <MessageCircle size={16} color="#FFFFFF" />
                <Text className="text-white font-medium ml-2">Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
