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
import MapView from 'react-native-maps'
import RNPolyline  from 'rn-maps-polyline'
import CourseMapView from '../components/CourseMapView'

const mapStateToProps = (state) => ({
  api_key: state.api_key,
})


class Course extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: [],
      markers: [],
      course: {
	level: 1,
	id_course: 1,
	theme: 'La Tête d\'Or',
	image: 'link to the preview of the course',
	story_course: 'Découvrez le parc de la Tête d\'Or, passez devant le Musée d\'Art Contemporain et traversez le Zoo de Lyon',
	duration: '1h14',
	distance: 6.0,
	points: [
	    {
	    latitude: 45.761163,
	    longitude: 4.827347,
	    name: "Cathédrale Saint-Jean-Baptiste",
	      wikilink: "link to a short summary of the monument/museum/...",
	      qrcode: "link to an image of the qrcode to scan",
	    },
	    {
	    latitude: 45.761286,
	    longitude: 4.826620,
	    name: "Cathédrale St-Jean Trésor",
	      wikilink: "link to a short summary of the monument/museum/...",
	      qrcode: "link to an image of the qrcode to scan",
	    },
	    {
	    latitude: 45.761871,
	    longitude: 4.827364,
	    name: "Musée Miniature et Cinéma",
	      wikilink: "link to a short summary of the monument/museum/...",
	      qrcode: "link to an image of the qrcode to scan",
	    },
	    {
	    latitude: 45.764014,
	    longitude: 4.827557,
	    name: "Musées Gardagne",
	      wikilink: "link to a short summary of the monument/museum/...",
	      qrcode: "link to an image of the qrcode to scan",
	    },
	    {
	    latitude: 45.764455,
	    longitude: 4.828188,
	    name: "Temple du Change",
	      wikilink: "link to a short summary of the monument/museum/...",
	      qrcode: "link to an image of the qrcode to scan",
	    },
	    {
	    latitude: 45.761902,
	    longitude: 4.828290,
	    name: "Cours d'Appel de Lyon",
	      wikilink: "link to a short summary of the monument/museum/...",
	      qrcode: "link to an image of the qrcode to scan",
	    },
	    {
	    latitude: 45.760924,
	    longitude: 4.828405,
	    name: "Vis'Art Galerie",
	      wikilink: "link to a short summary of the monument/museum/...",
	      qrcode: "link to an image of the qrcode to scan",
	    },
	    {
	    latitude: 45.761163,
	    longitude: 4.827347,
	    name: "Cathédrale Saint-Jean-Baptiste",
	      wikilink: "link to a short summary of the monument/museum/...",
	      qrcode: "link to an image of the qrcode to scan",
	    },
	]
    }
}
  }

  static navigationOptions = ({navigation}) => ({
    title: "Parcours "+navigation.state.params.course.theme,
  })

  componentWillMount() {
    // Generate the list of markers
    let removeDuplicate = (array) => [...new Set(array)]
    const newArray = removeDuplicate(this.state.course.points)
    for (i=0; i < newArray.length; i++) {
      // add a unique key attribute to each marker
      newArray[i].key = i
    }
    console.log("List of markers:"+JSON.stringify(newArray))
    this.setState({...this.state, markers: newArray})

    // Generate the coords to link with polylines
    const mode = 'walking'
    const points = this.state.course.points
    const nbPoints = points.length
    console.log("NbPoints:"+nbPoints)
    const origin = ''+points[0].latitude+'%2C'+points[0].longitude
    const destination =''+points[nbPoints-1].latitude+'%2C'+points[nbPoints-1].longitude
    const APIKEY = this.props.api_key
    let waypoints = []
    for (i=1; i < (nbPoints - 1); i++) {
      waypoints.push({latitude: points[i].latitude,
		      longitude: points[i].longitude
		     })
    }
    waypoints = RNPolyline.encode(waypoints)
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=enc:${waypoints}:&key=${APIKEY}&mode=${mode}`;
    console.log("URL: "+url)

    fetch(url)
  	.then(response => response.json())
  	.then(responseJson => {
	  if (responseJson.status == "OK") {
	    console.log(JSON.stringify(responseJson))
	    let newCoords = RNPolyline.decode(responseJson.routes[0].overview_polyline.points)
	    console.log(JSON.stringify(newCoords))
	    this.setState({...this.state, coords: newCoords})
	  }
  	}).catch(e => {console.warn(e)});
  }
  
  render() {
    return (
	<CourseMapView polylineCoords={this.state.coords}
	               markers={this.state.markers} />
    )
  }
}

export default connect(mapStateToProps)(Course);
