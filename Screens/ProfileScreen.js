import { Image, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { UserType } from '../Context/UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';
import img from '../assets/image.jpg'
import ProgressBar from 'react-native-progress/Bar'
import RehnumaLogo from '../assets/RehnumaLogo.png'
import { MaterialIcons } from '@expo/vector-icons';



const ProfileScreen = () => {

  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);



  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        // <Image
        //   style={{ width: 120, height: 90,resizeMode:'contain'}}
        //   source={RehnumaLogo}
        // />
<>
        <Text style={{fontWeight:"bold",color:'#FFF7F1',fontSize:22,marginHorizontal:6}}>
          Rehnuma
        </Text>
        <Text style={{fontWeight:"bold",color:'#FFF7F1',fontSize:12,marginHorizontal:6,fontStyle:'italic'}}>
         Let's Help Needy
        </Text>
        </>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          {/* <Icons name='Ionnotification' color='black' />
        <Icons name='antsearch' color='black' /> */}
          {/* <Ionicons name="notifications-outline" size={24} color="black" />

        <AntDesign name="search1" size={24} color="black" /> */}
        </View>
      ),
    })

  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setUserId(token)
      // console.log(userId)



    }

    fetchUser();

  }, [userId]);

  const [user, setUser] = useState("");
  const [donations, setDonation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {

      try {
        const response = await axios.get(
          `http://192.168.193.200:8000/profile/${userId}`
        );


        const { user } = response.data;

        setUser(user);
        // console.log(user)

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };

  useEffect(() => {
    const fetchDonation = async () => {

      try {

        const response = await axios.get(`http://192.168.193.200:8000/donations/${userId}`);
         const donation = response.data.donation;
        setDonation(donation)
        // console.log(donation.donations.name)

        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDonation();
  }, [user]);



  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Welcome {user?.name}</Text>

    

<View  style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}>
                <Pressable  style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}>
        <Text  style={{ textAlign: "center" }}>See Analytics</Text> 
      </Pressable>
      <Pressable  style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}>
        <Text   
        onPress={logout} 
        style={{ textAlign: "center" }}>Logout</Text> 
      </Pressable>      
</View>

          <View  style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >
            <Text style={{fontSize:18,fontWeight:700,color:'black'}}>Your Donations</Text>
          <Pressable
          //  onPress={()=>{if(students.length>0){navigation.navigate("Full",{item:students,sorted:false,field:''})}}}
           style={{flexDirection:"row",alignItems:"center", marginVertical:20}}>
            <Text style={{fontSize:16,fontWeight:600,color:'#580ff5'}}>See all</Text>
            <MaterialIcons name="arrow-right" size={30} color="black" />
          </Pressable>

          </View>
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  
        {loading ?<Loader />: donations.length > 0 ? (
          donations.map((donation,index) => (
         
            <Pressable 
            key={index}
       
        style={[styles.CardProp, { flexDirection: 'column', width: 250, height: 350 }]}>
            <Image source={img} style={{ width: 220, height: 150, margin: 18, borderRadius: 10 }} />
            <View style={{ marginHorizontal: 18 }}>

                <Text style={{ fontWeight: 700, fontSize: 15 }}>{donation.donations.name.firstName} {donation.donations.name.lastName}</Text>
                <Text style={{ fontWeight: 500, fontSize: 12, marginVertical: 5, color: "#C0C0C0" }}>Usman Need Person, He Got Placement but he need more MONEY</Text>
                <View style={{ marginVertical: 10 }}>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>


                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: '#580ff5', fontWeight: 700, marginHorizontal: 5 }}>₹{donation.donations.donatedAmount}</Text>
                        <Text style={{ fontWeight: 500, color: "#C0C0C0" }}>Donated</Text>
                    </View>
              

                </View>
            </View>
        </Pressable>
          ))
        ) : (
          <Text>No Donations found</Text>
        )}
      </ScrollView>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})