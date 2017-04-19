import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
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

  state = {
    loading: true,
    error: false,
    sound: null,
  };

  componentDidMount() {
    Audio.setIsEnabledAsync(true);
    this.loadAudio();
  }

  componentWillUnmount() {
    this.state.sound.stopAsync();
  }

  loadAudio = async() => {
    const sound = new Expo.Audio.Sound({
      source: this.props.route.params.currentBit.mp3Snippet,
    });
    await sound.loadAsync();
    await sound.playAsync();
    this.setState({sound});
  }

  render() {
    const rapbit = this.props.route.params.currentBit;
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Image style={styles.coverPhoto} source={{ uri: rapbit.albumCover }} />
        <Text>{rapbit.lyric}</Text>
        <Text>{rapbit.artistName}</Text>
      </View>
    )
  }

  _handlePress = () => {
    this.props.navigator.push('home');
  }
}

const styles = StyleSheet.create({
  coverPhoto: {
    width: 75,
    height: 75,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});