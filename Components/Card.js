import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProgressBar from 'react-native-progress/Bar'
import img from '../assets/image.jpg'
import { useNavigation } from '@react-navigation/native'

import avatar from "../assets/avatar.jpg"

const Card = ({data}) => {
    const navigation = useNavigation();
    const dontaionProgess = data.donationStatus.amountPending / data.donationStatus.totalAmount
    const dontaionDone =  data.donationStatus.totalAmount -data.donationStatus.amountPending

  

  return (
    <Pressable 
        onPress={() => navigation.navigate("Info",{studentData:data})}
        style={[styles.CardProp, { flexDirection: 'column', width: 250, height: 350 }]}>
            <Image   source={data?.image=='NA' ?   avatar:   { uri: data.image }  } style={{ width: 220, height: 150, margin: 18, borderRadius: 10,  }} />
            <View style={{ marginHorizontal: 18 }}>

                <Text style={{ fontWeight: 700, fontSize: 15 }}>{data.name.firstName} {data.name.lastName}</Text>
                <Text style={{ fontWeight: 500, fontSize: 12, marginVertical: 5, color: "#C0C0C0" }}>Usman is Needy Person, He Got Placement but he need more MONEY</Text>
                <View style={{ marginVertical: 10 }}>

                    <ProgressBar progress={dontaionProgess}
                        color='#1aca78'
                        width={200}
                        height={10}
                        borderRadius={10}



                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>


                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: '#1aca78', fontWeight: 700, marginHorizontal: 5 }}>₹{dontaionDone}</Text>
                        <Text style={{ fontWeight: 500, color: "#C0C0C0" }}>Collected</Text>
                    </View>
              

                </View>
            </View>
        </Pressable>

  )
}

export default Card

const styles = StyleSheet.create({})