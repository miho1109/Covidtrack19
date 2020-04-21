import React, {Component} from 'react';

import {
    Text,
    View,
    StyleSheet,
    Alert,
}
from 'react-native';

import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore'

export default class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
          name: props.name,
          province: props.province,
          district: props.district,
          currentDate: 'Null',
          second: 0,
      }
    }

    componentDidMount() {
      this.getData();
    }

    setTime () {
      var a = moment(this.state.currentDate, "YYYY-MM-DD");
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
                    currentDate: data.currentDate,
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
      console.log("date ", this.state.currentDate)
      console.log("second", this.state.second)

      if(this.state.second != 0) {
        return (
          <View style={styles.MainContainer}>
            
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
      }, 

    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 210
    },

    countDownStyle: {
        paddingTop:  15,
    },
   
  });