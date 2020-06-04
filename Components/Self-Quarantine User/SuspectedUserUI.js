import React, {Component} from 'react';

import {
    Text,
    View,
    StyleSheet,
    Alert,
    Image,
    ImageBackground
}
from 'react-native';

import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore'
import GPS from './GPS'
import CallSuperVisor from './CallSupervisor';

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

    componentDidMount() {
      this.getData();
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

    getData () {
      firestore()
        .collection("Hà Nội")
        .doc(this.state.district)
        .collection(this.state.province)
        .doc("Supervisor")
        .collection("SuspectedUser")
        .doc(this.state.name)
        .get().then(doc => {
            if(doc.exists) {
                var data = doc.data();
                this.setState({
                    currentDate: data.CurrentDate,
                })
                this.setTime();
            }
        })

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
            <ImageBackground source={require('C:/Users/minhh/Covid19/Resources/CountdownBackground.jpg')} style={styles.image}>
              < GPS
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
              <Image 
                source={require('C:/Users/minhh/Covid19/Resources/Countdown.gif')}
                style={{
                  aspectRatio: 0.75, 
                  resizeMode: 'contain',
                  alignSelf: "center",
                }}
              />
              <CallSuperVisor
              district = {this.state.district}
              province = {this.state.province}
              />
            </ImageBackground>
          </View>
        );
      }

      return (       
            <View style={styles.MainContainer}>

            </View>
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
