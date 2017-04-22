// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var geoJson = require('geojson-tools');

var pgDAO = require('./pgDAO.js');
var Table = require('./Table.js');

var rp = require('request-promise');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
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
router.use(function(req, res, next) {
    // do logging
    console.log('This route requires a token!');
    // here the tokens are considered for posts and gets only
    var token = req.body.token || req.query.token;
    if (token === "dev"){
        console.log('DEV TOKEN');
        next();
    } //todo : for dev only !!
    else if (token){
      jwt.verify(token, '+super**Secret!', function(err, decoded) {
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
        console.log('row:', resSQL.rows[0].count);
        if(resSQL.rows[0].count.toString() === "1") {
            existInSql = true;
        }

        if(existInSql){
            console.log("EXIST");

            // Create a token
            var token = jwt.sign({'pseudo': req.body.pseudo}, '+super**Secret!', {
                expiresIn: '24h' // expires in 24 hours
            });

            res.status(200).send({token: token});
        } else {
            console.log("DON T EXIST");
            res.status(401).send({ error: "Unauthorized :(" });
        }
    }
    // Call the count function
    _pgdao.count({'pseudo': req.body.pseudo, 'mdp': req.body.mdp}, resultCallback);

}) ;


// End point to add getting one Feature to insert into the database
router.post('/grandLyonDataAddOneFeature', function (req, res) {
    var grandLyonData = req.body;
    console.log('Adding a new center of interest');
    var _pgdao = new pgDAO([new Table('centers_of_interest', ['id'])]);
    var c_of_i = require('./centerOfInterest.js');

    if(grandLyonData['properties']['type'] == 'PATRIMOINE_CULTUREL'){
        // Formatting grand Lyon data
        var _params = c_of_i.formatGLFeature(grandLyonData);
        console.log(_params);
        // Insert the object to the data base
        // Define the result callback function
        var resultCallback = function(){
            console.log('INSERE !');
            res.status(200).send();
        };

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
        var _pgdao = new pgDAO([new Table('centers_of_interest', 'id')]);
        var c_of_i = require('./centerOfInterest.js');

        for(let grandLyonData of result['features']){
            if(grandLyonData['properties']['type'] == 'PATRIMOINE_CULTUREL'){
                // Formatting grand Lyon data
                var _params = c_of_i.formatGLFeature(grandLyonData);
                console.log(_params);
                // Insert the object to the data base
                // Define the result callback function
                var resultCallback = function(){
                    console.log('INSERE !');
                    res.status(200).send();
                };

                _pgdao.insert(_params, resultCallback);
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

// Add a new course
router.post('/addCourse', function () {

});

router.get('/getTestDatas', function(req, res){
    console.log('Returning test datas');
    var array = [
        [45.76263,4.823473], //Fourvière
        [45.731135,4.81806], //Confluences
        [45.753226,4.831275] //musee des arts decoratifs
    ];

    res.json(geoJson.toGeoJSON(array, 'multipoint'));
});



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
