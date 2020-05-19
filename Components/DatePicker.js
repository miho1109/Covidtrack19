import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class DatePicker extends React.Component {
  
  state= {
    date: this.props.date,
    mode: 'date',
    show: false,
    title: "DD/MM/YYYY",
    color: "grey"
  }

  onChange(event, selectedDate) {
    const currentDate = selectedDate || this.state.date;
    this.setState({
        show: (Platform.OS === 'ios')
    })
    this.setState({
       date: currentDate
    })
    this.setState({
      title: currentDate.toString().slice(0,15)
    })
    this.setState({
      color: "black"
   })
    this.props.changeDate(this.state.date)
  };

  render(){
    return (
        <View>
          <View>
            <TouchableOpacity style={styles.container}
            onPress={() => this.setState({
              show: true
            })}>
              <Text style={{color: this.state.color}}>
                {this.state.title}
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={this.state.date}
              mode={this.state.mode}
              is24Hour={true}
              display="default"
              onChange={(event, date) => this.onChange(event, date)}
            />
          )}
        </View>
      );
  }
};

const styles = StyleSheet.create({
    container:{
      padding: 5,
      borderColor: 'darkslateblue',
      marginLeft:30,
      marginRight: 30,
      borderBottomWidth:2,
    },
})