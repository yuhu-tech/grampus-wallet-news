npm_cache := $(shell npm config get cache)
yarn_cache := $(shell yarn cache dir)
cwd := $(shell pwd)

repo := grampus/assets-news

# get latest git tag
tag := $$(git tag -l --sort=-v:refname | head -1)

# Unconditionally make all targets
# make build --always-make
.PHONY: build build-dev clean

build: Dockerfile
	@echo building image..
	docker build . -t grampus/assets-news

run-prod:
	@echo up and running grampus/assets
	docker run -d -p 3003:5000 --name grampus-assets-news grampus/assets-news

# alpine linux has no bash
sh:
	docker exec -it grampus/assets-news sh