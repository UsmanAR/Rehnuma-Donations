import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = () => {
    const height = Dimensions.get('window').height
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30,height:height }}>
    <ActivityIndicator size={50} color="#00ff00" />
<Text>
Loading...
</Text>
</View>
  )
}

export default Loader

const styles = StyleSheet.create({})