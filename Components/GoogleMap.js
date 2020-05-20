import React from "react";
import {Text, View, StyleSheet, Image, SafeAreaView} from "react-native";
import MapView, {Marker, Callout, Polygon} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
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
    componentDidMount() {
        this.getData();
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
              //console.log(doc.id, '=>', doc.data());
              quarantineList.push(doc.data());
              var temp = new Point(Number(doc.data().Latitude), Number(doc.data().Longtitude))
              coordinateList.push(temp);
              sortPoints(coordinateList)
              console.log(coordinateList);
            });
            this.setState({
                updateComplete: true
            })
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
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
          <View></View>
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
                {/* <View>
                    <Text style={{ alignSelf: "center", paddingBottom: 60}}>
                        <Image
                            source={require('../Resources/Test.png')}
                            style={{ width: 100, height: 100}}
                            resizeMode={"stretch"}
                            borderRadius={100}
                        />
                    </Text>
                </View> */}

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



///////////////////////////////////////////////////////

class Point {
  constructor(lat, long) {
    this.latitude = lat;
    this.longitude = long;  
  }

  get x(): number { return this.latitude; }
  set x(value: number) { this.latitude = value; }
  get y(): number { return this.longitude; }
  set y(value: number) { this.longitude = value; }
}

export function sortPoints(S: Point[]): Point[] {
  // Select the rightmost lowest point P0 in S
  const P0 = { x: 0, y: 0 };
  // Get the lowest y first
  P0.y = Math.min.apply(null, S.map(p => p.y));
  // Get all the points on that y
  const yPoints = S.filter(p => p.y === P0.y);
  // Get the rightmost point of that y
  P0.x = Math.max.apply(null, yPoints.map(p => p.x));
  // Sort S radially (ccw) with P0 as a center
  S.sort((a, b) => angleCompare(P0, a, b));
  return S;
}

// Use isLeft() comparisons
// For ties, discard the closer points
function angleCompare(P: Point, A: Point, B: Point): number {
  const left = isLeftCompare(P, A, B);
  if (left === 0) return distCompare(P, A, B);
  return left;
}

// To determine which side of the line A(x1, y1)B(x2, y2)
// a point P(x, y) falls on, the formula is:
// d = (x - x1)(y2 - y1) - (y - y1)(x2 - x1)
// If d < 0 then the point lies on one side of the line
// and if d > 0 then it lies on the other side.
// If d = 0 then the point lies exactly on the line.
function isLeftCompare(P: Point, A: Point, B: Point): number {
  return (P.x - A.x) * (B.y - A.y) - (P.y - A.y) * (B.x - A.x);
}

// Distance between two points A(x1,y1) and B(x2,y2)
// is given by: d = √((x2 - x1)² + (y2 - y1)²).
// Since we only care about the sign of the outcome
// and not the outcome it self, we dont need to find
// the square roots of the two segments, we can use
// the d² just as fine.
function distCompare(P: Point, A: Point, B: Point): number {
  const distAP = Math.pow(P.x - A.x, 2) + Math.pow(P.y - A.y, 2);
  const distBP = Math.pow(P.x - B.x, 2) + Math.pow(P.y - B.y, 2);
  return distAP - distBP;
}