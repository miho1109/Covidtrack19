import React from "react";
import {StyleSheet, PermissionsAndroid} from "react-native";
import LogInInterface from './Components/Login';
import MainInfo from './Components/MainInfo'
import GPS from './Components/GPS'
import AsyncStorage from '@react-native-community/async-storage';
import Timer from "./Components/Timer";

var name;
var district;
var province;
var originalLat;
var originalLong;

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

        if(name != null) {
            this.setState({
                login: true,
            })
        }

        //await AsyncStorage.clear()

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

        return (
            <LogInInterface/>
        );
        //return <TestNoti/>
    }
};

const styles = StyleSheet.create({
  
});

