import React, { Component } from 'react';
import {
    View,
    DeviceEventEmitter
} from 'react-native';

import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from "react-native-geolocation-service"

export default class GPS extends React.Component {
    state = {
        initialPosition: 'unknown',
    };

    componentDidMount() {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: '',
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true, // false => Directly catch method is called if location services are turned off
            preventOutSideTouch: true, //true => To prevent the location services popup from closing when it is clicked outside
            preventBackClick: true, //true => To prevent the location services popup from closing when it is clicked back button
            providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
        }).then(function(success) {
            // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
                Geolocation.getCurrentPosition((position) => {
                    let initialPosition = JSON.stringify(position);
                    console.log(position);
                    this.setState({ initialPosition });
                }, error => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
            }.bind(this)
        ).catch((error) => {
            console.log(error.message);
        });
        
        DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { // only trigger when "providerListener" is enabled
            console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
        });
    }
    
    componentWillUnmount() {
        // used only when "providerListener" is enabled
        LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener.
    } 

    render() {
        return (
            <View>
                {/* <Text>
                    Geolocation: {this.state.initialPosition}
                </Text> */}
            </View>
        );
    }
}
