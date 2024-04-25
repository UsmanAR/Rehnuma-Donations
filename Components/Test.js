import { Button, Image, Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {CFCallback, CFErrorResponse, CFPaymentGatewayService} from 'react-native-cashfree-pg-sdk'

import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';


const Test = () => {

const pay =() =>{
  try {
    const session = new CFSession(
      'order_token',
      'order_id',
      CFEnvironment.SANDBOX
    );
    const theme = new CFThemeBuilder()
      .setNavigationBarBackgroundColor('#E64A19')
      .setNavigationBarTextColor('#FFFFFF')
      .setButtonBackgroundColor('#FFC107')
      .setButtonTextColor('#FFFFFF')
      .setPrimaryTextColor('#212121')
      .setSecondaryTextColor('#757575')
      .build();
    const dropPayment = new CFDropCheckoutPayment(session, null, theme);
    CFPaymentGatewayService.doPayment(dropPayment);
  } catch (e) {
    console.log(e.message);
  }
}
  loadInBrowser = () => {
    let url = `https://payments-test.cashfree.com/forms/rehnuma-donation`
   let x= Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
   console.log(x)
  };
  return (
    <View>
    
    <Button title='Pay Now' onPress={pay} />
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})