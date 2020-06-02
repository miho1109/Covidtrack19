import React, { Component } from 'react'
import { ImageBackground, View, Text, TouchableOpacity, TextInput, StyleSheet ,Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import InformationForm from './InformationForm';

export default class LogInInterface extends Component {

    state= {
        page: 'logIn',
        PIN: ''
    };


    logIn(){
        firestore().collection("Supervisor").doc(this.state.PIN)
        .get().then (doc => {
            if(doc.exists) {
                this.setState({
                page: 'supervisorUI'
                })
            }
            else
            {
                firestore().collection("SuspectedUser").doc(this.state.PIN)
                .get().then (doc => {
                    if(doc.exists) {
                        this.setState({
                            page: 'userInterface'
                        })
                    }
                    else{
                        Alert.alert("Bạn nhập sai mã PIN")
                    }
                })
            }
        })
    }


   render(){

    if ( this.state.page == 'userInterface' )
    {
        return( 
           <Timer 
                district={district} 
                province={province} 
                name={this.state.name}
                originalLat={this.state.originalLat}
                originalLong={this.state.originalLong}
                />
            )
    }
    else if (this.state.page == 'supervisorUI')
    {
        return(<InformationForm/>)
    }   

    return (
        <View style = {styles.view}  >
            <ImageBackground source={require('../Resources/Background.jpg')} style={styles.image}>
                <Text style = {styles.text}>
                    Covid19-Tracker
                </Text>
                <TextInput style = {styles.inPut}
                placeholder = "Mã PIN"
                keyboardType={'numeric'}
                secureTextEntry = {true}
                onChangeText ={text => this.setState({
                    PIN: text,
                })}/>
                <TouchableOpacity style = {styles.logIn} onPress = {() => this.logIn()}>
                    <Text style={styles.logInText}>Đăng nhập</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
     )
   }
}

const styles = StyleSheet.create({
    view :{
        flex: 1,
        justifyContent: 'center',
    },
    text :{
        paddingLeft: 20,
        textAlign: 'left',
        fontSize: 45,
        color: 'darkslateblue',
        fontFamily: "sans-serif-condensed"
    },
    inPut: {
        margin: 15,
        height: 50,
        width: 200,
        borderBottomWidth: 1,
    },
    logIn: {
        margin: 30,
        height: 55,
        width: 250,
        borderRadius: 40,
        borderColor: 'darkslateblue',
        backgroundColor: "white",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,

        elevation: 5,
    },
    logInText: {
        alignSelf: 'flex-start',
        paddingLeft: 20,
        fontSize: 26,
        fontFamily: "sans-serif-condensed",
        fontWeight: "bold",
        color: 'darkslateblue'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
})
