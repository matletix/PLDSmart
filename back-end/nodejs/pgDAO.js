
const pool = require('./db.js');

module.exports = pgDAO;
function pgDAO(tables){
    this._tables = tables;
}

pgDAO.prototype.addTable = function (table){
    this._tables.push(table);
}
pgDAO.prototype.buildQuery = function (_params){
    var tables = '';
    var keys = '';
    var params = '';
    var where = '';
    var query = '';
    var tab = this._tables;
    this._tables.forEach(function(currentValue, index, array){
        // The tables needed in the request
        tables += currentValue.getName();
        console.log('Tables ! ' + tab.length);
        if (index < tab.length - 1) {
            tables += ', ';
            keys += array[index].getKey() + ' = ' + array[index+1].getKey();
            if (index < tab.length - 2){
                keys += ' AND ';
            }
        }
    });
    var index = 0;
    for (let param in _params){
        params += param + ' = \'' + _params[param] + '\'';
        if (index < Object.keys(_params).length - 1){
            params += ' AND ';
        }
        index ++;
    }

    if (keys !== ''){
        if (params !== ''){
            where = ' WHERE ' + keys + ' AND ' + params;
        } else {
            where = ' WHERE ' + keys;
        }
    } else {
        if (params !== ''){
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

pgDAO.prototype.findOne = function(_params,err,res){
    // Build the query
    var query = this.buildQuery(_params);
    query = 'SELECT * FROM ' + query;
    pool.query(query, [], function(errSQL, resSQL){
        err = errSQL;
        res = resSQL;
    });
}

pgDAO.prototype.count = function(_params,err,res){
    // Build the query
    var query = this.buildQuery(_params);
    query = 'SELECT COUNT(*) FROM ' + query;
    var _err = 'ttt', _res;
    // TODO: passage par ref
    pool.query(query, [], function(err, res){
        _err = err;
        _res = res;
        console.log('count : ', _err, ' : ', _res);
    });



}
