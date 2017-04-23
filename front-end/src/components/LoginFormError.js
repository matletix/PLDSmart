import React, { Component } from 'react'
import { StyleSheet,
	 View,
	 Text,
	 TextInput,
       } from 'react-native'
import { Button } from 'react-native-elements'

class LoginFormError extends Component {
  render() {
    const { onLoginInputChange, onMdpInputChange, onLoginPress, onSigninPress, loginInput, mdpInput, onContinuePress } = this.props
    return (
	  <View style={styles.formContainer}>
	    <TextInput
		style={styles.input}
		placeholder="Email"
                onChangeText={(text) => onLoginInputChange(text)}
		value={loginInput}
	    />
	    <TextInput
		style={styles.input}
		placeholder="Mot de passe"
		secureTextEntry={true}
		onChangeText={(text) => onMdpInputChange(text)}
		value={mdpInput}
	    />
	    <View style={styles.center}>
	    <Text style={styles.error}>Les identifiants saisis sont invalides ! DEBUG:</Text>
	    <Button
		title="Continuer quand même"
		onPress={onContinuePress} />
	    </View>

	    <View style={styles.buttonContainer}>
		<Button
		    buttonStyle={styles.button}
		    title="Se connecter"
		    onPress={() => onLoginPress(loginInput, mdpInput)} />
		<Button
		    buttonStyle={styles.button}
		    title="S'enregistrer"
		    onPress={onSigninPress} />
	    </View>
	  </View>
    )}
}


const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
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
  error: {
    color: 'red',
    fontSize: 12,
  },
});


export default LoginFormError;
