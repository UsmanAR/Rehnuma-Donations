import { SafeAreaView, ScrollView, StyleSheet, Text, View,Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '../Components/Loader';
import axios from 'axios';

import avatar from "../assets/avatar.jpg"
import { useNavigation } from '@react-navigation/native';

const History = () => {


    const [loader, setLoader] = useState(true)
    const [decision, setDecision] = useState([]);
    const navigation = useNavigation()

    const fetchData = async () => {
        try {
            const response = await axios.get("http:192.168.153.200:8000/students");
            setDecision(response.data.beneficiaries);
            setLoader(false)
            console.log(decision)
        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    };

    useEffect(() => {

        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 10000);

        return () => clearInterval(interval);
    }, []);



    return (
        <SafeAreaView>
            {loader ? <Loader /> :
                <ScrollView style={{
                 
                
                  
                  }}>
                    <View style={{ gap: 10, display: 'flex', flexDirection: 'column' }}>
                      {decision.map((data,index) =>(
                          <Pressable key={index}
                          onPress={() => navigation.navigate("HistoryFullPage", { studentData: data })}
                          
                          
                          style={{ backgroundColor: '#ffff' }}>
                          <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                              <Image source={data?.image == 'NA' ? avatar : { uri: data.image }} style={{ height: 60, width: 60, borderRadius: 30, padding: 5 }} />
                              <Text>
                                  A new Student form has been submitted for approval,<Text style={{ fontWeight: "bold" }}> {data.name.firstName} {data.name.lastName}</Text> is pursuing <Text style={{ fontWeight: "bold" }}>{data.field}</Text> in <Text>
                                      {data.branch}
                                  </Text> from <Text style={{ fontWeight: "bold" }}>{data.collegeName}</Text>
                              </Text>
                             
                          </View>
                          <Text style={{ fontWeight: "400", textAlign: 'right',marginVertical:5,fontSize:10 }}>2024-02-22T17:13:31</Text>
                           <Text style={{ fontWeight: "600", textAlign: 'center',fontSize:15 }}>You <Text style={{ color: data.selectionStatus == 'Accepted' ? '#1aca78' : 'red' }}> {data.selectionStatus} </Text>This Application</Text>

                      </Pressable>
                      ))}
                    </View>
                </ScrollView>}
        </SafeAreaView>
    )
}

export default History

const styles = StyleSheet.create({})