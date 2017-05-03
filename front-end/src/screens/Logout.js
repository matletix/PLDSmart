import React, { Component } from 'react';
import { StyleSheet,
	 View,
	 Text,
	 TextInput,
	 Image,
       } from 'react-native';
import { Button,
       } from 'react-native-elements';


class Logout extends Component {
  render () {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1abc9c',
  },
  logo: {
    width: 150,
    height:150,
  },
  textLogo: {
    color: '#2966c0',
    opacity: 0.8,
    fontSize: 38,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    marginHorizontal: 30,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  buttonContainer: {
    margin: 10,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 50,
    margin: 5,
    marginHorizontal: 50,
    backgroundColor: '#0D3A7D',
  },
});

export default Logout;
