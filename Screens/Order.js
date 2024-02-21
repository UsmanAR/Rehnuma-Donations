import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const Order = () => {

    const navigation = useNavigation();

const donate =async () =>{
    
 try {
    
    const orderData = {
        userId: '65c4c47291c9028936ec67dd',
        donationItem: {
            name: {
              firstName: "Sohel",
              lastName: 'Shaikh'},

            image: "www.google.com",
            mobileNumber: 78753104122,
            alternateMobileNumber:9876543210 ,
            collegeName: "GECA",
            address: {
              landmark: "Usmanpura",
              city: "Aurangabad",
              state: "Maharashtra"
            },
            donatedAmount: 500,
      
          }
      };

     
      const response = await axios.post( "http:192.168.193.200:8000/donations", orderData
      );
      if (response.status === 200) {
        console.log('hello')
        navigation.navigate("Main");
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }

 } catch (error) {
    console.log("errror", error);
 }

}



  return (
   <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
    <View style={{width:'100%', height:'100%',justifyContent:'center',alignItems:'center'}}>
    <Pressable 
    onPress={donate}
    style={{
            padding: 10,
            backgroundColor: "red",
            borderRadius: 25,
            
          }}>
        <Text   
        style={{ textAlign: "center",fontWeight:'bold' }}>Logout</Text> 
      </Pressable> 
    </View>
   </SafeAreaView>
  )
}

export default Order

const styles = StyleSheet.create({})