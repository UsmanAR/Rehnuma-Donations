import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import img from '../assets/image.jpg'
import avatar from "../assets/avatar.jpg"
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'


const Notification = ({ data }) => {

  const navigation = useNavigation()
const [reviewd,setReviwed] =useState(data.selectionStatus)
  console.log(data)
  const handleResponse = async (e) => {
    try {

      console.log(e)
      const response = await axios.post(`http:192.168.153.200:8000/toReview/${data._id}`, { selection: e })

      if (response.status == 200) {
     setReviwed(e);
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }


    } catch (error) {
      console.log(error)
    }



  }
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: '#ffff' }}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Image source={data?.image == 'NA' ? avatar : { uri: data.image }} style={{ height: 60, width: 60, borderRadius: 30, padding: 5 }} />
          <Text>
            A new Student form has been submitted for approval,<Text style={{ fontWeight: "bold" }}> {data.name.firstName} {data.name.lastName}</Text> is pursuing <Text style={{ fontWeight: "bold" }}>{data.field}</Text> in <Text>
              {data.branch}
            </Text> from <Text style={{ fontWeight: "bold" }}>{data.collegeName}</Text>
          </Text>
        </View>
       {reviewd=='Under Review' ?<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20, marginVertical: 10 }}>
          <Pressable

            onPress={() => handleResponse('Accepted')}

            style={{
              width: 100,
              backgroundColor: '#1aca78',
              borderRadius: 6,
              padding: 12,
            }}>
            <Text style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}>Approve</Text></Pressable>


          <Pressable

            onPress={() => handleResponse('Rejected')}

            style={{
              width: 100,
              backgroundColor: 'red',
              borderRadius: 6,
              padding: 12,
            }}><Text style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}>Reject</Text></Pressable>
        </View>:<Text style={{fontWeight:"600",textAlign:'center'}}>Your <Text  style={{color:reviewd=='Accepted'? '#1aca78':'red'}}>{reviewd}</Text>This Application</Text>}

      </View>



    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({})