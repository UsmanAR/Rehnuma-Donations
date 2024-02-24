import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from '../Screens/LoginScreen'
import RagisterScreen from '../Screens/RagisterScreen'
import HomeScreen from '../Screens/HomeScreen'
import ProfileScreen from '../Screens/ProfileScreen';
import CarouselPage from '../Components/CarouselPage';
import Order from '../Screens/Order';


import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import StudentInfoScreen from '../Screens/StudentInfoScreen';
import Fullpage from '../Screens/Fullpage';
import SearchResult from '../Screens/SearchResult';
import DonationDoneScreen from '../Screens/DonationDoneScreen';
import DonatedScreen from '../Screens/DonatedScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown:false,
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
           
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={26} color='#1aca78'/>
              ) : (
                <AntDesign name="home" size={26} color='black'/>
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={26} color='#1aca78'/>
              ) : (
                <Ionicons name="person-outline" size={26}/>
              ),
          }}
        />

      </Tab.Navigator>
    );
  }
  return <NavigationContainer>

    <Stack.Navigator initialRouteName='Login'>


      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
     

      <Stack.Screen
        name="Register"
        component={RagisterScreen}
        options={{ headerShown: false }}
      />
        <Stack.Screen
          name="Info"
          component={StudentInfoScreen}
          options={{  }}
        />
        <Stack.Screen
          name="Order"
          component={Order}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Full"
          component={Fullpage}
          options={{}}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResult}
          options={{ }}
        />
        <Stack.Screen
          name="DonationDone"
          component={DonationDoneScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DonatedScreen"
          component={DonatedScreen}
          options={{ headerShown: false }}
        />

      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  </NavigationContainer>
}

export default StackNavigator

const styles = StyleSheet.create({})