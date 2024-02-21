import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable, TextInput, } from 'react-native'
import { useState, useEffect, useCallback, useContext } from "react";

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

const HomeScreen = () => {


  

  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    }
  ];
//   const images = [
//     {
//         id:1,
//         image:require( '../assets/image.jpg')
//     },
//     {
//         id:2,
//         image:require( '../assets/image.jpg')
//     },
//     {
//         id:3,
//         image:require( '../assets/image.jpg')
//     },
// ];

  const [students, setStudents] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState('')
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http:192.168.193.200:8000/students");
        setStudents(response.data.beneficiaries);
        setLoader(false)
        // console.log(response.data)
      } catch (error) {
        setLoader(false)
        console.log(error)
      }
    };

    fetchData();
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
        backgroundColor: "white",
        paddingTop: 50
      }}>
      {
        loader?<Loader />: <ScrollView>

        <ScrollView style={{ flex: 1, flexDirection: "column", gap: 5, paddingVertical: 10, paddingHorizontal: 10 }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
            <View>
              <Text style={{ fontWeight: 600 }}>Hello !</Text>
              <Text style={{ fontWeight: 900, fontSize: 20 }}>Ibrahim</Text>
            </View>
            <AntDesign
              style={{ paddingLeft: 10 }}
              name="search1"
              size={22}
              color="#580ff5"
            />
          </View>
          <Pressable 
           onPress={()=>{if(students.length>0){navigation.navigate("SearchResult",{item:students,searchinput:query})}}}

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
            <TextInput placeholder="Search Students..." style={{ width: "100%" }} onChangeText={(value) =>setQuery(value)} 
           
           onSubmitEditing={() => {
            if (students.length > 0 && query.length>0) {
              navigation.navigate("SearchResult", { item: students, searchinput: query });
            }
          }}/>
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
          <View  style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >
            <Text style={{fontSize:18,fontWeight:700,color:'black'}}>Donations</Text>
          <Pressable
           onPress={()=>{if(students.length>0){navigation.navigate("Full",{item:students,sorted:false,field:''})}}}
           style={{flexDirection:"row",alignItems:"center", marginVertical:20}}>
            <Text style={{fontSize:16,fontWeight:600,color:'#580ff5'}}>See all</Text>
            <MaterialIcons name="arrow-right" size={30} color="black" />
          </Pressable>

          </View>
          
        </ScrollView>
        <ScrollView horizontal  showsHorizontalScrollIndicator={false}  style={{ gap: 5, paddingVertical: 10,  }}>
        {
students.length>0 &&(
students.map((data,index) =>{
 return <Card key={index} data= {data} />
})
)
}
        </ScrollView>

        <ScrollView>
          <View  style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >
            <Text style={{fontSize:18,fontWeight:700,color:'black'}}>Engineers</Text>
          <Pressable
          onPress={()=>{if(students.length>0){navigation.navigate("Full",{item:students, sorted:true,field:'Engineering'})}}}
           style={{flexDirection:"row",alignItems:"center", marginVertical:20}}>
            <Text style={{fontSize:16,fontWeight:600,color:'#580ff5'}}>See all</Text>
            <MaterialIcons name="arrow-right" size={30} color="black" />
          </Pressable>

          </View>
          
        </ScrollView>
        <ScrollView horizontal  showsHorizontalScrollIndicator={false}  style={{ flex: 1, flexDirection: "row", gap: 5, paddingVertical: 10, }}>

     
          {/* {products
            ?.filter((item) => item.field === category)
            .map((item, index) => (
              <ProductItem item={item} key={index} />
            ))} */}


            {students.length >0 &&(
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
          <View  style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >
            <Text style={{fontSize:18,fontWeight:700,color:'black'}}>Doctors</Text>
          <Pressable
          onPress={()=>{if(students.length>0){navigation.navigate("Full",{item:students, sorted:true,field:'Medical'})}}}
          style={{flexDirection:"row",alignItems:"center", marginVertical:20}}>
            <Text style={{fontSize:16,fontWeight:600,color:'#580ff5'}}>See all</Text>
            <MaterialIcons name="arrow-right" size={30} color="black" />
          </Pressable>

          </View>
          
        </ScrollView>
        <ScrollView horizontal  showsHorizontalScrollIndicator={false}  style={{ flex: 1, flexDirection: "row", gap: 5, paddingVertical: 10, }}>

     
          {/* {products
            ?.filter((item) => item.field === category)
            .map((item, index) => (
              <ProductItem item={item} key={index} />
            ))} */}

{students.length >0 &&(
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
    shadowColor: '#580ff5',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // margin: '2%', 
    marginTop:10,
    height:210,
    overflow:"hidden",
    borderRadius: 20,
  },
  CardProp: {
    shadowColor: '#580ff5',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: '2%',
    borderRadius: 10,
  },
});