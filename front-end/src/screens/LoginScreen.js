import React, { Component } from 'react';
import { StyleSheet,
	 View,
	 Text,
	 TextInput,
	 Image,
       } from 'react-native';
import { Button,
       } from 'react-native-elements';


class LoginScreen extends Component {
  render() {
    return (
	<View style={styles.container}>
	    <View style={styles.logoContainer}>
		<Image
		    style={styles.logo}
		    source={require('../img/logo.png')}/>
		<Text style={styles.textLogo}>FeliCity</Text>
	    </View>
	    <View style={styles.formContainer}>
		<TextInput style={styles.input} placeholder="Email" />
		<TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} />
		<View style={styles.buttonContainer}>
		    <Button buttonStyle={styles.button} title="Se connecter" />
		    <Button buttonStyle={styles.button} title="S'enregistrer" />
		</View>
	    </View>
	</View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd600',
  },
  logo: {
    width: 150,
    height:150,
  },
  textLogo: {
    color: '#f38f19',
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
    backgroundColor: '#f35f19',
  },
});


export default LoginScreen;
