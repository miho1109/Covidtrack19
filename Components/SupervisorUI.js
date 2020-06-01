import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert} from 'react-native';
import Map from './GoogleMap';
import firestore from '@react-native-firebase/firestore';
import NotifService from './Notification';

var notif = new NotifService;

export default class SupervisorUI extends Component{
   constructor(props) {
      super(props);
      this.state= {
          district: props.district,
          province: props.province,
          Longtitude: props.Longtitude,
          Latitude: props.Latitude,
    }
  }

   componentDidMount() {
      firestore()
      .collection("Hà Nội")
      .doc("Tây Hồ")
      .collection("Bưởi")
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
      var info = Name + " vừa xổng chuồng";
      var info_BigText = "Số CMND: "  + CMND + "\n" + "Địa chỉ: " + QuarantineLocation;
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
            return(
            <Map
               district={this.state.district}
               province={this.state.province}
               Longtitude={this.state.Longtitude}
               Latitude={this.state.Latitude}
            />
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
