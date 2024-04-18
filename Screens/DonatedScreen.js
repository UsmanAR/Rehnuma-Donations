import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import DetailTable from '../Components/DetailTable';
import ProgressBar from 'react-native-progress/Bar';

const DonatedScreen = () => {

    const route = useRoute();
    const { studentData } = route.params;
    // console.log(studentData.image)

    return (
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
                        Usman is Needy Person, He Got Placement but he need more MONEY
                        Usman is Needy Person, He Got Placement but he need more MONEY
                        Usman is Needy Person, He Got Placement but he need more MONEY
                        Usman is Needy Person, He Got Placement but he need more MONEY
                        Usman is Needy Person, He Got Placement but he need more MONEY
                        Usman is Needy Person, He Got Placement but he need more MONEY
                    </Text>
                    <DetailTable data={studentData} />
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15, marginVertical: 13 , color: "#C0C0C0"}}>You Danated <Text style={{ fontWeight: "bold", fontSize: 18, color:'#1aca78', marginVertical: 13 }}>₹{studentData.donatedAmount}</Text></Text>



                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15, marginVertical: 13 }}>Donation Progess</Text>
                        <ProgressBar progress={0.1}
                            color='#1aca78'
                            width={350}
                            height={9}
                            borderRadius={10}
                        />

                    </View>
                </View>

            </ScrollView>


        </SafeAreaView>
    )
}

export default DonatedScreen
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