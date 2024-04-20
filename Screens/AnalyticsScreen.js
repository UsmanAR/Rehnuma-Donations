import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AnalyticsScreen = () => {


    const data = [
        { title: 'Total Student', value: '18500' },
        { title: 'Total Donors', value: '800' },
        { title: 'Total Amount Donated', value: '500000₹' },
        { title: 'Total Subjects', value: '15' },
        // Add more data items if needed
      ];

  return (
    <SafeAreaView>
    <ScrollView  style={{
              paddingVertical: 20,
            }}>
      <View style={styles.container}>
        {data.map((item, index) => (
          <View key={index} style={[styles.metricContainer, index % 2 === 1 && styles.metricContainerOdd]}>
            <Text style={styles.metricTitle}>{item.title}</Text>
            <Text style={[styles.metricValue, styles.metricValueNumeric]}>{item.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default AnalyticsScreen


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center', // Center child views horizontally
      paddingHorizontal: 10,
     
    },
    metricContainer: {
      width: '48%',
      paddingVertical: 15,
      paddingHorizontal: 5,
      backgroundColor: '#fff',
      marginBottom: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    metricContainerOdd: {
      marginLeft: '2%',
    },
    metricTitle: {
      fontSize: 14,
      fontWeight: '400',
      textAlign: 'center', // Center text horizontally
    },
    metricValue: {
      fontSize: 16,
      textAlign: 'center', // Center text horizontally
      color: '#1dd881',
      fontWeight:600,
      fontSize:20

    },
 
  })