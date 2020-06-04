import React, { Component } from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet ,Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-community/async-storage';


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
        if(this.state.PIN == "123") {
            this.props.changePage('supervisorUI');
        }
        
        else {

        var documentFound = false;
            firestore()
            .collection("PIN")
            .get()
            .then(snapShot => {
                snapShot.forEach(doc => {
                    console.log(doc)
                    if(this.state.PIN == doc.id) {
                        documentFound = true;
                        this.saveToASync(doc.id, doc.data().District, doc.data().Province)
                        this.props.changePage('userInterface');
                    }
                })

                if(documentFound == false) {
                    Alert.alert("Bạn nhập sai mã PIN");
                }
            })
        }
        
    } 

    saveToASync(ID, District, Province) {
        const firstPair = ["ID", ID]
        const secondPair = ["District", District]
        const thirdPair = ["Province",Province,]
        AsyncStorage.multiSet([firstPair, secondPair, thirdPair])
    }

    render() {
        return (
           <View>

           </View>
        )
    }
}
