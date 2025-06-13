import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
    Home: undefined;
    GroupInfo: undefined;
    Grades: undefined;
    Schedule: undefined;
    Practical: undefined;
    PracticalDetail: { id: string; title: string };
    Reports: undefined;
    SubmitReport: undefined;
    ReportIncident: undefined;
    Profile: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();