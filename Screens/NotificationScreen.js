import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState,  } from 'react'

import Notification from '../Components/Notification'

import axios from 'axios';


const NotificationScreen = () => {


  const [notificaions, setNotification] = useState([])














  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http:192.168.19.200:8000/toReview");
        console.log(response.data)
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
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})