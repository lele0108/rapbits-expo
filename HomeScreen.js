import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Router } from './main';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Home',
    }
  }

  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text onPress={this._handlePress}>HomeScreen!</Text>
      </View>
    )
  }

  _handlePress = () => {
    this.props.navigator.push('home');
  }
}