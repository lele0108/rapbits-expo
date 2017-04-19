import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
  Share,
  InteractionManager,

} from 'react-native';
import { Router } from './main';
import { ShareButton } from './ShareButton';
import Expo, {Asset, Audio, Font} from 'expo';

export default class BitScreen extends React.Component {

  static route = {
    navigationBar: {
      title: 'RapBit',
      renderRight: (route, props) => <ShareButton/>
    }
  }

  state = {
    loading: true,
    error: false,
    sound: null,
    status: "Play",
  };

  componentDidMount  = async() => {
    InteractionManager.runAfterInteractions(() => {
      Audio.setIsEnabledAsync(true);
      this.loadAudio();
    });
  }

  componentWillUnmount() {
    this.state.sound.stopAsync();
  }

  loadAudio = async() => {
    try {
      sound = new Audio.Sound({ source: this.props.route.params.currentBit.mp3Snippet });
      await sound.loadAsync();
      sound.setPlaybackFinishedCallback(() => this.loopAudio());
      this.setState({sound, loading: false});
    } catch(e) {
      this.setState({loading: false, error: true})
    }
  }

  loopAudio = async() => {
    await this.state.sound.setPositionAsync(0);
    this.setState({status: "Play"});
  }

  playAudio = async() => {
    const status = await this.state.sound.getStatusAsync();
    if (status.isPlaying) {
      this.setState({status: "Play"});
      await this.state.sound.pauseAsync();
    } else {
      this.setState({status: "Pause"});
      await this.state.sound.playAsync();
    }
  }

  render() {
    const {loading, error, status} = this.state;
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
        <Text style={styles.lyricText}>{rapbit.lyric}</Text>
        <Text style={styles.artistText}>{rapbit.artistName}</Text>
        <Button
          onPress={() => this.playAudio()}
          title={status}
          color="#841584"
          style={styles.playButton}
        />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  coverPhoto: {
    width: 200,
    height: 200,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lyricText: {
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
  },
  artistText: {
    fontSize: 14,
    color: 'lightslategrey',
    marginBottom: 15,
  },
  playButton: {
    marginTop: 20,
    fontSize:25,
  }
});