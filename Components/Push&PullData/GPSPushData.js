import React, { Component } from 'react'
import { View } from 'react-native'
import firestore from '@react-native-firebase/firestore';

export default class GPSPushData extends Component {

    static pushLocation(ID, District, Province, Latitude, Longtitude) {
        firestore()
        .collection("Hà Nội")
        .doc(District)
        .collection(Province)
        .doc("Supervisor")
        .collection("SuspectedUser")
        .doc(ID)
        .update({
            Longtitude: Longtitude,
            Latitude: Latitude,
            
        })
    }

    render() {
        return (
            <View>
                
            </View>
        )
    }
}
