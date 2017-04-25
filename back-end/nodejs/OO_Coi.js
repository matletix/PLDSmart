/*
 Classe pour representer un centre d'interet
 */


var GeoJson = require('geojson');

class OO_Coi {
    constructor(id, id_sitra, type, type_detail, nom, adresse, cp, commune, tel, mail, siteweb, ouv, tarifcl, tarifmin,
                tarifmax, date_creation, last_updt, last_updt_fme, lat, long) {
        this.id = id;
        this.id_sitra = id_sitra;
        this.type = type;
        this.type_detail = type_detail;
        this.nom = nom;
        this.adresse = adresse;
        this.codepostal = cp;
        this.commune = commune;
        this.telephone = tel;
        this.email = mail;
        this.siteweb = siteweb;
        this.ouverture = ouv;
        this.tarifsenclair = tarifcl;
        this.tarifsmin = tarifmin;
        this.tarifsmax = tarifmax;
        this.date_creation = date_creation;
        this.last_update = last_updt;
        this.last_update_fme = last_updt_fme;
        this.lat = lat;
        this.lng = long;
    }


    toMyGeoJson() {
        let output =  GeoJson.parse(this, {Point: ['lat', 'lng']});
        //console.log(this.id);
        //console.log(output);
        return JSON.stringify(output);
    }
}

module.exports = OO_Coi;