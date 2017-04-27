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


class CourseMapView extends Component {

  render() {
    const { polylineCoords, markers } = this.props
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map} >
	  {markers.map(marker => (
	    <MapView.Marker
	    coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
	      title={marker.name}
	    />
	  ))}

          <MapView.Polyline
          coordinates={polylineCoords}
          strokeWidth={4} />

        </MapView>
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
});

export default CourseMapView;
