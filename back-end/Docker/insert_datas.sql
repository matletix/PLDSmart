INSERT INTO user_data VALUES ('toto', 15, 55, 'M', 'toto@insa-lyon.fr', 'mdp');
INSERT INTO user_data VALUES ('tata', 25, 50, 'F', 'tata@insa-lyon.fr', 'mdp');
INSERT INTO centers_of_interest(id, id_sitra1, type, type_detail, nom, adresse, codepostal, commune, telephone, email, siteweb, ouverture, tarifsenclair, tarifsmin, tarifsmax, date_creation, last_update, last_update_fme, coordinates)
VALUES ( '8045' ,  'undifined' ,  'PATRIMOINE_CULTUREL' ,  '' ,  'l''espace nature' ,  'Espace nature Aquaria' ,  '69660' ,  'Collonges-au-Mon' ,  '0478220212' ,  '' ,  'http://www.collongesaumontdor.fr' ,  '' ,  'Gratuit' ,  0 ,  0 ,  '2011-03-11 15:05:18' ,  '2016-04-20 06:22:11' ,  '2017-03-16 00:15:34' , ST_GeomFromGeoJSON ( '{"type":"Point","coordinates":[ 4.834414, 45.82862]}' ));