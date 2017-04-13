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