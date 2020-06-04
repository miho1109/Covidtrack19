import React from "react";
import {Text, View, StyleSheet, Image, SafeAreaView} from "react-native";
import MapView, {Marker, Callout, Polygon} from 'react-native-maps';
import GoogleMapPullData from '../Push&PullData/GoogleMapPullData';
import moment from 'moment';
import DropDown from './MapDropdown'

var quarantineList = [];
var coordinateList = [];
mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
]

export default class Map extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            district: props.district,
            province: props.province,
            Longtitude: props.Longtitude,
            Latitude: props.Latitude,
            updateComplete: false,
      }
      this.mapRef = null;
    }
  
    focusOnMarker(latitude, longitude) {
      var camera = {
        center: {latitude: Number(latitude), longitude: Number(longitude)},
        pitch: 2,
        heading: 1,
        zoom: 30,
      }

      this.mapRef.animateCamera(camera, 2)
    }


    updateStatus(coordList, quaranList){
      quarantineList = quaranList;
      coordinateList = coordList;
      this.setState({
        updateComplete: true
      })
    }
  
    
    setTime (currentDate) {
      var a = moment(currentDate, "YYYY-MM-DD HH:mm:ss");
      var b = a.clone().add(2, 'week');
      var c = moment();
      var duration = moment.duration(b.diff(c));
      var d = Math.round(duration.asDays());

      return (d > 0)? d.toString() + " ngày" : "Đã hết thời gian cách ly"
    }

    render() {
      if (coordinateList.length <= 0) {
        return (

        
          <GoogleMapPullData 
            district = {this.state.district}
            province = {this.state.province}
            Longtitude = {this.state.Longtitude}
            Latitude = {this.state.Latitude}
            updateStatus = {this.updateStatus.bind(this)}
          />
        )
      }
      else return (
        
          <View>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: Number(this.state.Latitude),
                    longitude: Number(this.state.Longtitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                customMapStyle={mapStyle}
                zoomEnabled={true}
                ref={(ref) => { this.mapRef = ref }}
            >   
                {quarantineList.map ((item, index) => (
                    <Marker
                    coordinate={{
                        latitude: Number((item.Latitude)),
                        longitude:  Number((item.Longtitude)), 
                    }}
                    pinColor={'mediumpurple'}
                    key={index}
                    >
                        <Callout>
                            <CustomCalloutView 
                                Name={item.Name}
                                CMND={item.CMND}
                                Gender={item.Gender}
                                Location={item.QuarantineLocation}
                                Duration={this.setTime(item.CurrentDate)}
                            />
                        </Callout>
                    </Marker>
                ))}
                <Polygon
                  coordinates={coordinateList}
                  fillColor={'rgba(153,195,231,0.5)'}
                  strokeColor={"#4682b4"}
                />
            </MapView>
            
            <DropDown
              List={quarantineList}
              focusOnMarker={this.focusOnMarker.bind(this)}
            />

            
          </View>  
        )
    }
};


class CustomCalloutView extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            Name: props.Name,
            CMND: props.CMND,
            Gender: props.Gender,
            Location: props.Location,
            Duration: props.Duration
      }
    }

    render() {
        return (

            <View>
        
                <View>
                    <Text style={{
                        fontWeight: "bold",
                        alignSelf: "center",
                        paddingBottom: 10,
                    }}>
                        {this.state.Name}
                    </Text>

                    <Text style={styles.info}>
                        Giới Tính: {this.state.Gender}
                    </Text>

                    <Text style={styles.info}>
                        Số CMND:: {this.state.CMND}
                    </Text>

                    <Text style={styles.info}>
                        Địa chỉ: {this.state.Location}
                    </Text>

                    <Text style={styles.info}>
                        Thời gian còn lại: {this.state.Duration}
                    </Text>

                </View>
                
            </View>

        )
    }
}

const styles = StyleSheet.create({
    map: {
      height: "100%",
      alignItems: 'center',
      justifyContent: 'center',
    },
    info: {
      color: "dimgrey",
    },
    Container: {
      borderRadius: 40,
    }
});

