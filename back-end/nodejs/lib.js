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