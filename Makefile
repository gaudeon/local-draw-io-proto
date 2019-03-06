build:
	sudo docker-compose build

start:
	docker-compose up -d

stop:
	docker-compose down

.PHONY: build start stop
