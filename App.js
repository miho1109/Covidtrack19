import React from "react";
import {StyleSheet, PermissionsAndroid} from "react-native";
import LogInInterface from './Components/Login';
import MainInfo from './Components/MainInfo'
import GPS from './Components/GPS'
import AsyncStorage from '@react-native-community/async-storage';
import Timer from "./Components/Timer";
import Map from './Components/GoogleMap'
import SupervisorUI from './Components/SupervisorUI'

var name;
var district;
var province;
var originalLat;
var originalLong;
var isSupervisor;

export default class App extends React.Component {

    state= {
        login: false,
    }

    loadInfo  = async () => {
        name = await AsyncStorage.getItem("ID")
        district = await AsyncStorage.getItem("District")
        province = await AsyncStorage.getItem("Province")
        originalLat = await AsyncStorage.getItem("OriginalLatitude")
        originalLong = await AsyncStorage.getItem("OriginalLongtitude")
        isSupervisor = await AsyncStorage.getItem("Role")

        if(name != null) {
            this.setState({
                login: true,
            })
        }

       // await AsyncStorage.clear()

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Covid19-Tracker Permission",
                message:
                    "Covid19-Tracker needs access to your location " ,
                buttonNeutral: "Ask Me Later",
                //buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
          );
    }

    componentDidMount() {
        this.loadInfo();
    }

    render() {

        if(this.state.login) {
            if(isSupervisor == "Supervisor") {
                return(<SupervisorUI
                    district={district}
                    province={province}
                    Longtitude={originalLong}
                    Latitude={originalLat}
                />
                )
            }
            else {
                return (
                    <Timer
                        district={district} 
                        province={province} 
                        name={name}
                        originalLat={originalLat}
                        originalLong={originalLong}
                    />
                )
            }
        }

        return (
            <LogInInterface/>
        );
        //return <TestNoti/>
    }
};

const styles = StyleSheet.create({
  
});

