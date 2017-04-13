// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var geoJson = require('geojson-tools');

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
      // add a static user to the database
      pool.query('SELECT PostGIS_full_version()', [], function(errSQL, resSQL) {
        if(errSQL) {
          return console.error('error running query', errSQL);
        }

        res.json({row: resSQL.rows[0]});
        console.log('row:', resSQL.rows[0]);
      });
});

app.post('/authentificate', function(req, res) {
    var existInSql = false;

    pool.query('SELECT COUNT(*) FROM user_data WHERE pseudo=$1 AND mdp=$2', [req.body.pseudo, req.body.mdp], function(errSQL, resSQL) {

        if(errSQL) {
            return console.error('error running query', errSQL);
        }
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

    })}) ;

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
