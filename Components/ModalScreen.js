import { Alert, Dimensions, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useHeaderHeight } from '@react-navigation/elements'
import { Dropdown } from 'react-native-element-dropdown';

const ModalScreen = () => {

  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [isModalVisible, setModalVisible] = useState(true);

  const data = [
    { label: 'Medical', value: 'Medical' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Others', value: 'Others' },
   
  ];

 

 const [formdata,setFormData] = useState({
  firstName:'',
  maddileName:'',
  lastName:'',
  image:'',
  mobileNumber:'',
  alternateMobileNumber:'',
  collegeName:'',
  address:{
    landmark:'',
    city:'',
    state:'',
    
  },
  status:'pending',
  field:''

 })

 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [middleName, setMiddleName] = useState('');
 const [field, setField] = useState(null); // Updated state for dropdown value
 const [stream, setStream] = useState('');
 const [collegeName, setCollegeName] = useState('');
 const [city, setCity] = useState('');
 const [state, setState] = useState('');
 const [mobileNumber, setMobileNumber] = useState('');
 const [alternateMobileNumber, setAlternateMobileNumber] = useState('');

 const [firstNameError, setFirstNameError] = useState('');
 const [lastNameError, setLastNameError] = useState('');
 const [fieldError, setFieldBuddyError] = useState(''); // State for dropdown validation error
 const [streamError, setStreamError] = useState('');
 const [collegeNameError, setCollegeNameError] = useState('');
 const [cityError, setCityError] = useState('');
 const [stateError, setStateError] = useState('');
 const [mobileNumberError, setMobileNumberError] = useState('');



 useEffect(() => {
  const updateData = async () => {
    await setFormData({
      firstName:firstName,
      maddileName:middleName,
      lastName:lastName,
      image:'NA',
      mobileNumber:mobileNumber,
      alternateMobileNumber:alternateMobileNumber,
      collegeName:collegeName,
      address:{
        landmark:'',
        city:city,
        state:state,
        
      },
      field:field,
      stream:stream,
      status:'pending',
    
     })
    
  };

  updateData();
}, [firstName,lastName,middleName,mobileNumber,alternateMobileNumber,field,stream,city,state,collegeName]);

 const handleFomValidation = async() => {
  // Validate first name
  if (!firstName) {
    setFirstNameError('First name is required');
    return;
  }
  setFirstNameError('');

  if (!lastName) {
    setLastNameError('Last name is required');
    return;
  }
  setLastNameError('');

  if (!field) {
    setFieldBuddyError('Field buddy is required'); // Validate dropdown selection
    return;
  }
  setFieldBuddyError('');

  if (!stream) {
    setStreamError('Stream is required');
    return;
  }
  setStreamError('');

  if (!collegeName) {
    setCollegeNameError('College name is required');
    return;
  }
  setCollegeNameError('');

  if (!city) {
    setCityError('City is required');
    return;
  }
  setCityError('');

  if (!state) {
    setStateError('State is required');
    return;
  }
  setStateError('');

  if (!mobileNumber) {
    setMobileNumberError('Mobile number is required');
    return;
  }
  setMobileNumberError('');


  

 await Alert.alert("Submit Form","Are You Really Want to Submit This Form",[
    {
        text: "Cancel",
        onPress: () => console.log("Cancel is pressed"),
      },
      {
        text: "OK",
        onPress: () =>  console.log('Form submitted successfully',formdata)
      },
])


  // If all fields are valid, submit the form
 
};

 const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('Main')
  };
  return (


    <Modal
      animationType="slide"
      transparent={isModalVisible}
      visible={isModalVisible}
      onRequestClose={closeModal}
      animationDuration={1000}
      style={{ flex: 1, justifyContent: 'center', position: 'relative', alignItems: 'center', }}
    >



      <KeyboardAwareScrollView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === "ios" ? "padding" : null}

        style={{ flex: 1, flexDirection: "column", gap: 5, height: height * 0.8, }}
        contentContainerStyle={{
          flexGrow: 1, alignItems: 'center', padding: 10, paddingHorizontal: 10, backgroundColor: '#fff',
          borderTopEndRadius: 30, borderTopStartRadius: 30, overflowL: 'hidden', width: width,
        }}>

        <TouchableOpacity style={{ position: 'absolute', top: 15, right: 15 }} onPress={closeModal}>

          <MaterialIcons name='close' size={28} />
        </TouchableOpacity>
        <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 18 }}>Add Student</Text>

        <View style={{ gap: 10 }}>
          <View style={{ justifyContent: 'center', width: width * .95, flexDirection: 'column', }} >
            
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Student First Name: </Text>

            <TextInput
             value={firstName}
              onChangeText={text => setFirstName(text)}
              placeholder='Enter Student First Name' style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderWidth: 0.5, borderRadius: 8,marginTop:4 }} />
               {firstNameError ? <Text style={{ color: 'red' }}>{firstNameError}</Text> : null}
          </View>
          <View style={{ justifyContent: 'center', width: width * .95, flexDirection: 'column', }} >
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Student Last Name: </Text>
            <TextInput
             value={lastName}
             onChangeText={text => setLastName(text)}
             placeholder='Enter Student Last Name' style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderWidth: 0.5, borderRadius: 8,marginTop:4 }} />
              {lastNameError ? <Text style={{ color: 'red' }}>{lastNameError}</Text> : null}
          </View>
          <View style={{ justifyContent: 'center', width: width * .95, flexDirection: 'column', }} >
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Student Middle Name: </Text>
            <TextInput
             value={middleName}
             onChangeText={text => setMiddleName(text)}
             placeholder='Enter Student Last Name' style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderWidth: 0.5, borderRadius: 8,marginTop:4 }} />
             
          </View>
          <View style={{ justifyContent: 'center', width: width * .95,marginVertical:10,  flexDirection: 'coumn', }} >
         
          <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Field' : '...'}
          searchPlaceholder="Search..."
          value={field}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setField(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
            {fieldError ? <Text style={{ color: 'red' }}>{fieldError}</Text> : null}
          </View>
          <View style={{ justifyContent: 'center', width: width * .95,  flexDirection: 'coumn', }} >
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Stream </Text>
            <TextInput 
             value={stream}
             onChangeText={text => setStream(text)}
            placeholder='Enter Student Stream' style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderWidth: 0.5, borderRadius: 8,marginTop:4 }} />
            {streamError ? <Text style={{ color: 'red' }}>{streamError}</Text> : null}
          </View>
          <View style={{ justifyContent: 'center', width: width * .95,  flexDirection: 'coumn', }} >
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>College Name </Text>
            <TextInput
            value={collegeName}
            onChangeText={text => setCollegeName(text)}
            placeholder='Enter College Name' style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderWidth: 0.5, borderRadius: 8,marginTop:4 }} />
            {collegeNameError ? <Text style={{ color: 'red' }}>{collegeNameError}</Text> : null}
          </View>
          <View style={{ justifyContent: 'center', width: width * .95,  flexDirection: 'coumn', }} >
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>City </Text>
            <TextInput
             value={city}
             onChangeText={text => setCity(text)}
            placeholder='Enter Student City' style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderWidth: 0.5, borderRadius: 8,marginTop:4 }} />
            {cityError ? <Text style={{ color: 'red' }}>{cityError}</Text> : null}
          </View>
          <View style={{ justifyContent: 'center', width: width * .95,  flexDirection: 'coumn', }} >
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>State </Text>
            <TextInput 
             value={state}
             onChangeText={text => setState(text)}
            placeholder='Enter Student State' style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderWidth: 0.5, borderRadius: 8,marginTop:4 }} />
            {stateError ? <Text style={{ color: 'red' }}>{stateError}</Text> : null}
          </View>
          <View style={{ justifyContent: 'center', width: width * .95,  flexDirection: 'coumn', }} >
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Mobile Number </Text>
            <TextInput 
             value={mobileNumber}
             onChangeText={text => setMobileNumber(text)}
            placeholder='Enter Student Mobile Number' style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderWidth: 0.5, borderRadius: 8,marginTop:4 }} />
             {mobileNumberError ? <Text style={{ color: 'red' }}>{mobileNumberError}</Text> : null}
          </View>
          <View style={{ justifyContent: 'center', width: width * .95,  flexDirection: 'coumn', }} >
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Alternate Mobile Number </Text>
            <TextInput
             value={alternateMobileNumber}
             onChangeText={text => setAlternateMobileNumber(text)}
            placeholder='Enter Student Alternate Mobile Number' style={{ flex: 1, backgroundColor: '#ffff', padding: 10, borderWidth: 0.5, borderRadius: 8,marginTop:4 }}/>
          </View>
         
    
       



        </View>

        <Pressable
onPress={handleFomValidation}

          style={[styles.shadowProp, {
            backgroundColor: '#1aca78',
            borderRadius: 10,
            padding: 12,
            width: '90%',
            marginVertical: 40

          }]}


        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
           Submit Form
          </Text>
        </Pressable>

      </KeyboardAwareScrollView >
    </Modal>




  )
}

export default ModalScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 8
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  quantityContainer: {
    justifyContent: 'center',
    width: '50%',
    height: 50,
    flexDirection: 'column',
   
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'center',
    width: '35%',
    height: 40,
  },
  input: {
    flex: 1,
    backgroundColor:'transparent',
    borderWidth: 0.5,
    height: 40,
    justifyContent: 'center',
    borderRadius: 8,
    textAlign: 'center',
   width:20,
  
  },
});