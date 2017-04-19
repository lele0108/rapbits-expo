import React from 'react';
import {
  Text,
  Image,
  View,
  ActivityIndicator, ScrollView, StyleSheet
} from 'react-native';
import { Router } from './main';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'RapBits Gallery',
    }
  }

  state = {
  	loading: true,
  	error: false,
  	rapbits: [],
  }

  componentWillMount = async() => {
  	try {
  		const response = await fetch('http://rapbits.com/api/rapbits');
  		const rapbits = await response.json()
  		console.log("load successful");
  		this.setState({loading: false, rapbits})
  	} catch(e) {
  		this.setState({loading: false, error: true})
  	}
  }

  renderPost = ({songName, artistName}, i) => {
  	console.log(i);
    return (
      <View
      	key={i}
        style={styles.post}
      >
        <View style={styles.postContent}>
          <Text style={styles.songName}>
            {songName}
          </Text>
          <Text style={styles.artistName}>
            {artistName}
          </Text>
        </View>
      </View>
    )
  }

  render() {
  	const {rapbits, loading, error} = this.state;

  	if (loading) {
  		return (
  			<View syle={styles.center}>
  				<ActivityIndicator animated={true} style={styles.activityIndicator}/>
  			</View>
  			)
  	}

  	if (error) {
      return (
        <View style={styles.center}>
          <Text>
            Failed to load posts!
          </Text>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        {rapbits.map(this.renderPost)}
      </ScrollView>
    )
  }

  _handlePress = () => {
    this.props.navigator.push('home');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  post: {
    flexDirection: 'row',
  },
  postContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 25,
    paddingLeft: 15,
  },
  songName: {
  	marginTop: 10,
  	fontSize: 15,
  	color: 'black',
  },
  artistName: {
    marginTop: 10,
    fontSize: 12,
    color: 'lightslategrey',
  },
  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
   },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
  	flex: 1,
  	flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 15,
    backgroundColor: 'skyblue',
  },
})