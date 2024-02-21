import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { Table,Row,Rows } from 'react-native-table-component'
import {useRoute } from '@react-navigation/native'

const DetailTable = () => {

    const route = useRoute();
    const { studentData } = route.params;
    const tableData = {
        tableHead: ['Attribute', "Detail",],
        tableData: [
            ["First Name", studentData.name.firstName],
            ['City',studentData.address.city],
            ['State',studentData.address.state],
            ['Mobile No', studentData.mobileNumber],
            ['Alternate Mobile No', studentData.alternateMobileNumber],
            ['College Name',studentData.collegeName],
            ['Field', studentData.field],
        ],
    };
const [data,setData] = useState(tableData)
const state = this.state
  return (
    <View style={styles.container}>
    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={data.tableHead} style={styles.head} textStyle={styles.text} />
        <Rows data={data.tableData} textStyle={styles.text} />
    </Table>
</View>
  )
}

export default DetailTable

const styles = StyleSheet.create({

    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    headText: { fontSize: 20, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
    text: { margin: 6 }
})