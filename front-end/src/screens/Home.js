import React, { Component } from 'react';
import { StyleSheet,
	 View,
	 Text,
	 TextInput,
	 Image,
       } from 'react-native';
import { Button,
       } from 'react-native-elements';


class Home extends Component {
  static navigationOptions = {
    title: 'Menu',
  }

  onPlayPress = () => {
    this.props.navigation.navigate('GameModes');
  };

  onProfilePress = () => {
    this.props.navigation.navigate('Profile');
  };

  onSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  };

  onLogoutPress = () => {
    this.props.navigation.navigate('Logout');
  };

  render () {
    return (
      <View style={styles.container}>
	<View style={styles.logoContainer}>
	<Image
	    style={styles.logo}
	    source={require('../img/logo.png')}/>
	</View>
	<View style={styles.buttonsContainer}>
	<Button
	    buttonStyle={styles.button}
	    title="Jouer"
	    onPress={() => this.onPlayPress()} />
	<Button
	    buttonStyle={styles.button}
	    title="Profil"
	    onPress={() => this.onProfilePress()} />
	<Button
	    buttonStyle={styles.button}
	    title="Paramètres"
	    onPress={() => this.onSettingsPress()} />
	<Button
	    buttonStyle={styles.button}
	    title="Déconnexion"
	    onPress={() => this.onLogoutPress()} />
	</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#1abc9c',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height:150,
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  button: {
    /*borderRadius: 50,*/
    margin: 5,
    marginHorizontal: 50,
    backgroundColor: '#087A64',
  },
});

export default Home;
