import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export default class SupervisorPushInfo extends Component {

  
    static saveInfo(Phone, Name, CMND, District, Province, Latitude, Longtitude) {
        
        firestore()
        .collection("Hà Nội")
        .doc(District)
        .collection(Province)
        .doc("Supervisor")
        .set({
            Name: Name,
            CMND: CMND,
            District: District,
            Province: Province,
            Phone: Phone
        })

        AsyncStorage.clear();
        const firstPair = ["ID", Name]
        const secondPair = ["District", District]
        const thirdPair = ["Province", Province]
        const forthPair = ["Role", "Supervisor"]
        const fifthPair = ["Latitude", Latitude]
        const sixthPair = ["Longtitude", Longtitude]
        AsyncStorage.multiSet([firstPair, secondPair, thirdPair, forthPair, fifthPair, sixthPair])

        console.log("Lưu thông tin người dùng thành công.")
    }

    render() {
        return (
            <View>
                
            </View>
        )
    }
}
