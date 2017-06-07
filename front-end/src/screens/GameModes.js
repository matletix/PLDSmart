import React, { Component } from 'react';
import { StyleSheet,
	 View,
	 Text,
       } from 'react-native';
import { List,
	 ListItem
       } from 'react-native-elements';


class GameModes extends Component {
  static navigationOptions = {
    title: 'Mode de jeu',
  }

  constructor(props) {
    super(props);
    this.state = {listItems: [
      {
	title: 'Mode Détente',
	icon: 'weekend',
      },
      {
	title: 'Mode Compétition',
	icon: 'directions-run',
      },
    ]}
  }
  
  onModePress = (mode) => {
    this.props.navigation.navigate('Levels');
  };

  render() {
    return (
	<View style={styles.container}>
	    <Text style={styles.title}>Choisissez un mode de jeu</Text>
	    <List containerStyle={styles.listContainer}>
		{
		this.state.listItems.map((item, i) => (
		    <ListItem
		    key={i}
		    title={item.title}
		    leftIcon={{name: item.icon, color: '#2c3e50'}}
		    containerStyle={styles.listItem}
		    chevronColor='#2c3e50'
         	    onPress = {() => this.onModePress(item.title)}
		    />
		))
		}
	    </List>
	</View>
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
    color: '#2966C0',
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {
    borderColor: '#2c3e50',
  },
  listItem: {
    backgroundColor: '#5C91DF',
    borderBottomColor: '#2c3e50',
  },
});


export default GameModes;
