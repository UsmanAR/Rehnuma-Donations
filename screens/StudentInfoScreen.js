import { Image, Pressable, SafeAreaView, StyleSheet, Text, View,Picker } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TextInput } from 'react-native-web'
import { AntDesign } from "@expo/vector-icons";
import img from '../assets/image.jpg'
import ProgressBar from 'react-native-progress/Bar';
import DetailTable from '../components/DetailTable';
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import {useRoute } from '@react-navigation/native'


const StudentInfoScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const [selected,setSelected] = useState(0)
    const [selectedValue,setSelectedValue] = useState('option1')

    const route = useRoute();
    const { studentData } = route.params;

    const handlePress = (value) =>{
        setSelected(value)
    }
    // console.log(studentData)
    const dontaionProgess = studentData.donationStatus.amountPending / studentData.donationStatus.totalAmount
    const dontaionDone =  studentData.donationStatus.totalAmount -studentData.donationStatus.amountPending

    return (
        <>
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: "white",
            }}>
                <ScrollView style={{ flex: 1, flexDirection: "column", gap: 5, paddingVertical: 10, paddingHorizontal: 10 }}>

                    <Text style={{ fontSize: 19, fontWeight: 700, color: 'balck', textAlign: 'center', marginVertical: 5 }}>Details</Text>

                    <Image  source={{uri:studentData?.image}} style={[styles.ImProp]} />

                    <View style={{ marginHorizontal: 18 }}>

                        <Text style={{ fontWeight: 700, fontSize: 19 }}>{studentData.name.firstName} {studentData.name.lastName}</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 15, marginVertical: 13 }}>Description</Text>
                        <Text style={{ fontWeight: 500, fontSize: 12, marginVertical: 5, color: "#C0C0C0" }}>Usman is Needy Person, He Got Placement but he need more MONEY
                            Usman is Needy Person, He Got Placement but he need more MONEY
                            Usman is Needy Person, He Got Placement but he need more MONEY
                            Usman is Needy Person, He Got Placement but he need more MONEY
                            Usman is Needy Person, He Got Placement but he need more MONEY
                            Usman is Needy Person, He Got Placement but he need more MONEY
                            Usman is Needy Person, He Got Placement but he need more MONEY
                            Usman is Needy Person, He Got Placement but he need more MONEY
                            Usman is Needy Person, He Got Placement but he need more MONEY
                        </Text>

                        <DetailTable data ={studentData} />
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 15, marginVertical: 13 }}>Donation Goal</Text>
                            <ProgressBar progress={dontaionProgess}
                                color='#580ff5'
                                width={350}
                                height={15}
                                borderRadius={10}



                            />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: '#580ff5', fontWeight: 700, marginHorizontal: 5 }}>₹{dontaionDone}</Text>
                            <Text style={{ fontWeight: 500, color: "#C0C0C0" }}>Collected</Text>
                        </View>

                        <Pressable
                            onPress={() => { setModalVisible(true) }}
                            style={[styles.shadowProp, {
                                backgroundColor: "#580ff5",
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

                    </View>



                </ScrollView>


            </SafeAreaView>
            <BottomModal
                onBackdropPress={() => {setModalVisible(!modalVisible); setSelected(0)}}
                onHardwareBackPress={() => {setModalVisible(!modalVisible); setSelected(0)}}
                visible={modalVisible}
                onTouchOutside={() => {setModalVisible(!modalVisible); setSelected(0)}}
                swipeDirection={["up", "down"]}
                swipeThreshold={200}
                modalAnimation={
                    new SlideAnimation({
                        slideFrom: "bottom",
                    })
                }

            >
                <ModalContent>
                    <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', gap: 5, paddingVertical: 10, paddingHorizontal: 10 }} >
                        <Text style={{ fontSize: 19, fontWeight: 700, color: 'balck', textAlign: 'center', marginVertical: 5 }}>
                            Enter Donation Amount
                        </Text>
                        <View style={{ width: '90%', borderColor: '#C0C0C0', borderWidth: 1, borderRadius: 7, backgroundColor: '#f1f1f1', marginVertical: 30, }}>

                            <TextInput

                                style={{
                                    textAlign:'center',
                                    color: "black",
                                    marginVertical: 10,
                                    width: 300,
                                    padding: 9,
                                    fontSize: 22,
                                    borderRadius: 10,
                                    outline: 'none'

                                }}
                                keyboardType="numeric"
                                placeholder="Enter Amount"
                                placeholderTextColor="grey"
                            />
                        </View>
                        <Pressable
                            //   onPress={handleLogin}
                            onPress={()=>handlePress(500)}
                            android_ripple={{color:'#580ff5'}}
                            style={{
                                width: '90%',
                                backgroundColor: "white",
                                borderRadius: 6,
                                borderColor:selected===500 ?'#580ff5':'black',
                                
                                borderWidth: selected===500 ?3:1,
                                marginLeft: "auto",
                                marginVertical: 10,
                                marginRight: "auto",
                                padding: 15,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color:selected===500 ?'#580ff5':'black',
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}
                            >
                                500
                            </Text>
                        </Pressable>
                        <Pressable
                            //   onPress={handleLogin}
                            onPress={()=>handlePress(200)}
                            android_ripple={{color:'#580ff5'}}
                            style={{
                                width: '90%',
                                backgroundColor: "white",
                                borderRadius: 6,
                                borderColor:selected===200 ?'#580ff5':'#c0c0c0',
                                borderWidth: selected===200 ?3:1,
                                marginLeft: "auto",
                                marginVertical: 10,
                                marginRight: "auto",
                                padding: 15,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color:selected===200 ?'#580ff5':'black',
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}
                            >
                                200
                            </Text>
                        </Pressable>
                        <Pressable
                            //   onPress={handleLogin}
                            onPress={()=>handlePress(100)}
                            android_ripple={{color:'#580ff5'}}
                            style={{
                                width: '90%',
                                backgroundColor: "white",
                                borderRadius: 6,
                                borderColor:selected===100 ?'#580ff5':'#c0c0c0',
                                borderWidth: selected===100 ?3:1,
                                marginLeft: "auto",
                                marginVertical: 10,
                                marginRight: "auto",
                                padding: 15,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color:selected===100 ?'#580ff5':'black',
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}
                            >
                                100
                            </Text>
                        </Pressable>

                        <Pressable

                            style={[styles.shadowProp, {
                                backgroundColor: "#580ff5",
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

                    </View>

                    
                </ModalContent>

            </BottomModal>
        </>
    )
}

export default StudentInfoScreen

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#580ff5',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        margin: '2%',
        borderRadius: 10,
    },
    CardProp: {
        shadowColor: '#580ff5',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        margin: '2%',
        borderRadius: 10,
    },
    ImProp: {
        shadowColor: '#580ff5',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        margin: '2%',
        width: "90%",
        height: 150,
        margin: 18,
        borderRadius: 30
    },
    container:{
flex:1,
justifyContent:"center",
    },
    picker:{
        height:500,
        width:150,
    },
});