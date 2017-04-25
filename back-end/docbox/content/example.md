## Identification / inscription

Cette partie de l'API est pour l'identification / inscription des utilisateurs.


### Authentification

Two responses are possible. If it succeeds, it send back a token (and 200 as response code), if it fails, it sends back (401).

```endpoint
POST http://localhost:8080/authentification
```

#### Example request

```curl
curl -X POST --data {"pseudo":"toto", "mdp":"mdp"} https://localhost:8080/authentification
```


#### Example request body

```json
{
  "pseudo":"tata",
   "mdp":"mdp"
}
```

Property | Description
---|---
`pseudo` |  the pseudo
`mdp` | the password

#### Example response

```json
{
  "pseudo": "tata",
  "age": 25,
  "poids": 50,
  "sexe": "F",
  "email": "tata@insa-lyon.fr",
  "level": 1,
  "points": 20,
  "token": "token value"
}
```

### Update user information

This allows to update users information.

Property | Description/Sub-properties
---|---
`who`| specify the users you want to update their information
`what`| specify the value of the attributes to be updated

The properties of `who` and `what` can be one of this list : `pseudo`, `age`, `poids`, `sexe`, `email`, `level`, `mdp`, `points`


Sends back status code 200 if everything is OK, or status code 500 if anything goes wrong on the server.

```endpoint
POST http://localhost:8080/api/updateUserInfo
```

#### Example request

```curl
curl -X POST --data { "token": "token value", "who": { "pseudo": "toto"	}, "what": { "level": "3", "points": "50" } } https://localhost:8080/api/updateUserInfo
```


#### Example request body

```json
{
	"token": "token value",
	"who": {
		"pseudo": "toto"
	},
	"what": {
	    "level": "3",
	    "points": "50"
	}
}
```

#### Example response

```json

```

## Centers of interest

### Add one Grand Lyon geoJson feature
With this endpoint, you can add to the database one single geoJson Feature, taken from the Grand Lyon API geoJson response. Sends back status code 200 in case everything is OK, or status code 500 if an error occurs on the server.

```endpoint
POST http://localhost:8080/api/grandLyonDataAddOneFeature
```

#### Example request

```curl
curl -X POST --data {"token": "token value", "type":"Feature", "properties":{ "id":"92765", "id_sitra1":"sitraPCU653938", "type":"PATRIMOINE_CULTUREL", "type_detail":"Détails", "nom":"Nom du centre d'intérêt", "adresse":"adresse du centre d'intérêt", "codepostal":"69660", "commune":"Nom de la commune", "telephone":"0470220212", "fax":"0480220212", "telephonefax":"0480220219", "email":"email@email.com", "siteweb":"http:\/\/www.site.fr", "facebook":"", "classement":"", "ouverture":"", "tarifsenclair":"entre 5 et 15 euros", "tarifsmin":"5", "tarifsmax":"15", "producteur":"Lyon Tourisme et Congrès", "gid":"284", "date_creation":"2011-03-11 15:05:18", "last_update":"2016-04-20 06:22:11", "last_update_fme":"2017-03-16 00:15:34" }, "geometry":{ "type":"Point", "coordinates":[ 4.834414, 45.82862 ] } } https://localhost:8080/api/grandLyonDataAddOneFeature
```


#### Example request body

```json
{
    "token": "value of the token",
	"type":"Feature",
	"properties":{
		"id":"92765",
		"id_sitra1":"sitraPCU653938",
		"type":"PATRIMOINE_CULTUREL",
		"type_detail":"",
		"nom":"Nom du centre d'intérêt",
		"adresse":"20 Avenue adresse",
		"codepostal":"69660",
		"commune":"Commune",
		"telephone":"0478221212",
		"fax":"0478229212",
		"telephonefax":"0458221212",
		"email":"email@email.com",
		"siteweb":"http:\/\/www.siteweb.fr",
		"facebook":"",
		"classement":"",
		"ouverture":"De 8H00 à 18H00",
		"tarifsenclair":"De 5 à 25 Euros",
		"tarifsmin":"5",
		"tarifsmax":"25",
		"producteur":"Lyon Tourisme et Congrès",
		"gid":"284",
		"date_creation":"2011-03-11 15:05:18",
		"last_update":"2016-04-20 06:22:11",
		"last_update_fme":"2017-03-16 00:15:34"
	},
    "geometry":{
        "type":"Point",
        "coordinates":[
           4.834414,
           45.82862
        ]
     }
}
```


#### Example response

```json

```

### Add to the database the Grand Lyon data
This endpoint requests the Grand Lyon API to get information about the cultural centers of interest, and stores them into the database. Sends back status code 200 in case everything is OK, or status code 500 if an error occurs on the server.

```endpoint
POST http://localhost:8080/api/grandLyonDataAddFeatures
```

#### Example request

```curl
curl -X POST --data { "token": "token value" } https://localhost:8080/api/grandLyonDataAddFeatures
```


#### Example request body

```json
{
    "token": "value of the token"
}
```


#### Example response

```json

```

### Get the Air Quality Indice of a center of interest
Given the latitude and the longitude of a COI, this endpoint sends back the AQI and a color representing the AQI. Sends back status code 200 in case everything is OK, status code 400 if the request doesn't include longitude and/or latitude, or status code 500 if an error occurs on the server.

```endpoint
POST http://localhost:8080/api/getAirQuality
```

#### Example request

```curl
curl -X POST --data { "token": "token value", "lat": "45.76263", "lon": "4.823473" } https://localhost:8080/api/getAirQuality
```


#### Example request body

```json
{
	"token": "token value",
	"lat": "45.76263",
	"lon": "4.823473"
}
```


#### Example response

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      4.823473,
      45.76263
    ]
  },
  "properties": {
    "datetime": "2017-04-25T13:58:05",
    "aqi": 69,
    "color": "#8AD130"
  }
}

```


### Get the weather at a specific center of interest
Given the latitude and the longitude of a COI, this endpoint sends back the weather. Sends back status code 200 in case everything is OK, status code 400 if the request doesn't include longitude and/or latitude, or status code 500 if an error occurs on the server.

```endpoint
POST http://localhost:8080/api/getWeather
```

#### Example request

```curl
curl -X POST --data { "token": "token value", "lat": "45.76263", "lon": "4.823473" }  https://localhost:8080/api/getWeather
```


#### Example request body

```json
{
	"token": "token value",
	"lat": "45.76263",
	"lon": "4.823473"
}
```


#### Example response

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      4.823473,
      45.76263
    ]
  },
  "properties": {
    "main": {
      "temp": 12.02,
      "pressure": 1008,
      "humidity": 93,
      "temp_min": 11,
      "temp_max": 14
    },
    "weather": [
      {
        "id": 501,
        "main": "Rain",
        "description": "moderate rain",
        "icon": "10d"
      },
      {
        "id": 701,
        "main": "Mist",
        "description": "mist",
        "icon": "50d"
      }
    ],
    "wind": {
      "speed": 2.1,
      "deg": 200
    }
  }
}
```


### Get the elevation of a center of interest
Given the latitude and the longitude of a COI, this endpoint sends back the elevation of the center of interest. Sends back status code 200 in case everything is OK, status code 400 if the request doesn't include longitude and/or latitude, or status code 500 if an error occurs on the server.

```endpoint
POST http://localhost:8080/api/getElevation
```

#### Example request

```curl
curl -X POST --data { "token": "token value", "lat": "45.76263", "lon": "4.823473" } https://localhost:8080/api/getElevation
```


#### Example request body

```json
{
	"token": "token value",
	"lat": "45.76263",
	"lon": "4.823473"
}
```


#### Example response

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      4.823473,
      45.76263
    ]
  },
  "properties": {
    "elevation": 275
  }
}
```


## Parcours

### Add a new course
This endpoint allows you to add a new course. Sends back status code 200 in case everything is OK, or status code 500 if an error occurs on the server.

```endpoint
POST http://localhost:8080/api/addCourse
```

#### Example request

```curl
curl -X POST --data { "token": "token value", "id_course": "1", "level": "1", "theme": "Thème", "description": "Déscription", "cois": [ {  	"id_course": "1", "level": "1", "id_coi": "8045", "qr_code": "devinettes", "description": "description du coi", "position_in_course": "1" } ] } https://localhost:8080/api/addCourse
```


#### Example request body

```json
{
  "token": "token value",
  "id_course": "1",
  "level": "1",
  "theme": "Thème",
  "description": "Déscription",
  "cois":
  [
       {
      	"id_course": "1",
        "level": "1",
        "id_coi": "8045",
        "qr_code": "devinettes",
        "description": "description du coi",
        "position_in_course": "1"
        }
  ]
}
```


#### Example response

```json

```

### Add a center of interest to an existing course
This endpoint allows you to add a center of interest to an existing course. Sends back status code 200 in case everything is OK, or status code 500 if an error occurs on the server.

```endpoint
POST http://localhost:8080/api/add_COI_to_course
```

#### Example request

```curl
curl -X POST --data { "token": "token value", "id_course": "5", "level": "1", "id_coi": "8045", "qr_code": "devinettes", "description": "description du coi", "position_in_course": "1" } https://localhost:8080/api/add_COI_to_course
```


#### Example request body

```json
{
    "token": "token value",
	"id_course": "5",
    "level": "1",
    "id_coi": "8045",
    "qr_code": "devinettes",
    "description": "description du coi",
    "position_in_course": "1"
}
```


#### Example response

```json

```


### Get parcours : level

With this endpoint, you can get every parcours which have a level <= as a specified one.

```endpoint
POST http://localhost:8080/api/getParcours/Level
```

#### Example request

```curl
curl -X POST --data {"token":"qposifqspof", "level":5} https://localhost:8080/api/getParcoursLevel
```


#### Example request body

```json
{
  "token" : "aqqf54",
  "level" : 5,
}
```

Property | Description
---|---
`token` |  access token
`level` | one specific level

#### Example response

```json
[
  {
    "level": 1,
    "id_course": 1,
    "theme": "Il était une fois",
    "story_course": "la vie !"
  },
  {
    "level": 1,
    "id_course": 2,
    "theme": "Lorem",
    "story_course": "ipsum"
  },
  {
    "level": 2,
    "id_course": 3,
    "theme": "Neque soluta",
    "story_course": "voluptatem totam dignissimos"
  }
]
```

## Tests

### Get geoPoints

Returns a set of 3 points, as a GeoJson Multipoint

```endpoint
GET /api/getTestDatas?token=MYTOKEN
```

#### Example request

```curl
$ curl http://localhost:8080/api/getTestDatas?token=MYTOKEN
```


#### Example response

```json
{
  "type": "MultiPoint",
  "coordinates": [
    [
      4.823473,
      45.76263
    ],
    [
      4.81806,
      45.731135
    ],
    [
      4.831275,
      45.753226
    ]
  ]
}
```

## Others

### Retrieve a wobble

Returns a single wobble.

```endpoint
GET /wobbles/v1/{username}/{wobble_id}
```

Retrieve information about an existing wobble.

#### Example request

```curl
curl https://wobble.biz/wobbles/v1/{username}/{wobble_id}
```

```bash
$ wbl wobble read-wobble wobble-id
```

```python
attrs = wobbles.read_wobble(wobble_id).json()
```

```javascript
client.readWobble('wobble-id',
  function(err, wobble) {
    console.log(wobble);
  });
```

#### Example response

```json
{
  "owner": "{username}",
  "id": "{wobble_id}",
  "created": "{timestamp}",
  "modified": "{timestamp}"
}
```

### Update a wobble

Updates the properties of a particular wobble.

```endpoint
PATCH /wobbles/v1/{username}/{wobble_id}
```

#### Example request

```curl
curl --request PATCH https://wobble.biz/wobbles/v1/{username}/{wobble_id} \
  -d @data.json
```

```python
resp = wobbles.update_wobble(
  wobble_id,
  name='updated example',
  description='An updated example wobble'
  ).json()
```

```bash
$ wbl wobble update-wobble wobble-id
```

```javascript
var options = { name: 'foo' };
client.updateWobble('wobble-id', options, function(err, wobble) {
  console.log(wobble);
});
```

#### Example request body

```json
{
  "name": "foo",
  "description": "bar"
}
```

Property | Description
---|---
`name` | (optional) the name of the wobble
`description` | (optional) a description of the wobble

#### Example response

```json
{
  "owner": "{username}",
  "id": "{wobble_id}",
  "name": "foo",
  "description": "bar",
  "created": "{timestamp}",
  "modified": "{timestamp}"
}
```

### Delete a wobble

Deletes a wobble, including all wibbles it contains.

```endpoint
DELETE /wobbles/v1/{username}/{wobble_id}
```

#### Example request

```curl
curl -X DELETE https://wobble.biz/wobbles/v1/{username}/{wobble_id}
```

```bash
$ wbl wobble delete-wobble wobble-id
```

```python
resp = wobbles.delete_wobble(wobble_id)
```

```javascript
client.deleteWobble('wobble-id', function(err) {
  if (!err) console.log('deleted!');
});
```

#### Example response

> HTTP 204

### List wibbles

List all the wibbles in a wobble. The response body will be a
WobbleCollection.

```endpoint
GET /wobbles/v1/{username}/{wobble_id}/wibbles
```

#### Example request

```curl
curl https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles
```

```bash
$ wbl wobble list-wibbles wobble-id
```

```python
collection = wobbles.list_wibbles(wobble_id).json()
```

```javascript
client.listWobbles('wobble-id', {}, function(err, collection) {
  console.log(collection);
});
```

#### Example response

```json
{
  "type": "Wobble",
  "wibbles": [
    {
      "id": "{wibble_id}",
      "type": "Wobble",
      "properties": {
        "prop0": "value0"
      }
    },
    {
      "id": "{wibble_id}",
      "type": "Wobble",
      "properties": {
        "prop0": "value0"
      }
    }
  ]
}
```

### Insert or update a wibble

Inserts or updates a wibble in a wobble. If there's already a wibble
with the given ID in the wobble, it will be replaced. If there isn't
a wibble with that ID, a new wibble is created.

```endpoint
PUT /wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

#### Example request

```curl
curl https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id} \
  -X PUT \
  -d @file.geojson
```

```bash
$ wbl wobble put-wibble wobble-id wibble-id 'geojson-wibble'
```

```javascript
var wibble = {
  "type": "Wobble",
  "properties": { "name": "Null Island" }
};
client.insertWobble(wibble, 'wobble-id', function(err, wibble) {
  console.log(wibble);
});
```

#### Example request body

```json
{
  "id": "{wibble_id}",
  "type": "Wobble",
  "properties": {
    "prop0": "value0"
  }
}
```

Property | Description
--- | ---
`id` | the id of an existing wibble in the wobble

#### Example response

```json
{
  "id": "{wibble_id}",
  "type": "Wobble",
  "properties": {
    "prop0": "value0"
  }
}
```

### Retrieve a wibble

Retrieves a wibble in a wobble.

```endpoint
GET /wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

#### Example request

```curl
curl https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

```bash
$ wbl wobble read-wibble wobble-id wibble-id
```

```javascript
client.readWobble('wibble-id', 'wobble-id',
  function(err, wibble) {
    console.log(wibble);
  });
```

```python
wibble = wobbles.read_wibble(wobble_id, '2').json()
```

#### Example response

```json
{
  "id": "{wibble_id}",
  "type": "Wobble",
  "properties": {
    "prop0": "value0"
  }
}
```

### Delete a wibble

Removes a wibble from a wobble.

```endpoint
DELETE /wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

#### Example request

```javascript
client.deleteWobble('wibble-id', 'wobble-id', function(err, wibble) {
  if (!err) console.log('deleted!');
});
```

```curl
curl -X DELETE https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

```python
resp = wobbles.delete_wibble(wobble_id, wibble_id)
```

```bash
$ wbl wobble delete-wibble wobble-id wibble-id
```

#### Example response

> HTTP 204
