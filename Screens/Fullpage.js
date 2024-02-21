import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';

const Fullpage = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { item,sorted,field } = route.params;
    console.log("item",field)

  return (
 <SafeAreaView  style={{
    flex: 1,
    backgroundColor: "white",
}}>

<ScrollView style={{ flex: 1, flexDirection: 'column', paddingVertical: 30 }}>
<Text style={{ fontSize: 19, fontWeight: 700, color: 'black ', textAlign: 'center', marginVertical: 5 }}>{ field?` ${field} Students Details`:`Students Details`}</Text>


<View style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap", justifyContent: 'space-around', marginTop: 30 }}>
              
              
              {sorted?item.length > 0 && (
                  item ?.filter((item) => item.field ===field).map((item, index) => (

                      <Pressable
                          key={index}
                          onPress={() => navigation.navigate("Info",{studentData:item})}
                          style={[styles.CardProp, { flexDirection: 'column',justifyContent:'center',alignItems:'center', width: 180 ,borderColor:'#c0c0c0',borderWidth:1,paddingBottom:20,marginBottom:30}]}>
                           <Image source={{ uri: item?.image }} style={{ width: 150, height: 150, margin: 9, borderRadius: 10 }} />
                          <View style={{ marginHorizontal: 18 }}>

                              <Text style={{ fontWeight: 700, fontSize: 13 }}>{item.name.firstName} {item.name.lastName}</Text>
                              <Text style={{ fontWeight: 500, fontSize: 11, marginVertical: 5, color: "#C0C0C0" }}>Usman is Needy Person, He Got Placement but he need more MONEY</Text>
                              <View style={{ marginVertical: 10 }}>

                                  <ProgressBar progress={item.donationStatus.amountPending / item.donationStatus.totalAmount}
                                      color='#580ff5'
                                      width={150}
                                      height={10}
                                      borderRadius={10}



                                  />
                              </View>
                              <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>


                                  <View style={{ flexDirection: "row" }}>
                                      <Text style={{ color: '#580ff5', fontWeight: 700, marginHorizontal: 5 }}>₹{item.donationStatus.totalAmount - item.donationStatus.amountPending
                                      }</Text>
                                      <Text style={{ fontWeight: 500, color: "rgba(10,10,10,0.6)" }}>Collected</Text>
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
                         style={[styles.CardProp, { flexDirection: 'column',justifyContent:'center',alignItems:'center', width: 180 ,borderColor:'#c0c0c0',borderWidth:1,paddingBottom:20,marginBottom:30}]}>
                          <Image source={{ uri: item?.image }} style={{ width: 150, height: 150, margin: 9, borderRadius: 10 }} />
                          <View style={{ marginHorizontal: 18 }}>

                              <Text style={{ fontWeight: 700, fontSize: 13 }}>{item.name.firstName} {item.name.lastName}</Text>
                              <Text style={{ fontWeight: 500, fontSize: 11, marginVertical: 5, color: "#C0C0C0" }}>Usman is Needy Person, He Got Placement but he need more MONEY</Text>
                              <View style={{ marginVertical: 10 }}>

                                  <ProgressBar progress={item.donationStatus.amountPending / item.donationStatus.totalAmount}
                                      color='#580ff5'
                                      width={150}
                                      height={10}
                                      borderRadius={10}



                                  />
                              </View>
                              <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>


                                  <View style={{ flexDirection: "row" }}>
                                      <Text style={{ color: '#580ff5', fontWeight: 700, marginHorizontal: 5 }}>₹{item.donationStatus.totalAmount - item.donationStatus.amountPending
                                      }</Text>
                                      <Text style={{ fontWeight: 500, color: "rgba(10,10,10,0.6)" }}>Collected</Text>
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