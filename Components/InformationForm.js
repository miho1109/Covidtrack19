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
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from "react-native-geolocation-service"
import Map from './GoogleMap';

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

        cityList: [
            "Thành phố",
            "Hà Nội",
        ],

        districtList: [
            "Quận",
            "Ba Đình",
            "Hoàn Kiếm",
            "Tây Hồ",
            "Long Biên",
            "Cầu Giấy",
            "Đống Đa",
            "Hai Bà Trưng",
            "Hoàng Mai",
            "Thanh Xuân",
            "Sóc Sơn",
            "Đông Anh",
            "Gia Lâm",
            "Nam Từ Liêm",
            "Thanh Trì",
            "Bắc Từ Liêm",
            "Mê Linh",
            "Hà Đông",
        ],

        baDinhProvince: [
            "Cống Vị",
            "Điện Biên",
            "Đội Cấn",
            "Giảng Võ",
            "Kim Mã",
            "Liễu Giai",
            "Ngọc Hà",
            "Ngọc Khánh",
            "Nguyễn Trung Trực",
            "Phúc Xá",
            "Quán Thánh",
            "Thành Công",
            "Trúc Bạch",
            "Vĩnh Phúc",
        ],

        hoanKiemProvince: [
            "Chương Dương",
            "Cửa Đông",
            "Cửa Nam",
            "Đồng Xuân",
            "Hàng Bạc",
            "Hàng Bài",
            "Hàng Bồ",
            "Hàng Bông",
            "Hàng Buồm",
            "Hàng Đào",
            "Hàng Gai",
            "Hàng Mã",
            "Hàng Trống",
            "Lý Thái Tổ",
            "Phan Chu Trinh",
            "Phúc Tân",
            "Tràng Tiền",
            "Trần Hưng Đạo",
        ],

        tayHoProvince: [
            "Bưởi",
            "Nhật Tân",
            "Phú Thượng",
            "Quảng An",
            "Thụy Khuê",
            "Tứ Liên",
            "Xuân La",
            "Yên Phụ",
        ],

        longBienProvince: [
            "Bồ Đề",
            "Cự Khối",
            "Đức Giang",
            "Gia Thụy",
            "Giang Biên",
            "Long Biên",
            "Ngọc Lâm",
            "Ngọc Thụy",
            "Phúc Đồng",
            "Phúc Lợi",
            "Sài Đồng",
            "Thạch Bàn",
            "Thượng Thanh",
            "Việt Hưng",            
        ],

        cauGiayProvince: [
            "Dịch Vọng",
            "Dịch Vọng Hậu",
            "Mai Dịch",
            "Nghĩa Đô",
            "Nghĩa Tân",
            "Quan Hoa",
            "Trung Hòa",
            "Yên Hòa",
        ],

        dongDaProvince: [
            "Cát Linh",
            "Hàng Bột",
            "Khâm Thiên",
            "Khương Thượng",
            "Kim Liên",
            "Láng Hạ",
            "Láng Thượng",
            "Nam Đồng",
            "Ngã Tư Sở",
            "Ô Chợ Dừa",
            "Phương Liên",
            "Phương Mai",
            "Quang Trung",
            "Quốc Tử Giám",
            "Thịnh Quang",
            "Thổ Quan",
            "Trung Liệt",
            "Trung Phụng",
            "Trung Tự",
            "Văn Chương",
            "Văn Miếu",
        ],

        haiBaTrungProvince: [
            "Hạ Đình",
            "Khương Đình",
            "Khương Mai",
            "Khương Trung",
            "Kim Giang",
            "Nhân Chính",
            "Phương Liệt",
            "Thanh Xuân Bắc",
            "Thanh Xuân Nam",
            "Thanh Xuân Trung",
            "Thượng Đình",
        ],

        hoangMaiProvince: [
            "Đại Kim",
            "Định Công",
            "Giáp Bát",
            "Hoàng Liệt",
            "Hoàng Văn Thụ",
            "Lĩnh Nam",
            "Mai Động",
            "Tân Mai",
            "Thanh Trì",
            "Thịnh Liệt",
            "Trần Phú",
            "Tương Mai",
            "Vĩnh Hưng",
            "Yên Sở",
        ],

        thanhXuanProvince: [
            "Hạ Đình",
            "Khương Đình",
            "Khương Mai",
            "Khương Trung",
            "Kim Giang",
            "Nhân Chính",
            "Phương Liệt",
            "Thanh Xuân Bắc",
            "Thanh Xuân Nam",
            "Thanh Xuân Trung",
            "Thượng Đình",
        ],

        socSonProvince: [
            " Bắc Phú",
            " Bắc Sơn",
            " Đông Xuân",
            " Đức Hòa",
            " Hiền Ninh",
            " Hồng Kỳ",
            " Kim Lũ",
            " Mai Đình",
            " Minh Phú",
            " Minh Trí",
            " Nam Sơn",
            " Phú Cường",
            " Phù Linh",
            " Phù Lỗ",
            " Phú Minh",
            " Quang Tiến",
            " Tân Dân",
            " Tân Hưng",
            " Tân Minh",
            " Thanh Xuân",
            " Tiên Dược",
            " Trung Giã",
            " Việt Long",
            " Xuân Giang",
            " Xuân Thu",
        ],

        dongAnhProvince: [
            "Bắc Hồng",
            "Cổ Loa",
            "Dục Tú",
            "Đại Mạch",
            "Đông Hội",
            "Hải Bối",
            "Kim Chung",
            "Kim Nỗ",
            "Liên Hà",
            "Mai Lâm",
            "Nam Hồng",
            "Nguyên Khê",
            "Tàm Xá",
            "Thụy Lâm",
            "Tiên Dương",
            "Uy Nỗ",
            "Vân Hà",
            "Vân Nội",
            "Việt Hùng",
            "Vĩnh Ngọc",
            "Võng La",
            "Xuân Canh",
            "Xuân Nộn",
        ],

        giaLamProvince: [
            "Hồng Tiến (Bồ Đề)",
            "Việt Hưng",
            "Long Biên",
            "Ngọc Thụy",
            "Thượng Thanh",
            "Tiến Bộ (Gia Thụy)",
            "Giang Biên",
            "Phúc Lợi (Hội Xá)",
            "Trung Thành (Cổ Bi)",
            "Thạch Bàn",
            "Quyết Chiến (Phú Thị)",
            "Quyết Thắng (Kim Sơn)",
            "Toàn Thắng (Lệ Chi)",
            "Tân Hưng (Kiêu Kỵ)",
            "Kim Lan",
            "Quang Minh (Bát Tràng)",
            "Thừa Thiên (Đông Dư)",
            "Cự Khối",
            "Quang Trung I (Trâu Quỳ)",
            "Quang Trung II (Yên Thường)",
            "Quyết Tiến (Đặng Xá)",
            "Văn Đức",
            "Phù Đổng",
            "Trung Hưng (Trung Màu)",
            "Tiền Phong (Yên Viên)",
            "Đình Xuyên", 
            "Dương Hà",
            "Ninh Hiệp",
            "Đức Thắng (Dương Xá)",
            "Chiến Thắng (Dương Quang)",
            "Đại Hưng (Đa Tốn)",
        ],

        namTuLiemProvince: [
            "Cầu Diễn",
            "Đại Mỗ",
            "Mễ Trì",
            "Mỹ Đình 1",
            "Mỹ Đình 2",
            "Phú Đô",
            "Phương Canh",
            "Tây Mỗ",
            "Trung Văn",
            "Xuân Phương",
        ],

        bacTuLiemProvince: [
            "Cổ Nhuế 1",
            "Cổ Nhuế 2",
            "Đông Ngạc",
            "Đức Thắng",
            "Liên Mạc",
            "Minh Khai",
            "Phú Diễn",
            "Phúc Diễn",
            "Tây Tựu",
            "Thụy Phương",
            "Thượng Cát",
            "Xuân Đỉnh",
            "Xuân Tảo",
        ],

        meLinhProvince: [
            "Chi Đông",
            "Chu Phan",
            "Đại Thịnh",
            "Hoàng Kim",
            "Kim Hoa",
            "Liên Mạc",
            "Mê Linh",
            "Quang Minh",
            "Tam Đồng",
            "Thạch Đà",
            "Thanh Lâm",
            "Tiền Phong",
            "Tiến Thắng",
            "Tiến Thịnh",
            "Tráng Việt",
            "Tự Lập",
            "Vạn Yên",
            "Văn Khê",
        ],

        haDongProvince: [
            "Biên Giang",
            "Dương Nội",
            "Đồng Mai",
            "Hà Cầu",
            "Kiến Hưng",
            "La Khê",
            "Mộ Lao",
            "Nguyễn Trãi",
            "Phú La",
            "Phú Lãm",
            "Phú Lương",
            "Phúc La",
            "Quang Trung",
            "Vạn Phúc",
            "Văn Quán",
            "Yên Nghĩa",
            "Yết Kiêu",
        ],
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
            {enableHighAccuracy: false, forceRequestLocation: true, timeout: 1500, maximumAge: 5000, showLocationDialog: true, fastestInterval: 10,})
            
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

        firestore()
        .collection("Hà Nội")
        .doc(this.state.districtList[this.state.district])
        .collection(this.state.chosenProvince[this.state.province])
        .doc("Supervisor")
        .set({
            Name: this.state.name,
            CMND: this.state.id,
            District: this.state.districtList[this.state.district],
            Province: this.state.chosenProvince[this.state.province],
            Phone: this.state.phone,
        })
        .then(() => {
            this.setState({
                page: 'Map'
                })
        });

        const firstPair = ["ID", this.state.name]
        const secondPair = ["District", this.state.districtList[this.state.district]]
        const thirdPair = ["Province", this.state.chosenProvince[this.state.province]]
        const forthPair = ["OriginalLatitude", this.state.originalLat]
        const fifthPair = ["OriginalLongtitude", this.state.originalLong]
        const sixthPair = ["Role", "Supervisor"]
        AsyncStorage.multiSet([firstPair, secondPair, thirdPair, forthPair, fifthPair, sixthPair])
        console.log("Lưu thông tin người dùng thành công.")
    }


    
    render() {
        if(this.state.page == 'Map')
        {   
            return(<Map
                district={this.state.districtList[this.state.district]}
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
                        {this.state.cityList.map((item, index) => {
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
                                        this.state.chosenProvince = this.state.baDinhProvince;
                                        break;
                                    case 2:
                                        this.state.chosenProvince = this.state.hoanKiemProvince;
                                        break;
                                    case 3:
                                        this.state.chosenProvince = this.state.tayHoProvince;
                                        break;
                                    case 4:
                                        this.state.chosenProvince = this.state.longBienProvince;
                                        break;
                                    case 5:
                                        this.state.chosenProvince = this.state.cauGiayProvince;
                                        break;
                                    case 6:
                                        this.state.chosenProvince = this.state.dongDaProvince;
                                        break;
                                    case 7:
                                        this.state.chosenProvince = this.state.haiBaTrungProvince;
                                        break;
                                    case 8:
                                        this.state.chosenProvince = this.state.hoangMaiProvince;
                                        break;
                                    case 9:
                                        this.state.chosenProvince = this.state.thanhXuanProvince;
                                        break;
                                    case 10:
                                        this.state.chosenProvince = this.state.socSonProvince;
                                        break;
                                    case 11:
                                        this.state.chosenProvince = this.state.dongAnhProvince;
                                        break;
                                    case 12:
                                        this.state.chosenProvince = this.state.giaLamProvince;
                                        break;
                                    case 13:
                                        this.state.chosenProvince = this.state.namTuLiemProvince;
                                        break;
                                    case 14:
                                        this.state.chosenProvince = this.state.bacTuLiemProvince;
                                        break;
                                    case 15:
                                        this.state.chosenProvince = this.state.meLinhProvince;
                                        break;
                                    case 16:
                                        this.state.chosenProvince = this.state.haDongProvince;
                                        break;
                                    default:
                                        //this.state.chosenProvince = ['xin moi chon quan']
                                        break;
                                }
                            }
                        }
                    >
                        {this.state.districtList.map((item, index) => {
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
