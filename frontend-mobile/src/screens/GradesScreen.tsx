import { View, Text, ScrollView } from "react-native"
import { Award, TrendingUp, BookOpen } from "lucide-react-native"


interface Grade {
  name: string;
  score: number | null;
  maxScore: number;
  date: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
  grades: Grade[];
  average: number;
}

export default function GradesScreen() {
  const courses: Course[] = [
    {
      id: "1",
      name: "Digital Circuit Design",
      code: "ELE201",
      grades: [
        { name: "Lab 1", score: 9.0, maxScore: 10, date: "May 10, 2025" },
        { name: "Lab 2", score: 8.5, maxScore: 10, date: "May 17, 2025" },
        { name: "Lab 3", score: null, maxScore: 10, date: "Pending" },
      ],
      average: 8.75,
    },
    {
      id: "2",
      name: "Microcontroller Programming",
      code: "ELE305",
      grades: [
        { name: "Lab 1", score: 8.0, maxScore: 10, date: "May 12, 2025" },
        { name: "Lab 2", score: null, maxScore: 10, date: "Pending" },
      ],
      average: 8.0,
    },
    {
      id: "3",
      name: "Basic Circuit Analysis",
      code: "ELE101",
      grades: [
        { name: "Lab 1", score: 9.5, maxScore: 10, date: "April 5, 2025" },
        { name: "Lab 2", score: 9.0, maxScore: 10, date: "April 12, 2025" },
        { name: "Lab 3", score: 8.5, maxScore: 10, date: "April 19, 2025" },
        { name: "Final Lab", score: 9.0, maxScore: 10, date: "April 26, 2025" },
      ],
      average: 9.0,
    },
  ]

  const getGradeColor = (score: number | null) => {
    if (score === null) return "text-gray-400"
    if (score >= 9) return "text-green-600"
    if (score >= 7) return "text-blue-600"
    if (score >= 5) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
          <View className="flex-row items-center mb-4">
            <View>
              <Text className="text-xl font-bold">Your Lab Grades</Text>
              <Text className="text-gray-600">Spring 2025</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center p-3 bg-gray-100 rounded-lg">
            <View className="items-center">
              <Text className="text-gray-600 text-xs">Overall Average</Text>
              <Text className="text-xl font-bold text-primary">8.9</Text>
            </View>

            <View className="items-center">
              <Text className="text-gray-600 text-xs">Completed Labs</Text>
              <Text className="text-xl font-bold text-secondary">7/9</Text>
            </View>

            <View className="items-center">
              <Text className="text-gray-600 text-xs">Pending</Text>
              <Text className="text-xl font-bold text-yellow-500">2</Text>
            </View>
          </View>
        </View>

        {courses.map((course) => (
          <View key={course.id} className="bg-white p-4 rounded-xl mb-4 shadow-sm">
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-row items-center">
                <View>
                  <Text className="font-bold">{course.name}</Text>
                  <Text className="text-gray-600">{course.code}</Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <TrendingUp size={16} color="#16A34A" className="mr-1" />
                <Text className="font-bold text-green-600">{course.average}</Text>
              </View>
            </View>

            <View className="border-t border-gray-200 pt-3">
              {course.grades.map((grade, index) => (
                <View key={index} className="flex-row justify-between py-2 border-b border-gray-100">
                  <Text className="text-gray-700">{grade.name}</Text>
                  <View className="flex-row items-center">
                    <Text className={`font-medium ${getGradeColor(grade.score)}`}>
                      {grade.score !== null ? grade.score : "..."}
                    </Text>
                    <Text className="text-gray-400">/{grade.maxScore}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
