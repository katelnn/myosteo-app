import React from 'react';
import { Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// Import screens
import Dashboard from './screens/dashboard/dashboard';
import HealthPlan from './screens/healthPlan/healthPlan';
import OverallHealth from './screens/overallHealth/overallHealth';
import Contact from './screens/contact/contact';
import AddContact from './screens/contact/addContact'; 
import AddContactPhoto from './screens/contact/addContactPhoto'; 
import Indoor1 from './screens/healthPlan/indoor1'; 
import Indoor2 from './screens/healthPlan/indoor2'; 
import Indoor3 from './screens/healthPlan/indoor3'; 
import Indoor4 from './screens/healthPlan/indoor4'; 
import Outdoor1 from './screens/healthPlan/outdoor1'; 
import Outdoor1A from './screens/healthPlan/outdoor1A'; 
import Outdoor2 from './screens/healthPlan/outdoor2'; 
import Outdoor3 from './screens/healthPlan/outdoor3'; 
import Outdoor4 from './screens/healthPlan/outdoor4'; 
import AddMedication from './screens/healthPlan/addMedication'; 
import AddMedicationPhoto from './screens/healthPlan/addMedicationPhoto'; 
import Nutrition1 from './screens/healthPlan/nutrition1'; 
import AddNutritionPhoto from './screens/healthPlan/addNutritionPhoto'; 
import DailyLog from './screens/dashboard/dailyLog'; 


// Auth Screens
import WelcomeScreen from './screens/auth_screens/home';
import LogInScreen from './screens/auth_screens/logIn';
import CreateAccountScreen from './screens/auth_screens/createaccount';
import CreateAccountScreen1 from './screens/auth_screens/createaccount1';
import UserInfoScreen from './screens/auth_screens/userInfo';
import Tutorial1 from './screens/auth_screens/tutorial1';
import Tutorial2 from './screens/auth_screens/tutorial2';
import Tutorial3 from './screens/auth_screens/tutorial3';
import AddProfilePhoto from './screens/auth_screens/addProfilePhoto'; 

// Import styles
import { tabBarStyles } from './stylesheet/tabStyle';

// Load fonts
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Utility for tabBarIcon
const getTabBarIcon = (iconSource) => () => (
  <Image style={tabBarStyles.icon} source={iconSource} />
);

function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: tabBarStyles.tabBar,
        tabBarLabelStyle: { ...tabBarStyles.label, fontFamily: 'Poppins_400Regular' }, // Apply font to tab labels
      }}
      initialRouteName="HealthPlan"
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: getTabBarIcon(require('./assets/icons/dashboard2.png')),
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="HealthPlan"
        component={HealthPlan}
        options={{
          tabBarIcon: getTabBarIcon(require('./assets/icons/healthPlan1.png')),
          tabBarLabel: 'Tracker',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="OverallHealth"
        component={OverallHealth}
        options={{
          tabBarIcon: getTabBarIcon(require('./assets/icons/overallHealth1.png')),
          tabBarLabel: 'Insight',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarIcon: getTabBarIcon(require('./assets/icons/contact1.png')),
          tabBarLabel: 'Contacts',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium
  });

  if (!fontsLoaded) {
    return null; // or you can use a loading screen here
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeTab} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="CreateAccount1" component={CreateAccountScreen1} />
          <Stack.Screen name="AddProfilePhoto" component={AddProfilePhoto} />
          <Stack.Screen name="UserInfo" component={UserInfoScreen} />
          <Stack.Screen name="Tutorial1" component={Tutorial1} />
          <Stack.Screen name="Tutorial2" component={Tutorial2} />
          <Stack.Screen name="Tutorial3" component={Tutorial3} />
          <Stack.Screen name="DailyLog" component={DailyLog} />
          <Stack.Screen name="Indoor1" component={Indoor1} />
          <Stack.Screen name="Indoor2" component={Indoor2} />
          <Stack.Screen name="Indoor3" component={Indoor3} />
          <Stack.Screen name="Indoor4" component={Indoor4} />
          <Stack.Screen name="Outdoor1" component={Outdoor1} />
          <Stack.Screen name="Outdoor1A" component={Outdoor1A} />
          <Stack.Screen name="Outdoor2" component={Outdoor2} />
          <Stack.Screen name="Outdoor3" component={Outdoor3} />
          <Stack.Screen name="Outdoor4" component={Outdoor4} />
          <Stack.Screen name="Nutrition1" component={Nutrition1} />
          <Stack.Screen name="AddNutritionPhoto" component={AddNutritionPhoto} />
          <Stack.Screen name="AddContact" component={AddContact} />
          <Stack.Screen name="AddContactPhoto" component={AddContactPhoto} />
          <Stack.Screen name="AddMedication" component={AddMedication} />
          <Stack.Screen name="AddMedicationPhoto" component={AddMedicationPhoto} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
