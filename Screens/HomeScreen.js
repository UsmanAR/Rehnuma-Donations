import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable, TextInput, Image, } from 'react-native'
import { useState, useEffect, useCallback, useContext, useLayoutEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import img from '../assets/image.jpg'
import Card from "../Components/Card";
import CarouselPage from '../Components/CarouselPage';
import SearchResult from './SearchResult';
import Loader from '../Components/Loader';
import { UserType } from '../Context/UserContext';

const HomeScreen = () => {

  const navigation = useNavigation();

  const [students, setStudents] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState('')
  const [loader, setLoader] = useState(true)

  const [user, setUser] = useState("");
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setUserId(token)
      // console.log(userId)



    }

    fetchUser();

  }, [userId]);



  useEffect(() => {
    const fetchUserProfile = async () => {

      try {
        const response = await axios.get(
          `http:192.168.153.200:8000/profile/${userId}`
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

  const fetchData = async () => {
    try {
      const response = await axios.get("http:192.168.153.200:8000/students");
      setStudents(response.data.beneficiaries.filter((item)=>item.selectionStatus != 'Under Review'));
      setLoader(false)
      // console.log(response.data)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  };


  useEffect(() => {
  
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = await AsyncStorage.getItem("authToken");
  //     const decodedToken = jwt_decode(token);
  //     const userId = decodedToken.userId;
  //     setUserId(userId);
  //   };

  //   fetchUser();
  // }, []);



  return (
    <>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: "#FFf",
       
      }}>



        {
          loader ? <Loader /> : <ScrollView style={{
            flex: 1,
            backgroundColor: "#fff",
          


          }}>
            <ScrollView style={{
              paddingVertical: 30,
          
              backgroundColor: "#1dd881",
            }} >
              <View style={{paddingVertical:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

               
<Image source={img} style={{width:40,height:40,borderRadius:50,marginRight:30,marginLeft:10}}/>

                <View>             
              <Text style={{ fontWeight: 500,color:'#fff' ,fontSize: 15}}>Assalamu Alaikum</Text>
              <Text style={{ fontWeight: 600, fontSize: 20 }}>Mr. {user?.name}</Text>
              </View>
              </View>

              <Pressable   onPress={() =>  { navigation.navigate("Notification", data=students)} }>

              <MaterialIcons name='notifications'  style={{fontSize:35,marginRight:20}}/>
              </Pressable>
            </View>

            </ScrollView>

            <ScrollView style={{  flexDirection: "column", gap: 5, paddingHorizontal: 10,backgroundColor:"#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20,top:-20,zIndex:1,paddingBottom:70}}>
             
              <Pressable
                onPress={() => { if (students.length > 0) { navigation.navigate("SearchResult", { item: students, searchinput: query }) } }}

                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 7,
                  gap: 10,
                  backgroundColor: "#f0f0f0",
                  marginVertical: 20,
                  marginHorizontal: 15,
                  borderRadius: 3,
                  height: 38,
                  flex: 1,
                  paddingVertical: 5,
                  borderRadius: 15


                }}>
                <AntDesign
                  style={{ paddingLeft: 10 }}
                  name="search1"
                  size={22}
                  color="black"
                />
                <TextInput placeholder="Search Students..." style={{ width: "100%" }} onChangeText={(value) => setQuery(value)}

                  onSubmitEditing={() => {
                    if (students.length > 0 && query.length > 0) {
                      navigation.navigate("SearchResult", { item: students, searchinput: query });
                    }
                  }} />
              </Pressable>

              <View style={styles.shadowProp}>



                <ScrollView >

                  <CarouselPage />
                  {/* <SliderBox images={images.image}
                autoplay
                circleloop
                paginationBoxVerticalPadding={20}
                dotColor={"white"}
                inactiveDotColor={"#9084ae"}
                ImageComponentStyle={{ width: '100%' }} /> */}


                </ScrollView>
              </View>
              <ScrollView>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >
                  <Text style={{ fontSize: 18, fontWeight: 700, color: 'black' }}>Donations</Text>
                  <Pressable
                    onPress={() => { if (students.length > 0) { navigation.navigate("Full", { item: students, sorted: false, field: '' }) } }}
                    style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 600, color: '#1aca78' }}>See all</Text>
                    <MaterialIcons name="arrow-right" size={30} color="black" />
                  </Pressable>

                </View>

              </ScrollView>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ gap: 5, paddingVertical: 10, }}>
                {
                  students.length > 0 && (
                    students.map((data, index) => {
                      return <Card key={index} data={data} />
                    })
                  )
                }
              </ScrollView>

              <ScrollView>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >
                  <Text style={{ fontSize: 18, fontWeight: 700, color: 'black' }}>Engineers</Text>
                  <Pressable
                    onPress={() => { if (students.length > 0) { navigation.navigate("Full", { item: students, sorted: true, field: 'Engineering' }) } }}
                    style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 600, color: '#1aca78' }}>See all</Text>
                    <MaterialIcons name="arrow-right" size={30} color="black" />
                  </Pressable>

                </View>

              </ScrollView>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, flexDirection: "row", gap: 5 }}>


                {/* {products
            ?.filter((item) => item.field === category)
            .map((item, index) => (
              <ProductItem item={item} key={index} />
            ))} */}


                {students.length > 0 && (
                  students
                    ?.filter((item) => item.field === 'Engineering')
                    .map((item, index) => (
                      <Card data={item} key={index} />
                    ))
                )}
                {/* <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card /> */}

              </ScrollView>
              <ScrollView>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >
                  <Text style={{ fontSize: 18, fontWeight: 700, color: 'black' }}>Doctors</Text>
                  <Pressable
                    onPress={() => { if (students.length > 0) { navigation.navigate("Full", { item: students, sorted: true, field: 'Medical' }) } }}
                    style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 600, color: '#1aca78' }}>See all</Text>
                    <MaterialIcons name="arrow-right" size={30} color="black" />
                  </Pressable>

                </View>

              </ScrollView>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, flexDirection: "row", gap: 5, paddingVertical: 10, }}>


                {/* {products
            ?.filter((item) => item.field === category)
            .map((item, index) => (
              <ProductItem item={item} key={index} />
            ))} */}

                {students.length > 0 && (
                  students
                    ?.filter((item) => item.field === 'Medical')
                    .map((item, index) => (
                      <Card data={item} key={index} />
                    ))
                )}
                {/* <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card /> */}

              </ScrollView>

            </ScrollView>

          </ScrollView>
        }

      </SafeAreaView>

    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#1aca78',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // margin: '2%', 
    marginTop: 10,
    height: 210,
    overflow: "hidden",
    borderRadius: 20,
  },
  CardProp: {
    shadowColor: '#1aca78',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: '2%',
    borderRadius: 10,
  },
});