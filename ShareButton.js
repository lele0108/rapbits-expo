import React from 'react';
import {
  Share,
  Button,
  Text,
  StyleSheet,
} from 'react-native';
import { Router } from './main';

export class ShareButton extends React.Component {
	render() {
      return (
        <Button 
        	onPress={() => this.shareText()}
        	title="Share"
        />
      );
   }

   shareText() {
    Share.share({
      message: 'Check out this new Rap lyric I found: ',
      url: 'https://rapbits.com',
      title: 'RapBits'
    }, {
      dialogTitle: 'Check out this new Rap lyric I found: ',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }
}

const styles = StyleSheet.create({
	button: {

	}

});