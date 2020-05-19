import React from "react";
import {Text, View, StyleSheet, Image} from "react-native";
import MapView, {Marker, Callout} from 'react-native-maps';
//import Marker from 'react-native-maps';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

var quarantineList = [];
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
    }
    componentDidMount() {
        this.getData();
    }

    getData(){
    
        firestore()
        .collection("Hà Nội")
        .doc(this.state.district)
        .collection(this.state.province)
        .doc("Supervisor")
        .collection("SuspectedUser")
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }  

            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                quarantineList.push(doc.data());
            });
            this.setState({
                updateComplete: true
            })
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }

    

    render() {
        return (
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: Number(this.state.Latitude),
                    longitude: Number(this.state.Longtitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                customMapStyle={mapStyle}
            >
                {quarantineList.map ((item, index) => (
                    <Marker
                    coordinate={{
                        latitude: Number((item.Latitude)),
                        longitude:  Number((item.Longtitude)), 
                    }}
                    pinColor={'steelblue'}
                    key={index}
                    >
                        <Callout>
                            <CustomCalloutView 
                                Name={item.Name}
                                CMND={item.CMND}
                                Gender={item.Gender}
                                Location={item.QuarantineLocation}
                            />
                        </Callout>
                    </Marker>
                ))}
            </MapView>
           
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
      }
    }

    render() {
        return (

            <View>

                <View>
                    <Text style={{ alignSelf: "center", paddingBottom: 50}}>
                        <Image
                            source={require('../Resources/Test.png')}
                            style={{ width: 100, height: 100}}
                            resizeMode="cover"
                            borderRadius={100}
                        />
                    </Text>
                </View>

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

                </View>
                
            </View>

        )
    }
}

const styles = StyleSheet.create({
    map: {
        height: "100%"
    },
    info: {
        color: "dimgrey",
    }
});