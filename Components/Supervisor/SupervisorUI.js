import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert} from 'react-native';
import Map from './GoogleMap';
import AddSuspected from './AddSuspected';
import SupervisorRealTimePullData from '../Push&PullData/SupervisorRealTimePullData'

export default class SupervisorUI extends Component{
   constructor(props) {
      super(props);
      this.state= {
          district: props.district,
          province: props.province,
          Longtitude: props.Longtitude,
          Latitude: props.Latitude,
    }
  }

    render() {
            return(
            <View style={styles.view}>

               <SupervisorRealTimePullData
                  province={this.state.province}
                  district={this.state.district}
               />   
               <Map
                  district={this.state.district}
                  province={this.state.province}
                  Longtitude={this.state.Longtitude}
                  Latitude={this.state.Latitude}
               />
               <AddSuspected />  

            </View>
       
        )
    }
}
const styles = StyleSheet.create({
    view :{
       flex:1,
       justifyContent: 'center'
    },
    text :{
       textAlign: 'center',
       fontSize: 40,
       color: 'blue'
    },
    inPut: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1,
    },
    logIn: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1,
       backgroundColor: '#d9f9b1',
       justifyContent: 'center',
       alignItems: 'center'
    },
    signUp: {
       marginTop : 1,
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1,
       backgroundColor: 'pink',
       justifyContent: 'center',
       alignItems: 'center'
    }
 })
