### Requisitos:

- Archivo .env para declarar las variables de entorno.
- Base de datos MySQL.
- Postman para registrar un usuario.
- Extensión "ModHeader" de Chrome para acceder a la ruta de graphql desde el navegador.


### Documentacion
Crea un archivo en la raiz del proyecto ".env" con la siguiente estructura:<br />

```
DB_HOSTNAME=localhost
DB_PORT=3306
DB_DATABASE=lms_z1
DB_USERNAME=root
DB_PASSWORD=root
```

Para arrancar el servidor basta con utilizar el comando "npm run dev", si se quisiera lanzar a producción, habría que ejecutar el comando "npm run build" para convertir la app typescript en javascript donde se nos generará una carpeta "build". Una vez tenemos esa carpeta se puede lanzar el comando "npm start" o "npm run start".

Una vez que se ha ejecutado por primera vez el proyecto y conecta con la base de datos hay que sincronizar la base de datos para agregar las tablas y relaciones que necesita el proyecto, para eso, dirigete dentro de la carpeta "src" y en el archivo "mysql.ts" cambia la propiedad:

```
synchronize: true,
```

En cuanto se sincronice vuelve a dejarlo en "false" esa propiedad.

#### Nota a tener en cuenta

Cuando se haya registrado el usuario, el servidor te va a devolver un "user_id" y un "role", esos dos parámetros son los que habrá que meter en el header de la extensión "ModHeader" de Chrome para poder tener acceso a la ruta de graphql, sinó no se podrá acceder, ya que tiene ese middleware de seguridad.

Una vez dentro, las peticiones las verifica únicamente con el "user_id" del header de la petición donde obtendrá el dato del usuario y por ende el role.