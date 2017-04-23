/*
 Classe pour representer un centre d'interet
 */


var GeoJson = require('geojson');

class OO_Coi {
    constructor(id, nom, lat, long) {
        this.id = id;
        this.nom = nom;
        this.lat = lat;
        this.lng = long;
    }


    toMyGeoJson() {
        let output =  GeoJson.parse(this, {Point: ['lat', 'lng']});
        //console.log(this.id);
        //console.log(output);
        return output;
    }
}

module.exports = OO_Coi;