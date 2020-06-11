import React, { Component } from 'react'
import { View } from 'react-native';

    var countryList = [
        "Quốc tịch",
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
    ];

     var cityList = [
        "Thành phố",
        "Hà Nội",
    ];
    var districtList = [
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
    ];
    
    var baDinhProvince = [
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
    ];
    
    var hoanKiemProvince = [
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
    ];
    
    var tayHoProvince = [
        "Bưởi",
        "Nhật Tân",
        "Phú Thượng",
        "Quảng An",
        "Thụy Khuê",
        "Tứ Liên",
        "Xuân La",
        "Yên Phụ",
    ];    
    var longBienProvince = [
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
    ];
    
    var cauGiayProvince = [
        "Dịch Vọng",
        "Dịch Vọng Hậu",
        "Mai Dịch",
        "Nghĩa Đô",
        "Nghĩa Tân",
        "Quan Hoa",
        "Trung Hòa",
        "Yên Hòa",
    ];
    
    var dongDaProvince = [
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
    ];
    
    var haiBaTrungProvince = [
        "Bạch Mai" , 
        "Bạch Đằng" , 
        "Bách Khoa" , 
        "Bùi Thị Xuân",
        "Cầu Dền" , 
        "Đống Mác" ,
        "Đồng Nhân" , 
        "Đồng Tâm" ,
        "Lê Đại Hành" , 
        "Minh Khai" , 
        "Ngô Thì Nhậm" , 
        "Nguyễn Du" , 
        "Phạm Đình Hổ" , 
        "Phố Huế" , 
        "Quỳnh Lôi" , 
        "Quỳnh Mai" , 
        "Thanh Lương" , 
        "Thanh Nhàn" ,
        "Trương Định" , 
        "Vĩnh Tuy" , 
    ];
    
    var hoangMaiProvince = [
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
        "Khu nhà ở học sinh - sinh viên Pháp Vân - Tứ Hiệp",
    ];
    
    var thanhXuanProvince = [
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
    ];
    
    var socSonProvince = [
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
    ];
    
    var dongAnhProvince = [
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
    ];
    
    var giaLamProvince = [
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
    ];
    
    var namTuLiemProvince = [
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
        "Khu nhà ở sinh viên Mỹ Đình II",
        "Khu cách ly tập trung tại trường Cao đẳng nghề Công nghệ cao Hà Nội",
    ];
    
    var bacTuLiemProvince = [
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
    ];
    
    var meLinhProvince = [
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
    ];
    
    var haDongProvince = [
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
    ];

export default class CityAndProvinceList extends Component {

    static getCountry(){
        return countryList;
    }
    
    static getCity(){
        return cityList;
    }

    static getDistrict(){
        return districtList;
    }

    static getBaDinhProvince() {
        return baDinhProvince;
    }

    static getHoanKiemProvince() {
        return hoanKiemProvince;
    }

    static getTayHoProvince() {
        return tayHoProvince;
    }

    static getLongBienProvince() {
        return longBienProvince;
    }

    static getCauGiayProvince() {
        return cauGiayProvince;
    }
    
    static getDongDaProvince() {
        return dongDaProvince;
    }

    static getHaiBaTrungProvince() {
        return haiBaTrungProvince;
    }
    
    static getHoangMaiProvince() {
        return hoangMaiProvince;
    }

    static getThanhXuanProvince() {
        return thanhXuanProvince;
    }
    
    static getSocSonProvince() {
        return socSonProvince;
    }
    
    static getDongAnhProvince() {
        return dongAnhProvince;
    }
    
    static getGiaLamProvince() {
        return giaLamProvince;
    }
    
    static getNamTuLiemProvince() {
        return namTuLiemProvince;
    }
    
    static getBacTuLiemProvince() {
        return bacTuLiemProvince;
    }
    
    static getMeLinhProvince() {
        return meLinhProvince
    }

    static getHaDongProvince() {
        return haDongProvince
    }
   
    render() {
        return (
            <View>

            </View>
        )
    }
}
