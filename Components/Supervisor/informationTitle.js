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
import DatePicker from './DatePicker';
import CityAndProvinceList from '../CityAndProvinceList'
import SuspectedPushInfo from '../Push&PullData/SuspectedPushInfo'


var today = new Date();
var defaultDate = new Date(1598051730000);
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' '+ today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();


class InfoTitle extends React.Component {
    
    state = {
        page: 'informationTitle',
        gender: 0,
        region: 0,
        city: 'Thành phố',
        district: 'Quận',
        province: 'Phường',
        chosenProvince: ["Phường"],
        name: '',
        id: '',
        insurance: '',
        address: '',
        phone: 0,
        dob: defaultDate,
        email: '',
        currentDate: date,
        originalLat: '',
        originalLong: '',

        genderList: [
            "Giới tính",
            "Nam",
            "Nữ",
        ],
    }


    checkInput(){
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var idLength = this.state.id.length
        var phoneLength = this.state.phone.length
        if(this.state.name == ''|| this.state.id == 0|| this.state.phone == 0
        || this.state.city == 'Thành phố' || this.state.district == 'Quận'|| this.state.province == 'Phường'
        ||this.state.gender == 0||this.state.region == 0 ||
        this.state.address == ""||this.state.email == ""||this.state.dob == defaultDate)
        {
            Alert.alert(
                "Bạn chưa nhập đầy đủ thông tin",
            )
        }
        else if(idLength != 9 && idLength != 12|| phoneLength != 10)
        {
            Alert.alert(
                "Bạn đã nhập sai thông tin",
            )
        }
        else if (reg.test(this.state.email) === false){
            Alert.alert("Email của bạn không hợp lệ");
        }
        else {
            this.saveInfo()
            Alert.alert(
                "Bạn đã lưu thông tin thành công",
            )
        }
    }

    changeDateOfBirth(Date){
        this.setState({
            dob: Date,
        })
    }

    changeState() {
        this.props.changeState();
    }

    saveInfo() {
        SuspectedPushInfo.saveInfo(this.state.phone, this.state.name, this.state.id,
                                    this.state.insurance, this.state.dob, this.state.genderList[this.state.gender],
                                    CityAndProvinceList.getCountry()[this.state.region], 
                                    CityAndProvinceList.getDistrict()[this.state.district],
                                    this.state.chosenProvince[this.state.province],
                                    this.state.address, this.state.email, this.state.currentDate,
                                    this.state.originalLong, this.state.originalLat)

    }
    
    render() {
        return (
            
            <ScrollView>
            <View>
              
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>
                        Thông tin cá nhân
                    </Text>
                </View>
                
                {/* Cột nhập tên */}
                <View>
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
                
                {/* Cột nhập ID */}
                <View>
                    <Text style= {styles.sectionText}> CMT/CCCD/Hộ chiếu
                    <Text style= {styles.redText}> * </Text>
                    :
                    </Text>
                    <TextInput
                        placeholder = "Nhập số CMT/CCCD/Hộ chiếu của bạn"
                        style={styles.sectionInput}
                        keyboardType={'numeric'}
                        onChangeText={text => this.setState({
                            id: text
                        })}   
                    />
                </View>
                
                {/* Cột nhập BHYT */}
                <View>
                    <Text style= {styles.sectionText}> Mã số bảo hiểm y tế
                    :
                    </Text>
                    <TextInput
                        placeholder = "Nhập mã số BHYT của bạn"
                        style={styles.sectionInput}
                        keyboardType={'numeric'}
                        onChangeText={text => this.setState({
                            insurance: text
                        })}   
                    />
                </View>
                
                {/* Cột nhập ngày sinh */}
                <View>
                    <Text style= {styles.sectionText}> Ngày sinh / Tháng sinh/ Năm sinh
                    <Text style= {styles.redText}> * </Text>
                    :
                    </Text>
                    <DatePicker 
                        date={this.state.dob}
                        changeDate = {this.changeDateOfBirth.bind(this)}/>
                </View>
                
                {/* Cột nhập giới tính */}
                <View>
                    <Text style= {styles.sectionText} >
                        Giới tính<Text style= {styles.redText}> * </Text>
                    :
                    </Text>
                    <Picker
                        selectedValue={this.state.gender}
                        style={styles.countryPicker}
                        onValueChange={(itemValue, itemPosition) => {
                                this.setState({
                                    gender: itemValue
                                })
                            }
                        }
                    >
                        {this.state.genderList.map((item, index) => {
                            return (< Picker.Item label={item} value={index} key={index} />);
                        })}
                    </Picker>
                </View>
                
                {/* Cột nhập quốc tịch */}
                <View>
                    <Text style= {styles.sectionText} >
                        Quốc tịch<Text style= {styles.redText}> * </Text>
                    :
                    </Text>
                    <Picker
                        selectedValue={this.state.region}
                        style={styles.countryPicker}
                        onValueChange={(itemValue, itemPosition) => {
                            this.setState({
                                region: itemValue
                            })
                        }}
                    >
                        {CityAndProvinceList.getCountry().map((item, index) => {
                            return (< Picker.Item label={item} value={index} key={index} />);
                        })}
                    </Picker>
                </View>
                
                {/* Cột nhập địa chỉ */}
                <View>
                    <Text style= {styles.sectionText}> Địa chỉ cách li
                    <Text style= {styles.redText}> * </Text>
                    :
                    </Text>

                    {/* Picker của thành phố */}
                    <Picker
                        selectedValue={this.state.city}
                        style={styles.countryPicker}
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
                        style={styles.countryPicker}
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
                        style={styles.countryPicker}
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

                    <TextInput
                        placeholder = "Nhập địa chỉ cách li cụ thể của bạn"
                        style={styles.sectionInput}
                        onChangeText={text => this.setState({
                            address: text
                        })} 
                    />
                </View>
                
                {/* Cột nhập email */}
                <View>
                    <Text style= {styles.sectionText}> Địa chỉ email
                    <Text style= {styles.redText}> * </Text>
                    :
                    </Text>
                    <TextInput
                        placeholder = "Nhập địa chỉ email của bạn"
                        style={styles.sectionInput}
                        onChangeText={text => this.setState({
                            email: text
                        })}
                    />
                </View>
                
                
                <Text style={{fontSize: 14, marginLeft: 15, marginRight: 10, paddingTop: 25, paddingBottom: 10}}>
                <Text style={styles.redText}>* </Text>
                Tôi xin đảm bảo thông tin đã khai báo là chính xác và xin chịu trách nhiệm trước pháp luật về những gì mình đã điền!
                <Text style={styles.redText}> *</Text>
                </Text>
                
                {/* Nút lưu dữ liệu */}
                <Text></Text>
                <TouchableOpacity 
                    style={styles.saveButton} 
                   
                    onPress={() => {
                                this.checkInput()
                                this.changeState()
                            }
                        }>
                        <Text 
                        style={{color: "white", alignSelf: "center", fontSize: 25, paddingTop: 6}}> 
                        Lưu
                        </Text>
                </TouchableOpacity>

            </View>
            </ScrollView>
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
       marginTop: 20,
       marginLeft: 24,
       fontSize: 18,
       marginBottom:5,
       fontWeight: '600',
       color: "black",
       },
    redText:{
           fontSize: 18,
           fontWeight: '400',
           color: 'red',
    },
    countryPicker:{
        height: 50,
        width: 150,
        marginLeft: 24,
    },
    container: {
     marginTop: 20
    },
    valueText: {
            fontSize: 18,
            marginBottom: 10,
            marginTop: 10,
            marginLeft: 5,
            marginRight: 15
    },
    saveButton: {
        backgroundColor: "darkslateblue",
        paddingBottom: 10,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
    },
    sectionContainer: {
        backgroundColor: 'darkslateblue',
        paddingHorizontal: 24,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
      },
      sectionTitle: {
        paddingBottom: 10,
        marginTop: 10,
        fontSize: 24,
        fontWeight: '600',
        color: "white",
      },  
})

export default InfoTitle;