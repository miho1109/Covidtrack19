import React, { Component } from 'react'
import {Text, View, StyleSheet, Image, SafeAreaView} from "react-native";
import firestore from '@react-native-firebase/firestore';

var quarantineList = [];
var coordinateList = [];

export default class GoogleMapPullData extends Component {

    constructor(props){
        super(props)
        this.state ={
            district : props.district,
            province : props.province,
            Latitude : props.Latitude,
            Longtitude : props.Longtitude,
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
              //console.log(doc.id, '=>', doc.data());
              quarantineList.push(doc.data());
              if(doc.data().Latitude != 0 && doc.data().Longtitude != 0) {
                var temp = new Point(Number(doc.data().Latitude), Number(doc.data().Longtitude))
                coordinateList.push(temp);
              }
              sortPoints(coordinateList)
              //console.log(coordinateList);
            });
            this.props.updateStatus(coordinateList, quarantineList);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }
    
    render() {
        return (
           <View>

           </View>
        )
    }
}

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
