import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  ProgressBarAndroid,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import img from '../assets/image.jpg'
import ProgressBar  from 'react-native-progress/Bar'
import {Svg,Rect} from 'react-native-svg'


// const fetchData = async () => {
//   try {
//     const response = await axios.get("https://fakestoreapi.com/products");
//     setProducts(response.data);
//   } catch (error) {
//     console.log(" message", error);
//   }
// };

const fetchBeneficiaries = async () => {
  try {
    const response = await axios.get("http://localhost:8000/students");
    console.log("The students are " + JSON.stringify(response));

  } catch (error) {
    console.log("Couldnt fetch students ", error)
  }
}
fetchBeneficiaries()
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
  const images = [
    img, img, img
  ];


  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("Engineering");
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAdress] = useState("");
  const [items, setItems] = useState([
    { label: "Engineering", value: "Engineering" },
    { label: "Medical", value: "Medical" },
  ]);


  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/students");
        setProducts(response.data.beneficiaries);
      } catch (error) {
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView>

          <ScrollView style={{ flex: 1, flexDirection: "column", gap: 5, paddingVertical: 10, paddingHorizontal: 10 }}>


            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >

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


              }}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Search Students..." style={{ width: "100%", padding: 10, outline: 'none' }} />
            </Pressable>

            <ScrollView  style={ styles.shadowProp} >

              <SliderBox images={images} circleloop dotColor={'#13274F'} inactivedotColor={'#90A4ae'} ImageComponentStyle={{ width: '100%' }} />

            </ScrollView>
       

          <ScrollView>
            <View  style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >
              <Text style={{fontSize:18,fontWeight:700,color:'balck'}}>Donations</Text>
            <Pressable style={{flexDirection:"row",alignItems:"center", marginVertical:20}}>
              <Text style={{fontSize:16,fontWeight:600,color:'#580ff5'}}>See all</Text>
              <MaterialIcons name="arrow-right" size={30} color="black" />
            </Pressable>

            </View>
            
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View  style={ [styles.CardProp,{flexDirection:'column',width:250,height:350}]}>
          <Image source={img} style={{width:220,height:150,margin:18,borderRadius:10}} />
          <View style={{marginHorizontal:18}}>

          <Text style={{fontWeight:700,fontSize:15}}>Usman Raheem Shaikh</Text>
          <Text style={{fontWeight:500,fontSize:12, marginVertical:5,color:"#C0C0C0"}}>Usman is Needy Person, He Got Placement but he need more MONEY</Text>
          <View style={{marginVertical:10}}>

<ProgressBar progress={0.5} 
color='#580ff5'
width={200}
height={10}
borderRadius={10}



 />
          </View>
<View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>


          <View style={{flexDirection:"row"}}>
            <Text style={{color:'#580ff5', fontWeight:700,marginHorizontal:5}}>$100</Text>
            <Text style={{fontWeight:500,color:"#C0C0C0"}}>Collected</Text>
          </View>
          <Pressable
         
          style={{
            backgroundColor: "#580ff5",
            borderRadius: 6,
            padding: 7,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Donate Now
          </Text>
        </Pressable>
         
          </View>
          </View>
            </View>
            <View  style={ [styles.CardProp,{flexDirection:'column',width:250,height:350}]}>
          <Image source={img} style={{width:220,height:150,margin:18,borderRadius:10}} />
          <View style={{marginHorizontal:18}}>

          <Text style={{fontWeight:700,fontSize:15}}>Usman Raheem Shaikh</Text>
          <Text style={{fontWeight:500,fontSize:12, marginVertical:5,color:"#C0C0C0"}}>Usman is Needy Person, He Got Placement but he need more MONEY</Text>
          <View style={{marginVertical:10}}>

<ProgressBar progress={0.5} 
color='#580ff5'
width={200}
height={10}
borderRadius={10}



 />
          </View>
<View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>


          <View style={{flexDirection:"row"}}>
            <Text style={{color:'#580ff5', fontWeight:700,marginHorizontal:5}}>$100</Text>
            <Text style={{fontWeight:500,color:"#C0C0C0"}}>Collected</Text>
          </View>
          <Pressable
         
          style={{
            backgroundColor: "#580ff5",
            borderRadius: 6,
            padding: 7,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Donate Now
          </Text>
        </Pressable>
         
          </View>
          </View>
            </View>
            <View  style={ [styles.CardProp,{flexDirection:'column',width:250,height:350}]}>
          <Image source={img} style={{width:220,height:150,margin:18,borderRadius:10}} />
          <View style={{marginHorizontal:18}}>

          <Text style={{fontWeight:700,fontSize:15}}>Usman Raheem Shaikh</Text>
          <Text style={{fontWeight:500,fontSize:12, marginVertical:5,color:"#C0C0C0"}}>Usman is Needy Person, He Got Placement but he need more MONEY</Text>
          <View style={{marginVertical:10}}>

<ProgressBar progress={0.5} 
color='#580ff5'
width={200}
height={10}
borderRadius={10}



 />
          </View>
<View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>


          <View style={{flexDirection:"row"}}>
            <Text style={{color:'#580ff5', fontWeight:700,marginHorizontal:5}}>$100</Text>
            <Text style={{fontWeight:500,color:"#C0C0C0"}}>Collected</Text>
          </View>
          <Pressable
         
          style={{
            backgroundColor: "#580ff5",
            borderRadius: 6,
            padding: 7,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Donate Now
          </Text>
        </Pressable>
         
          </View>
          </View>
            </View>
            <View  style={ [styles.CardProp,{flexDirection:'column',width:250,height:350}]}>
          <Image source={img} style={{width:220,height:150,margin:18,borderRadius:10}} />
          <View style={{marginHorizontal:18}}>

          <Text style={{fontWeight:700,fontSize:15}}>Usman Raheem Shaikh</Text>
          <Text style={{fontWeight:500,fontSize:12, marginVertical:5,color:"#C0C0C0"}}>Usman is Needy Person, He Got Placement but he need more MONEY</Text>
          <View style={{marginVertical:10}}>

<ProgressBar progress={0.5} 
color='#580ff5'
width={200}
height={10}
borderRadius={10}



 />
          </View>
<View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>


          <View style={{flexDirection:"row"}}>
            <Text style={{color:'#580ff5', fontWeight:700,marginHorizontal:5}}>$100</Text>
            <Text style={{fontWeight:500,color:"#C0C0C0"}}>Collected</Text>
          </View>
          <Pressable
         
          style={{
            backgroundColor: "#580ff5",
            borderRadius: 6,
            padding: 7,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Donate Now
          </Text>
        </Pressable>
         
          </View>
          </View>
            </View>
            <View  style={ [styles.CardProp,{flexDirection:'column',width:250,height:350}]}>
          <Image source={img} style={{width:220,height:150,margin:18,borderRadius:10}} />
          <View style={{marginHorizontal:18}}>

          <Text style={{fontWeight:700,fontSize:15}}>Usman Raheem Shaikh</Text>
          <Text style={{fontWeight:500,fontSize:12, marginVertical:5,color:"#C0C0C0"}}>Usman is Needy Person, He Got Placement but he need more MONEY</Text>
          <View style={{marginVertical:10}}>

<ProgressBar progress={0.5} 
color='#580ff5'
width={200}
height={10}
borderRadius={10}



 />
          </View>
<View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>


          <View style={{flexDirection:"row"}}>
            <Text style={{color:'#580ff5', fontWeight:700,marginHorizontal:5}}>$100</Text>
            <Text style={{fontWeight:500,color:"#C0C0C0"}}>Collected</Text>
          </View>
          <Pressable
         
          style={{
            backgroundColor: "#580ff5",
            borderRadius: 6,
            padding: 7,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Donate Now
          </Text>
        </Pressable>
         
          </View>
          </View>
            </View>
            


          </ScrollView>
          </ScrollView>

          {/* <View
            style={{
              backgroundColor: "#fffff",
              paddingVertical:20,
             flex:1,
              flexDirection: "column",
              alignItems: "center",
            }}
          >

            <View>
<Text>Hello !</Text>
<Text></Text>
            </View>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Search Students" />
            </Pressable>
          </View> */}
          {/* 
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#AFEEEE",
            }}
          >
           <Text>Hello!</Text>
           <Text>User</Text> */}
          {/* <Pressable>
            {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    Add a Address
                </Text>
              )}
            </Pressable> */}

          {/* <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable> */}

          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
              key={index}
              style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView> */}

          {/* <ScrollView>

<SliderBox images={images} circleloop dotColor={'#13274F'} inactivedotColor={'#90A4ae'} ImageComponentStyle={{width:'100%'}} />

          </ScrollView> */}
          {/* 
          ComponentStyle={{ width: "100%" }}
          /> */}
          {/*   DISABLING "TREANDING DEALS OF T   HE WEEK " */}
          {/* <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Trending Deals of the week
          </Text>

{/*  REMOVING "TODAY'S DEALS"
          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Today's Deals
          </Text>

          </ScrollView> */}

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              ?.filter((item) => item.field === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added addresses */}
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor: selectedAddress === item ? "#FBCEB1" : "white"
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  India, Bangalore
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter an Indian pincode
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Currect location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#0066b2" />

              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#580ff5',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: '2%', 
    borderRadius: 10,
  },
  CardProp: {
    shadowColor: '#580ff5',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: '2%', 
    borderRadius: 10,
  },
});
