import React, { Component } from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet ,Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'

export default class LoginJSReadData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            PIN: props.PIN,
        }
    }
    
    componentDidMount() {
        this.logIn();
    }

    logIn(){
        firestore().collection("Supervisor").doc(this.state.PIN)
        .get().then (doc => {
            if(doc.exists) {
                this.props.changePage('supervisorUI')
            }
            else
            {
                firestore().collection("SuspectedUser").doc(this.state.PIN)
                .get().then (doc => {
                    if(doc.exists) {
                        this.props.changePage('userInterface')
                    }
                    else{
                        Alert.alert("Bạn nhập sai mã PIN")
                    }
                })
            }
        })
     
    } 

    render() {
        return (
           <View>

           </View>
        )
    }
}
