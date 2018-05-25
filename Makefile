.PHONY: help lint build login logout deploy dev clean

help:
	@echo "make login   -------->> to log in to your google account."
	@echo "make logout  -------->> to log out of your google account."
	@echo "make dev     -------->> to to install dependencies using yarn."
	@echo "make build   -------->> to compile the code."
	@echo "make lint    -------->> to check code quality."
	@echo "make deploy  -------->> to push the code to appscript."
	@echo "make clean   -------->> to clean up installed dependencies."

node_modules:
	yarn install

build: node_modules
	npm run build

lint: build
	npm run lint

login: node_modules
	./node_modules/.bin/clasp login

logout: node_modules
	./node_modules/.bin/clasp logout

deploy: build
	cd dist && ./../node_modules/.bin/clasp push && cd ..

dev: node_modules

clean:
	rm -rf node_modules
