<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo

1. Clonar repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
nest i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Resconstruir la base de datos con la semilla (seed)
```
http://localhost:3000/api/v1/seed
```
## Stack usado
* MongoDB
* Nest