import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Notification from '../Components/Notification'

const NotificationScreen = () => {
  return (
    <SafeAreaView>
<ScrollView >

<View style={{gap:10,display:'flex',flexDirection:'column'}}>
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