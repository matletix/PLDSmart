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
	centers_of_interest: state.centers_of_interest,
})


class Course extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: [],
      markers: [],
      duration: 0,
      distance: 0,
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: "Parcours "+navigation.state.params.course.theme,
  })

  componentWillMount() {
	  const {params} = this.props.navigation.state;
    // Generate the list of markers
    let removeDuplicate = (array) => [...new Set(array)]
	var points = this.props.centers_of_interest;
	points = points.filter(function(point){
		return point.properties.id_course === params.course.id_course && point.properties.level === params.course.level
	})
    const newArray = removeDuplicate(points)
    for (i=0; i < newArray.length; i++) {
      // add a unique key attribute to each marker
      newArray[i].key = i
    }
    console.log("List of markers:"+JSON.stringify(newArray))
    this.setState({...this.state, markers: newArray})

    // Generate the coords to link with polylines
    const mode = 'walking'
	// Filter the points that belong to the course
	points  = newArray;
	const nbPoints = points.length;
    console.log("NbPoints:"+nbPoints)

    const origin = ''+points[0]['geometry']['coordinates'][1]+'%2C'+points[0]['geometry']['coordinates'][0]
    const destination =''+points[nbPoints-1]['geometry']['coordinates'][1]+'%2C'+points[nbPoints-1]['geometry']['coordinates'][0]
    const APIKEY = this.props.api_key
    let waypoints = []
    for (i=1; i < (nbPoints - 1); i++) {
      waypoints.push({latitude: points[i]['geometry']['coordinates'][1],
		      longitude: points[i]['geometry']['coordinates'][0]
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
	    let distance = responseJson.routes[0].legs[0].distance.text
	    let duration = responseJson.routes[0].legs[0].duration.text
	    this.setState({...this.state, coords: newCoords, duration: duration, distance: distance})
	  }
  	}).catch(e => {console.warn(e)});
  }


  render() {
    return (

		<View style={styles.container}>
			<CourseMapView
				polylineCoords={this.state.coords}
				markers={this.state.markers}
				course= {this.props.navigation.state.params.course}
				screenObj= {this}
				distance= {this.state.distance}
				duration= {this.state.duration}
			/>

        </View>



    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: 'deepskyblue',
    borderWidth: 1,
    borderColor: 'dodgerblue',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default connect(mapStateToProps)(Course);
