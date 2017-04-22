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

module.exports.formatGLFeature = function (glFeature) {
    var _params = this.template;
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