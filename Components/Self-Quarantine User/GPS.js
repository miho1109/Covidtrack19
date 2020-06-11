import React, { Component } from 'react';
import {
    View,
    Text,
    DeviceEventEmitter,
    Alert
} from 'react-native';

import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from "react-native-geolocation-service"
import NotifService from '../Notification';
import GPSPushData from '../Push&PullData/GPSPushData'

var notif = new NotifService;

export default class GPS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            district: props.district,
            province: props.province,
            Long: props.originalLong,
            Lat: props.originalLat,
            originalLong: props.originalLong,
            originalLat: props.originalLat,
            distanceFromHome: 0,
        };
    }

    onRegister(token) {
        Alert.alert('Registered !', JSON.stringify(token));
        //console.log(token);
        this.setState({registerToken: token.token, fcmRegistered: true});
      }
    
    onNotif(notif) {
        //console.log(notif);
        Alert.alert(notif.title, notif.message);
    }
    
    createNotification() {
        notif = new NotifService (
            this.onRegister.bind(this),
            this.onNotif.bind(this),
            "Cảnh báo!",
            "Xin hãy về nhà!" + "\n" + "Bạn đang cách khu cách ly: " + Math.round(this.state.distanceFromHome) + "m",
            "Xin hãy về nhà!" + "\n" + "Bạn đang cách khu cách ly: " + Math.round(this.state.distanceFromHome) + "m",
        );
    }
    
    componentDidMount() {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: '',
            enableHighAccuracy: true,
            showDialog: true, 
            openLocationServices: true, 
            preventOutSideTouch: true, 
            preventBackClick: true,
            providerListener: true 
        }).then(function(success) {     
            Geolocation.watchPosition(
                (position) => {
                    this.setState({
                        Long: position.coords.longitude,
                        Lat: position.coords.latitude,
                    })
                    // console.log("originalLong: " , this.state.originalLong," ", "originalLat:  " ,this.state.originalLat);
                    // console.log(this.state.Long, this.state.Lat);
                    
                    this.checkLocation();
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, forceRequestLocation: true, timeout: 1500, maximumAge: 5000, showLocationDialog: true, fastestInterval: 10, distanceFilter: 1}
            );

            }.bind(this)    
        ).catch((error) => {
            console.log(error.message);
        });
        
        DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { 
            console.log("Status hiện tại của GPS: " , status);
            let a = JSON.stringify(status);
            if(a.slice(11,16) == "false") {
                Alert.alert("Vui lòng bật lại GPS, làm ơn !!!")
            } 
        });
    }
    
    componentWillUnmount() {
       
        LocationServicesDialogBox.stopListener(); 
    } 


    checkLocation(){
        console.log(this.state.originalLat, this.state.originalLong);
        console.log(this.state.Lat, this.state.Long);
        if(this.state.originalLat != 0 && this.state.originalLong != 0) {
            var R = 6371000; // metres
            var φ1 = this.state.Lat* Math.PI / 180;
            var φ2 = this.state.originalLat* Math.PI / 180;
            var Δφ = (this.state.originalLat-this.state.Lat)* Math.PI / 180;
            var Δλ = (this.state.originalLong-this.state.Long)* Math.PI / 180;

            var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            this.setState({
                distanceFromHome: R * c
            })
            
            console.log("Distance From Home: ", this.state.distanceFromHome);
        }

        if(this.state.distanceFromHome > 10){
            this.createNotification();
            notif.cancelAll();
            notif.localNotif();
            GPSPushData.pushLocation(this.state.id, this.state.district, this.state.province, this.state.Lat, this.state.Long);
        }
    }

    render() {

        return (
            <View style={{paddingTop:50, alignSelf: "center"}}>
                {/* <Text>
                    Geolocation: {this.state.Long} {this.state.Lat}
                </Text>
                <Text>
                    Origin: {this.state.originalLong} {this.state.originalLat}
                </Text> */}
               {/* { this.checkLocation() }  */}
               <Text>
                   Khoảng cách khỏi nhà: {Math.round(this.state.distanceFromHome)}m
               </Text>
            </View>
        );
    }
}