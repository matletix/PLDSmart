DROP TABLE IF EXISTS "user_data";
CREATE TABLE "user_data"
(
    pseudo VARCHAR(50) PRIMARY KEY NOT NULL,
    age INT NOT NULL,
    poids INT NOT NULL,
    sexe VARCHAR(1) NOT NULL,
    email VARCHAR(50) NOT NULL,
    mdp VARCHAR(100) NOT NULL
);
CREATE UNIQUE INDEX user_pseudo_uindex ON "user_data" (pseudo);
CREATE EXTENSION postgis;

DROP TABLE IF EXISTS "centers_of_interest";
CREATE TABLE "centers_of_interest"(
    id INT PRIMARY KEY NOT NULL,
    id_sitra1 VARCHAR(255) NOT NULL ,
    type VARCHAR(255) NOT NULL ,
    type_detail VARCHAR(255),
    nom VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    codepostal INT NOT NULL,
    commune VARCHAR(255) NOT NULL,
    telephone VARCHAR(255),
    email VARCHAR(255),
    siteweb VARCHAR(255),
    ouverture VARCHAR(255),
    tarifsenclair VARCHAR(255),
    tarifsmin INT,
    tarifsmax INT,
    date_creation TIMESTAMP NOT NULL,
    last_update TIMESTAMP NOT NULL,
    last_update_fme TIMESTAMP NOT NULL,
    coordinates GEOGRAPHY(POINT) NOT NULL
);
CREATE UNIQUE INDEX centers_of_interest_id_uindex ON "centers_of_interest" (id);

DROP TABLE IF EXISTS "course";
CREATE TABLE "course"(
    id_level INT NOT NULL,
    id_course INT NOT NULL,
    theme VARCHAR(255),
    story_course TEXT,
    CONSTRAINT PK_parcours PRIMARY KEY (id_level, id_course)
);
CREATE UNIQUE INDEX parcours_id_level_parcours_index ON course(id_level, id_course);

DROP TABLE IF EXISTS "course_ci";
CREATE TABLE "course_ci"(
    id_ci INT NOT NULL PRIMARY KEY ,
    id_level INT NOT NULL ,
    id_course INT NOT NULL ,
    qr_code TEXT NOT NULL ,
    story_ci TEXT NOT NULL,
    FOREIGN KEY (id_level, id_course) REFERENCES course(id_level, id_course)
);
CREATE UNIQUE INDEX course_ci_id_ci ON course_ci(id_ci);