import React, { Component } from 'react'
import firestore from '@react-native-firebase/firestore';
import NotifService from '../Notification';
import { View, Alert } from 'react-native';

var notif = new NotifService;

export default class SupervisorRealTimePullData extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            district: props.district,
            province: props.province,
      }
    }

    componentDidMount() {
        firestore()
        .collection("Hà Nội")
        .doc(this.state.district)
        .collection(this.state.province)
        .doc("Supervisor")
        .collection("SuspectedUser")
        .onSnapshot (docSnapshot => {
        docSnapshot.docChanges().forEach(change => {
            if(change.type === "modified") {
                this.createNotification(change.doc.data().Name, change.doc.data().CMND, change.doc.data().QuarantineLocation);
            }
        }
        )
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }
    
    onRegister(token) {
        Alert.alert('Registered !', JSON.stringify(token));
        //console.log(token);
        this.setState({registerToken: token.token, fcmRegistered: true});
    }
    
    onNotif(notif) {
        //console.log(notif);
        Alert.alert(notif.title, notif.bigText);
    }
    
    createNotification(Name, CMND, QuarantineLocation) {
        var info = Name + " vừa rời khỏi khu cách ly";
        var info_BigText = "Tên: " + Name + "\n" + "Số CMND: "  + CMND + "\n" + "Địa chỉ: " + QuarantineLocation;
        notif = new NotifService (
            this.onRegister.bind(this),
            this.onNotif.bind(this),
            "Cảnh báo!",
            info,
            info_BigText,
        );
        notif.cancelAll();
        notif.localNotif();
    }

    render() {
        return (
            <View>
                
            </View>
        )
    }
}
