import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {Picker} from '@react-native-community/picker';
import Geolocation from "react-native-geolocation-service"
import CityAndProvinceList from '../CityAndProvinceList'
import SupervisorPushInfo from '../Push&PullData/SupervisorPushInfo'
import SupervisorUI from './SupervisorUI'

export default class InformationForm extends React.Component {
    state = {
        page: 'SupervisorUI',
        city: 'Thành phố',
        district: 'Quận',
        province: 'Phường',
        chosenProvince: ["Phường"],
        name: '',
        id: 0,
        address: '',
        phone: 0,
        originalLat: '',
        originalLong: '',


    }

    componentDidMount() {
        this.getUserLocation();
    }

    getUserLocation() {
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    originalLong: position.coords.longitude.toString(),
                    originalLat: position.coords.latitude.toString(),
                })
                console.log("Tọa độ để focus: " , this.state.originalLat, " , ", this.state.originalLong);
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, forceRequestLocation: true, timeout: 1500, maximumAge: 5000, showLocationDialog: true, fastestInterval: 10,})
            
    }

    checkInput(){
        var idLength = this.state.id.length
        var phoneLength = this.state.phone.length
        if(this.state.name == ''|| this.state.id == 0|| this.state.phone == 0
        || this.state.city == 'Thành phố' || this.state.district == 'Quận' || this.state.province == 'Phường')
        {
            Alert.alert(
                "Bạn chưa nhập đầy đủ thông tin",
            )
        }
        else if(idLength != 9 && idLength != 12 || phoneLength != 10)
        {
            Alert.alert(
                "Bạn đã nhập sai thông tin",
            )
        }
        else {
            this.saveInfo()
            Alert.alert(
                "Bạn đã lưu thông tin thành công",
            )
        }
    }

    saveInfo() {
        SupervisorPushInfo.saveInfo(this.state.phone, this.state.name, this.state.id,
                                    CityAndProvinceList.getDistrict()[this.state.district],
                                    this.state.chosenProvince[this.state.province],
                                    this.state.originalLat, this.state.originalLong
                                    );
        this.setState({
            page: 'Map'
        })
    }

    
    render() {
        if(this.state.page == 'Map')
        {   
            return(
                <SupervisorUI
                    district={CityAndProvinceList.getDistrict()[this.state.district]}
                    province={this.state.chosenProvince[this.state.province]}
                    Longtitude={this.state.originalLong}
                    Latitude={this.state.originalLat}
                />
            )
        }
        
        return (
            
            <View style= {{flex: 1}} >
              
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>
                        Thông tin cá nhân
                    </Text>
                </View>
                
                {/* Cột nhập tên */}
                <View style = {{flex:1}} >
                    <Text style= {styles.sectionText}> Họ và Tên
                    <Text style= {styles.redText}> * </Text>
                    :
                    </Text>
                    <TextInput
                        placeholder = "Nhập tên của bạn"
                        style={styles.sectionInput}
                        onChangeText={text => this.setState({name: text})}
            
                    />
                </View>
                
                {/* Cột nhập ID */}
                <View style = {{flex:1}} >
                    <Text style= {styles.sectionText}> CMT/CCCD/Hộ chiếu
                    <Text style= {styles.redText}> * </Text>
                    :
                    </Text>
                    <TextInput
                        placeholder = "Nhập số CMT/CCCD/Hộ chiếu của bạn"
                        keyboardType={'numeric'}
                        style={styles.sectionInput}
                        onChangeText={text => this.setState({
                            id: text
                        })}   
                    />
                </View>

                {/* Cột nhập số điện thoại */}
                <View style = {{flex:1}} >
                    <Text style= {styles.sectionText}> Số điện thoại
                    <Text style= {styles.redText}> * </Text>
                    :
                    </Text>
                    <TextInput
                        placeholder = "Nhập số điện thoại của bạn"
                        style={styles.sectionInput}
                        keyboardType={'numeric'}
                        onChangeText={text => this.setState({
                            phone: text
                        })}   
                    />
                </View>
                
                {/* Cột nhập địa chỉ */}
                <View style = {{flex:2}}>
                    <Text style= {styles.sectionText}> Địa chỉ quản lí
                    <Text style= {styles.redText}> * </Text>
                    :
                    </Text>

                    {/* Picker của thành phố */}
                    <Picker
                        selectedValue={this.state.city}
                        style={styles.pickerView}
                        onValueChange={(itemValue, itemPosition) => {
                                this.setState({
                                    city: itemValue
                                })
                            }
                        }
                    >
                        {CityAndProvinceList.getCity().map((item, index) => {
                            return (< Picker.Item label={item} value={index} key={index} />);
                        })}
                    </Picker>
                    
                    {/* Picker của quận */}
                    <Picker
                        selectedValue={this.state.district}
                        style={styles.pickerView}
                        onValueChange={(itemValue, itemPosition) => {
                                this.setState({
                                    district: itemValue
                                })
                                switch(itemValue) {
                                    case 1:
                                        this.state.chosenProvince = CityAndProvinceList.getBaDinhProvince();
                                        break;
                                    case 2:
                                        this.state.chosenProvince = CityAndProvinceList.getHoanKiemProvince();
                                        break;
                                    case 3:
                                        this.state.chosenProvince = CityAndProvinceList.getTayHoProvince();
                                        break;
                                    case 4:
                                        this.state.chosenProvince = CityAndProvinceList.getLongBienProvince();
                                        break;
                                    case 5:
                                        this.state.chosenProvince = CityAndProvinceList.getCauGiayProvince();
                                        break;
                                    case 6:
                                        this.state.chosenProvince = CityAndProvinceList.getDongDaProvince();
                                        break;
                                    case 7:
                                        this.state.chosenProvince = CityAndProvinceList.getHaiBaTrungProvince();
                                        break;
                                    case 8:
                                        this.state.chosenProvince = CityAndProvinceList.getHoangMaiProvince();
                                        break;
                                    case 9:
                                        this.state.chosenProvince = CityAndProvinceList.getThanhXuanProvince();
                                        break;
                                    case 10:
                                        this.state.chosenProvince = CityAndProvinceList.getSocSonProvince();
                                        break;
                                    case 11:
                                        this.state.chosenProvince = CityAndProvinceList.getDongAnhProvince();
                                        break;
                                    case 12:
                                        this.state.chosenProvince = CityAndProvinceList.getGiaLamProvince();
                                        break;
                                    case 13:
                                        this.state.chosenProvince = CityAndProvinceList.getNamTuLiemProvince();
                                        break;
                                    case 14:
                                        this.state.chosenProvince = CityAndProvinceList.getBacTuLiemProvince();
                                        break;
                                    case 15:
                                        this.state.chosenProvince = CityAndProvinceList.getMeLinhProvince();
                                        break;
                                    case 16:
                                        this.state.chosenProvince = CityAndProvinceList.getHaDongProvince();
                                        break;
                                    default:
                                        //this.state.chosenProvince = ['xin moi chon quan']
                                        break;
                                }
                            }
                        }
                    >
                        {CityAndProvinceList.getDistrict().map((item, index) => {
                            return (< Picker.Item label={item} value={index} key={index} />);
                        })}
                    </Picker>
                        
                    {/* Picker của phường */}
                    <Picker
                        selectedValue={this.state.province}
                        style={styles.pickerView}
                        onValueChange={(itemValue, itemPosition) => {
                                this.setState({
                                    province: itemValue
                                })
                            }
                        }
                    >
                        {this.state.chosenProvince.map((item, index) => {
                            return (< Picker.Item label={item} value={index} key={index} />);
                        })}
                    </Picker>
                </View>
                
                
                {/* Nút lưu dữ liệu */}
                <View style = {{flex:0.65}}>
                    <TouchableOpacity 
                        style={styles.saveButton} 
                    
                        onPress={() => this.checkInput()}>
                            <Text 
                            style={{color: "white", alignSelf: "center", fontSize: 25, paddingTop: 10 }}> 
                            Lưu
                            </Text>
                    </TouchableOpacity>
                </View>
            </View>
            );
    }

}

const styles = StyleSheet.create({
        sectionInput:{
            height: 40,
            borderColor: 'darkslateblue',
            marginLeft:30,
            marginRight: 30,
            borderWidth: 2,
            borderTopWidth:0,
            borderLeftWidth:0,
            borderRightWidth:0,
        },
        sectionText:{
            marginTop: 30,
            marginLeft: 24,
            fontSize: 18,
            marginBottom:5,
            fontWeight: '600',
            color: "black",
        },
        sectionContainer: {
            backgroundColor: 'darkslateblue',
            paddingHorizontal: 24,
            flex: 0.4,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        sectionTitle: {
            paddingBottom: 10,
            marginTop: 10,
            fontSize: 24,
            fontWeight: '600',
            color: "white",
        },  
        redText:{
            fontSize: 18,
            fontWeight: '400',
            color: 'red',
        },
        pickerView:{
            height: 50,
            width: 150,
            marginLeft: 24,
        },
        saveButton: {
            flex: 1,
            backgroundColor: "darkslateblue",
            marginTop: 30,
            paddingBottom: 5,
        },
})
