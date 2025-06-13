import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Camera, Check, AlertTriangle } from "lucide-react-native"
import { Picker } from "@react-native-picker/picker"

export default function ReportIncidentScreen() {
  const navigation = useNavigation()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [severity, setSeverity] = useState("medium")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const locations = [
    { label: "Select a location", value: "" },
    { label: "Lab 305, Building A", value: "Lab 305, Building A" },
    { label: "Lab 401, Building A", value: "Lab 401, Building A" },
    { label: "Lab 302, Building A", value: "Lab 302, Building A" },
  ]

  const severityLevels = [
    { label: "Low - Minor issue, can continue working", value: "low" },
    { label: "Medium - Affects work but not critical", value: "medium" },
    { label: "High - Critical issue, cannot continue", value: "high" },
  ]

  const handleSubmit = () => {
    if (!title || !description || !location) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Incident reported successfully!")
      navigation.goBack()
    }, 2000)
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <View className="bg-red-50 p-4 rounded-xl mb-4 flex-row items-center">
          <AlertTriangle size={24} color="#DC2626" className="mr-3" />
          <View className="flex-1">
            <Text className="font-bold text-red-600">Report an Incident</Text>
            <Text className="text-gray-600">
              Use this form to report equipment issues, safety concerns, or other incidents in the lab.
            </Text>
          </View>
        </View>

        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
          <Text className="font-medium mb-2">
            Incident Title <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
            placeholder="Brief title of the incident"
            value={title}
            onChangeText={setTitle}
          />

          <Text className="font-medium mb-2">
            Location <Text className="text-red-500">*</Text>
          </Text>
          <View className="bg-gray-100 rounded-lg mb-4">
            <Picker selectedValue={location} onValueChange={(itemValue) => setLocation(itemValue)}>
              {locations.map((loc, index) => (
                <Picker.Item key={index} label={loc.label} value={loc.value} />
              ))}
            </Picker>
          </View>

          <Text className="font-medium mb-2">Severity Level</Text>
          <View className="bg-gray-100 rounded-lg mb-4">
            <Picker selectedValue={severity} onValueChange={(itemValue) => setSeverity(itemValue)}>
              {severityLevels.map((level, index) => (
                <Picker.Item key={index} label={level.label} value={level.value} />
              ))}
            </Picker>
          </View>

          <Text className="font-medium mb-2">
            Description <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
            placeholder="Describe the incident in detail"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <TouchableOpacity className="border-2 border-dashed border-gray-300 rounded-lg p-6 items-center justify-center mb-4">
            <Camera size={24} color="#6B7280" />
            <Text className="text-gray-600 mt-2">Add Photos (Optional)</Text>
            <Text className="text-gray-400 text-xs mt-1">Take photos or upload from gallery</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-end mb-6">
          <TouchableOpacity className="bg-gray-200 rounded-lg py-3 px-5 mr-3" onPress={() => navigation.goBack()}>
            <Text className="font-medium">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-500 rounded-lg py-3 px-5 flex-row items-center"
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <>
                <Check size={20} color="#FFFFFF" />
                <Text className="text-white font-medium ml-2">Submit Report</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
