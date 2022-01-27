

# CHALLENGE BACKEND - NodeJs
 

### Objetivo
Desarrollar una API para explorar el mundo de Disney, la cual permitirá conocer y modificar los
personajes que lo componen y entender en qué películas estos participaron. Por otro lado, deberá
exponer la información para que cualquier frontend pueda consumirla.

### Antes de empezar...
Esta API de prueba se puede correr en un contendor de [Docker](#instalación-docker) o [Localmente](#instalación-local). Para correrla localmente es necesario tener instalado Node y Postgres SQL.

### Instalación Local 
En una consola:
- git clone https://github.com/javicara/challengeAlkemy.git
- cd challengeAlkemy
- `npm install`


#### Start


````
npm start
````
Despues de ejecutar ese comando la aplicacion correra en un puerto seteado en las variables de entorno expuestas
a proposito al igual que la conexion a la base de datos ya que no es informacion sensible

Por defecto correra en el puerto 3002 y mostrara lo siguiente: 

**Server runing in: 3002**

**To see the API documentation, please visit http://localhost:3002/api/v1/docs/**

### Funcionamiento de los endpoints.
Para entender el funcionamiento de los endpoints se debe visitar el link que se muestra en consola. La misma fue realizada con Swagger.

### Instalción Docker
Claramente es necesario tener Docker.
En una consola:
- git clone https://github.com/javicara/challengeAlkemy.git
- cd challengeAlkemy
- git checkout --track origin/docker
En este caso tambien a proposito estan expustas 

#### Start with docker
- docker compose up

Y eso es todo el la consola deberia mostrar un mensaje similar al de la insalacion local y el puerto por defecto es el 3001. 
En este caso para ver la documentacion http://localhost:3001/api/v1/docs/

