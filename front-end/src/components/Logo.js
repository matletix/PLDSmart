import React, { Component } from 'react'
import { StyleSheet,
	 View,
	 Text,
	 Image,
       } from 'react-native'


class Logo extends Component {
  render() {
    return (
	<View style={styles.logoContainer}>
	    <Image
		style={styles.logo}
		source={require('../img/logo.png')}/>
	    <Text style={styles.textLogo}>FeliCity</Text>
	</View>
    )}
}


const styles = StyleSheet.create({
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
});


export default Logo;
