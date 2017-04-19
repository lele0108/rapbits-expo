import React from 'react';
import {
  Text,
  View,
  ActivityIndicator, ScrollView, StyleSheet
} from 'react-native';
import { Router } from './main';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Home',
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
  	console.log("rendiner");
    return (
      <View
        style={styles.post}
      >
        <View style={styles.postContent}>
          <Text>
            {songName}
          </Text>
          <Text style={styles.postBody}>
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
  				<ActivityIndicator animated={true}/>
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
  postNumber: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 25,
    paddingRight: 15,
  },
  postBody: {
    marginTop: 10,
    fontSize: 12,
    color: 'lightgray',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 15,
    backgroundColor: 'skyblue',
  },
})