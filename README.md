# Thrift Client-Server Environment

This repository contains a Thrift client-server setup with Docker and Kubernetes. Follow the steps below to bootstrap the environment.

## Prerequisites

- Docker
- Docker Buildx
- Kubernetes (kubectl)
- Node.js

## Setup

### 1. Clone the Repository

```sh
git clone https://github.com/your-repo/thrift-client-server.git
cd thrift-client-server
```

### 2. Build and the Docker Images

Ensure Docker Buildx is installed and set up. Then, build and push the Docker images for both the client and server.

```sh
make all
```

### 3. Deploy the Server and Client
Deploy the server and client to Kubernetes according to your environment
