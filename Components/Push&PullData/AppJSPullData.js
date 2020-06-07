import React from "react";
import {View} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default class AppJSPullData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            district : '',
            province :  '',
            originalLat: '',
            originalLong: '',
            isSupervisor : '',
        }
    }

    componentDidMount(){
        this.loadInfo();
    }
    

    loadInfo  = async () => {
        
        this.setState ({     
            name : await AsyncStorage.getItem("ID"),
            district : await AsyncStorage.getItem("District"),
            province : await AsyncStorage.getItem("Province"),
            originalLong: await AsyncStorage.getItem("Longtitude"),
            originalLat: await AsyncStorage.getItem("Latitude"),
            isSupervisor : await AsyncStorage.getItem("Role"),
        })
        
        //console.log(this.state.originalLat, this.state.originalLong)
       
        if(this.state.name != null) {
            this.props.checkLogin(
                this.state.name, 
                this.state.district, 
                this.state.province,
                this.state.originalLat,
                this.state.originalLong, 
                this.state.isSupervisor
            );
        }
    
    }

    render() {
        return (
            <View>
                
            </View>
        )
    }
}