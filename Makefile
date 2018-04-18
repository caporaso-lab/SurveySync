
help:
	@echo "make build  -------->> to compile the code."
	@echo "make lint   -------->> to check code quality."
	@echo "make deploy -------->> to push the code to appscript."
	@echo "make dev    -------->> to install yarn package manager."

lint:
	npm run lint

build:
	npm run build

deploy:
	./node_modules/.bin/clasp login
	cd dist && ./../node_modules/.bin/clasp push && cd ..

dev:
	install yarn
