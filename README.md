# PLDSmart

## Back-end

Il est a noter que par defaut, le port utilisé par notre API est le port 80. Cela se change dans le fichier "index.js" (sous back-end/nodejs), ligne 28.

### Premier lancement
Pour lancer le back-end, il faut commencer par installer docker, node, et postgres :
dans le dossier back-end/Docker, faire : <br/>
$ make installdocker <br/>
$ make installnode <br/>
$ make installpsql <br/>

Puis créer le volume où sera stocké la base de données : <br/>
$ make createVolume <br/>

Puis finalement lancer le docker : <br/>
$ make run <br/>
(note: le port 5432 peut être utilisé par postgresql hors docker, pour régler cela, un simple '$ sudo service postgres stop' fait l'affaire)

Ensuite, il faut peupler la base de données : <br/>
$ make setupDB <br/>

(le mot de passe est "docker") 

### Second / autre lancement
Il suffit de faire <br/>
$ make start

Et pour arrêter le docker  <br/>
$ make stop

Puis lancer le server, faire : (dans le dossier back-end/nodejs) <br/>
$ npm install
$ npm start


### Documentation
La documentation de notre API Rest est disponible avec docbox, il faut simplement faire : <br/>
$ npm install <br/>
$ npm start <br/>
Dans le dossier back-end/docbox, puis ouvrir dans un navigateur le lien affiché en console par npm.
