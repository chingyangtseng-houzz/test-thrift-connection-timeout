DOCKER_USERNAME=chingyangtseng
CLIENT_IMAGE=$(DOCKER_USERNAME)/test-timeout-thrift-client:latest
SERVER_IMAGE=$(DOCKER_USERNAME)/test-timeout-thrift-server:latest
PLATFORMS=linux/amd64,linux/arm64

.PHONY: all client server deploy-client deploy-server

all: client server

client:
	docker buildx build --platform $(PLATFORMS) -t $(CLIENT_IMAGE) -f Dockerfile.client --push .

server:
	docker buildx build --platform $(PLATFORMS) -t $(SERVER_IMAGE) -f Dockerfile.server --push .

deploy-client:
	kubectl apply -f client-deployment.yml -nbackend --context teleport.ivyco.net-stg-batch-eks

deploy-server:
	kubectl apply -f server-deployment.yml -f server-service.yml -nbackend --context teleport.ivyco.net-stg-batch-eks
