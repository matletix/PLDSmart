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
    
  onLoginPress = async (login, password) => {
      console.log('coucou'+password)
    this.setState({...this.state, loading: true})
    let data = new FormData();
    try {
      const response = await fetch('http://localhost:8080/authentification', {
        method: "POST",
	headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	},
        body: JSON.stringify({pseudo: login, mdp: password})
      })
      const posts = await response.json()
      this.setState({...this.state, loading:false, password: ''})
      this.props.navigation.navigate('Home');
    } catch (e) {
      this.setState({...this.state, password: '', loading: false, error: true})
    }
  };

  onSigninPress = () => {
    this.props.navigation.navigate('Signin');
  };


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
	    <TextInput
		style={styles.input}
		placeholder="Email"
		onChangeText={(text) => this.setState({...this.state, loginInput: text})}
		value={this.state.loginInput}
	    />
	    <TextInput
		style={styles.input}
		placeholder="Mot de passe"
		secureTextEntry={true}
		onChangeText={(text) => this.setState({...this.state, mdpInput: text})}
		value={this.state.mdpInput}
	    />
		<View style={styles.buttonContainer}>
		    <Button
      large
			buttonStyle={styles.button}
			title="Se connecter"
			onPress={() => this.onLoginPress(this.state.loginInput, this.state.mdpInput)} />
		    <Button
			buttonStyle={styles.button}
			title="S'enregistrer"
			onPress={() => this.onSigninPress()} />
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


export default connect(mapStateToProps)(Login);
