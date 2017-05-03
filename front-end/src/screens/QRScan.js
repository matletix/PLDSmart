'use strict';

import React, { Component } from 'react';

import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import { connect } from 'react-redux'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { dispatchAction } from '../redux'

var config = require('../config');

const mapStateToProps = (state) => ({
    courseValidation: state.courseValidation,
    levelValidation: state.levelValidation,
    courses: state.courses,
    centers_of_interest: state.centers_of_interest,
    levelMax: state.levelMax,
    token: state.token,
    pseudo: state.pseudo,

})

class QRScan extends Component {

    static navigationOptions = {
      title: 'Scan QR code',
    }


onSuccess = async (e) => {
      // TODO: verify that the uri read is the one comming after the last one read
      // TODO: Test if the geographic location of the user is next to the coi

      // TODO: update number of points


      // The COI the qrcode belongs to
      var coi = this.props.navigation.state.params.coi;

      var qrcontent = JSON.stringify({"id_course": coi.properties.id_course, "level": coi.properties.level, "id_coi": coi.properties.id_coi});


      // test that the qrCode is good
      if (e.data === qrcontent){
          // increment the number of cois validated for this course
          // {course: 1, level: 1}
          this.props.dispatch(dispatchAction.up_nb_cois_course(coi.properties.id_course, coi.properties.level));
          // Test if the coi is the last one in the course
            // Get the course nb of cois
            const course = this.props.courseValidation.find(function (course) {
                return course.course === coi.properties.id_course && course.level === coi.properties.level;
            });
            console.log(' -------------- COI ----------------')
            console.log(course)
            // get the max number of cois in the course
            const courses = this.props.courses.filter(function(course){
                return course.level === coi.properties.level;
            });
            const nb_courses = courses.length;
            console.log('------------- Courses : nb_courses --------------')
            console.log(courses + ' : ' + nb_courses)
            const cois = this.props.centers_of_interest.filter(function(point){
                return point.properties.id_course === coi.properties.id_course && point.properties.level === coi.properties.level;
            })
            const nb_cois = cois.length;

            
            console.log('------------------ cois : nb_cois -----------------------')
            console.log(cois + ' : ' + nb_cois)

            console.log({token: this.props.token, id_course: course.course , level: course.level , nb_cois: nb_cois, pseudo: this.props.pseudo});


            if (course.nb_cois === nb_cois){
                console.log('------------------- course completed -----------------------------');
                //TODO: Course completed
                // TODO: Update in the database
                try {

                  let response = await fetch('http://'+ config.api_ip +'/api/courseCompleted',
                   {
                      method: 'POST',
                      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                      body: JSON.stringify({
                          token: this.props.token,
                          id_course: course.course,
                          level: course.level,
                          nb_cois: nb_cois,
                          pseudo: this.props.pseudo
                      })
                  });
                } catch (err){
                    console.log('THERE IS AN ERROR', err)
                }
                // increment the number of validated courses in the level
                this.props.dispatch(dispatchAction.up_nb_courses_level(coi.properties.level));
		    // Test if the level is completed: the number of courses = total
                if (this.props.levelValidation[coi.properties.level] === nb_courses){
                    console.log('----------------- level completed --------------------');

                    // TODO: Level completed
                    try {

                      let response = await fetch('http://'+ config.api_ip +'/api/updateUserInfo',
                       {
                          method: 'POST',
                          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                          body: JSON.stringify({
                            	token: this.props.token,
                            	who: {
                            		pseudo: this.props.pseudo
                            	},
                            	what: {
                            	    level: this.props.levelMax + 1
                            	}
                            })
                      });
                    } catch (err){
                        console.log('THERE IS AN ERROR', err)
                    }
                    // Deblock the next level
                    this.props.dispatch(dispatchAction.set_levelMax(this.props.levelMax + 1));

                    // TODO: Update the level in the database

                }
            }

        if (course.nb_cois === nb_cois) { // course finished
	    Alert.alert("Parcours terminé",
			"Félicitations ! Vous avez terminé ce parcours.",
			[
			  {text: "OK", onPress: () => this.props.navigation.navigate("Home")}
			],
			    { cancelable: false }
		    )
	} else if (this.props.levelValidation[coi.properties.level] === nb_courses) { // level finished
	    Alert.alert("Nouveau niveau débloqué",
		    "Wouhou ! Un nouveau niveau a été débloqué ! Allez vite voir vos nouveaux parcours !",
		    [
		      {text: "OK", onPress: () => this.props.navigation.navigate("Levels")}
		    ],
			{ cancelable: false }
		   )

	} else { // QR Code OK
          if (coi.properties.siteweb)
	  {
            Linking.openURL(coi.properties.siteweb).catch(err => console.error('An error occured', err))
	    this.props.navigation.goBack()
	  }
            // close the QR screen
	    Alert.alert("Point d'intérêt validé",
		    "Point d'intérêt validé ! Au suivant !",
		    [
		      {text: "OK", onPress: () => this.props.navigation.goBack()}
		    ],
			{ cancelable: false }
		   )
	}

      } else {
          console.error('Pas le bon COI ! ', e.data );
      }

  }

  render() {
    return (
      <QRCodeScanner
          onRead= {(e) => this.onSuccess(e)}
    />
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7BF155',
    borderRadius: 3,
    padding: 32,
    width: 100,
    marginTop: 64,
    marginBottom: 64,
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 21,
    color: '#2966C0',
  },

  buttonTouchable: {
    padding: 16,
  },
});
export default connect(mapStateToProps)(QRScan);
