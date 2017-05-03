INSERT INTO public.course (level, id_course, theme, description) VALUES (1, 1, 'Parcours 1 du niveau 1', 'Un premier parcours !');
INSERT INTO public.course (level, id_course, theme, description) VALUES (1, 2, 'Parcours 2 du niveau 1', 'Le deuxième parcours  du niveau 1!');
INSERT INTO public.course (level, id_course, theme, description) VALUES (2, 1, 'Parcours 1 du niveau 2', 'Un premier parcours de ce niveau 2 !');
INSERT INTO public.course (level, id_course, theme, description) VALUES (2, 2, 'Parcours 2 du niveau 2', 'Un deuxième parcours de ce niveau 2 !');

INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (315609, 1, 1, 'qr', 'description', 1);
INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (140103, 1, 1, 'qr', 'description', 2);
INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (80465, 1, 1, 'qr', 'description', 3);

INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (315609, 1, 2, 'qr', 'description', 1);
INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (140103, 1, 2, 'qr', 'description', 2);
INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (80465, 1, 2, 'qr', 'description', 3);

INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (315609, 2, 1, 'qr', 'description', 1);
INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (140103, 2, 1, 'qr', 'description', 2);
INSERT INTO public.course_coi (id_coi, level, id_course, qr_code, description, position_in_course) VALUES (80465, 2, 1, 'qr', 'description', 3);
