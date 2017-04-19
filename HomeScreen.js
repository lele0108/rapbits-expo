import React from 'react';
import {
  Text,
  Image,
  View,
  Share,
  TextInput,
  ActivityIndicator, ListView, StyleSheet, TouchableOpacity
} from 'react-native';
import { Router } from './main';

const rowHasChanged = (r1, r2) => r1.lyric !== r2.lyric
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
  	dataSource:ds,
    searchText: "",
  };

  _goToBit = currentBit => () => {
    this.props.navigator.push('bit', {currentBit});
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
	    return (
		    <TouchableOpacity onPress={this._goToBit(rowData)} style={styles.postContent}>
		      <Image style={styles.coverPhoto} source={{ uri: rowData.albumCover}} />
		      <Text style={styles.songName}>
		        {rowData.lyric}
		      </Text>
		      <Text style={styles.artistName}>
	            {rowData.artistName}
	          </Text>
	         </TouchableOpacity>
	    )
  }

  setSearchText(event) {
   let searchText = event.nativeEvent.text;
   this.setState({searchText});
   let filteredData = this.filterRap(searchText);
   this.setState({
       dataSource: ds.cloneWithRows(filteredData),
    });
  }

  filterRap(searchText) {
    let text = searchText.toLowerCase();

    return this.state.rapbits.filter((n) => 
      n.lyric.toLowerCase().indexOf(text.toLowerCase()) > -1
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
     <View style={styles.container}>
     <TextInput
     style={styles.search}
 value={this.state.searchText}
 onChange={this.setSearchText.bind(this)}
 placeholder="Search" />
	   <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}/>
        </View>
    )
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
    marginTop: 5,
    fontSize: 12,
    color: 'lightslategrey',
  },
  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height:80,
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
  search: {
    height:40,
    paddingLeft: 15,
    paddingTop: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightslategrey'
  }
})