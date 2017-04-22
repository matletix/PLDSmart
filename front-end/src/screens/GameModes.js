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
  
  onModePress = () => {
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
		    leftIcon={{name: item.icon, color: '#ffa000'}}
		    containerStyle={styles.listItem}
		    chevronColor='#ffa000'
         	    onPress = {() => this.onModePress()}
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
    backgroundColor: '#ffd600',
  },
  title: {
    fontSize: 25,
    color: '#f38f19',
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {
    borderColor: '#ffa000',
  },
  listItem: {
    backgroundColor: '#ffd54f',
    borderBottomColor: '#ffa000',
  },
});


export default GameModes;
