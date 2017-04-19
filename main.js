import Expo from 'expo';
import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';

import HomeScreen from './HomeScreen';
import BitScreen from './BitScreen'

const Router = createRouter(() => ({
  home: () => HomeScreen,
  bit: () => BitScreen,
}));

class App extends React.Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute="home" />
      </NavigationProvider>
    );
  }
}

Expo.registerRootComponent(App);