import React, { Component } from 'react'
import { StyleSheet,
	 View,
	 TextInput,
     Text,
     Dimensions,
     ListItem,
     Radio,
     TouchableOpacity,
       } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import Picker from 'react-native-picker'
//import { GenderPicker } from './GenderPicker'

class SigninForm extends Component {
    constructor(props){
		super(props);
		this.state = {
			checked: true,
		};
	}

	// _onPressHandle(){
	// 	this.picker.toggle();
    // }
    onPressCheck= ()=>(this.setState({checked: !this.state.checked}))
    //onChangedPickedValue = (pichkedVal) => (setState({pickedValue: pickedVal}))

    render() {
        const { onUsernameInputChange, onWeightInputChange, onAgeInputChange, onMdpConfInputChange, onMailInputChange, onMdpInputChange, checked, isMale,
        usernameInput, mdpInput, mailInput, ageInput, mdpConfInput, weightInput, onSigninPress} = this.props
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
                placeholder="Poids (kg)"
                keyboardType = 'numeric'
                onChangeText={(number) => onWeightInputChange(number)}
                maxLength = {3}
            /> 
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <CheckBox
                center
                containerStyle= {{backgroundColor: '#75dec9', borderColor: '#75dec9'}}
                title='Homme'
                onPress={this.onPressCheck}
                checked={this.state.checked}
                isMale={this.state.checked ? 'M':'F'}
                />

            <CheckBox
                center
                containerStyle= {{backgroundColor: '#75dec9', borderColor: '#75dec9'}}
                title='Femme'
                onPress={this.onPressCheck}
                checked={!this.state.checked}
                
                />
            </View>

            <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType = 'numeric'
                onChangeText={(number) => onAgeInputChange(number)}
                value={ageInput}
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
             onChangeText={(text) => onMailInputChange(text)}
            placeholder="Adresse mail"
            value={mailInput}
            />

             <View style={styles.buttonContainer}>
            <Button
                buttonStyle={styles.button}
                title="Inscription"
                onPress={(usernameInput, ageInput, weightInput, isMale, mailInput, mdpInput) => onSigninPress(usernameInput, ageInput, weightInput, isMale, mailInput, mdpInput)} />
            </View>
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
    backgroundColor: '#087A64',
  },
});


export default SigninForm;
