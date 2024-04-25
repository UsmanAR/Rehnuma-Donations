import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState,  } from 'react'

import Notification from '../Components/Notification'

import axios from 'axios';



const NotificationScreen = () => {


  const [notificaions, setNotification] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://rehnuma-donations.onrender.com/toReview");
        setNotification(response.data.beneficiaries)
       console.log(notificaions)
        // setLoader(false)
        // console.log(response.data)
      } catch (error) {
        // setLoader(false)
        console.log(error)
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView >

        <View style={{ gap: 10, display: 'flex', flexDirection: 'column' }}>
        {notificaions.map((item,index) =>{
        return  <Notification  key={index} data= {item}/>
        })}
      
        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})