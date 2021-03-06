// BASE SETUP
// =============================================================================
/*jshint esversion: 6 */
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var geoJson = require('geojson-tools');
const util = require('util');

var rp = require('request-promise');
var GeoJson = require('geojson');

const OO_Coi = require('./OO_Coi.js');
const OO_Parcours = require('./OO_Parcours');

var pgDAO = require('./pgDAO.js');
var Table = require('./Table.js');
var lib = require('./lib.js');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// DATA BASE ACCESS USING POOLS
// =============================================================================
// Passing a query to the pool defined to access the postgres database
const pool = require('./db.js');

//to run a query we just pass it to the pool
//after we're done nothing has to be taken care of
//we don't have to return any client to the pool or close a connection
/*
pool.query('SELECT $1::int AS number', ['2'], function(err, res) {
  if(err) {
    return console.error('error running query', err);
  }

  console.log('number:', res.rows[0].number);
});
*/

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
// This is executed when receiving any request
// This allows to make validations
router.use(function (req, res, next) {
    // do logging
    console.log('This route requires a token!');
    // here the tokens are considered for posts and gets only
    var token = req.body.token || req.query.token;
    if (token === "dev") {
        console.log('DEV TOKEN');
        next();
    } //todo : for dev only !!
    else if (token) {
        jwt.verify(token, '+super**Secret!', function (err, decoded) {
            if (err) {
                return res.status(401).send({error: 'INVALID TOKEN'});
            } else {
                console.log('VALID TOKEN');
                next();
            }
        });

    } else {
        return res.status(401).send({error: 'NO TOKEN PROVIDED'});
    }

});


// API routes

// Just to test the user account creation
app.get('/signuptest', function(req, res) {


});

app.post('/authentificate', function(req, res) {


    var tables = [];
    tables.push(new Table('user_data', ['pseudo']));
    var _pgdao = new pgDAO(tables);
    // Define what to do with the result
    var resultCallback = function(resSQL){

        var existInSql = false;
        console.log('row:', resSQL.rows.length);
        if(resSQL.rows.length.toString() === "1") {
            existInSql = true;
        }

        if(existInSql){
            console.log("EXIST");
            var userinfo = resSQL.rows[0];

            // Create a token
            var token = jwt.sign({'pseudo': req.body.pseudo}, '+super**Secret!', {
                expiresIn: '24h' // expires in 24 hours
            });
            if (userinfo['mdp']) delete userinfo['mdp'];
            userinfo['token'] = token;

            res.status(200).send(userinfo);
        } else {
            console.log("DON T EXIST");
            res.status(401).send({ error: "Unauthorized :(" });
        }
    };
    // Call the count function
    _pgdao.findAll({'pseudo': req.body.pseudo, 'mdp': req.body.mdp}, resultCallback);

}) ;

app.post('/signin', function(req, res) {
    var _pgdao = new pgDAO('user_data');

    var resultCallback = function(){
        console.log('NEW USER ADDED !');
        res.status(200).send('ADDED');
    };
    var errorCallback = function(){
        console.log('Error: pseudo already taken');
        res.status(500).send('ALREADY EXISTS');
    };

    console.log(req.body);
    _pgdao.signin(resultCallback, errorCallback,
        req.body.pseudo, req.body.age, req.body.poids, req.body.sexe,
        req.body.mail, req.body.mdp);

});


// End point to add getting one Feature to insert into the database
router.post('/grandLyonDataAddOneFeature', function (req, res) {
    var grandLyonData = req.body;
    console.log('Adding a new center of interest');
    var _pgdao = new pgDAO([new Table('centers_of_interest', ['id'])]);

    if(grandLyonData['properties']['type'] === 'PATRIMOINE_CULTUREL'){
        // Formatting grand Lyon data
        var _params = lib.formatgl(grandLyonData, lib.template);
        console.log(_params);
        // Insert the object to the data base
        // Define the result callback function
        var resultCallback = function(){
            console.log('INSERE !');
            res.status(200).send();
        };
        var errorCallback = function(){
            console.log('Error: grandLyonDataAddOneFeature');
            res.status(500).send();
        }

        _pgdao.insert(_params, resultCallback);
    }
});

// Function that requests the GRAND LYON API
var grandLyonRequest = function (uri, qs, resFct, errFct) {
    console.log('Grand Lyon request');
    var options = {
        uri: uri,
        qs: qs,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    rp(options)
        .then(resFct)
        .catch(errFct);
};

// End point requesting grand Lyon to get all the features
// Inserts the ones of type "PATRIMOINE_CULTUREL"
router.post('/grandLyonDataAddFeatures', function (req, res) {

    var error = function (err) {
        console.log('ERROR !', err);
        res.status(500).send();
    };

    var add_CofI_db = function (result) {
        console.log('RESULT GRAND LYON : ', result);
        console.log('Adding a new center of interest');
        var _pgdao = new pgDAO([new Table('centers_of_interest', ['id'])]);
        for(let grandLyonData of result['features']){
            if(grandLyonData['properties']['type'] === 'PATRIMOINE_CULTUREL'){
                // Formatting grand Lyon data
                var _params = lib.formatgl(grandLyonData, lib.template);
                console.log(_params);
                // Insert the object to the data base
                // Define the result callback function
                var resultCallback = function(){
                    console.log('INSERE !');
                    res.status(200).send();
                };

                _pgdao.insert(_params, resultCallback, error);
            }
        }

    };
    var uri = 'https://download.data.grandlyon.com/wfs/rdata';
    var qs = {
        "SERVICE": "WFS",
        "VERSION": "2.0.0",
        "outputformat": "GEOJSON",
        "maxfeatures": "3000",
        "request": "GetFeature",
        "typename": "sit_sitra.sittourisme",
        "SRSNAME": "urn:ogc:def:crs:EPSG::4171"
    };
    grandLyonRequest(uri, qs, add_CofI_db, error);

});

// TODO : dev only
// Return all the stored centers of interest
router.post('/allCentersOfInterest', function (req, res) {

    var _pgdao = new pgDAO([new Table('centers_of_interest', ['id'])]);

    _pgdao.findAll({}, function (result) {
        console.log('Result sent !');
        res.status(200).send(result['rows']);
    }, function (err) {
        console.log('Erreur Centres d\'intérêts!');
        res.status(500).send();
    });
});


// Add a new course
router.post('/addCourse', function (req, res) {

    // Format the params
    var _params = lib.format(req.body, lib.template_insert_course);
    var _pgdao = new pgDAO([new Table('course', ['id_course', 'niveau'])]);


    _pgdao.insert(_params, function () {
        console.log('Parcours inséré!');
        res.status(200).send();
    }, function (err) {
        console.log('Erreur, Parcours non inséré! ', err);
        res.status(500).send();
    });

    var cois = req.body['cois'];
    _pgdao = new pgDAO([new Table('course_coi', ['id_course', 'niveau', 'id_coi'])]);

    // Add the cois to the database
    for (let coi of cois){

        _params = lib.format(coi, lib.template_insert_coi);

        _pgdao.insert(_params, function () {
            console.log('coi inséré!');
            res.status(200).send();
        }, function (err) {
            console.log('Erreur, coi non inséré! ', err);
            res.status(500).send();
        });
    }

});

// Add a coi to a course
router.post('/add_COI_to_course', function (req, res) {

    var _params = lib.format(req.body, lib.template_insert_coi);
    var _pgdao = new pgDAO([new Table('course_coi', ['id_course', 'niveau', 'id_coi'])]);

    _pgdao.insert(_params, function () {
        console.log('coi inséré!');
        res.status(200).send();
    }, function (err) {
        console.log('Erreur, coi non inséré! ', err);
        res.status(500).send();
    });
});

router.post('/get_used_cois', function (req, res) {
    var _pgdao = new pgDAO([new Table('course_coi', ['id_coi']), new Table('centers_of_interest', ['id'])]);

    _pgdao.findAll({}, function (result) {
        var list = lib.parsePOSTGISToGeoJson(result["rows"]);
        res.status(200).send( list );
    }, function (err) {
        console.log('Erreur get courses ! ', err);
        res.status(500).send();
    }, true);
});

router.post('/get_courses', function(req, res){

    var _pgdao = new pgDAO([new Table('course', ['id_course', 'niveau'])]);

    _pgdao.findAll({}, function (result) {
        console.log('Courses : ', result["rows"]);
        res.status(200).send(result["rows"]);
    }, function (err) {
        console.log('Erreur get courses ! ', err);
        res.status(500).send();
    });

});

// TODO : dev only
router.get('/getTestDatas', function(req, res){
    console.log('Returning test datas');
    const array = [
        [45.76263, 4.823473], //Fourvière
        [45.731135, 4.81806], //Confluences
        [45.753226, 4.831275] //musee des arts decoratifs
    ];

    res.json(geoJson.toGeoJSON(array, 'multipoint'));
});

router.post('/getParcours/Level', function(req, res){
    const level = req.body.level;
    console.log("Asking for parcours with level <= " + req.body.level);
    const _pgdao = new pgDAO([new Table('course')]);
    _pgdao.getCoursesLevelInf(req.body, function(sqlResult){
        result = sqlResult.rows;

        console.log("sending back : " + result);
        res.send(result);
    });
});


router.post('/getParcours/Specific', function (req, res) {
    /*
     SELECT * FROM course_coi c
     JOIN centers_of_interest coi ON C.id_coi = coi.id
     WHERE c.id_course = 1
     ORDER BY  c.position_in_course;
     */
    console.log(req.body);
    const id_course = req.body.id_course;
    console.log("Asking for course id : " + id_course);

    const _pgdao = new pgDAO();

    var coi = new OO_Coi(8585, 'name', 1.5, 10.2);
    var coi2 = new OO_Coi(9000, 'name2', 1.8, 12.1);


    var parc1 = new OO_Parcours(5, "parc5", "st5", 1, [coi]);
    parc1.addCoi(coi2);
    //console.log("-> -> " + util.inspect(parc1.toMyGeoJson(), {showHidden: false, depth: null}));

    _pgdao.buildParc(1, function (coi) {
        console.log("\n\n True END : " + coi.toMyGeoJson());
        res.send(coi.toMyGeoJson());


    });


    /*

     result = JSON.stringify(sqlResult.rows); //todo : to geojson !! (featureCollection)

     console.log("sending back : " + result);
     res.send(result);
     */

});

// TODO: AIR QUALITY (AQI & color)
router.post('/getAirQuality', function (req, res) {
    if (req.body && req.body['lat'] && req.body['lon']) {
        var lat = req.body['lat'];
        var lon = req.body['lon'];

        lib.airQualityRequest(lat, lon, function (result) {
            // Formattion the result
            result['aqi'] = result['breezometer_aqi'];
            result['color'] = result['breezometer_color'];
            result['lat'] = lat;
            result['lon'] = lon;
            delete result['breezometer_aqi'];
            delete result['breezometer_color'];

            result = GeoJson.parse(result, {Point: ['lat', 'lon']});

            console.log('AQI : ', result);
            res.status(200).send(result);
        }, function (err) {
            console.log('Erreur get Air Quality ! ', err);
            res.status(500).send();
        });
    } else {
        console.log('Bad request latitude and/or longitude not provided ! ', err);
        res.status(400).send();
    }

});

// TODO: Weather
router.post('/getWeather', function (req, res) {
    if (req.body && req.body['lat'] && req.body['lon']) {
        var lat = req.body['lat'];
        var lon = req.body['lon'];

        lib.weatherRequest(lat, lon, function (response) {
            // Formattion the result
            var result = {};
            console.log('api weather response : ', response);
            result['main'] = response['main'];
            result['weather'] = response['weather'];
            result['wind'] = response['wind'];

            result['lat'] = lat;
            result['lon'] = lon;

            result = GeoJson.parse(result, {Point: ['lat', 'lon']});

            console.log('weather : ', result);
            res.status(200).send(result);

        }, function (err) {
            console.log('Erreur get weather ! ', err);
            res.status(500).send();
        });
    } else {
        console.log('Bad request latitude and/or longitude not provided ! ', err);
        res.status(400).send();
    }
});

// TODO: ELEVATION
router.post('/getElevation', function (req, res) {
    if (req.body && req.body['lat'] && req.body['lon']) {
        var lat = req.body['lat'];
        var lon = req.body['lon'];

        lib.elevationRequest(lat, lon, function (response) {
            // Formattion the resul
            console.log('Elevation api result : ', response);
            var result = {};
            result['elevation'] = response['elevationProfile'][0]['height'];
            result['lat'] = lat;
            result['lon'] = lon;

            result = GeoJson.parse(result, {Point: ['lat', 'lon']});

            console.log('elevation : ', result);
            res.status(200).send(result);

        }, function (err) {
            console.log('Erreur get elevation ! ', err);
            res.status(500).send();
        });
    } else {
        console.log('Bad request latitude and/or longitude not provided ! ', err);
        res.status(400).send();
    }
});


// TODO: User information update (nb points, level)
router.post('/updateUserInfo', function(req, res){
    // Format the params
    var who = req.body['who'] || {};
    var what = req.body['what'] || {};

    var set_params = Object.assign({}, lib.userUpdateTemplate);
    set_params = lib.format(what, set_params);

    var where_params = Object.assign({}, lib.userUpdateTemplate);
    where_params = lib.format(who, where_params);

    var _pgdao = new pgDAO([new Table('user_data', ['pseudo'])]);

    _pgdao.update(set_params, where_params, function () {
        console.log('Informations utilisateur mises à jour');
        res.status(200).send();
    }, function (err) {
        console.log('Erreur, mise à jour Informations utilisateur ', err);
        res.status(500).send();
    });

});

// TODO: Course completion registration
router.post('/courseCompleted', function(req, res){
    // insert into the database completed course
    var _params = lib.format(req.body, lib.CourseUserInsertTemplate);
    var _pgdao = new pgDAO([new Table('course_user_validation', ['id_course', 'level', 'pseudo'])]);

    _pgdao.insert(_params, function () {
        console.log('courseCompleted : course finie!');
        res.status(200).send();
    }, function (err) {
        console.log('Erreur, enregistrement course finie! ', err);
        res.status(500).send();
    });
});
router.post('/completedCourses', function(req, res){
    // get a list of completed courses given the user
    var _pgdao = new pgDAO([new Table('course_user_validation', ['id_course', 'level', 'pseudo'])]);

    _pgdao.findAll({pseudo: req.body.pseudo}, function (result) {
        console.log('completedCourses : ', result["rows"]);
        var courses = result["rows"];
        for(course of courses) { delete course['pseudo']; };
        res.status(200).send(courses);
    }, function (err) {
        console.log('Erreur get courses ! ', err);
        res.status(500).send();
    });
});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
