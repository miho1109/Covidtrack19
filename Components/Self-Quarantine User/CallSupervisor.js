import React, { Component } from 'react';
import { Text, StyleSheet, View, Linking, Platform, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

var superVisorPhone = 0;

export default class CallSuperVisor extends Component {
  constructor(props) {
      super(props);
      this.state= {
        province: props.province,
        district: props.district,
    }
  }

  getNumberPhone (){
      firestore()
      .collection("Hà Nội")
      .doc(this.state.district)
      .collection(this.state.province)
      .doc("Supervisor")
      .get().then(doc => {
              var data = doc.data();
              superVisorPhone = data.Phone
      })
  }

  static makeCall () {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + superVisorPhone + '}';
    } else {
      phoneNumber = 'telprompt:${' + superVisorPhone + '}';
    }

    Linking.openURL(phoneNumber);
  }
  componentDidMount() {
    this.getNumberPhone();
  }

  render() {
    return (
      <View style={styles.container} >
        <Image source={require('../Resources/Call.png')} style={styles.arrow}/>
        <Text style={styles.TextStyle}>Gọi Khẩn Cấp</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      width: '100%',
      position: 'absolute',
      bottom: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    TextStyle: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      textShadowRadius: 10,
      textShadowOffset: {width: 1, height: 1},
      textShadowColor: 'black',
      borderRadius: 20,
      padding: 10,
    },

    arrow: {
      position: 'absolute',
      right: 95,
      bottom: 20,
      width: 80,
      height: 80,
      transform: [{rotate: '35deg'}]
    },

  });