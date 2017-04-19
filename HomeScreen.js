import React from 'react';
import {
  Text,
  Image,
  View,
  ActivityIndicator, ListView, StyleSheet
} from 'react-native';
import { Router } from './main';

const rowHasChanged = (r1, r2) => r1 !== r2
const ds = new ListView.DataSource({rowHasChanged});

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
  	dataSource:ds
  };


  componentWillMount = async() => {
  	try {
  		const response = await fetch('http://rapbits.com/api/rapbits');
  		const rapbits = await response.json()
  		console.log("load successful");
  		this.setState({loading: false, rapbits});
  		this.setState({dataSource: ds.cloneWithRows(rapbits)});
  	} catch(e) {
  		this.setState({loading: false, error: true})
  	}
  }

  renderRow = (rowData) => {
    	console.log(rowData);
	    return (
		    <View style={styles.postContent}>
		    <Image style={styles.coverPhoto} source={{ uri: rowData.albumCover }} />
		      <Text style={styles.songName}>
		        {rowData.songName}
		      </Text>
		      <Text style={styles.artistName}>
	            {rowData.artistName}
	          </Text>
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
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
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
  coverPhoto: {
  	width: 75,
  	height: 75,
  	justifyContent: 'center',
  	alignItems: 'center',
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