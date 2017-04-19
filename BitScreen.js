import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,

} from 'react-native';
import { Router } from './main';
import Expo, {Asset, Audio, Font} from 'expo';

export default class BitScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'RapBit',
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
    sound.setPlaybackFinishedCallback(() => this.state.sound.setPositionAsync(0));
    this.setState({sound, loading: false});
  }

  playAudio = async() => {
    const status = await this.state.sound.getStatusAsync();
    console.log(status);
    if (status.isPlaying) {
      await this.state.sound.pauseAsync();
    } else {
      await this.state.sound.playAsync();
    }
  }

  render() {
    const {loading, error} = this.state;
    const rapbit = this.props.route.params.currentBit;
    if (loading) {
      return (
        <View syle={styles.center}>
          <ActivityIndicator animated={true} style={styles.activityIndicator}/>
        </View>
        )
    }

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Image style={styles.coverPhoto} source={{ uri: rapbit.albumCover }} />
        <Text>{rapbit.lyric}</Text>
        <Text>{rapbit.artistName}</Text>
        <Button
          onPress={() => this.playAudio()}
          title="Play"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
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