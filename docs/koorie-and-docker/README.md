# koorie and docker

___

###### the simplest way to run you Koorie application on Docker
___

### using 'git clone sparse-checkout' require git v2.19

```shell
git clone --no-checkout --filter=tree:0 https://github.com/simonedelpopolo/koorie
```

```shell
cd koorie && git sparse-checkout set docs/koorie-and-docker
```

```shell
git checkout main && cd docs/koorie-and-docker
```

- **_let's start with Docker_**  
  It is required by koorie to spin-up the server with flag --address=0.0.0.0 to properly works containerized  
  have a look at the Dockerfile.  
  the configuration is pretty simple.

```shell
docker build . -t koorie-and-docker/application 
```

```shell
docker run --name koorie-and-docker -p 3000:3000 -d koorie-and-docker/application
```

#### check it out

1. is the container up and running?
   ```shell
   docker ps -a
   ```

2. let's keep an eye on the docker logs the flag -f means to keep the stream on.
   ```shell
   docker logs -f koorie-and-docker
   ```

3 . make your requests

> koorie your browsers  
> 1 @ http://localhost:3000/ OR  
> 2 @ http://localhost:3000/index.html

1. response from the route index
2. index.html rendered.

___

## simple as drinking a glass of water 🜄
