import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Calendar, BookOpen, FileText, User } from "lucide-react-native";

import HomeScreen from "../screens/HomeScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import PracticalScreen from "../screens/PracticalScreen";
import ReportsScreen from "../screens/ReportsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PracticalDetailScreen from "../screens/PracticalDetailScreen";
import SubmitReportScreen from "../screens/SubmitReportScreen";
import ReportIncidentScreen from "../screens/ReportIncidentScreen";
import GroupInfoScreen from "../screens/GroupInfoScreen";
import GradesScreen from "../screens/GradesScreen";
import { RootStackParamList } from "../types/route";

const Tab = createBottomTabNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<RootStackParamList>();
const PracticalStack = createNativeStackNavigator<RootStackParamList>();
const ReportsStack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="GroupInfo" component={GroupInfoScreen} options={{ title: "Group Information" }} />
      <HomeStack.Screen name="Grades" component={GradesScreen} options={{ title: "My Grades" }} />
    </HomeStack.Navigator>
  );
};

const PracticalStackNavigator = () => {
  return (
    <PracticalStack.Navigator>
      <PracticalStack.Screen name="Practical" component={PracticalScreen} options={{ headerShown: false }} />
      <PracticalStack.Screen
        name="PracticalDetail"
        component={PracticalDetailScreen}
        options={{ title: "Practical Details" }}
      />
    </PracticalStack.Navigator>
  );
};

const ReportsStackNavigator = () => {
  return (
    <ReportsStack.Navigator>
      <ReportsStack.Screen name="Reports" component={ReportsScreen} options={{ headerShown: false }} />
      <ReportsStack.Screen name="SubmitReport" component={SubmitReportScreen} options={{ title: "Submit Report" }} />
      <ReportsStack.Screen
        name="ReportIncident"
        component={ReportIncidentScreen}
        options={{ title: "Report Incident" }}
      />
    </ReportsStack.Navigator>
  );
};

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF6600",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: "#FF6600",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          headerTitle: "Ohm Electronics Lab",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
          headerTitle: "Lab Schedule",
        }}
      />
      <Tab.Screen
        name="Practical"
        component={PracticalStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
          headerTitle: "Practical Instructions",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <FileText size={24} color={color} />,
          headerTitle: "Reports & Incidents",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
          headerTitle: "My Profile",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}