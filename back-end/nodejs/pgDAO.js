const pool = require('./db.js');
const dao = require('./DAO.js');
const util = require('util');

const OO_Coi = require('./OO_Coi.js');
const OO_Parcours = require('./OO_Parcours');

module.exports = pgDAO;

function pgDAO(tables) {
    this._tables = tables;
}
pgDAO.prototype = dao;

pgDAO.prototype.addTable = function (table) {
    this._tables.push(table);
}
pgDAO.prototype.buildQuery = function (_params) {
    var tables = '';
    var keys = '';
    var params = '';
    var where = '';
    var query = '';
    var tab = this._tables;
    this._tables.forEach(function (currentValue, index, array) {
        // The tables needed in the request
        tables += currentValue.getName();
        console.log('Tables ! ' + tab.length);
        if (index < tab.length - 1) {
            tables += ', ';
            var i = 0;

            var n1 = array[index].getName();
            var n2 = array[index + 1].getName();

            var keytab2 = array[index + 1].getKey();
            var keytab1 = array[index].getKey();

            for (let k1 of keytab1) {

                keys += n1 + '.' + k1 + ' = ' + n2 + '.' + keytab2[i];
                if (i < keytab1.length - 2) {
                    keys += ' AND ';
                }
                i++;
            }

            if (index < tab.length - 2) {
                keys += ' AND ';
            }
        }
    });
    var index = 0;
    for (let param in _params) {
        params += param + ' = \'' + _params[param] + '\'';
        if (index < Object.keys(_params).length - 1) {
            params += ' AND ';
        }
        index++;
    }

    if (keys !== '') {
        if (params !== '') {
            where = ' WHERE ' + keys + ' AND ' + params;
        } else {
            where = ' WHERE ' + keys;
        }
    } else {
        if (params !== '') {
            where = ' WHERE ' + params;
        }
    }
    query = tables + where;

    console.log('Tables : ' + tables);
    console.log('Keys : ' + keys);
    console.log('Params : ' + params);
    console.log('Query : ' + query);

    return query;

};

pgDAO.prototype.findAll = function (_params, resultCallback, errorCallback) {
    // Build the query
    var query = this.buildQuery(_params);
    query = 'SELECT * FROM ' + query;
    this.executeQuery(query, _params, resultCallback, errorCallback);
};

pgDAO.prototype.count = function (_params, resultCallback, errorCallback) {
    // Build the query
    var query = this.buildQuery(_params);
    query = 'SELECT COUNT(*) FROM ' + query;
    this.executeQuery(query, _params, resultCallback, errorCallback);
};

pgDAO.prototype.buildInsertQuery = function (_params) {
    var columns = '';
    var values = '';
    var index = 0;
    for (let param in _params) {
        console.log('param ', index, ' : ', param);
        columns += param;
        if (_params[param] && _params[param]['geojson'])
            values += 'ST_GeomFromGeoJSON ( \'' + JSON.stringify(_params[param].geojson) + '\' )';
        else if (_params[param]) {
            values += ' \'' + _params[param].replace(/'/g, "\'\'") + '\' ';
        } else {
            values += 'null';
        }

        if (index < Object.keys(_params).length - 1) {
            columns += ', ';
            values += ', '
        }
        index++;
    }

    var query = 'INSERT INTO ' + this._tables[0].getName() + '(' + columns + ') VALUES (' + values + ')';
    console.log('INSERT query: ', query);
    return query;
};

pgDAO.prototype.insert = function (_params, resultCallback, errorCallback) {
    // Build the query
    var query = this.buildInsertQuery(_params);
    // Execute the query
    this.executeQuery(query, _params, resultCallback, errorCallback);
};

pgDAO.prototype.executeQuery = function (query, _params, resultCallback, errorCallback) {
    console.log('executing : ' + query);
    pool.query(query, [], function (errSQL, resSQL) {

        if (errSQL) {
            if (errorCallback) errorCallback(errSQL);
            return console.error('error running query', errSQL);
        }
        resultCallback(resSQL);

    });
};

pgDAO.prototype.getCoursesLevelInf = function (_params, resultCallback, errorCallback) {
    console.log("Requesting parcours with level <= " + _params.level);
    pool.query('SELECT * FROM course WHERE level <= $1::int', [_params.level], function (errSQL, resSQL) {

        if (errSQL) {
            if (errorCallback) errorCallback(errSQL);
            return console.error('error running query', errSQL);
        }
        resultCallback(resSQL);

    });
};

pgDAO.prototype.getCourseSpecific = function (_params, resultatCallback, errorCallback) {
    console.log("SQL - requesting parcours id : " + _params.id_course);
    pool.query('     SELECT * FROM course_coi c JOIN centers_of_interest coi ON C.id_coi = coi.id \
                    WHERE c.id_course = $1::int \
                    ORDER BY  c.position_in_course;', [_params.id_course], function (errSQL, resSQL) {
        //console.log(resSQL);
        if (errSQL) {
            if (errorCallback) errorCallback(errSQL);
            return console.error('error running query', errSQL);
        }
        resultatCallback(resSQL);

    });
};

//used to get a specific COI, and parse it to a custom obj (ie OO_COI)
pgDAO.prototype.getCOI = function (id_coi) {
    /*
     SELECT ST_AsGeoJSON(coordinates), id, id_sitra1, type, type_detail, nom, adresse, codepostal, commune, telephone, email,
     siteweb, ouverture, tarifsenclair, tarifsmin, tarifsmax,date_creation, last_update, last_update_fme
     FROM centers_of_interest WHERE id = 1;
     */
    console.log("SQL - requesting coi id : " + id_coi);
    return new Promise(function(resolve, reject) {
        pool.query('SELECT *, ST_AsGeoJSON(coordinates) FROM centers_of_interest \
                    WHERE id = $1::int;', [id_coi], function (errSQL, resSQL) {
            //console.log(resSQL);
            if (errSQL) {
                return console.error('error running query', errSQL);
            }
            console.log("return : " + resSQL);

            //console.log("sql rows : " + util.inspect(res.rows[0], {showHidden: false, depth: null}));
            var row = resSQL.rows[0];
            //console.log(JSON.parse(row.st_asgeojson).coordinates);
            var coi = new OO_Coi(row.id, row.id_sitra, row.type, row.type_detail, row.nom, row.adresse, row.codepostal,
                row.commune, row.telephone, row.email, row.siteweb, row.ouverture, row.tarifsenclair, row.tarifsmin, row.tarifsmax,
                row.date_creation, row.last_update, row.last_update_fme, JSON.parse(row.st_asgeojson).coordinates[1],
                JSON.parse(row.st_asgeojson).coordinates[0]);
            console.log(coi.toMyGeoJson());
            resolve(coi);
        });
        //return 1;
    })};


pgDAO.prototype.buildParc = function(id, callback) {
    var ajaxQueries = id.size;
    console.log("calling " + ajaxQueries + " ajax queries");
    console.log(id);

    var promises = [];
    for (var i in id) {
        console.log(id[i]);
        promises.push(this.getCOI(id[i]));
    }
    Promise.all(promises).then(function() {
        console.log("RESULT : " + util.inspect(promises[0], {showHidden: false, depth: null}));
        console.log("RESULT : " + util.inspect(promises[1], {showHidden: false, depth: null}));
        // returned data is in arguments[0], arguments[1], ... arguments[n]
        // you can process it here
    }, function(err) {
        // error occurred
    });

/*
    this.createCOI(id, function(res){
        console.log("=====" + util.inspect(res, {showHidden: false, depth: null}));
    })
    */
};
