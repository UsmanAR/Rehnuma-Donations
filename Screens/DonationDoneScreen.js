import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'

const DonationDoneScreen = () => {

    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(() => {
          navigation.replace("Main");
        }, 5000);
      }, []);

  return (

    <SafeAreaView>
        <LottieView  source={require("../assets/thumbs.json")}
      // ref={animation}
      style={{
        height: 260,
        width: 300,
        alignSelf: "center",
        marginTop: 40,
        justifyContent: "center",
      }}
      autoPlay
      loop={false}
      speed={0.7}/>
      <Text  style={{
        marginTop: 20,
        fontSize: 19,
        fontWeight: "600",
        textAlign: "center",
      }}>
        Your Donation is Done
      </Text>
      <LottieView
      source={require("../assets/sparkle.json")}
      style={{
        height: 300,
        position: "absolute",
        top: 100,
        width: 300,
        alignSelf: "center",
      }}
      autoPlay
      loop={true}
      speed={0.7}
    />

       
    </SafeAreaView>
    // <View>
    //   <Text>DonationDoneScreen</Text>
    // </View>
  )
}

export default DonationDoneScreen

const styles = StyleSheet.create({})