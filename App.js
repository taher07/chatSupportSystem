import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './components/home'
import Chat from './components/chat'
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDsqzc20epFrcU6TV12JlDRAnfb2BXjNBM",
  authDomain: "chatapp-d04c6.firebaseapp.com",
  databaseURL: "https://chatapp-d04c6.firebaseio.com",
  projectId: "chatapp-d04c6",
  storageBucket: "chatapp-d04c6.appspot.com",
  messagingSenderId: "654510251962",
  appId: "1:654510251962:web:a0a6dd0c2d79e047e84783",
  measurementId: "G-ZMPRMH81KQ"
};
firebase.initializeApp(firebaseConfig);

const MainNavigator = createStackNavigator({
  Home: Home,
  Chat: Chat
});

const App = createAppContainer(MainNavigator);
export default App;