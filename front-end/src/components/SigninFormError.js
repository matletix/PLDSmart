import React, { Component } from 'react'
import { StyleSheet,
	 View,
	 TextInput,
       } from 'react-native'
import { Button } from 'react-native-elements'

class SigninForm extends Component {
    render() {
        const { onUsernameInputChange, onMdpInputChange, onMdpConfInputChange, onMailInputChange, 
            onSigninPress, usernameInput, mdpInput, mdpConfInput, mailInput } = this.props
        return (
            <View style={styles.formContainer}>
                <TextInput
            style={styles.input}
            placeholder="Username"
                        onChangeText={(text) => onUsernameInputChange(text)}
            value={usernameInput}
            />

                <TextInput
                    style={styles.input}
                    keyboardType = 'numeric'
                    placeholder="Poids (kg)"
                    onChangeText={(number) => onWeightInputChange(number)}
                    maxLength = {3}
                /> 
            
                <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry={true}
                onChangeText={(text) => onMdpInputChange(text)}
            value={mdpInput}
            />
                <TextInput
            style={styles.input}
            placeholder="Confirmer mot de passe"
            secureTextEntry={true}
                onChangeText={(text) => onMdpConfInputChange(text)}
                onEndEditing={() => { if (mdpConfInput != mdpInput)
                                {
                                    return window.alert('Les mots de passe ne correspondent pas')
                                }
                                 }}
            value={mdpConfInput}
            />
                <TextInput
            style={styles.input}
            placeholder="Adresse mail"
            value={mailInput}
            />

             <View style={styles.buttonContainer}>
            <Button
                buttonStyle={styles.button}
                title="Inscription"
                onPress={onSigninPress} />
                
            </View>
            <Text style={styles.error}>{errorMsg} DEBUG:</Text>
            </View>
        )}
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    marginHorizontal: 30,
    paddingHorizontal: 10,
    backgroundColor: '#75dec9',
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


export default SigninForm;
