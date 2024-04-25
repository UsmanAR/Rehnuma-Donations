import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UPIModule from 'react-native-upi'


const Test = () => {



  return (
    <View>
    <Button title='Pay Now' onPress={paymentGatway} />
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})