import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    Image,
    ScrollView,
    TouchableOpacity,
}
from 'react-native';
import SwipeablePanel from "rn-swipeable-panel";
import Accordion from 'react-native-collapsible/Accordion';
import moment from 'moment';
import CallSuspected from './CallSuspected';



class AccordionView extends Component {
  constructor(props) {
    super(props);
    this.state= {
      SECTIONS: props.List,
      activeSections: [],
    }
  }

  setTime (currentDate) {
    var a = moment(currentDate, "YYYY-MM-DD HH:mm:ss");
    var b = a.clone().add(2, 'week');
    var c = moment();
    var duration = moment.duration(b.diff(c));
    var d = Math.round(duration.asDays());

    return (d > 0)? d.toString() + " ngày" : "Đã hết thời gian cách ly"
  }

  _renderHeader = sectionHeader => {
    return (
      <Text style={styles.header}>
        {sectionHeader.Name}
      </Text>
    );
  };

  _renderContent = sectionContent => {
    return (
      <Item
        Name={sectionContent.Name}
        CMND={sectionContent.CMND}
        Gender={sectionContent.Gender}
        Location={sectionContent.QuarantineLocation}
        Duration={this.setTime(sectionContent.CurrentDate)}
        Latitude={sectionContent.Latitude}
        Longitude={sectionContent.Longtitude}
        focusOnMarker={this.focusOnMarker.bind(this)}
        Phone = {sectionContent.Phone}
      />
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  focusOnMarker(latitude, longitude) {
    this.props.focusOnMarker(latitude, longitude)
  }

  render() {
    return (
      <Accordion
        sections={this.state.SECTIONS}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
        underlayColor={"whitesmoke"}
      />
    );
  }
};

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            Name: props.Name,
            CMND: props.CMND,
            Gender: props.Gender,
            Location: props.Location,
            Duration: props.Duration,
            Latitude: props.Latitude,
            Longitude: props.Longitude,
            Phone: props.Phone,
      }
    }
    
    focusOnMarker(latitude, longitude) {
      this.props.focusOnMarker(latitude, longitude)
    }

    render() {
      return (       
       <View>

          <Image
            source={require('../Resources/Test.png')}
            style={{ width: 100, height: 100, alignSelf: "center"}}
            resizeMode={"cover"}
            borderRadius={50}
          />

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

          <TouchableOpacity
            onPress={() => this.focusOnMarker(this.state.Latitude, this.state.Longitude)}
          >
            <Text style={styles.info}>
                Tìm kiếm trên bản đồ
            </Text>
          </TouchableOpacity>
          <CallSuspected 
          Phone = {this.state.Phone}
          />
       </View>
      );
    }
}



export default class DropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
          Name: props.Name,
          CMND: props.CMND,
          Gender: props.Gender,
          Location: props.Location,
          Duration: props.Duration,
          originalLat: props.originalLat,
          originalLong: props.originalLong,
          swipeablePanelActive: false,
          List: props.List,
      }
    }

    openPanel = () => {
      this.setState({ swipeablePanelActive: true });
    };
  
    closePanel = () => {
      this.setState({ swipeablePanelActive: false });
    };

    togglePanel = () => {
      if(this.state.swipeablePanelActive)
      this.setState({ swipeablePanelActive: false });
      else
      this.setState({ swipeablePanelActive: true });
    };

    focusOnMarker(latitude, longitude) {
      this.props.focusOnMarker(latitude, longitude)
    }
    
    render() {
      return (       
       <View>
          <TouchableOpacity
            style={styles.MainContainer}
            onPress={this.togglePanel}
          >
            <Text style={styles.showInfo}>
              ^
            </Text>
          </TouchableOpacity>
          <SwipeablePanel
            fullWidth
            isActive={this.state.swipeablePanelActive}
            onClose={this.closePanel}
            onPressCloseButton={this.closePanel}
          >
            <ScrollView>
              <AccordionView
                List={this.state.List}
                focusOnMarker={this.focusOnMarker.bind(this)}
              />
            </ScrollView>
           
          </SwipeablePanel>
       </View>
      );
    }
  };

  const styles = StyleSheet.create({
    
    MainContainer: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: "dimgray",
      width: "20%",
      height: 35,
      alignSelf: "center",
      opacity: 0.6,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
    },
    Item: {
      flex: 0.085,
      alignItems: "flex-start",
      flexDirection: "row",
      paddingTop: 10,
      borderBottomWidth: 1.5,
    },
    header: {
      fontSize: 20,
      padding: 15,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    showInfo: {
      alignSelf: "center",
      fontSize: 32,
      padding: 5,
      color: "white",
    },
    info: {
      color: "dimgrey",
      marginLeft:20,
      fontSize: 16,
      paddingTop: 10,
    },
  });
