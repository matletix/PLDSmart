import React, { Component } from 'react';
import { StyleSheet,
	 View,
	 Text,
       } from 'react-native';
import { List,
	 ListItem
       } from 'react-native-elements';

class Levels extends Component {
  static navigationOptions = {
    title: 'Niveaux',
  }

  constructor(props) {
    super(props);
    this.state = {currentLevel: 2, listItems: [
      {
	title: 'Niveau 1',
      },
      {
	title: 'Niveau 2',
      },
      {
	title: 'Niveau 3',
      },
      {
	title: 'Niveau 4',
      },
      {
	title: 'Niveau 5',
      },
    ]}
  }
  
  onLevelPress = () => {
    this.props.navigation.navigate('Courses');
  };
  
  render() {
    return (
	<View style={styles.container}>
	<Text style={styles.title}>Choisissez un niveau de difficulté</Text>
	<Text style={styles.description}>Les niveaux supérieurs sont débloqués au fur et à mesure de la progression dans les niveaux précédents.</Text>
	<List containerStyle={styles.listContainer}>
	{
	  this.state.listItems.map((item, i) => {
	    let locked = i+1 > this.state.currentLevel ? true : false;
	    return (
		<ListItem
		key={i}
		title={item.title}
	        containerStyle={locked ? styles.listItemLocked : styles.listItemUnlocked}
		chevronColor='#ffa000'
		hideChevron = {locked}
                onPress = {locked ? null : () => this.onLevelPress()}
		/>
	    )})
	}
      </List>
	</View>
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


export default Levels;
