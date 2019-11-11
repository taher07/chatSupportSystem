import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

export default class Home extends React.Component {
    static navigationOptions = {
        title: "Home",
        headerStyle: {
            backgroundColor: "#dc143c"
        },
        headerTintColor: "#fff"
    };
  render() {
    return (
     <TouchableOpacity behavior="padding" enabled style={styles.container} onPress={() => {this.props.navigation.navigate('Chat')}}>
        <Image
        source={require('../assets/img.png')}
        style={{marginHorizontal: 30}}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});