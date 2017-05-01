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
  courses: state.courses,
  levelMax: state.levelMax,
  totalLevels: state.totalLevels,
  token: state.token,
})


class Levels extends Component {

  static navigationOptions = {
    title: 'Niveaux',
  }

  onLevelPress = (level) => {
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
		chevronColor='#ffa000'
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
    backgroundColor: '#ffd600',
  },
  title: {
    fontSize: 25,
    color: '#f38f19',
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    color: '#f38f19',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  listContainer: {
    borderColor: '#ffa000',
  },
  listItemUnlocked: {
    backgroundColor: '#ffd54f',
    borderBottomColor: '#ffa000',
  },
  listItemLocked: {
    backgroundColor: '#ffd54f',
    borderBottomColor: '#ffa000',
    opacity: 0.7,
  },
});


export default connect(mapStateToProps)(Levels);