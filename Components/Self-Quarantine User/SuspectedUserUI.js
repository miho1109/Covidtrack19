import React, {Component} from 'react';

import {
    Text,
    View,
    StyleSheet,
    Alert,
    Image,
    ImageBackground,
    TouchableOpacity
}
from 'react-native';

import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import GPS from './GPS'
import CallSuperVisor from './CallSupervisor';
import SuspectedPullData from '../Push&PullData/SuspectedPullData'
import CallSuspected from '../Supervisor/CallSuspected';

export default class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
          name: props.name,
          province: props.province,
          district: props.district,
          originalLat: props.originalLat,
          originalLong: props.originalLong,
          currentDate: 'Null',
          second: 0,
      }
    }

    setTime () {
      var a = moment(this.state.currentDate, "YYYY-MM-DD HH:mm:ss");
      var b = a.clone().add(2, 'week');
      var c = moment();
      var duration = moment.duration(b.diff(c));
      var seconds = Math.round(duration.asSeconds());
      this.setState({
        second: seconds,
      })
    }

    getData (doc) {
      this.setState({
          currentDate: doc,
      })
      this.setTime();
    }

    onDoneCountdown () {
   
      Alert.alert("Xin chúc mừng! Bạn đã hoàn thành thời gian cách li");
   
    }
   
    onPressCountdown = () => {
   
        Alert.alert("Bạn không thể dừng được");
        
    }
    
    render() {
      // console.log("date ", this.state.currentDate)
      // console.log("second", this.state.second)
      
      if(this.state.second != 0) {
        return (        
          <View style={styles.MainContainer}>
            <ImageBackground source={require('../Resources/CountdownBackground.jpg')} style={styles.image}>
              < GPS
                id={this.state.name}
                district={this.state.district}
                province={this.state.province}
                originalLat={this.state.originalLat}
                originalLong={this.state.originalLong}
              /> 
              
              <Text style={styles.sectionTitle}>
                  Thời gian cách li còn lại của bạn
              </Text>
              <CountDown 
                    style={styles.countDownStyle}
                    until={this.state.second}
                    onFinish={
                      this.onDoneCountdown
                    }
                    onPress={
                      this.onPressCountdown
                    }
                    size={30}
                    digitStyle={{backgroundColor: '#602dc4'}}
                    digitTxtStyle={{color: '#FFF'}}
                    timeLabels={{d: 'Ngày', h: 'Giờ', m: 'Phút', s: 'Giây'}}
              />
              <TouchableOpacity
                onPress={CallSuperVisor.makeCall}
              >
                <Image 
                  source={require('../Resources/Countdown.gif')}
                  style={{
                    aspectRatio: 0.75, 
                    resizeMode: 'contain',
                    alignSelf: "center",
                  }}
                />
              </TouchableOpacity>
              <CallSuperVisor
                district = {this.state.district}
                province = {this.state.province}
              />
            </ImageBackground>
          </View>
        );
      }

      return (       
            <SuspectedPullData
              name = {this.state.name}
              district = {this.state.district}
              province = {this.state.province}
              getData = {this.getData.bind(this)}
            />
      );

    }
  }
  const styles = StyleSheet.create({

    sectionTitle: {
      paddingBottom: 10,
      marginTop: 10,
      fontSize: 24,
      fontWeight: '600',
      color: "black",
      alignSelf: "center"
    }, 

    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "beige",
    },

    countDownStyle: {
        paddingTop:  15,
    },

    image: {
      aspectRatio: 0.61,
      resizeMode: "cover",
      justifyContent: "center"
    },
   
  });
