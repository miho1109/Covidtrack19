import React, { Component } from 'react';
import {
    View,
    Text,
    DeviceEventEmitter,
    Alert
} from 'react-native';

import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from "react-native-geolocation-service"

var distanceFromHome= 0;

export default class GPS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Long: props.originalLong,
            Lat: props.originalLat,
            originalLong: props.originalLong,
            originalLat: props.originalLat,
        };
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
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, /*timeout: 1500, maximumAge: 10000,*/ showLocationDialog: true, fastestInterval: 2000, distanceFilter: 2}
            );
            }.bind(this)    
        ).catch((error) => {
            console.log(error.message);
        });
        
        DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { 
            console.log(status); 
        });
    }
    
    componentWillUnmount() {
       
        LocationServicesDialogBox.stopListener(); 
    } 


    checkLocation(){
        
        var R = 6371000; // metres
        var φ1 = this.state.Lat* Math.PI / 180;
        var φ2 = this.state.originalLat* Math.PI / 180;
        var Δφ = (this.state.originalLat-this.state.Lat)* Math.PI / 180;
        var Δλ = (this.state.originalLong-this.state.Long)* Math.PI / 180;

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        distanceFromHome = R * c;
        console.log("Distance From Home: ", distanceFromHome);
        
        if(distanceFromHome > 20){
            
            Alert.alert('Bạn đang đi quá xa khỏi nơi cách ly!')
        }
    }

    render() {

        return (
            <View>
                {/* <Text>
                    Geolocation: {this.state.Long} {this.state.Lat}
                </Text>
                <Text>
                    Origin: {this.state.originalLong} {this.state.originalLat}
                </Text> */}
               { this.checkLocation() } 
            </View>
        );
    }
}