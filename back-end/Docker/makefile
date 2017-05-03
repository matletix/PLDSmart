##prerequis
# sudo apt install postgresql #pour le client psql

#docker
installdocker:
	sudo apt install docker docker.io
	sudo groupadd docker
	sudo gpasswd -a ${USER} docker
	sudo service docker restart
	newgrp docker

#node 6
installnode:
	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
	sudo apt install -y nodejs
	sudo apt install -y build-essential

installpsql:
	sudo apt install -y postgresql


createVolume:
	mkdir -p ~/psql_data
	#We only have to do it onces, to persist datas
	docker volume create --name psqldata

#first time
run :
	docker run --name postgis -p 5432:5432 -d -v psqldata:/var/lib/postgresql -t kartoza/postgis
	#change default password ! (-> open 5432, pour dev)

#then
start:
	docker start postgis

stop:
	docker stop postgis

remove:
	docker rm postgis

#data (sql) storage ... ?

## PSQL
setupDB:
	psql -h localhost postgres -U docker -f create_db.sql
	psql -h localhost felicity -U docker -f create_table.sql
	psql -h localhost felicity -U docker -f insert_datas.sql

insert:
	psql -h localhost felicity -U docker -f addCourses.sql
