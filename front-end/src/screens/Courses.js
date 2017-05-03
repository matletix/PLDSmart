import React, { Component } from 'react';
import { StyleSheet,
	 View,
	 ScrollView,
	 Text,
       } from 'react-native';
import { Button,
         List,
	 ListItem,
	 Card,
	 Divider,
       } from 'react-native-elements';
import { connect } from 'react-redux'
import { dispatchAction } from '../redux'

const mapStateToProps = (state) => ({
  courses: state.courses,
});

class Courses extends Component {

  static navigationOptions = ({navigation}) => ({
    title: "Parcours niveau "+navigation.state.params.level,
  })

  onPressSelect = (course) => {
    this.props.navigation.navigate('Course', {course})
  }

  render() {
    return (
	<ScrollView style={styles.container}>
	    <Text style={styles.title}>Choisissez un parcours</Text>
	{
	  this.props.courses.filter((course) => (course.level == this.props.navigation.state.params.level)).map((item, i) => (
		<Card
		key={i}
		title={item.theme}
		/* image={{uri:item.image}} */
		image={require('../img/logo.png')}
		containerStyle={styles.card}
		imageStyle={styles.image}
		>
		<Text style={styles.description}>{item.description}</Text>
	      <Divider style={styles.divider}/>
		<Text style={styles.distance}>Distance: {item.distance || 0} km</Text>
		<Text style={styles.duree}>Duree: {item.duration || 0}</Text>
	      <Divider style={styles.divider} />
	      <Button title='Sélectionner' raised buttonStyle={styles.button}
	    onPress={() => this.onPressSelect(item)}/>
		</Card>
	    ))
	}
	</ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1ABC9C',
  },
  title: {
    fontSize: 25,
    color: '#2966c0',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0D3A7D',
  },
  card: {

  },
  image: {
  },
  description: {

  },
  distance: {

  },
  duree: {

  },
  divider: {
    marginVertical: 10,
  },
});


export default connect(mapStateToProps)(Courses);
