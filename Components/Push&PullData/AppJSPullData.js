import React from "react";
import {View} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default class AppJSPullData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : props.name,
            district : props.district,
            province :  props.province,
            isSupervisor : props.isSupervisor,
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
            isSupervisor : await AsyncStorage.getItem("Role"),
        }) 
       
        if(this.state.name != null) {
            this.props.checkLogin(
                this.state.name, 
                this.state.district, 
                this.state.province, 
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