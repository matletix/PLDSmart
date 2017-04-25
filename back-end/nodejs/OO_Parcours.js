/*
Classe pour representer un parcours
 */

var GeoJson = require('geojson');

class OO_Parcours {
    constructor(level, theme, story, id, coi) {
        this.level = level;
        this.theme = theme;
        this.story = story;
        this.id = id;
        this.coi = coi;
    }

    addCoi(coiToAdd){
        this.coi.push(coiToAdd);
    }

    toMyGeoJson() {
        //console.log(this.coi);
        let output =  GeoJson.parse(this.coi, {'Point': ['lat', 'lng']});
        //console.log(this.id);
        //console.log(output);
        return JSON.stringify(output);
    }
}

module.exports = OO_Parcours;