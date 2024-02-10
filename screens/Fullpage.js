import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Card from '../components/Card';
import { ProgressBar } from 'react-native-web';
import img from '../assets/image.jpg'



const Fullpage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item,sorted,field } = route.params;
    console.log("item", field)

    // const dontaionProgess = item.donationStatus.amountPending / item.donationStatus.totalAmount
    // const dontaionDone =  item.donationStatus.totalAmount -item.donationStatus.amountPending

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
            }}>

            <ScrollView style={{ flex: 1, flexDirection: 'column', paddingVertical: 10 }}>
                <Text style={{ fontSize: 19, fontWeight: 700, color: 'balck', textAlign: 'center', marginVertical: 5 }}>Students Details</Text>

                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap", justifyContent: 'space-around', marginTop: 30 }}>
              
              
                    {sorted?item.length > 0 && (
                        item ?.filter((item) => item.field ===field).map((item, index) => (

                            <Pressable
                                key={index}
                                onPress={() => navigation.navigate("Info",{studentData:item})}
                                style={[styles.CardProp, { flexDirection: 'column', width: 150, height: 270 }]}>
                                <Image source={{ uri: item?.image }} style={{ width: 120, height: 100, margin: 9, borderRadius: 10 }} />
                                <View style={{ marginHorizontal: 18 }}>

                                    <Text style={{ fontWeight: 700, fontSize: 13 }}>{item.name.firstName} {item.name.lastName}</Text>
                                    <Text style={{ fontWeight: 500, fontSize: 11, marginVertical: 5, color: "#C0C0C0" }}>Usman is Needy Person, He Got Placement but he need more MONEY</Text>
                                    <View style={{ marginVertical: 10 }}>

                                        <ProgressBar progress={item.donationStatus.amountPending / item.donationStatus.totalAmount}
                                            color='#580ff5'
                                            width={180}
                                            height={10}
                                            borderRadius={10}



                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>


                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ color: '#580ff5', fontWeight: 700, marginHorizontal: 5 }}>₹{item.donationStatus.totalAmount - item.donationStatus.amountPending
                                            }</Text>
                                            <Text style={{ fontWeight: 500, color: "#C0C0C0" }}>Collected</Text>
                                        </View>


                                    </View>
                                </View>
                            </Pressable>

                        ))
                    ):item.length > 0 && (
                        item.map((item, index) => (

                            <Pressable
                                key={index}
                                onPress={() => navigation.navigate("Info",{studentData:item})}
                                style={[styles.CardProp, { flexDirection: 'column', width: 150, height: 270 }]}>
                                <Image source={{ uri: item?.image }} style={{ width: 120, height: 100, margin: 9, borderRadius: 10 }} />
                                <View style={{ marginHorizontal: 18 }}>

                                    <Text style={{ fontWeight: 700, fontSize: 13 }}>{item.name.firstName} {item.name.lastName}</Text>
                                    <Text style={{ fontWeight: 500, fontSize: 11, marginVertical: 5, color: "#C0C0C0" }}>Usman is Needy Person, He Got Placement but he need more MONEY</Text>
                                    <View style={{ marginVertical: 10 }}>

                                        <ProgressBar progress={item.donationStatus.amountPending / item.donationStatus.totalAmount}
                                            color='#580ff5'
                                            width={180}
                                            height={10}
                                            borderRadius={10}



                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>


                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ color: '#580ff5', fontWeight: 700, marginHorizontal: 5 }}>₹{item.donationStatus.totalAmount - item.donationStatus.amountPending
                                            }</Text>
                                            <Text style={{ fontWeight: 500, color: "#C0C0C0" }}>Collected</Text>
                                        </View>


                                    </View>
                                </View>
                            </Pressable>

                        ))
                    )}

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Fullpage

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
});