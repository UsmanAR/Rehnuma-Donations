import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { LineChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";



const renderLegend = (text, color) => {

  return (

    <View style={{ flexDirection: 'row', marginBottom: 12 }}>

      <View

        style={{

          height: 18,

          width: 18,

          marginRight: 10,

          borderRadius: 4,

          backgroundColor: color || 'white',

        }}

      />

      <Text style={{ color: 'white', fontSize: 16 }}>{text || ''}</Text>

    </View>

  );

};


const AnalyticsScreen = () => {


  const route = useRoute();
  const { donationdata } = route.params;

  const chartData = donationdata.map(item => ({
    amount: item.donations.donatedAmount,
    date: new Date(item.updatedAt).toLocaleDateString() // Convert updatedAt to date format
  }));

  console.log(donationdata[1].donations)

  const amounts = chartData.map(item => item.amount);
  // const dates = chartData.map(item => item.date);


  const totalAmount = amounts.reduce((a, b) => a + b)
  console.log(totalAmount)


  const data = [
    { title: 'Total Student', value: donationdata.length },
    // { title: 'Total Donors', value: '800' },
    { title: 'Total Amount Donated', value: `${totalAmount}₹` },
    // { title: 'Total Subjects', value: '15' },
    // Add more data items if needed
  ];

  //   data = [
  //     {value: 250, label: 'M'},
  //     {value: 500, label: 'T', frontColor: '#177AD5'},
  //     {value: 745, label: 'W', frontColor: '#177AD5'},
  //     {value: 320, label: 'T'},
  //     {value: 600, label: 'F', frontColor: '#177AD5'},
  //     {value: 256, label: 'S'},
  //     {value: 300, label: 'S'},
  // ];

  const monthlyDonations = {};
  donationdata.forEach(entry => {
    const date = new Date(entry.createdAt);
    const month = date.toLocaleString('en-us', { month: 'short' });
    const donatedAmount = entry.donations.donatedAmount;
    if (monthlyDonations[month]) {
      monthlyDonations[month] += donatedAmount;
    } else {
      monthlyDonations[month] = donatedAmount;
    }
  });

  const barChartData = Object.entries(monthlyDonations).map(([month, value]) => ({
    value,
    label: month,
    topLabelComponent: () => (

      <Text style={{ color: 'blue', fontSize: 18 }}>{value}</Text>

    ),
  }));
  // console.log(barChartData)



  // const lineData =  [{value: 15,dataPointText: '0',label:'Mon'}, {value: 30,dataPointText: '10'}
  // , {value: 26,dataPointText: '55'}, {value: 40,dataPointText: '12'}]


  const pieData = [

    {

      value: 47,

      color: '#009FFF',

      gradientCenterColor: '#006DFF',

      focused: true,

    },

    { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },

    { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },

    { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },

  ];


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const lineData = donationdata.map(entry => ({
    value: entry.donations.donatedAmount,
    dataPointText: entry.donations.donatedAmount,
    label: formatDate(entry.createdAt)
  }));

  // console.log(transformedData);

  return (
    <SafeAreaView>
      <ScrollView style={{
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

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Text>Monthly Donations</Text>

          <BarChart width={500}
            height={350}
            maxValue={5000}
            barWidth={100}
            data={barChartData}
            frontColor="#177AD5"
            isAnimated
            showFractionalValue
            showYAxisIndices
          />

        </View>


        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Text>Daily Donations</Text>
          <LineChart color='#177AD5'
            data={lineData}

            thickness={3}
            dataPointsColor={'#1dd881'}
            textFontSize={15}
            textShiftY={-6}
            textShiftX={-5}
            maxValue={2000}
            startFillColor={'rgb(84,219,234)'}
            rulesColor="gray"
            endFillColor={'rgb(84,219,234)'}
            width={500} height={350}
            isAnimated={true}
            spacing={100}
            focusEnabled={true}
            animateOnDataChange

            animationDuration={3000}
            areaChart

            onDataChangeAnimationDuration={300}
          />

        </View>

        <View

          style={{

            paddingVertical: 100,

            backgroundColor: '#34448B',

            flex: 1,

          }}>





          <View>

            <View

              style={{

                marginVertical: 100,
                marginHorizontal: 30,
                borderRadius: 10,
                paddingVertical: 50,
                backgroundColor: '#414141',
                justifyContent: 'center',
                alignItems: 'center',

              }}>



              <Text

                style={{
                  color: 'white',
                  fontSize: 32,
                  fontWeight: 'bold',
                  marginBottom: 12,

                }}>

                Student Fields

              </Text>





              <PieChart

                strokeColor="#1dd881"
                strokeWidth={4}
                donut
                data={[

                  { value: 30, color: 'rgb(84,219,234)' },

                  { value: 40, color: 'lightgreen' },

                  { value: 20, color: 'orange' },

                ]}

                innerCircleColor="#414141"

                innerCircleBorderWidth={2}

                innerCircleBorderColor={'white'}

                showValuesAsLabels={true}

                showText

                textSize={20}

                showTextBackground={true}

                centerLabelComponent={() => {

                  return (

                    <View>

                      <Text style={{ color: 'white', fontSize: 36,textAlign:'center' }}>{donationdata.length}</Text>

                      <Text style={{ color: 'white', fontSize: 18,textAlign:'center' }}>Total</Text>

                    </View>

                  );

                }}

              />



              {/*********************    Custom Legend component      ********************/}

              <View

                style={{

                  width: '100%',

                  flexDirection: 'row',

                  justifyContent: 'space-evenly',

                  marginTop: 20,

                }}>

                {renderLegend('Eng', 'rgb(84,219,234)')}

                {renderLegend('Med', 'lightgreen')}

                {renderLegend('Others', 'orange')}

              </View>

              {/****************************************************************************/}




            </View>

          </View>



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
    paddingVertical: 10,

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
    fontWeight: 600,
    fontSize: 20

  },

})