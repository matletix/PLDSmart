import React, { Component } from 'react';
import { StyleSheet,
	 View,
	 ScrollView,
	 Text,
	 TouchableHighlight,
	 Image,
       } from 'react-native';
import { Button,
         List,
	 ListItem,
	 Card,
	 Divider,
       } from 'react-native-elements';
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import { dispatchAction } from '../redux'
var FadeInView = require('./FadeInView');
var config = require('../config');

var btnup = require('../img/up.png');
var btndown = require('../img/down.png')

// PINS IMAGES
var pinA = require('../img/pinblue.png');
var pinB = require('../img/nextpin.png');
var pinC = require('../img/castle.png');
var pinD = require('../img/flag.png');

const mapStateToProps = (state) => ({
  	token: state.token,
	nb_cois_course_selected: state.nb_cois_course_selected,
	nb_courses_level_selected: state.nb_courses_level_selected,
	courseValidation: state.courseValidation,
	nb_cois_validated: state.nb_cois_validated,
})

class CourseMapView extends Component {

	constructor(props){
		super(props);
		this.state = {
	  	    region: {
	  	      latitude: this.props.markers[0].geometry.coordinates[1],
	  	      longitude: this.props.markers[0].geometry.coordinates[0],
	  	      latitudeDelta: 0.0022,
	  	      longitudeDelta: 0.0041,
	  	    },
			show: true,
			showCourseInfo: true,

			aqi_moy: 0,
			temp_moy: 0,
	  	   	pressure_moy: 0,
	  	  	humidity_moy: 0,
	  	   	wind_speed_moy: 0,
			denivele: 0,
			mapRegion: null,
			lastLat: null,
			lastLong: null,

  	  	};
	}

	componentDidMount() {
	    this.watchID = navigator.geolocation.watchPosition((position) => {
	    // Create the object to update this.state.mapRegion through the onRegionChange function
	    let region = {
		latitude:       position.coords.latitude,
		longitude:      position.coords.longitude,
		latitudeDelta:  0.00922*1.5,
		longitudeDelta: 0.00421*1.5
	    }
	    this.onRegionChange(region, region.latitude, region.longitude);
	    });
	}

	componentWillUnmount() {
	    navigator.geolocation.clearWatch(this.watchID);
	}

	onRegionChange(region, lastLat, lastLong) {
	  this.setState({...this.state,
	    mapRegion: region,
	    // If there are no new values set the current ones
	    lastLat: lastLat || this.state.lastLat,
	    lastLong: lastLong || this.state.lastLong
	    });
	}

	onMarkerPress(marker){
		this.setState((marker) => (
			{...this.state, show: !state.show, selectedMarker: marker}
		))
	}

	onScanPress = () => {
	  this.props.screenObj.props.navigation.navigate('QRScan', {coi: this.state.selectedMarker});
	};

	async componentWillMount(){

	const { course, polylineCoords, markers, duration, distance } = this.props
	// put to the state the number of cois validated
	var validatedCOIs = this.props.courseValidation.find(function(co){
		return co.id_course === course.id_course && co.level === course.level;
	})
	var nb = 0;
	if(validatedCOIs) nb = validatedCOIs.nb_cois;
	this.props.dispatch(dispatchAction.set_nb_cois_validated(nb));


	// Getting aqi moyenne
  	  var aqi_moy = 0;

	  // Getting weather
	  var temp_moy = 0;
	  var pressure_moy = 0;
	  var humidity_moy = 0;
	  var wind_speed_moy = 0;

	  // Getting elavation
	  var elevation = [];

  	  for (let marker of markers){
		  // Getting the AQI
		  try {

  			let response = await fetch('http://'+ config.api_ip +'/api/getAirQuality',
  			 {
  				method: 'POST',
  				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
  				body: JSON.stringify({
  					token: this.props.token,
  					lat: marker.geometry.coordinates[1],
  					lon: marker.geometry.coordinates[0],
  				})
  			});
  			const rjson = await response.json()
  			console.log('-------- ' + JSON.stringify(rjson.properties) + ' ---------------')
  			marker.aqi_color = rjson.properties.color;
			marker.aqi = rjson.properties.aqi;
  			aqi_moy += rjson.properties.aqi;

  			} catch (err) {
  				  console.log('THERE IS AN ERROR', err)
  			  }

		  // Get the weather
		  try {

  			let response = await fetch('http://'+ config.api_ip +'/api/getWeather',
  			 {
  				method: 'POST',
  				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
  				body: JSON.stringify({
  					token: this.props.token,
  					lat: marker.geometry.coordinates[1],
  					lon: marker.geometry.coordinates[0],
  				})
  			});
  			const rjson = await response.json()
  			console.log('-------- ' + JSON.stringify(rjson.properties) + ' ---------------')
  			temp_moy += rjson.properties.main.temp;
			pressure_moy += rjson.properties.main.pressure;
			humidity_moy += rjson.properties.main.humidity;
			wind_speed_moy += rjson.properties.wind.speed;

  			} catch (err) {
  				  console.log('THERE IS AN ERROR', err)
  			  }

			// Get elevation
			try {

    			let response = await fetch('http://'+ config.api_ip +'/api/getElevation',
    			 {
    				method: 'POST',
    				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    				body: JSON.stringify({
    					token: this.props.token,
    					lat: marker.geometry.coordinates[1],
    					lon: marker.geometry.coordinates[0],
    				})
    			});
    			const rjson = await response.json()
    			console.log('-------- ' + JSON.stringify(rjson.properties) + ' ---------------')
				marker.elevation = rjson.properties.elevation;
    			elevation.push(rjson.properties.elevation);

    			} catch (err) {
    				  console.log('THERE IS AN ERROR', err)
    			  }
  	  }
	  var nb_marker = markers.length;

	  aqi_moy = aqi_moy / nb_marker;

	  temp_moy = temp_moy / nb_marker;
	  pressure_moy = pressure_moy / nb_marker;
	  humidity_moy = humidity_moy / nb_marker;
	  wind_speed_moy = wind_speed_moy / nb_marker;

	  var denivele = Math.max.apply(null, elevation) - Math.min.apply(null, elevation);
	  this.setState({
		  ...this.state,
		  aqi_moy: aqi_moy,
		  temp_moy: temp_moy,
		  pressure_moy: pressure_moy,
		  humidity_moy: humidity_moy,
		  wind_speed_moy: wind_speed_moy,
		  denivele: denivele
	  })

	}


	 render() {
	  const { polylineCoords, markers, duration, distance } = this.props
		return (

			<View style={styles.container}>
				<MapView
					style={styles.map}
					region={this.state.region}
					onPress= {map => (this.setState({ ...this.state, showCourseInfo: true } ))}
					onRegionChange={region => (this.setState({ ...this.state, region } ))}
					showsUserLocation={true}
					followUserLocation={true}
					>
					{markers.map(marker => (
						<MapView.Marker
							coordinate={{longitude: marker.geometry.coordinates[0], latitude: marker.geometry.coordinates[1]}}
							title={marker.properties.nom}
							onPress={ coord => {
								this.setState({...this.state, selectedMarker: marker, showCourseInfo: false})
							}}
							image={
								(this.props.nb_cois_validated+1 == marker.properties.position_in_course ) && pinB
								|| (marker.properties.position_in_course == 1) && pinD
								|| (this.props.nb_cois_course_selected == marker.properties.position_in_course ) && pinC
								|| pinA }
						/>
					))}

					<MapView.Polyline
						coordinates={polylineCoords}
						strokeWidth={4} />
				</MapView>
					<TouchableHighlight
						onPress={() => (this.setState({...this.state, show: !this.state.show}))}
						>
						<Image style={styles.button} source={!this.state.show && btnup ||btndown} />
					</TouchableHighlight>

		  		  	{this.state.show && <FadeInView>
		  			<View style={styles.content}>


							{ !this.state.showCourseInfo &&
								<Text
									style={{marginTop: 5, fontStyle: 'italic', textAlign: 'center'}}
								>
									<Text style={{fontWeight: 'bold'}}> Devinette {'\n'}</Text>
									{'"'}{this.state.selectedMarker.properties.qr_code}{'"'}{'\n'}
								</Text>
							}
							{ !this.state.showCourseInfo &&
								<Text style={{textAlign: 'center'}}>
									{this.state.selectedMarker.properties.description}{'\n'}
									 AU {this.state.selectedMarker.properties.adresse},
									{this.state.selectedMarker.properties.codepostal},
									{this.state.selectedMarker.properties.commune}{'\n'}
									<Text style={{fontWeight: 'bold'}}> {this.state.selectedMarker.properties.siteweb}{'\n'} </Text>
									<Text style={{fontWeight: 'bold'}}>
										À {this.state.selectedMarker.elevation} mètres d''altitude{'\n'}
										<Text
											style={{color: this.state.selectedMarker.aqi_color}}
										>AQI à {this.state.selectedMarker.aqi}%{'\n'}</Text>
									</Text>
								</Text>
							}

							{!this.state.showCourseInfo && (this.props.nb_cois_validated+1 == this.state.selectedMarker.properties.position_in_course ) &&
								<Button style={{backgroundColor: '#1abc9c'}} title= "Scan QR" onPress= {()=> (this.onScanPress())} />
							}

							{this.state.showCourseInfo &&
								<Text
									style={{fontWeight: 'bold', marginTop: 5}}
								>
									Parcours {this.props.course.theme}{'\n'}
								</Text>
							}{this.state.showCourseInfo &&
								<Text style={{fontStyle: 'italic', marginTop: 5}}>
									<Text style={{fontWeight: 'bold'}}> Durée:</Text> {duration},<Text style={{fontWeight: 'bold'}}> Distance: </Text>{distance}{'\n'}
									<Text style={{fontWeight: 'bold'}}> Moyenne AQI: </Text> {Number((this.state.aqi_moy).toFixed(1))}%{'\n'}
									<Text style={{fontWeight: 'bold'}}> Température: </Text> {Number((this.state.temp_moy).toFixed(1))} °C {'\n'}
									<Text style={{fontWeight: 'bold'}}> Humidité: </Text> {Number((this.state.humidity_moy).toFixed(1))} % {'\n'}
									<Text style={{fontWeight: 'bold'}}> Vitesse du vent: </Text> {Number((this.state.wind_speed_moy).toFixed(1))} m/s {'\n'}
									<Text style={{fontWeight: 'bold'}}> Dénivelé: </Text> {this.state.denivele} m {'\n'}

								</Text>
							}

					</View>
		  		  	</FadeInView>}
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
		backgroundColor: '#ecf0f1',
		padding: 20,
		left: 0,
		right: 0,
		alignItems: 'center',
	},

});

export default connect(mapStateToProps)(CourseMapView);
