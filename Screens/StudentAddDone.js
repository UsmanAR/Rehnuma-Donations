import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const StudentAddDone = () => {

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
        Applicatin Submitted
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
  )
}

export default StudentAddDone

const styles = StyleSheet.create({})