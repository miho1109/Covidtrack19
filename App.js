import React from "react";
import {StyleSheet, PermissionsAndroid, View, ScrollView} from "react-native";
import LogInInterface from './Components/UserAuthentication/Login';
import Timer from "./Components/Self-Quarantine User/SuspectedUserUI";
import SupervisorUI from './Components/Supervisor/SupervisorUI'
import AppJSPullData from './Components/Push&PullData/AppJSPullData'
import Geolocation from 'react-native-geolocation-service'


export default class App extends React.Component {
    state= {
        login: false,
        name : '',
        district: '',
        province: '',
        originalLat: '',
        originalLong: '',
        isSupervisor: '',
    }

    checkLogin(name, district, province, originalLat, originalLong, isSupervisor) {
        this.setState({
            login: true,
            name: name,
            district : district,
            province : province,
            isSupervisor : isSupervisor,
        })
    }

    showGPSDialog  = async () => {
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
        this.showGPSDialog();
        this.getOriginalLocaion();
    }

    getOriginalLocaion(){
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    originalLong: position.coords.longitude,
                    originalLat: position.coords.latitude,
                })
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, forceRequestLocation: true}
        );
    }

    render() {

        if(this.state.login) {
            if(this.state.isSupervisor == "Supervisor") {
                return(
                <SupervisorUI
                    district={this.state.district}
                    province={this.state.province}
                    Longtitude={this.state.originalLong}
                    Latitude={this.state.originalLat}
                />
                )
            }
            else {
                return (
                    <Timer
                        district={this.state.district} 
                        province={this.state.province} 
                        name={this.state.name}
                        originalLat={this.state.originalLat}
                        originalLong={this.state.originalLong}
                    />
                )
            }
        }

        else return (
            <View style={{flex: 1}}>
                <LogInInterface />
                <AppJSPullData 
                    checkLogin={this.checkLogin.bind(this)}
                    name = {this.state.name}
                    district = {this.state.district}
                    province = {this.state.province}
                    isSupervisor = {this.state.isSupervisor}
                />  
            </View>
        );
    }
};

const styles = StyleSheet.create({
  
});

