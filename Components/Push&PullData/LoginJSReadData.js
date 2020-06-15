import React, { Component } from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet ,Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service'

export default class LoginJSReadData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            PIN: props.PIN,
            originalLat: '',
            originalLong: '',
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
        this.getOriginalLocaion();
        var documentFound = false;
            firestore()
            .collection("PIN")
            .get()
            .then(snapShot => {
                snapShot.forEach(doc => {
                    if(this.state.PIN == doc.id) {
                        documentFound = true;
                        this.saveToASync(doc.id, doc.data().District, doc.data().Province)
                        this.props.changePage('userInterface', doc.id, 
                                                doc.data().District, doc.data().Province,
                                                this.state.originalLat, this.state.originalLong);
                    }
                })

                if(documentFound == false) {
                    Alert.alert("Bạn nhập sai mã PIN");
                    this.props.changePage('logIn', ' ', ' ', ' ',' ', ' ');
                }
            })
        }
        
    } 

    saveToASync(ID, District, Province) {
        AsyncStorage.clear();
        const firstPair = ["ID", ID]
        const secondPair = ["District", District]
        const thirdPair = ["Province",Province]
        const fourthPair = ["Latitude", this.state.originalLat]
        const fifthPair = ["Longtitude",this.state.originalLong]
        AsyncStorage.multiSet([firstPair, secondPair, thirdPair,fourthPair,fifthPair])
    }

    getOriginalLocaion(){
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    originalLong: position.coords.longitude.toString(),
                    originalLat: position.coords.latitude.toString(),
                })
                
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, forceRequestLocation: true}
        );
    }

    render() {
        return (
           <View>

           </View>
        )
    }
}
