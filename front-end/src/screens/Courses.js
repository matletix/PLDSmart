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


class Courses extends Component {
  static navigationOptions = {
    title: 'Parcours',
  }
  constructor(props) {
    super(props);
    this.state = {listItems: [
      {
	title: 'La Tête d\'Or',
	image: 'localhost..',
	description: 'Découvrez le parc de la Tête d\'Or, passez devant le Musée d\'Art Contemporain et traversez le Zoo de Lyon',
	duree: '1h14',
	distance: 6.0,
      },
      {
	title: 'La Croix Rousse',
	image: 'localhost..',
	description: 'Déplacez vous dans les hauteurs du quartier de la Croix Rousse, passez par le Parc de la Cerisaie',
	duree: '1h11',
	distance: 5.6,
      },
      {
	title: 'Fourvière',
	image: 'localhost..',
	description: 'Admirez la Cathédrale Saint-Jean-Baptiste, passez par les Théâtres Romains et devant le Musée d\'arts religieux de Fourvière',
	duree: '1h25',
	distance: 5.8, 
      }
    ]}
  }
  
  render() {
    return (
	<ScrollView style={styles.container}>
	    <Text style={styles.title}>Choisissez un parcours</Text>
	{
	  this.state.listItems.map((item, i) => (
		<Card
		key={i}
		title={item.title}
		/* image={{uri:item.image}} */
		image={require('../img/courseExample.png')}
		containerStyle={styles.card}
		imageStyle={styles.image}
		>
		<Text style={styles.description}>{item.description}</Text>
	      <Divider style={styles.divider}/>
		<Text style={styles.distance}>Distance: {item.distance} km</Text>
		<Text style={styles.duree}>Duree: {item.duree}</Text>
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


export default Courses;
