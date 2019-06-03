/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import AuthNavigator from './src/navigators/AuthNavigators/AuthNavigator';
import GeneralStatusBarColor from './src/components/utils/GeneralStatusBarColor';
export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <GeneralStatusBarColor
          barStyle="light-content" />
        <AuthNavigator />
      </View>
    );
  }
}

