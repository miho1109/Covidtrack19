import React, { Component } from 'react'
import { ImageBackground, View, Text, TouchableOpacity, TextInput, StyleSheet ,Alert } from 'react-native'
import InformationForm from '../Supervisor/InformationForm';
import Timer from '../Self-Quarantine User/SuspectedUserUI'
import LoginJSReadData from '../Push&PullData/LoginJSReadData'

export default class LogInInterface extends Component {

    state= {
        page: 'logIn',
        PIN: '',
    };

    checkPIN() {
        this.setState({
            page: 'authenticate',
        })
    }

    changePage(page) {
        this.setState({
            page: page,
        })
    }

   render(){

    if ( this.state.page == 'userInterface' ) {
        return( 
           <Timer 
                // district={district} 
                // province={province} 
                // name={this.state.name}
                // originalLat={this.state.originalLat}
                // originalLong={this.state.originalLong}
                district={"Tây Hồ"} 
                province={"Bưởi"} 
                name={"An"}
                originalLat={"21.0682717"}
                originalLong={"105.8103067"}
            />
            )
    }
    else if (this.state.page == 'supervisorUI') {
        return(<InformationForm/>)
    }   

    else if (this.state.page == 'logIn') {
        return (
        <View style = {styles.view}  >
            <ImageBackground source={require('C:/Users/minhh/Covid19/Resources/Background.jpg')} style={styles.image}>
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
