import React from "react";
import {StyleSheet} from "react-native";
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
    }
};

const styles = StyleSheet.create({
  
});

