import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    Image,
    ScrollView,
    TouchableOpacity,
}
from 'react-native';

import InfoTitle from '../Supervisor/InformationTitle';

export default class AddSuspected extends React.Component {
    state = {
      info: false,
    }

    changeInfoState() {
        this.setState({
            info: false,
        })
    }

    render(){
      if( this.state.info )
      {
        return(
            <View style={styles.ViewContainer}>
                <InfoTitle
                    changeState={this.changeInfoState.bind(this)} 
                />
            </View>
        )
      }
      return(
        <View style={styles.container} >
                <TouchableOpacity onPress={ () => {
                  this.setState({
                  info: true    
                  })
              }} activeOpacity={0.7} style={styles.touchableButton} >
                  <Text style={styles.TextStyle}>+</Text>
                </TouchableOpacity>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    ViewContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        margin: 10,
        height: '90%',
        width:'90%',
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      },
    container: {
      position: 'absolute',
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
      top:30,
      right: 40,
    },
    touchableButton: {
      width: '280%',
      height: '120%',
      padding: 0,
      borderRadius: 30,
      backgroundColor: 'grey',   
      justifyContent: 'center',
      opacity: 0.9,
    },
    TextStyle: {
      color: '#fff',
      fontSize: 40,
      textAlign: 'center',

    },
})