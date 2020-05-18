import React from "react";
import {Text, View, StyleSheet} from "react-native";
import MapView, {Marker} from 'react-native-maps';
//import Marker from 'react-native-maps';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

var quarantineList = [];

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
            >
                {quarantineList.map ((item, index) => (
                    <Marker
                    coordinate={{
                        latitude: Number((item.Latitude)),
                        longitude:  Number((item.Longtitude)), 
                    }}
                    title={"item.title"}
                    description={"item.description"}
                    key={index}
                    />
                ))}
            </MapView>
           
        )
    }
};

const styles = StyleSheet.create({
  map: {
      height: "100%"
  }
});
