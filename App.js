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
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Home from './source/Screens/Home';


const App = () => {
 

  return (
    <SafeAreaView >
        <Home />
    </SafeAreaView>
  );
};


export default App;
