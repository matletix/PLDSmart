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
  centers_of_interest: state.centers_of_interest,

});

class Courses extends Component {

  static navigationOptions = ({navigation}) => ({
    title: "Parcours niveau "+navigation.state.params.level,
  })

	onPressSelect = (course) => {
		// Update in the store the number of cois in the selected course
		const cois = this.props.centers_of_interest.filter(function(point){
			return point.properties.id_course === course.id_course && point.properties.level === course.level;
		})
		const nb_cois = cois.length;
		console.log('-------- IN COURSES ----------------')
		console.log(nb_cois);
		this.props.dispatch(dispatchAction.set_nb_cois_course_selected(nb_cois));
		// Go to the course screen
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
