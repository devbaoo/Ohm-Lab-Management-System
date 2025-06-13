import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Plus, CheckCircle, Clock } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ReportsScreen() {
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState("reports")

  const reports = [
    {
      id: "1",
      title: "Digital Circuit Design - Lab 1",
      date: "May 15, 2025",
      status: "submitted",
      feedback: "Pending review",
      course: "ELE201",
    },
    {
      id: "2",
      title: "Basic Circuit Analysis - Final Report",
      date: "April 28, 2025",
      status: "graded",
      grade: "A",
      feedback: "Excellent work on the circuit analysis",
      course: "ELE101",
    },
  ]

  const incidents = [
    {
      id: "1",
      title: "Faulty Oscilloscope",
      date: "May 10, 2025",
      status: "resolved",
      description: "Oscilloscope in Lab 305 not calibrating properly",
    },
    {
      id: "2",
      title: "Missing Components",
      date: "May 5, 2025",
      status: "pending",
      description: "Several 74LS08 ICs missing from component box",
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        <View className="bg-primary p-6">
          <Text className="text-white text-xl font-bold">Reports & Incidents</Text>
          <Text className="text-white opacity-80">Manage your lab reports and incident reports</Text>
        </View>

        <View className="flex-row bg-white">
          <TouchableOpacity
            className={`flex-1 py-3 items-center ${activeTab === "reports" ? "border-b-2 border-primary" : ""}`}
            onPress={() => setActiveTab("reports")}
          >
            <Text className={activeTab === "reports" ? "text-primary font-bold" : "text-gray-600"}>Lab Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 items-center ${activeTab === "incidents" ? "border-b-2 border-primary" : ""}`}
            onPress={() => setActiveTab("incidents")}
          >
            <Text className={activeTab === "incidents" ? "text-primary font-bold" : "text-gray-600"}>Incidents</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="p-4">
          {activeTab === "reports" ? (
            <>
              <View className="flex-row justify-between items-center mb-3">
                <TouchableOpacity
                  className="bg-primary rounded-lg py-2 px-3 flex-row items-center"
                  onPress={() => navigation.navigate("SubmitReport" as never)}
                >
                  <Plus size={16} color="#FFFFFF" />
                  <Text className="text-white font-medium ml-1">New Report</Text>
                </TouchableOpacity>
              </View>

              {reports.map((report) => (
                <TouchableOpacity key={report.id} className="bg-white p-4 rounded-xl mb-3 shadow-sm">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-row items-start flex-1">
                      <View>
                        <Text className="font-bold">{report.title}</Text>
                        <Text className="text-gray-600 mt-1">Submitted: {report.date}</Text>
                        <View className="bg-blue-100 self-start px-2 py-1 rounded mt-1">
                          <Text className="text-blue-800 text-xs">{report.course}</Text>
                        </View>
                      </View>
                    </View>

                    <View className="items-end">
                      {report.status === "submitted" ? (
                        <View className="flex-row items-center">
                          <Clock size={16} color="#F59E0B" />
                          <Text className="text-yellow-500 ml-1">Pending</Text>
                        </View>
                      ) : (
                        <View className="flex-row items-center">
                          <CheckCircle size={16} color="#16A34A" />
                          <Text className="text-green-600 ml-1">Graded: {report.grade}</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View className="mt-3">
                    <Text className="text-gray-600">{report.feedback}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              <View className="flex-row justify-between items-center mb-3">
                <TouchableOpacity
                  className="bg-red-500 rounded-lg py-2 px-3 flex-row items-center"
                  onPress={() => navigation.navigate("ReportIncident" as never)}
                >
                  <Plus size={16} color="#FFFFFF" />
                  <Text className="text-white font-medium ml-1">Report Incident</Text>
                </TouchableOpacity>
              </View>

              {incidents.map((incident) => (
                <TouchableOpacity key={incident.id} className="bg-white p-4 rounded-xl mb-3 shadow-sm">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-row items-start flex-1">
                      <View>
                        <Text className="font-bold">{incident.title}</Text>
                        <Text className="text-gray-600 mt-1">{incident.date}</Text>
                        <Text className="text-gray-600 mt-1">{incident.description}</Text>
                      </View>
                    </View>

                    <View className="items-end">
                      {incident.status === "resolved" ? (
                        <View className="flex-row items-center">
                          <CheckCircle size={16} color="#16A34A" />
                          <Text className="text-green-600 ml-1">Resolved</Text>
                        </View>
                      ) : (
                        <View className="flex-row items-center">
                          <Clock size={16} color="#F59E0B" />
                          <Text className="text-yellow-500 ml-1">Pending</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
