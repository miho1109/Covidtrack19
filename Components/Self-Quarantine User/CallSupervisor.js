import React, { Component } from 'react';
import { Text, StyleSheet, View, Linking, Platform, TouchableOpacity } from 'react-native';
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
  makeCall () {
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
        <TouchableOpacity onPress={this.makeCall} activeOpacity={0.7} style={styles.touchableButton} >
          <Text style={styles.TextStyle}>Gọi Khẩn Cấp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
    },
    touchableButton: {
      width: '100%',
      padding: 15,
      backgroundColor: 'darkslateblue',
    },
    TextStyle: {
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
      paddingBottom:35
    }

  });