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
  token: state.token,
})


class Courses extends Component {

  static navigationOptions = ({navigation}) => ({
    title: "Parcours niveau "+navigation.state.params.level,
  })
  
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
		image={require('../img/courseExample.png')}
		containerStyle={styles.card}
		imageStyle={styles.image}
		>
		<Text style={styles.description}>{item.story_course}</Text>
	      <Divider style={styles.divider}/>
		<Text style={styles.distance}>Distance: {item.distance} km</Text>
		<Text style={styles.duree}>Duree: {item.duration}</Text>
	      <Divider style={styles.divider} />
	      <Button title='Sélectionner' raised buttonStyle={styles.button}/>
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
    backgroundColor: '#ffd600',
  },
  title: {
    fontSize: 25,
    color: '#f38f19',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#f38f19',
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
