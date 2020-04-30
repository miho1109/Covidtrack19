import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Picker} from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from "react-native-geolocation-service"
import DatePicker from './DatePicker';
import GPS from './GPS';
import Timer from './Timer';
import moment from 'moment';

var today = new Date();
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
        dob: new Date(1598051730000),
        email: '',
        currentDate: date,
        originalLat: '',
        originalLong: '',

        countryList: [
            "Việt Nam",
            "Afghanistan",
            "Albania",
            "Algeria",
            "American Samoa",
            "Andorra",
            "Angola",
            "Anguilla",
            "Antarctica",
            "Antigua and Barbuda",
            "Argentina",
            "Armenia",
            "Aruba",
            "Australia",
            "Austria",
            "Azerbaijan",
            "Bahamas (the)",
            "Bahrain",
            "Bangladesh",
            "Barbados",
            "Belarus",
            "Belgium",
            "Belize",
            "Benin",
            "Bermuda",
            "Bhutan",
            "Bolivia (Plurinational State of)",
            "Bonaire, Sint Eustatius and Saba",
            "Bosnia and Herzegovina",
            "Botswana",
            "Bouvet Island",
            "Brazil",
            "British Indian Ocean Territory (the)",
            "Brunei Darussalam",
            "Bulgaria",
            "Burkina Faso",
            "Burundi",
            "Cabo Verde",
            "Cambodia",
            "Cameroon",
            "Canada",
            "Cayman Islands (the)",
            "Central African Republic (the)",
            "Chad",
            "Chile",
            "China",
            "Christmas Island",
            "Cocos (Keeling) Islands (the)",
            "Colombia",
            "Comoros (the)",
            "Congo (the Democratic Republic of the)",
            "Congo (the)",
            "Cook Islands (the)",
            "Costa Rica",
            "Croatia",
            "Cuba",
            "Curaçao",
            "Cyprus",
            "Czechia",
            "Côte d'Ivoire",
            "Denmark",
            "Djibouti",
            "Dominica",
            "Dominican Republic (the)",
            "Ecuador",
            "Egypt",
            "El Salvador",
            "Equatorial Guinea",
            "Eritrea",
            "Estonia",
            "Eswatini",
            "Ethiopia",
            "Falkland Islands (the) [Malvinas]",
            "Faroe Islands (the)",
            "Fiji",
            "Finland",
            "France",
            "French Guiana",
            "French Polynesia",
            "French Southern Territories (the)",
            "Gabon",
            "Gambia (the)",
            "Georgia",
            "Germany",
            "Ghana",
            "Gibraltar",
            "Greece",
            "Greenland",
            "Grenada",
            "Guadeloupe",
            "Guam",
            "Guatemala",
            "Guernsey",
            "Guinea",
            "Guinea-Bissau",
            "Guyana",
            "Haiti",
            "Heard Island and McDonald Islands",
            "Holy See (the)",
            "Honduras",
            "Hong Kong",
            "Hungary",
            "Iceland",
            "India",
            "Indonesia",
            "Iran (Islamic Republic of)",
            "Iraq",
            "Ireland",
            "Isle of Man",
            "Israel",
            "Italy",
            "Jamaica",
            "Japan",
            "Jersey",
            "Jordan",
            "Kazakhstan",
            "Kenya",
            "Kiribati",
            "Korea (the Democratic People's Republic of)",
            "Korea (the Republic of)",
            "Kuwait",
            "Kyrgyzstan",
            "Lao People's Democratic Republic (the)",
            "Latvia",
            "Lebanon",
            "Lesotho",
            "Liberia",
            "Libya",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Macao",
            "Madagascar",
            "Malawi",
            "Malaysia",
            "Maldives",
            "Mali",
            "Malta",
            "Marshall Islands (the)",
            "Martinique",
            "Mauritania",
            "Mauritius",
            "Mayotte",
            "Mexico",
            "Micronesia (Federated States of)",
            "Moldova (the Republic of)",
            "Monaco",
            "Mongolia",
            "Montenegro",
            "Montserrat",
            "Morocco",
            "Mozambique",
            "Myanmar",
            "Namibia",
            "Nauru",
            "Nepal",
            "Netherlands (the)",
            "New Caledonia",
            "New Zealand",
            "Nicaragua",
            "Niger (the)",
            "Nigeria",
            "Niue",
            "Norfolk Island",
            "Northern Mariana Islands (the)",
            "Norway",
            "Oman",
            "Pakistan",
            "Palau",
            "Palestine, State of",
            "Panama",
            "Papua New Guinea",
            "Paraguay",
            "Peru",
            "Philippines (the)",
            "Pitcairn",
            "Poland",
            "Portugal",
            "Puerto Rico",
            "Qatar",
            "Republic of North Macedonia",
            "Romania",
            "Russian Federation (the)",
            "Rwanda",
            "Réunion",
            "Saint Barthélemy",
            "Saint Helena, Ascension and Tristan da Cunha",
            "Saint Kitts and Nevis",
            "Saint Lucia",
            "Saint Martin (French part)",
            "Saint Pierre and Miquelon",
            "Saint Vincent and the Grenadines",
            "Samoa",
            "San Marino",
            "Sao Tome and Principe",
            "Saudi Arabia",
            "Senegal",
            "Serbia",
            "Seychelles",
            "Sierra Leone",
            "Singapore",
            "Sint Maarten (Dutch part)",
            "Slovakia",
            "Slovenia",
            "Solomon Islands",
            "Somalia",
            "South Africa",
            "South Georgia and the South Sandwich Islands",
            "South Sudan",
            "Spain",
            "Sri Lanka",
            "Sudan (the)",
            "Suriname",
            "Svalbard and Jan Mayen",
            "Sweden",
            "Switzerland",
            "Syrian Arab Republic",
            "Taiwan (Province of China)",
            "Tajikistan",
            "Tanzania, United Republic of",
            "Thailand",
            "Timor-Leste",
            "Togo",
            "Tokelau",
            "Tonga",
            "Trinidad and Tobago",
            "Tunisia",
            "Turkey",
            "Turkmenistan",
            "Turks and Caicos Islands (the)",
            "Tuvalu",
            "Uganda",
            "Ukraine",
            "United Arab Emirates (the)",
            "United Kingdom of Great Britain and Northern Ireland (the)",
            "United States Minor Outlying Islands (the)",
            "United States of America (the)",
            "Uruguay",
            "Uzbekistan",
            "Vanuatu",
            "Venezuela (Bolivarian Republic of)",
            "Virgin Islands (British)",
            "Virgin Islands (U.S.)",
            "Wallis and Futuna",
            "Western Sahara",
            "Yemen",
            "Zambia",
            "Zimbabwe",
            "Åland Islands"
        ],

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

        genderList: [
            "Nam",
            "Nữ",
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
            })
    }

    changeDateOfBirth(Date){
        this.setState({
            dob: Date,
        })
        console.log(this.state.dob)
    }

    saveInfo() {

        firestore()
        .collection("Hà Nội")
        .doc(this.state.districtList[this.state.district])
        .collection(this.state.chosenProvince[this.state.province])
        .doc("Supervisor")
        .collection("SuspectedUser")
        .doc(this.state.name)
        .set({
            Name: this.state.name,
            CMND: this.state.id,
            Insurance: this.state.insurance,
            DateOfBirth: this.state.dob,
            Gender: this.state.genderList[this.state.gender],
            Region: this.state.countryList[this.state.region],
            District: this.state.districtList[this.state.district],
            Province: this.state.chosenProvince[this.state.province],
            QuarantineLocation: this.state.address,
            Email: this.state.email,
            CurrentDate: this.state.currentDate,
            Longtitude: this.state.originalLong,
            Latitude: this.state.originalLat,
        })
        .then(() => {
            this.setState({
                page: 'Timer'
                })
        });

        const firstPair = ["ID", this.state.name]
        const secondPair = ["District", this.state.districtList[this.state.district]]
        const thirdPair = ["Province", this.state.chosenProvince[this.state.province]]
        const forthPair = ["OriginalLatitude", this.state.originalLat]
        const fifthPair = ["OriginalLongtitude", this.state.originalLong]
        AsyncStorage.multiSet([firstPair, secondPair, thirdPair, forthPair, fifthPair])
        
        console.log("Save successful.")
    }


    checkInputLength(text) {
        if(text.trim().length < 2){
            Alert.alert('Xin mời nhập lại !')
        }
    }
    
    render() {
        if(this.state.page == 'Timer')
        {   
            var district = this.state.districtList[this.state.district];
            var province = this.state.chosenProvince[this.state.province];
            return(<Timer 
                district={district} 
                province={province} 
                name={this.state.name}
                originalLat={this.state.originalLat}
                originalLong={this.state.originalLong}
                />
            )
        }
        
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
                        onSubmitEditing={(e) => this.checkInputLength(this.state.name)}
            
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
                        onChangeText={text => this.setState({
                            id: text
                        })}   
                    />
                </View>
                
                {/* Cột nhập BHXH */}
                <View>
                    <Text style= {styles.sectionText}> Mã số bảo hiểm xã hội
                    <Text style= {styles.redText}> * </Text>
                    :
                    </Text>
                    <TextInput
                        placeholder = "Nhập mã số BHXH của bạn"
                        style={styles.sectionInput}
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
                        Giới tính:
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
                        Quốc tịch:
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
                        {this.state.countryList.map((item, index) => {
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
                        {this.state.cityList.map((item, index) => {
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
                        this.saveInfo()
                        }}>
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
        borderColor: 'black',
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
    },
    sectionContainer: {
        backgroundColor: 'darkslateblue',
        paddingHorizontal: 24,
        flex: 1,
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
})

export default InfoTitle;