import React, { Component } from 'react';
import { StyleSheet,
	 View,
	 ScrollView,
	 Text,
       } from 'react-native';
import { List,
	 ListItem
       } from 'react-native-elements';
import { connect } from 'react-redux'
import { dispatchAction } from '../redux'


const mapStateToProps = (state) => ({
  levelMax: state.levelMax,
  totalLevels: state.totalLevels,
  levelValidation: state.levelValidation,
  courses: state.courses,

})


class Levels extends Component {

  static navigationOptions = {
    title: 'Niveaux',
  }

  onLevelPress = (level) => {
	  // Update in the store the number of courses in the seleced level
	  const courses = this.props.courses.filter(function(course){
		  return course.level === level;
	  });
	  const nb_courses = courses.length;
	  this.props.dispatch(dispatchAction.set_nb_courses_level_selected(nb_courses));
	  console.log('------------ Nombre de courses in Levels ----------')
	  console.log(nb_courses);
	  this.props.navigation.navigate('Courses', {level});
  };

  render() {
    let listLevels = []
    for (level=1; level<=this.props.totalLevels; level++)
    {
		listLevels = [...listLevels, level]
    }
    return (
	<ScrollView style={styles.container}>
	<Text style={styles.title}>Choisissez un niveau de difficulté</Text>
	<Text style={styles.description}>Les niveaux supérieurs sont débloqués au fur et à mesure de la progression dans les niveaux précédents.</Text>
	<List containerStyle={styles.listContainer}>
	{
	  listLevels.map((item, i) => {
	    let level = i+1
	    let locked = level > this.props.levelMax ? true : false;
	    return (
		<ListItem
		key={i}
	        title={"Niveau "+level}
	        containerStyle={locked ? styles.listItemLocked : styles.listItemUnlocked}
		chevronColor='#2966c0'
		hideChevron = {locked}
                onPress = {locked ? null : () => this.onLevelPress(level)}
		/>
	    )})
	}
	</List>
	</ScrollView>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1abc9c',
  },
  title: {
    fontSize: 25,
    color: '#2966c0',
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    color: '#2966c0',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  listContainer: {
    borderColor: '#2966c0',
  },
  listItemUnlocked: {
    backgroundColor: '#5C91DF',
    borderBottomColor: '#22313F',
  },
  listItemLocked: {
    backgroundColor: '#7FA6DF',
    borderBottomColor: '#22313F',
    opacity: 0.7,
  },
});


export default connect(mapStateToProps)(Levels);
