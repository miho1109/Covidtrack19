import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {Picker} from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import DatePicker from './DatePicker';
import GPS from './GPS';

class InfoTitle extends React.Component {

    state = {
        gender: '',
        region: '',
        name: '',
        id: '',
        insurance: '',
        address: '',
        dob: new Date(1598051730000),
        email: '',
        abc: 'Alo',

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

        genderList: [
            "Nam",
            "Nữ",
        ],
    }

    changeDateOfBirth(Date){
        this.setState({
            dob: Date,
        })
        console.log(this.state.dob)
    }
 
    saveInfo() {
        firestore()
        .collection("SuspectedUser")
        .add({
            Name: this.state.name,
            CMND: this.state.id,
            Insurance: this.state.insurance,
            DateOfBirth: this.state.dob,
            Gender: this.state.genderList[this.state.gender],
            Region: this.state.countryList[this.state.region],
            QuarantineLocation: this.state.address,
            Email: this.state.email,
        })
        .then(() => {
            console.log('User added!');
        });
    }

    checkInputLength(text) {
        if(text.trim().length < 2){
            Alert.alert('Xin mời nhập lại !')
        }
    }

    render() {
        return (
            <View>
                <GPS/>
                
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
                    {/* <TextInput
                        placeholder = "DD/MM/YYYY"
                        style={styles.sectionInput}
                        onChangeText={text => this.setState({
                            dob: text
                        })}
                         
                    /> */}
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
                        onValueChange={(itemValue, itemPosition) => this.setState({
                            region: itemValue
                        })}
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
                    <TextInput
                        placeholder = "Nhập địa chỉ cách li của bạn"
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
                    onPress={() => this.saveInfo()}>
                        <Text 
                        style={{color: "white", alignSelf: "center", fontSize: 20}}> 
                        Lưu
                        </Text>
                </TouchableOpacity>

            </View>
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
    },
})

export default InfoTitle;