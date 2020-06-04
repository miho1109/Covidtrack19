import React, { Component } from 'react'
import { View } from 'react-native'
import firestore from '@react-native-firebase/firestore'

export default class SuspectedPullData extends Component {

    constructor(props) {
        super(props);
        this.state= {
          name: props.name,
          province: props.province,
          district: props.district,
      }
    }

    componentDidMount() {
        this.getData();
    }  

    getData () {
        firestore()
          .collection("Hà Nội")
          .doc(this.state.district)
          .collection(this.state.province)
          .doc("Supervisor")
          .collection("SuspectedUser")
          .doc(this.state.name)
          .get().then(doc => {
              if(doc.exists) {
                  this.props.getData(doc.data().CurrentDate);
              }
          })
  
    }

    render() {
        return (
            <View>
                
            </View>
        )
    }
}
