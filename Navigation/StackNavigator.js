import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
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
import NotificationScreen from '../Screens/NotificationScreen';
import ModalScreen from '../Components/ModalScreen'
import AnalyticsScreen from '../Screens/AnalyticsScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const Hello = () => <View style={{ flex: 1, backgroundColor: 'red' }}></View>

  function BottomTabs() {

    const navigation = useNavigation();

    return (
      <Tab.Navigator

        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              'position': 'absolute',
              'bottom': 25,
              left: 20,
              right: 20,
              elevation: 0,
              backgroundColor: "#fff",
              borderRadius: 15,
              height: 80,
              ...styles.shadow
            }
          ]
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },

            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={26} color='#1aca78' />
              ) : (
                <AntDesign name="home" size={26} color='black' />
              ),
          }}
        />

        <Tab.Screen name='Post'
          component={Hello}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault()

            },
          })}

          options={{
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                style={{
                  top: -10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  ...styles.shadow
                }}

                onPress={() => navigation.navigate("Modal")}
              >
                <View style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor:'#1aca78',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Ionicons name="add" size={30} style={{ color: "#fff" }} />
                </View>
              </TouchableOpacity>
            )
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
                <Ionicons name="person" size={26} color='#1aca78' />
              ) : (
                <Ionicons name="person-outline" size={26} />
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
        options={{}}
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
        options={{}}
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
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}

      />
      <Stack.Screen
        name="Analytics"
        component={AnalyticsScreen}

      />
        <Stack.Screen  headerShown={false} options={{animationEnabled:true,presentation:'transparentModal', headerShown:false,
     
    }}
      
       name='Modal' component={ModalScreen} />

      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  </NavigationContainer>
}

export default StackNavigator

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})