import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, BackHandler, Alert } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'

import img from '../assets/image.jpg'
import DetailTable from '../Components/DetailTable'
import ProgressBar from 'react-native-progress/Bar';
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import { useHeaderHeight } from '@react-navigation/elements'
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { UserType } from '../Context/UserContext';
import axios from 'axios';

import RazorpayCheckout from 'react-native-razorpay';





const StudentInfoScreen = () => {

    const { userId, setUserId } = useContext(UserType);
    const [user, setUser] = useState("");
    const navigation = useNavigation();

   


    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("authToken");
            setUserId(token)
            //   console.log(userId)



        }

        fetchUser();

    }, [userId]);



    useEffect(() => {
        const fetchUserProfile = async () => {

            try {
                const response = await axios.get(
                    `https://rehnuma-donations.onrender.com/profile/${userId}`
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


    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState(0)
    const [value, setValue] = useState(0)
    const [selectedValue, setSelectedValue] = useState('option1')
    const headerHeight = useHeaderHeight();
 

    const route = useRoute();
    const { studentData } = route.params;
    // console.log(studentData.field)

    const dontaionProgess = 1-(studentData.donationStatus.amountPending / studentData.donationStatus.totalAmount)
    const dontaionDone = studentData.donationStatus.totalAmount - studentData.donationStatus.amountPending
// console.log('studentData://////////',studentData)
    const [data, setData] = useState({
       
        userId: userId,
        donationItem:{
            name:{
                firstName:studentData.name.firstName,
                lastName:studentData.name.lastName
                
            },
            image: studentData?.image,
            mobileNumber:studentData.mobileNumber,
            alternateMobileNumber:studentData.alternateMobileNumber,
            collegeName:studentData.collegeName,
            field:studentData.field,
            address: {
                city: studentData.address.city,
                state: studentData.address.state,
              },
              donatedAmount:value,

        }

        

    })

    // console.log(data)

    const handlePress =async (amount) => {
        setSelected(amount)
      await  setValue((currentValue) => {
            return currentValue === amount ? 0 : amount;
        })
        
    }


    useEffect(() => {
        const updateData = async () => {
          await setData((prevData) => ({
            ...prevData,
            donationItem: {
              ...prevData.donationItem,
              donatedAmount: value,
            },
          }));
          
        };
      
        updateData();
      }, [value]);

    //   console.log(data.donationItem.Donated);

    const handlePressDonate = async() => {
      try {

          
    const orderData = {
        userId: userId,
        donationItem:data.donationItem,
      };


    //   console.log(orderData)
     
      const response = await axios.post( "https://rehnuma-donations.onrender.com/donations", orderData
      );
      if (response.status === 200) {
        setModalVisible(!modalVisible)
        navigation.navigate("DonationDone");
        // console.log('hello')
        console.log("Donated successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
        
      } catch (error) {
        console.log("errror", error);
      }
    }


    const pay =async() =>{
        console.log('hii')
        try {
            const options = {
                description: "Adding To Wallet",
                currency: "INR",
                name: "Amazon",
                key: "rzp_test_ecY5QsbcAqzxTT",
                amount:  100,
                prefill: {
                  email: "void@razorpay.com",
                  contact: "9191919191",
                  name: "RazorPay Software",
                },
                theme: { color: "#F37254" },
              };

              const data = await RazorpayCheckout.open(options)
              Alert.alert(data)
        } catch (error) {
            console.log(error)
        }
    }


    const handleBackButton = () => {
        if (modalVisible) {
            setModalVisible(false);
            setSelected(0);
            return true; // prevent default behavior (closing the app)
        }
        return false; // allow default behavior
    };
    useEffect(() => {

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            backHandler.remove(); // remove the event listener when the component unmounts
        };

    }, [modalVisible])

    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: "Detials",
          headerStyle: {
            backgroundColor: "#1aca78",
          
          },
          headerTintColor: "#fff",
         

    
        })
    
      }, [])

    return (
        <>
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: "white",
                paddingVertical: 15
            }}>
                <ScrollView style={{ flex: 1, flexDirection: "column", gap: 5, paddingVertical: 10, paddingHorizontal: 10 }}>
                   
                    <Image source={{ uri: studentData?.image }} style={[styles.ImProp]} />
                    <View style={{ marginHorizontal: 18 }}>
                        <Text style={{ fontWeight: 700, fontSize: 19 }}>{studentData.name.firstName} {studentData.name.lastName}</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 15, marginVertical: 13 }}>Description</Text>
                        <Text style={{ fontWeight: 500, fontSize: 12, marginVertical: 5, color: "#C0C0C0" }}>Usman is Needy Person, He Got Placement but he need more MONEY
                            Usman is Needy Person, He Got Placement but he need more MONEY
                            Usman is Needy Person, He Got Placement but he need more MONEY
                          
                        </Text>
                        <DetailTable data={studentData} />
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 15, marginVertical: 13 }}>Donation Goal</Text>
                            <ProgressBar progress={dontaionProgess}
                                color='#1aca78'
                                width={350}
                                height={9}
                                borderRadius={10}
                            />

                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: '#1aca78', fontWeight: 700, marginHorizontal: 5 }}>₹{dontaionDone}</Text>
                            <Text style={{ fontWeight: 500, color: "#C0C0C0" }}>Collected</Text>
                        </View>
                        <Pressable
                            onPress={() => { setModalVisible(true) }}
                            style={[styles.shadowProp, {
                                backgroundColor: "#1aca78",
                                borderRadius: 10,
                                padding: 12,
                                width: '90%',
                                marginVertical: 40

                            }]}


                        >
                            <Text style={{
                                textAlign: "center",
                                color: "white",
                                fontSize: 14,
                                fontWeight: "bold",
                            }}>
                                Donate
                            </Text>
                        </Pressable>

                    </View>
                </ScrollView>


            </SafeAreaView>


            <BottomModal
                onBackdropPress={() => { setModalVisible(!modalVisible); setSelected(0) }}
                visible={modalVisible}
                onTouchOutside={() => { setModalVisible(!modalVisible); setSelected(0) }}
                swipeDirection={["up", "down"]}
                swipeThreshold={200}
                modalAnimation={
                    new SlideAnimation({
                        slideFrom: "bottom",
                    })
                }

            >
                <ModalContent>
                    <ScrollView style={{ paddingVertical: 10 }}>


                        <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} behavior={Platform.OS === "ios" ? "padding" : null}
                            style={{ flex: 1, flexDirection: "column", alignItems: 'center', gap: 5, paddingHorizontal: 10 }} >
                            <Text style={{ fontSize: 19, fontWeight: 700, color: 'black', textAlign: 'center', marginVertical: 5 }}>
                                Enter Donation Amount
                            </Text>
                            <View style={{ width: '90%', flexDirection: "row", alignItems: 'center', justifyContent: "center", borderColor: '#C0C0C0', borderWidth: 1, borderRadius: 7, backgroundColor: '#f1f1f1', marginVertical: 30, }}>
                                {Boolean(value) && (
                                    <Text style={{ fontSize: 21, fontWeight: 700, color: 'black', textAlign: 'right', marginVertical: 5, width: '40%' }}>
                                        ₹
                                    </Text>
                                )}
                                <TextInput

                                    style={{

                                        color: "black",
                                        marginVertical: 10,
                                        width: Boolean(value) ? '60%' : '90%',
                                        padding: 9,
                                        paddingRight: 10,
                                        textAlign: Boolean(value) ? 'left' : 'center',
                                        fontSize: 22,
                                        borderRadius: 10,



                                    }}
                                    keyboardType="numeric"
                                    placeholder={!value ? "Enter Amount" : ""}
                                    placeholderTextColor="grey"
                                    maxLength={5}
                                    onChangeText={(text) => setValue(text)}
                                    value={value === 0 ? '' : value.toString()}
                                />
                            </View>
                            <Pressable

                                onPress={() => handlePress(500)}
                                android_ripple={{ color: '#1aca78' }}
                                style={{
                                    width: '90%',
                                    backgroundColor: "white",
                                    borderRadius: 6,
                                    borderColor: selected === 500 ? '#1aca78' : '#c0c0c0',

                                    borderWidth: selected === 500 ? 3 : 1,
                                    marginLeft: "auto",
                                    marginVertical: 10,
                                    marginRight: "auto",
                                    padding: 15,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: selected === 500 ? '#1aca78' : 'black',
                                        fontSize: 16,
                                        fontWeight: "bold",
                                    }}
                                >
                                    ₹500
                                </Text>
                            </Pressable>
                            <Pressable
                                //   onPress={handleLogin}
                                onPress={() => handlePress(200)}
                                android_ripple={{ color: '#1aca78' }}
                                style={{
                                    width: '90%',
                                    backgroundColor: "white",
                                    borderRadius: 6,
                                    borderColor: selected === 200 ? '#1aca78' : '#c0c0c0',
                                    borderWidth: selected === 200 ? 3 : 1,
                                    marginLeft: "auto",
                                    marginVertical: 10,
                                    marginRight: "auto",
                                    padding: 15,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: selected === 200 ? '#1aca78' : 'black',
                                        fontSize: 16,
                                        fontWeight: "bold",
                                    }}
                                >
                                    ₹200
                                </Text>
                            </Pressable>
                            <Pressable
                                //   onPress={handleLogin}
                                onPress={() => handlePress(100)}
                                android_ripple={{ color: '#1aca78' }}
                                style={{
                                    width: '90%',
                                    backgroundColor: "white",
                                    borderRadius: 6,
                                    borderColor: selected === 100 ? '#1aca78' : '#c0c0c0',
                                    borderWidth: selected === 100 ? 3 : 1,
                                    marginLeft: "auto",
                                    marginVertical: 10,
                                    marginRight: "auto",
                                    padding: 15,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: selected === 100 ? '#1aca78' : 'black',
                                        fontSize: 16,
                                        fontWeight: "bold",
                                    }}
                                >
                                    ₹100
                                </Text>
                            </Pressable>

                            <Pressable
                            onPress={pay}

                                style={[styles.shadowProp, {
                                    backgroundColor: "#1aca78",
                                    borderRadius: 10,
                                    padding: 12,
                                    width: '90%',
                                    marginVertical: 40

                                }]}


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

                        </KeyboardAvoidingView>

                    </ScrollView>
                </ModalContent>

            </BottomModal>
        </>
    )
}

export default StudentInfoScreen
//purple theme #580ff5
const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#1aca78',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        margin: '2%',
        borderRadius: 10,
    },
    CardProp: {
        shadowColor: '#1aca78',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        margin: '2%',
        borderRadius: 10,
    },
    ImProp: {
        shadowColor: '#1aca78',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        margin: '2%',
        width: "75%",
        height: 200,
        margin: 18,
        objectFit: 'fill',
        borderRadius: 30,
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    picker: {
        height: 500,
        width: 150,
    },
});