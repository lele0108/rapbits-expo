import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Router } from './main';
import Expo, {Asset, Audio, Font} from 'expo';

export default class BitScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Home',
      title(params) {
        return `Greeting for ${params.cover}`;
      },
    }
  }

  componentDidMount() {
    Audio.setIsEnabledAsync(true);
  }

  render() {

      console.log(this.props.route.params);
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>{this.props.route.params.currentBit.lyric}</Text>
        <Text>{this.props.route.params.currentBit.artistName}</Text>
      </View>
    )
  }

  _handlePress = () => {
    this.props.navigator.push('home');
  }
}