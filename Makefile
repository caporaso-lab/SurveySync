.PHONY: help
help:
	@echo "make build  -------->> to compile the code."
	@echo "make lint   -------->> to check code quality."
	@echo "make login  -------->> to log in to your google account."
	@echo "make deploy -------->> to push the code to appscript."
	@echo "make dev    -------->> to install yarn package manager."

.PHONY: lint
lint:
	npm run lint

.PHONY: build
build:
	npm run build

.PHONY: login
login:
	./node_modules/.bin/clasp login

.PHONY: deploy
deploy:
	cd dist && ./../node_modules/.bin/clasp push && cd ..

.PHONY: dev
dev:
	yarn install
