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
import { dispatchAction } from '../redux'
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
      errorMsg: ''
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
  
  // Triggered when clicking on the Login button
  onLoginPress = async (login, password) => {
    const {dispatch} = this.props
    this.setState({...this.state, loading: true})
    try {
      const url = 'http://10.0.2.2:8080/authentificate'
      const options = {
        method: "POST",
	timeout: 5000,
	headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	},
        body: JSON.stringify({pseudo: login, mdp: password})
      }

      const response = await fetch(url, options)

      // If the authentification was successful
      if (response.status == 200) {
	const rjson = await response.json()
	console.log(rjson.token)

	// Save returned data in the redux store
	dispatch(dispatchAction.set_username(login))
	dispatch(dispatchAction.set_password(password))
	dispatch(dispatchAction.set_token(rjson.token))
	// dispatch(dispatchAction.set_pseudo(rjson.pseudo))
	// dispatch(dispatchAction.set_points(rjson.points))
	// dispatch(dispatchAction.set_levelMax(rjson.levelMax))

	// Reset state
	this.setState({...this.state, loading: false, error: false, mdpInput: ''})

	// Go to the Home screen
	this.props.navigation.navigate('Home');

      // If the authentification failed
      } else {
	console.log('Authentification error: the server responded '+response.status)
      this.setState({...this.state, mdpInput: '', loading: false, error: true,
		     errorMsg: 'Les identifiants saisis sont invalides',
		    })
      }

    } catch (e) {
      console.log('Authentification error : '+e)
      this.setState({...this.state, mdpInput: '', loading: false, error: true,
		     errorMsg: 'La tentative de connexion a échouée. Veuillez réessayer',
		    })
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
	    errorMsg={this.state.errorMsg}
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
