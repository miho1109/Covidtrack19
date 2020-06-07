import React, { Component } from 'react'
import { ImageBackground, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet ,Alert ,View } from 'react-native'
import InformationForm from '../Supervisor/InformationForm';
import Timer from '../Self-Quarantine User/SuspectedUserUI'
import LoginJSReadData from '../Push&PullData/LoginJSReadData'

export default class LogInInterface extends Component {

    constructor(props) {
        super(props);
        this.state= {
            page: 'logIn',
            PIN: '',
            originalLat: '',
            originalLong: '',
            district: '',
            province: '',
            id: '',
        };
    }

    checkPIN() {
        this.setState({
            page: 'authenticate',
        })
    }

    changePage(page, ID, district, province, Lat, Long) {
        this.setState({
            page: page,
            id: ID,
            district: district,
            province: province,
            originalLong: Long,
            originalLat: Lat,
        })
    }

    render(){

    if ( this.state.page == 'userInterface' ) {
        return( 
           <Timer 
                district={this.state.district} 
                province={this.state.province} 
                name={this.state.id}
                originalLat={this.state.originalLat}
                originalLong={this.state.originalLong}
            />
            )
    }
    else if (this.state.page == 'supervisorUI') {
        return(<InformationForm/>)
    }   

    else if (this.state.page == 'logIn') {
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
                <TouchableOpacity style = {styles.logIn} onPress = {() => this.checkPIN()}>
                    <Text style={styles.logInText}>Đăng nhập</Text>
                </TouchableOpacity>
               
            </ImageBackground>
        </View>
        )
   }

    else {
        return(
            <LoginJSReadData
                PIN={this.state.PIN}
                changePage={this.changePage.bind(this)}
            />
        )
    }
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
