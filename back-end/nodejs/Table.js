module.exports = Table;

function Table(name, key){
    this._tableName = name;
    this._key = key;
}

Table.prototype.getName = function(){
    return this._tableName;
};

Table.prototype.getKey = function(){
    return this._key;
};
