import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';

const AnalyticsScreen = () => {


const route = useRoute();
const {  donationdata } = route.params;

const chartData = donationdata.map(item => ({
  amount: item.donations.donatedAmount,
  date: new Date(item.updatedAt).toLocaleDateString() // Convert updatedAt to date format
}));

const amounts = chartData.map(item => item.amount);
const dates = chartData.map(item => item.date);

console.log(dates)

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
      <View>
  <Text>Bezier Line Chart</Text>
  <LineChart
    data={{
      labels: dates, // Use dates as labels
      datasets: [{ data: amounts }]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="₹"
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#1dd881",
      backgroundGradientFrom: "#1dd881",
      backgroundGradientTo: "#1de811",
      decimalPlaces: 1, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
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