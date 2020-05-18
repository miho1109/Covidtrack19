import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Map from './GoogleMap'

export default class SupervisorUI extends Component{

    render() {
            return(
            <Map></Map>
        )
    }
}
const styles = StyleSheet.create({
    view :{
       flex:1,
       justifyContent: 'center'
    },
    text :{
       textAlign: 'center',
       fontSize: 40,
       color: 'blue'
    },
    inPut: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1,
    },
    logIn: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1,
       backgroundColor: '#d9f9b1',
       justifyContent: 'center',
       alignItems: 'center'
    },
    signUp: {
       marginTop : 1,
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1,
       backgroundColor: 'pink',
       justifyContent: 'center',
       alignItems: 'center'
    }
 })
