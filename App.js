import React from "react";
import {StyleSheet, PermissionsAndroid} from "react-native";
import LogInInterface from './Components/UserAuthentication/Login';
import AsyncStorage from '@react-native-community/async-storage';
import Timer from "./Components/Self-Quarantine User/SuspectedUserUI";
import SupervisorUI from './Components/Supervisor/SupervisorUI'
import AppJSPullData from './Components/Push&PullData/AppJSPullData'



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
            originalLat : originalLat,
            originalLong : originalLong,
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
    }

    render() {

        if(this.state.login) {
            console.log("test login");
            if(this.state.isSupervisor == "Supervisor") {
                return(<SupervisorUI
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

        return (
            <AppJSPullData 
                checkLogin={this.checkLogin.bind(this)}
                name = {this.state.name}
                district = {this.state.district}
                province = {this.state.province}
                originalLat = {this.state.originalLat}
                originalLong = {this.state.originalLong}
                isSupervisor = {this.state.isSupervisor}
            />,
            <LogInInterface />
            
        );
        //return <TestNoti/>
    }
};

const styles = StyleSheet.create({
  
});

