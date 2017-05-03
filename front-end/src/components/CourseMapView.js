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
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import { dispatchAction } from '../redux'
var FadeInView = require('./FadeInView');
var config = require('../config');

const mapStateToProps = (state) => ({
  	token: state.token,
})

class CourseMapView extends Component {

	constructor(props){
		super(props);
		this.state = {
	  	    region: {
	  	      latitude: 45.761163,
	  	      longitude: 4.827347,
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
	const { polylineCoords, markers, duration, distance } = this.props
	// Getting aqi moyenne
  	  var aqi_moy = 0;

	  // Getting weather
	  var temp_moy = 0;
	  var pressure_moy = 0;
	  var humidity_moy = 0;
	  var wind_speed_moy = 0;

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
  	  }
	  var nb_marker = markers.length;

	  aqi_moy = aqi_moy / nb_marker;

	  temp_moy = temp_moy / nb_marker;
	  pressure_moy = pressure_moy / nb_marker;
	  humidity_moy = humidity_moy / nb_marker;
	  wind_speed_moy = wind_speed_moy / nb_marker;

	  this.setState({...this.state, aqi_moy: aqi_moy, temp_moy: temp_moy, pressure_moy: pressure_moy, humidity_moy: humidity_moy, wind_speed_moy: wind_speed_moy})
  	  

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
						/>
					))}

					<MapView.Polyline
						coordinates={polylineCoords}
						strokeWidth={4} />
				</MapView>

					<Button
						title= "Détails"
						onPress= {() => (this.setState({...this.state, show: !this.state.show}))}
					/>
		  		  	{this.state.show && <FadeInView>
		  			<View style={styles.content}>

							{ !this.state.showCourseInfo &&
								<Text>
									{this.state.selectedMarker.properties.qr_code}{'\n'}
								</Text>
							}
							{!this.state.showCourseInfo &&
								<Button title= "Scan QR" onPress= {()=> (this.onScanPress())} />
							}

							{this.state.showCourseInfo &&
								<Text>
									{this.props.course.theme}{'\n'}
									Durée: {duration}, Distance: {distance}{'\n'}
									Moyenne AQI: {this.state.aqi_moy}{'\n'}
									Température: {this.state.temp_moy} °C {'\n'}
									Pression de l''air: {this.state.pressure_moy} hPa{'\n'}
									Humidité: {this.state.humidity_moy} % {'\n'}
									Vitesse du vent: {this.state.wind_speed_moy} m/s {'\n'}
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
