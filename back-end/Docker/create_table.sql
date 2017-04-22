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
    id_course INT NOT NULL PRIMARY KEY ,
    level INT NOT NULL,
    theme VARCHAR(255),
    description TEXT
);
CREATE UNIQUE INDEX course_id_index ON course(id_course);

DROP TABLE IF EXISTS "course_coi";
CREATE TABLE "course_coi"(
    id_course INT NOT NULL ,
    id_coi INT NOT NULL ,
    qr_code TEXT NOT NULL ,
    description TEXT NOT NULL,
    position_in_course INT NOT NULL,
    CONSTRAINT PK_course_coi PRIMARY KEY (id_course, id_coi),
    FOREIGN KEY (id_course) REFERENCES course(id_course),
    FOREIGN KEY (id_coi) REFERENCES centers_of_interest(id)
);
CREATE UNIQUE INDEX course_coi_id_index ON course_coi(id_course, id_coi);