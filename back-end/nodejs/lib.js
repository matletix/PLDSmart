var rp = require('request-promise');

module.exports.template =  {
    "id": 0,
    "id_sitra1": "",
    "type": "",
    "type_detail": "",
    "nom": "",
    "adresse": "",
    "codepostal": 0,
    "commune": "",
    "telephone": 0,
    "email": "",
    "siteweb": "",
    "ouverture": "",
    "tarifsenclair": "",
    "tarifsmin": 0,
    "tarifsmax": 0,
    "date_creation": 0,
    "last_update": 0,
    "last_update_fme": 0,
    "coordinates": {
        "geojson": {}
    }
};

module.exports.formatgl = function (glFeature, _params) {
    for(let property in _params){
        if(property !== "coordinates"){
            _params[property] = glFeature["properties"][property];
        } else {
            _params[property]["geojson"] = glFeature["geometry"];
        }
    }
    console.log('GLFeature to params : ', _params);
    return _params;
};

module.exports.format = function (obj, _params) {

    for(let property in _params){
        if(property !== "coordinates"){
            _params[property] = obj[property];
        } else {
            _params[property]["geojson"] = obj["geometry"];
        }
    }
    console.log('obj to params : ', _params);
    return _params;
};

module.exports.template_insert_coi = {
    "id_course": "",
    "level": "",
    "id_coi": "",
    "qr_code": "",
    "description": "",
    "position_in_course": ""
};

module.exports.template_insert_course = {
    "id_course": "",
    "level": "",
    "theme": "",
    "description": ""
};

// BreezoMeter API request
// Takes (latitude, longitude)
// Key: d49278db0bb144e0bd24289c2d35ca5b
var AQI_api_key = 'd49278db0bb144e0bd24289c2d35ca5b';
var AQI_api_uri = 'https://api.breezometer.com/baqi/';
var AQI_api_qs = {
  'fields': 'breezometer_aqi,breezometer_color,datetime',
  'key': AQI_api_key
};

module.exports.airQualityRequest = function(latitude, longitude, resFct, errFct){
  AQI_api_qs['lat'] = latitude;
  AQI_api_qs['lon'] = longitude;

  var options = {
      uri: AQI_api_uri,
      qs: AQI_api_qs,
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
  };
  rp(options)
      .then(resFct)
      .catch(errFct);
};

// OpenWeatherMap API request
var w_api_uri = 'http://api.openweathermap.org/data/2.5/weather';
var w_api_key = '45aa07fcda8f6d22d2744d331313e0b8';
var w_api_qs = {
    'appid': w_api_key,
    'units': 'metric'
};

module.exports.weatherRequest = function(latitude, longitude, resFct, errFct){
  w_api_qs['lat'] = latitude;
  w_api_qs['lon'] = longitude;

  var options = {
      uri: w_api_uri,
      qs: w_api_qs,
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
  };
  rp(options)
      .then(resFct)
      .catch(errFct);
};

// MAPQUEST API request
var elevation_api_uri = 'http://open.mapquestapi.com/elevation/v1/profile';
var elevation_api_key = '6htTk7GGcFzMAu08Lg7T5nqFKwJNLvo9';
var elevation_api_qs = {
    'key': elevation_api_key,
    'shapeFormat': 'raw'
};

// The request can contain many points at a time
module.exports.elevationRequest = function(latitude, longitude, resFct, errFct){
  elevation_api_qs['latLngCollection'] = '' + latitude + ',' + longitude + '';
  console.log('Request elevation : ', elevation_api_qs);
  var options = {
      uri: elevation_api_uri,
      qs: elevation_api_qs,
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
  };
  rp(options)
      .then(resFct)
      .catch(errFct);
};
