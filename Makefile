all:
	sudo docker container ls

buildrun: Dockerfile
	sudo docker build -t redirect:1.0 .
	sudo docker run --name redirect -d -p 12701:12701 redirect:1.0

kill:
	sudo docker kill redirect

remove:
	sudo docker rm redirect
