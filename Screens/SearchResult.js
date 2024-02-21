import { ScrollView, StyleSheet, Text, View,Dimensions, TextInput, Pressable, Image,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CarouselPage from '../Components/CarouselPage';
import img from '../assets/image.jpg'
import ProgressBar from 'react-native-progress/Bar';
import Loader from '../Components/Loader';


const height = Dimensions.get('window').height

const NotFound = () =>(
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30,marginVertical:10, borderTopWidth:1,height:height*0.8 }}>
      
  <Text>
  Not Found
  </Text>
  </View>
)


const SearchResult = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [result, setResult] = useState([])

  const { item,searchinput } = route.params;
  const [query, setQuery] = useState(searchinput.toLowerCase())
  const [input, setInput] = useState('')
  const [loader, setLoader] = useState(true)
  // console.log("item",searchinput)
 

  const filterItem  = (query) =>{


    const filteredItems  = item.filter((item) =>{
      return (
        item.collegeName.toLowerCase() === query ||
        item.address.city.toLowerCase() === query ||
        item.address.state.toLowerCase() === query ||
        item.mobileNumber.toLowerCase() === query ||
        item.alternateMobileNumber.toLowerCase() === query ||
        item.field.toLowerCase() === query ||
        item.name.firstName.toLowerCase() === query ||
        item.name.lastName.toLowerCase() === query
      );
    
    })
 
    setResult(filteredItems )
    setLoader(false)
   
  }
  const handleSearch = () => {
    // Perform search based on the input value

  if (input) {
    filterItem(input.toLowerCase());
  }

  };

  useEffect(() =>{
    const fetchData = async () => {
      setLoader(true);
      await filterItem(query); // Assuming filterItem becomes asynchronous
      setLoader(false);
    };
  
    fetchData();
  },[query])

console.log("query", query)
// console.log("input", input)
// console.log("result", result)

 





  return (
   <SafeAreaView style={{
    flex: 1,
    backgroundColor: "white",
}} >

{loader?<Loader />:<ScrollView style={{ flex: 1, paddingVertical: 40}}>

<Pressable 
onPress={handleSearch}
style={{
  flexDirection: "row",
  alignItems: "center",
  marginHorizontal: 7,
  gap: 10,
  backgroundColor: "#f0f0f0",
  marginVertical: 20,
  marginHorizontal: 15,
  borderRadius: 3,
  height: 38,
  flex: 1,
  paddingVertical: 5,
  borderRadius: 15


}}>
  <AntDesign
     onPress={handleSearch}
    style={{ paddingLeft: 10 }}
    name="search1"
    size={22}
    color="black"
  />
  <TextInput placeholder="Search Students..." style={{ width: "100%" }} onChangeText={(value) =>setInput(value.toLowerCase())}  onSubmitEditing={handleSearch} />
</Pressable>

<View style={styles.shadowProp}>



 
</View>

<Text style={{ fontSize: 19, fontWeight: 700, color: 'black ', textAlign: 'center', marginVertical: 5 }}> Search Result</Text>
{result.length ===0?<NotFound />:(

<View  style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap", justifyContent: 'space-around', marginTop: 30 }}>

{
result.map((item) =>(
<Pressable
key={item._id}
onPress={() => navigation.navigate("Info",{studentData:item})}
style={[styles.CardProp, { flexDirection: 'column',justifyContent:'center',alignItems:'center', width: 180 ,borderColor:'#c0c0c0',borderWidth:1,paddingBottom:20,marginBottom:30}]}>
<Image source={{ uri: item?.image }} style={{ width: 150, height: 150, margin: 9, borderRadius: 10 }} />
<View style={{ marginHorizontal: 18 }}>

  <Text style={{ fontWeight: 700, fontSize: 13 }}>{item.name.firstName} {item.name.lastName}</Text>
  <Text style={{ fontWeight: 500, fontSize: 11, marginVertical: 5, color: "#C0C0C0" }}>Usman is Needy Person, He Got Placement but he need more MONEY</Text>
  <View style={{ marginVertical: 10 }}>

      <ProgressBar progress={item.donationStatus.amountPending / item.donationStatus.totalAmount}
          color='#580ff5'
          width={150}
          height={10}
          borderRadius={10}



      />
  </View>
  <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>


      <View style={{ flexDirection: "row" }}>
          <Text style={{ color: '#580ff5', fontWeight: 700, marginHorizontal: 5 }}>₹{item.donationStatus.totalAmount - item.donationStatus.amountPending
          }</Text>
          <Text style={{ fontWeight: 500, color: "rgba(10,10,10,0.6)" }}>Collected</Text>
      </View>


  </View>
</View>
</Pressable>
))
}

</View>)

}




</ScrollView>}

   </SafeAreaView>
  )
}

export default SearchResult

const styles = StyleSheet.create({
  shadowProp: {
      shadowColor: '#580ff5',
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      margin: '2%',
      borderRadius: 10,
  },
  CardProp: {
      shadowColor: '#580ff5',
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      margin: '2%',
      borderRadius: 10,
  },
});