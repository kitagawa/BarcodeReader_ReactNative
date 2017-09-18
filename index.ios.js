/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import Camera from 'react-native-camera';

const MyHomeScreen = ({ navigation }) => (
  <View>
    <Text>Home</Text>
  </View>
)

class CameraScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      readed: false
    };
  }
  render() {
    return(
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this.onBarCodeRead.bind(this)}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
  onBarCodeRead(data){
    console.log(data.data)
    if(this.state.readed == false){
      this.setState({readed: true});
      this.props.navigation.navigate('Result', {value: data.data})
    }
  }
}

class ResultScreen extends Component {
  render() {
    return (
      <View>
      <Text>{this.props.navigation.state.params.value}</Text>
      </View>
    );
  }
}

const HomeTab = StackNavigator({
  Home: {
    screen: MyHomeScreen,
    path: '/',
    navigationOptions: {
      title: 'Welcome',
    },
  },
});

const CameraTab = StackNavigator({
  Camera: {
    screen: CameraScreen,
    path: '/camera',
    navigationOptions: {
      title: 'Camera',
    },
  },
  Result: {
    screen: ResultScreen,
    path: '/camera_result',
    navigationOptions: {
      title: 'Result',
    },
  }
});


const Tabs = TabNavigator({
  Home: {
    screen: HomeTab,
    path: '/camera',
    navigationOptions: {
      tabBarLabel: 'Home',
    }
  },
  Camera: {
    screen: CameraTab,
    path: '/camera',
    navigationOptions: {
      tabBarLabel: 'Camera',
    }
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

export default class ReaderApp extends Component {
  render() {
    return (
      <Tabs/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
});

AppRegistry.registerComponent('ReaderApp', () => ReaderApp);
