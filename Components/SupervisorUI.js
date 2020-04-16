import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet ,Alert } from 'react-native';

export default class SupervisorUI extends Component{

    render() {
            return(
            <View style = {styles.view1}>
                <View style = {styles.view2}>
                    <Text>Chúc mừng bạn đã được làm quản lý</Text>
                </View>
            </View>
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
