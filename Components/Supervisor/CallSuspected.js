import React, { Component } from 'react';
import { Text, StyleSheet, View, Linking, Platform, TouchableOpacity } from 'react-native';

var suspectedPhone = 0;
export default class CallSuspected extends Component {
    constructor(props) {
        super(props);
        suspectedPhone = props.Phone;
    }
  makeCall () {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + suspectedPhone + '}';
    } else {
      phoneNumber = 'telprompt:${' + suspectedPhone + '}';
    }

    Linking.openURL(phoneNumber);
  }

  render() {
    return (
      <View style={styles.container} >
        <TouchableOpacity onPress={this.makeCall} activeOpacity={0.7} style={styles.touchableButton} >
          <Text style={styles.TextStyle}>Gọi Cho Người Cách Ly</Text>
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
      margin: 10,
    },
    touchableButton: {
      width: '70%',
      height: '130%',
      padding: 0,
      backgroundColor: 'darkslateblue',
      borderRadius: 20,
    },
    TextStyle: {
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
      paddingTop: 5,
    }

  });