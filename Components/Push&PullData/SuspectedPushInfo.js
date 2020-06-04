import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export default class SuspectedPushInfo extends Component {

    static saveInfo(Phone, Name, CMND, Insurance, DateOfBirth, Gender, Region, District, Province, QuarantineLocation, Email, CurrentDate, Longtitude, Latitude) {
        
        firestore()
        .collection("Hà Nội")
        .doc(District)
        .collection(Province)
        .doc("Supervisor")
        .collection("SuspectedUser")
        .doc(CMND)
        .set({
            Phone: Phone,
            Name: Name,
            CMND: CMND,
            Insurance: Insurance,
            DateOfBirth: DateOfBirth,
            Gender: Gender,
            Region: Region,
            District: District,
            Province: Province,
            QuarantineLocation: QuarantineLocation,
            Email: Email,
            CurrentDate: CurrentDate,
            Longtitude: Longtitude,
            Latitude: Latitude,
            
        })

        firestore()
        .collection("PIN")
        .doc(CMND)
        .set({
            Name: Name,
            District: District,
            Province: Province,
            Email: Email,
        })

        const firstPair = ["ID", Name]
        const secondPair = ["District", District]
        const thirdPair = ["Province",Province,]
        const forthPair = ["OriginalLatitude", Latitude]
        const fifthPair = ["OriginalLongtitude", Longtitude]
        AsyncStorage.multiSet([firstPair, secondPair, thirdPair, forthPair, fifthPair])
        
        console.log("Lưu thông tin người dùng thành công.")
    }

    render() {
        return (
            <View>
                
            </View>
        )
    }
}
