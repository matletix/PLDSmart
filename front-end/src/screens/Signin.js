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
      mdpConfInput: '',
      weightInput:'',
      loading: false,
      error: false,

    };
  }
// Triggered when the username text field receives text input
onUsernameInputChange = (text) => this.setState({...this.state, usernameInput: text})

//Triggered when the mdp text field receives text input
onMdpInputChange = (text) => this.setState({...this.state, mdpInput : text})

//Triggered when the weight text field receives text input
onWeightInputChange = (number) => this.setState({...this.state, weightInput : number})

//Triggered when the confirmation mdp text field receives text input
onMdpConfInputChange = (text) => this.setState({...this.state, mdpConfInput : text})

//Triggered when the mail text field receives text input
onMailInputChange = (text) => this.setState({...this.state, mailInput : text})

//Triggered when cliking on the Signin button
onSigninPress = async (usernameInput, mdpInput, mailInput) => {
  const {dispatch} = this.props
  this.setState({...this.state, loading: true})
  try {
    const url = 'http://'+config.api_ip+':8080/'
    const options = {
      method: "POST",
    timeout: 5000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  },
      body: JSON.stringify({pseudo: usernameInput, mdp: mdpInput, mail: mailInput})
    }
    // If the authentification was successful
      if (response.status == 200) {
	const rjson = await response.json()
	console.log(rjson.token)

	/*dispatch(dispatchAction.set_token(rjson.token))
	dispatch(dispatchAction.set_pseudo(rjson.pseudo))
	dispatch(dispatchAction.set_points(rjson.points))
	dispatch(dispatchAction.set_levelMax(rjson.level))*/

  } else {
	console.log('Authentification error: the server responded '+response.status)
      this.setState({...this.state, mdpInput: '', loading: false, error: true,
		     errorMsg: 'Le pseudo est déjà utilisé',
		    })
      }
} 
 catch (e) {
      console.log('SignIn error : '+e)
      this.setState({...this.state, mdpInput: '', loading: false, error: true,
		     errorMsg: 'La tentative d\'inscription a échouée. Veuillez réessayer',
		    })
    }
}


  render () {
    if (this.state.loading == false && this.state.error == false) {
    return (
      <View style={styles.container}>
        <SigninForm
          onUsernameInputChange={this.onUsernameInputChange}
          onMdpInputChange={this.onMdpInputChange}
          onMdpConfInputChange={this.onMdpConfInputChange}
          onWeightInputChange={this.onWeightInputChange}
          onMailInputChange={this.onMailInputChange}
          mdpInput={this.state.mdpInput}
          weightInput={this.state.weightInput}
          usernameInput={this.state.usernameInput}
          mdpConfINput={this.state.mdpConfInput}
          mailInput={this.state.mailInput}
              />
      </View>
    )}
    else if(this.state.loading == false && this.state.error == true)
    {
    return (
      <View style={styles.container}>
        <SigninFormError
          onUsernameInputChange={this.onUsernameInputChange}
          onMdpInputChange={this.onMdpInputChange}
          onMdpConfInputChange={this.onMdpConfInputChange}
          onWeightInputChange={this.onWeightInputChange}
          onMailInputChange={this.onMailInputChange}
          mdpInput={this.state.mdpInput}
          weightInput={this.state.weightInput}
          usernameInput={this.state.usernameInput}
          mdpConfINput={this.state.mdpConfInput}
          mailInput={this.state.mailInput}
              />
      </View>
    )  

    }
        // Rendered when a Signin attempt is in progress
    else if (this.state.loading == true ) {
     return (
	<View style={styles.container}>
	 <Logo />
	    <View style={styles.logoContainer}>
		<Image
		    style={styles.loading}
		    source={require('../img/loading.gif')}/>
	    </View>
	</View>
     )}
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
