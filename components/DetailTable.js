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
  return (
    <View style={styles.container}>
    <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
        <Row data={data.tableHead} style={styles.head} textStyle={{ fontSize: 20, fontWeight: 'bold' , textAlign: 'center', color: 'white' }} />
        <Rows data={data.tableData} textStyle={ [{ margin: 6, fontSize: 16, fontWeight: 'bold' , textAlign: 'center' }]} />
    </Table>
</View>
  )
}

export default DetailTable

const styles = StyleSheet.create({

    container: { flex: 1, padding: 10, justifyContent: 'center', backgroundColor: '#fff',},
    head: { height: 44, backgroundColor: '#580ff5' },
    headText: { fontSize: 20, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
    text: { margin: 6, fontSize: 16, fontWeight: 'bold' , textAlign: 'center' },

})