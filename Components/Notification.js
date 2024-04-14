import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import img from '../assets/image.jpg'

const Notification = () => {
    let name = 'Usman'
    let stream = 'Engineering'
    let field= 'information Technology'
    let college= 'GECA'
  return (
  <SafeAreaView>
    <View style={{backgroundColor:'#ffff'}}>
        <View style={{display:'flex', flexDirection:'row',gap:10,alignItems:'center'}}>
        <Image  source={img} style={{height:60,width:60,borderRadius:30,padding:5}}/>
        <Text>
             A new Student form has been submitted for approval,<Text style={{fontWeight:"bold"}}> {name}</Text> is pursuing <Text style={{fontWeight:"bold"}}>{stream}</Text> in <Text>
                {field}
             </Text> from <Text style={{fontWeight:"bold"}}>{college}</Text>
        </Text>
        </View>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'center',alignItems:'center',gap:20,marginVertical:10}}>
        <Pressable  style={{
            width: 100,
            backgroundColor:'#1aca78',
            borderRadius: 6,
            padding: 12,}}>
                <Text  style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}>Approve</Text></Pressable>


        <Pressable style={{
            width: 100,
            backgroundColor:'red',
            borderRadius: 6,
            padding: 12,}}><Text style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}>Reject</Text></Pressable>
        </View>
       
    </View>
 
      
 
  </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({})