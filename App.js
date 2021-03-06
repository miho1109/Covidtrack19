/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';

import InfoTitle, {saveInfo} from './Components/informationTitle';

const App = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              Thông tin cá nhân
            </Text>
          </View>
          <InfoTitle/> 
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },

  sectionContainer: {
    backgroundColor: 'darkslateblue',
    //marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    paddingBottom: 10,
    marginTop: 10,
    fontSize: 24,
    fontWeight: '600',
    color: "white",
  },  
});

export default App;