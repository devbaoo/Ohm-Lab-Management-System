import { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react-native"
import { Calendar } from "react-native-calendars";

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  location: string;
  course: string;
}

type ScheduleData = {
  [date: string]: ScheduleItem[];
};

interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
    selected?: boolean;
    selectedColor?: string;
  };
}

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState("2025-05-21")

  const scheduleData: ScheduleData = {
    "2025-05-21": [
      {
        id: "1",
        title: "Digital Circuit Design",
        time: "13:30 - 15:30",
        location: "Lab 305, Building A",
        course: "ELE201",
      },
    ],
    "2025-05-22": [
      {
        id: "2",
        title: "Microcontroller Programming",
        time: "09:30 - 11:30",
        location: "Lab 401, Building A",
        course: "ELE305",
      },
    ],
    "2025-05-24": [
      {
        id: "3",
        title: "Electronic Devices",
        time: "13:30 - 16:30",
        location: "Lab 302, Building A",
        course: "ELE203",
      },
    ],
  }

  const markedDates: MarkedDates = Object.keys(scheduleData).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: "#FF6600" };
    if (date === selectedDate) {
      acc[date] = { ...acc[date], selected: true, selectedColor: "#FF6600" };
    }
    return acc;
  }, {} as MarkedDates);

  return (
    <View className="flex-1 bg-background">
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          todayTextColor: "#FF6600",
          arrowColor: "#FF6600",
          dotColor: "#FF6600",
          selectedDayBackgroundColor: "#FF6600",
        }}
      />

      <View className="p-4">
        <Text className="text-lg font-bold mb-3">
          {selectedDate === "2025-05-21" ? "Today's Schedule" : "Schedule for " + selectedDate}
        </Text>

        <ScrollView className="pb-4">
          {scheduleData[selectedDate] ? (
            scheduleData[selectedDate].map((item) => (
              <View key={item.id} className="bg-white p-4 rounded-xl mb-3 shadow-sm">
                <View className="flex-row items-center mb-2">
                  <View className="bg-primary w-2 h-full mr-3 rounded-full" style={{ height: 40 }} />
                  <View>
                    <Text className="font-bold text-base">{item.title}</Text>
                    <View className="bg-blue-100 self-start px-2 py-1 rounded mt-1">
                      <Text className="text-blue-800 text-xs">{item.course}</Text>
                    </View>
                  </View>
                </View>

                <View className="mt-3 ml-5">
                  <View className="flex-row items-center mb-2">
                    <Clock size={16} color="#6B7280" className="mr-2" />
                    <Text className="text-gray-600">{item.time}</Text>
                  </View>

                  <View className="flex-row items-center">
                    <MapPin size={16} color="#6B7280" className="mr-2" />
                    <Text className="text-gray-600">{item.location}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className="bg-white p-6 rounded-xl items-center justify-center">
              <CalendarIcon size={40} color="#D1D5DB" />
              <Text className="text-gray-400 mt-2 text-center">No lab sessions scheduled for this day</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  )
}
