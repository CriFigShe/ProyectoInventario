# StockIt!

Para poder usar este proyecto tendremos que seguirn unos pasos:

## Variables de entorno

Lo primero que deberemos hacer antes de cualquier otra cosa será crear un archivo .env en la carpeta del backend haciendo click derecho sobre esta. Después tendremos que añadir una variable de entorno de la siguiente manera:

`JWT_SECRET=token`

Esta variable es la palabra clave que necesita JWT para generar el token que usaremos en toda la aplicación.

Además tendremos que tener Docker Desktop, en el caso de Windows, abierto y corriendo.

## Clonar proyecto

Lo primero que tendremos que hacer será clonar el proyecto desde GitHub. Para esto, abriremos Visual Studio Code y abriremos la terminal incorporada.

A continuación, ejecutaremos el comando `git clone https://github.com/CriFigShe/ProyectoInventario.git` en el directorio en el que queramos que este el proyecto.

Después, ejecutaremos el comando `cd ProyectoInventario` para ubicarnos en la carpeta del proyecto.

## Instalar depencias

Para instalar todas las dependencias necesarias, tanto en el front como en el back haremos lo siguiente:

- Ejecutaremos el comando `cd backend` el cual nos situará en la carpeta que contiene todo el backend del proyecto.

- Seguidamente lanzaremos el comando `npm install` para que instale todas las dependencias requeridas.

- Después, pondremos el comando `cd ..` para volver al directorio raíz.

- Repetiremos el proceso anterior, pero este vez para el frontend, lo unico es que en vez de hacer `cd backend` haremos `cd frontend/inventario` y con esto ya estaremos situados en la carpeta que contiene el frontend del proyecto.

- Para finalizar, lanzaremos el comando `npm install` otra vez para que se instalen las dependencias del frontend. Este comando tardará mas que el del backend ya que el front cuenta con mas dependencias.

## Poner docker en marcha

Lo siguiente que haremos será poner en marcha el contenedor de docker que contiene el backend y la base de datos.

Primero tendremos que ejecutar el comando `docker exec -it backend_container node database/init.js` dentro del directorio del backend para que se cree la base de datos.

Luego pondremos el comando `docker compose up --build` para contruir el contenedore de docker.

Una vez acabe de contruirse ya tendremos el backend y la base de datos disponibles.

## Arrancar el frontend

Lo ultimo que deberemos hacer será arrancar el frontend.

Para ello, primero iremos al directorio en el que se encuentra el frontend `cd frontend/inventario`. Luego lanzaremos el comando `npm run dev`. Y con esto, cuando haya cargado el comando nos dará la URL del front, a la cual entraremos haciendo `Ctrl + click` en la URL.

