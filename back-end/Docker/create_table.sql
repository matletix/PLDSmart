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
    telephone INT,
    email VARCHAR(255),
    siteweb VARCHAR(255),
    ouverture VARCHAR(255),
    tarifsenclair VARCHAR(255),
    tarifsmin INT,
    tarifsmax INT,
    date_creation TIME NOT NULL,
    last_update TIME NOT NULL,
    last_update_fme TIME NOT NULL,
    coordinates GEOGRAPHY(POINT) NOT NULL
);
CREATE UNIQUE INDEX centers_of_interest_id_uindex ON "centers_of_interest" (id);

