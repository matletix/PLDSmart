import React, { Component } from 'react'
import { StyleSheet,
	 View,
	 Text,
	 TextInput,
	 Image,
       } from 'react-native'
import { Button,
       } from 'react-native-elements'
import { connect } from 'react-redux'
import Logo from '../components/Logo'
import LoginForm from '../components/LoginForm'
import LoginFormError from '../components/LoginFormError'


const mapStateToProps = (state) => ({
  username: state.username,
  password: state.password,
  token: state.token,
})


class Login extends Component {

  static navigationOptions = {
    headerVisible: false,
  }

  constructor (props) {
    super(props);
    this.state = {
      loginInput: '',
      mdpInput: '',
      loading: false,
      error: false,
    };
  }

  // Triggered when the login text field receives text input
  onLoginInputChange = (text) => this.setState({...this.state, loginInput: text})

  // Triggered when the mdp text field receives text input
  onMdpInputChange = (text) => this.setState({...this.state, mdpInput: text})

  // Triggered when clicking on the 'Continue' button after a login attempt fails
  onContinuePress = () => {
    this.setState({...this.state, error: false})
    this.props.navigation.navigate('Home')
  }
  
  // Trigger when clicking on the Login button
  onLoginPress = async (login, password) => {
    this.setState({...this.state, loading: true})
    try {
      // FIXME: no response from the backend server
      // ------------------------------------------
      // The request is made (you can analyze the network on an android emulator
      // by pressing Ctrl+M, choose toogle inspector, and open the tab Network)
      // but the Node server doesn't seem to receive the request (no logs output
      // on the server) while it does work with kivy
      // ------------------------------------------

      // Test 1 succeeds
      const test1 = await fetch('http://www.google.com')
      console.log('TEST 1 REUSSI')
      // Test 2 however fails !
      const test2 = await fetch('http://localhost:8080/getTestDatas')
      console.log('TEST 2 REUSSI')

      // ------------------------------------------
      const response = await fetch('http://localhost:8080/authentificate', {
        method: "POST",
	headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	},
        body: JSON.stringify({pseudo: login, mdp: password})
      })
      const posts = await response.json()
      this.setState({...this.state, loading:false, error: false, mdpInput: ''})
      this.props.navigation.navigate('Home');

    } catch (e) {
      console.log('Erreur!')
      this.setState({...this.state, mdpInput: '', loading: false, error: true})
    }
  }

  // Triggered when clicking on the Sign up button
  onSigninPress = () => {
    this.setState({...this.state, error: false, mdpInput: ''})
    this.props.navigation.navigate('Signin')
  }


  render() {
    // Initial rendering
    if (this.state.loading == false && this.state.error == false) {
    return (
	<View style={styles.container}>
	 <Logo />
	  <LoginForm
	    onLoginInputChange={this.onLoginInputChange}
	    onMdpInputChange={this.onMdpInputChange}
	    onLoginPress={this.onLoginPress}
	    onSigninPress={this.onSigninPress}
	    loginInput={this.state.loginInput}
	    mdpInput={this.state.mdpInput}
          />
	</View>
    )}
    // Rendered when a Login attempt is in progress
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
    // Rendered when a Login attempt fails
   else if (this.state.loading == false && this.state.error == true) {
    return (
	<View style={styles.container}>
	  <Logo />
	  <LoginFormError
	    onLoginInputChange={this.onLoginInputChange}
	    onMdpInputChange={this.onMdpInputChange}
	    onLoginPress={this.onLoginPress}
	    onSigninPress={this.onSigninPress}
	    loginInput={this.state.loginInput}
	    mdpInput={this.state.mdpInput}
	    onContinuePress={this.onContinuePress}
	  />
	</View>
    )}
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd600',
  },
  loading: {
    width: 50,
    height: 50,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});


export default connect(mapStateToProps)(Login);
