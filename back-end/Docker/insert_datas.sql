INSERT INTO user_data VALUES ('toto', 15, 55, 'M', 'toto@insa-lyon.fr', 'mdp');
INSERT INTO user_data VALUES ('tata', 25, 50, 'F', 'tata@insa-lyon.fr', 'mdp');
INSERT INTO centers_of_interest(id, id_sitra1, type, type_detail, nom, adresse, codepostal, commune, telephone, email, siteweb, ouverture, tarifsenclair, tarifsmin, tarifsmax, date_creation, last_update, last_update_fme, coordinates)
VALUES ( '8045' ,  'undifined' ,  'PATRIMOINE_CULTUREL' ,  '' ,  'l''espace nature' ,  'Espace nature Aquaria' ,  '69660' ,  'Collonges-au-Mon' ,  '0478220212' ,  '' ,  'http://www.collongesaumontdor.fr' ,  '' ,  'Gratuit' ,  0 ,  0 ,  '2011-03-11 15:05:18' ,  '2016-04-20 06:22:11' ,  '2017-03-16 00:15:34' , ST_GeomFromGeoJSON ( '{"type":"Point","coordinates":[ 4.834414, 45.82862]}' ));

INSERT INTO public.course (level, id_course, theme, description) VALUES (1, 1, 'lvl1:1', 'Il était une fois');
INSERT INTO public.course (level, id_course, theme, description) VALUES (1, 2, 'lvl1:2', 'lorem');
INSERT INTO public.course (level, id_course, theme, description) VALUES (2, 3, 'lvl2:1', 'ipsum');

INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (2996254, 1, 1, 'coucou', 'debut', 1);
INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (132234, 1, 2, '1:2', 'st1:2', 1);
INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (132328, 1, 1, 'bonjour', 'suite', 2);
INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (163819, 1, 1, 'salut', 'fin', 3);
INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (193987, 1, 2, '1:2', 'st1:2', 2);


