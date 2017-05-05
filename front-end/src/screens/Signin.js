import React, { Component } from 'react';
import { StyleSheet,
	 View,
	 Text,
	 TextInput,
	 Image,
       } from 'react-native';
import { Button,
       } from 'react-native-elements'
import SigninForm from '../components/SigninForm';
import SigninFormError from '../components/SigninFormError';
import Picker from 'react-native-picker'
var config = require('../config');




class Signin extends Component {
  static navigationOptions = {
    //headerVisible: false,
    title: 'Signin',
  }

  constructor (props) {
    super(props);
    this.state = {
      usernameInput: '',
      mdpInput: '',
      mailInput: '',
      ageInput: '',
      mdpConfInput: '',
      isMale:'',
      weightInput:'',
      loading: false,
      error: true,
      errorMsg:'',

    };
  }

// Triggered when the username text field receives text input
onUsernameInputChange = (text) => this.setState({...this.state, usernameInput: text})

//Triggered when the mdp text field receives text input
onMdpInputChange = (text) => this.setState({...this.state, mdpInput : text})

//Triggered when the weight text field receives text input
onWeightInputChange = (number) => this.setState({...this.state, weightInput : number})

// //Triggered when the confirmation mdp text field receives text input
onMdpConfInputChange = (text) => this.setState({...this.state, mdpConfInput : text})

//Triggered when the mail text field receives text input
onMailInputChange = (text) => this.setState({...this.state, mailInput : text})

//Triggered when the age text field receives text input
onAgeInputChange = (number) => this.setState({...this.state, ageInput : number})

//Triggered when the gender button is checked
onGenderInputChange = (text) => this.setState({...this.state, isMale : text})

//Triggered when cliking on the Signin button
onSigninPress = async (usernameInput, ageInput, weightInput, isMale, mailInput, mdpInput) => {
  
  this.setState({...this.state, loading: true})
  
  try {
    this.props.navigation.navigate('Login')
    const url = 'http://'+config.api_ip+'/signin'
    
    const options = {
      method: "POST",
    timeout: 5000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
       },
      body: JSON.stringify({pseudo: usernameInput, age:ageInput, poids:weightInput, sexe:isMale, mail:mailInput,  mdp: mdpInput})
    }
    
    
    
} 
 catch (e) {

    }
}


  render () {

    return (
      <View style={styles.container}>
        <SigninFormError
          onUsernameInputChange={this.onUsernameInputChange}
          onMdpInputChange={this.onMdpInputChange}
          onWeightInputChange={this.onWeightInputChange}
          onMailInputChange={this.onMailInputChange}
          onMdpConfInputChange={this.onMdpConfInputChange}
          onSigninPress={this.onSigninPress}
          mdpConfInput={this.state.mdpConfInput}
          onAgeInputChange={this.onAgeInputChange}
          ageInput={this.state.ageInput}
          isMale={this.onGenderInputChange}
          mdpInput={this.state.mdpInput}
          weightInput={this.state.weightInput}
          usernameInput={this.state.usernameInput}
          mailInput={this.state.mailInput}
              />
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

export default Signin;
