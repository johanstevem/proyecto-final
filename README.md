# La guia para ejecutar las cosas están en estas lineas del readme (en caso de ya tener las dependencias instaladas)
backend: linea 46
frontend: linea 124



# Hotel Backend - Laravel API

Este proyecto corresponde al backend de un sistema de gestión para un hotel, desarrollado con **Laravel**. La API proporciona las funcionalidades necesarias para gestionar habitaciones, reservas, roles, servicios, comentarios, facturas, y usuarios.

## Flujo de Trabajo del Backend
### 1. Controladores CRUD con Herencia
Los controladores están organizados en el directorio app/Http/Controllers/api y manejan las operaciones para las entidades como Habitación, Reserva, Comentario, entre otras. Para reducir la repetición de código, hemos implementado un controlador base que contiene las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) genéricas.

Cada controlador específico hereda de este controlador base, lo que permite que todas las operaciones comunes estén disponibles (CRUD) automáticamente sin necesidad de reescribir el código. Este enfoque también facilita la creación de funciones específicas según las necesidades de cada entidad.

Ejemplo:
El controlador habitacionController.php hereda del controlador base, por lo que puede usar las operaciones CRUD sin tener que redefinirlas. Si se necesita una funcionalidad especial, como autentificar el token (como en el caso de auth en la funcion login), esa funcionalidad se puede agregar como un método adicional en el controlador especifico

### 2. Rutas API
Las rutas de la API están definidas en el directorio routes/api y están organizadas por entidad. Cada archivo de rutas está vinculado a su respectivo controlador para manejar las solicitudes API. Es decir cada ruta está separa para mantener una organización y orden, y luego se importan en api de las routes de forma general para que se vea más limpio

Ejemplo de rutas:
authRoute.php: Rutas para la autenticación de usuarios.
habitacionRoute.php: Rutas para gestionar las habitaciones.
reservaRoute.php: Rutas para gestionar las reservas.
y luego se importan esos archivos en el api de routes, basicamente importamos unas 20 rutas con un par de lineas en el api general

### 3. Modelos
Los modelos representan las entidades de la base de datos y están ubicados en app/Models. Cada modelo se vincula a una tabla de la base de datos y contiene la lógica relacionada con esa entidad, como relaciones con otras tablas y validaciones de datos.

Ejemplo de modelos:
Usuario.php: Modelo para los usuarios.
Habitacion.php: Modelo para las habitaciones del hotel.
Reserva.php: Modelo para las reservas realizadas por los clientes.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- **PHP** >= 7.3
- **Composer**
- **Postgresql** (y configurar el .env con sus credenciales, además de tener habilitada la configuración de php para poder usar postgresql)
- **Laravel** >= 8.x

## Instalación y Configuración
instalar dependencias;

composer install

migrar tablas:
php artisan migrate


### 1. entra a la carpeta por la consola
cd hotel-backend

### 2. corre el servidor con:
php artisan serve

### 3. la consola mostrará un mensaje con el puerto en el que se abrió
#### 3.1. debe agregar /api/nombreTabla/Metodo como en este ejemplo para obtener los datos

http://127.0.0.1:8000 
--------------------------------------------------------------------

# Hotel Frontend - Angular

Este proyecto corresponde al frontend de un sistema de gestión para un hotel. En él se manejan funcionalidades para diferentes roles de usuario, como Cliente y Administrador, utilizando Angular. A continuación se describe el flujo del sistema y las funcionalidades principales.

## Flujo de Uso

### 1. Creación de Roles
Antes de comenzar a interactuar con el sistema, es necesario asegurarse de que los roles **cliente** y **administrador** (con minusculas) estén correctamente creados. Estos roles son fundamentales para las validaciones de permisos y acceso a las diferentes funcionalidades de la aplicación, especialmente en el proceso de login por las validaciones configuradas en el frontend con esos roles.

- **Roles necesarios**:
  - cliente
  - administrador

Generalmente, los roles se crearían utilizando herramientas como **Postman** para hacer solicitudes a la API, pero para simplificar las pruebas del frontend, se ha agregado una opción en la barra de navegación para gestionar y crear estos roles directamente desde la interfaz. Esto facilita el proceso de testeo sin depender de herramientas externas.

### 2. Registro de Usuario
Una vez que los roles estén creados, el siguiente paso es registrar un usuario. Dependiendo del propósito del usuario, este debe ser registrado con uno de los roles antes mencionados.

### 3. Inicio de Sesión
Después de registrarse, se debe iniciar sesión con un usuario que tenga asignado el rol **Administrador**. Este rol tiene acceso a las funcionalidades de administración del sistema, como la creación de habitaciones.

### 4. Funcionalidades del Administrador
- **Crear Habitaciones**: Una vez logueado como administrador, podrás gestionar las habitaciones del hotel desde la sección correspondiente en el menú de navegación. El administrador es el único que tiene permisos para realizar esta acción.

### 5. Funcionalidades del Cliente
Después de que las habitaciones han sido creadas por un administrador, un usuario con el rol **Cliente** puede iniciar sesión y acceder a las siguientes funcionalidades:
- **Servicio**: El cliente puede solicitar servicios disponibles en el hotel.
- **Factura**: El cliente puede ver y gestionar sus facturas.
- **Reserva**: El cliente puede realizar reservas de habitaciones.
- **Comentario**: El cliente puede dejar comentarios sobre el servicio.

### 6. Comentarios Generales
Cualquier usuario, incluso antes de iniciar sesión, puede ver una lista general de comentarios desde la opción `Lista de Comentarios` en el **Navbar**. Esta funcionalidad está disponible sin restricciones para que cualquier visitante del sitio web pueda consultar las opiniones y comentarios de otros usuarios.

## Estructura del Proyecto

El frontend está organizado en módulos y componentes para mantener una estructura clara y escalable. Aquí está una visión general de cómo están organizados los principales directorios del proyecto:

- **core**: Contiene las interfaces y servicios generales que interactúan con la API.
  - `interfaces/`: Define las estructuras de datos que se usan en todo el frontend.
  - `services/api/`: Incluye los servicios que interactúan con la API del backend.
  
- **features**: Contiene las funcionalidades principales del sistema, divididas por áreas específicas.
  - `admin/`: Funcionalidades exclusivas para el administrador (gestión de habitaciones).
  - `comentario/`: Componentes relacionados con la creación de comentarios.
  - `factura/`: Módulo de gestión de facturas para los clientes.
  - `habitacion/`: Gestión de habitaciones, solo accesible por el administrador.
  - `reserva/`: Componentes para la reserva de habitaciones por parte de los clientes.
  - `servicio/`: Servicios disponibles para los clientes durante su estadía en el hotel.

- **shared/routes**: Contiene las rutas compartidas entre los distintos módulos del sistema.

## Requisitos Previos

- Angular CLI versión 12 o superior.
- Node.js y npm instalados en tu sistema.

## Instrucciones para Ejecutar el Proyecto

1. primero debe ingresar a la carpeta de frontend:
cd frontend
(o como prefiera acceder a la carpeta por la consola)
2. Instala las dependencias del proyecto:
   ```bash
   npm install
3. Ejecuta con:
ng serve
3.1. se abrirá en el http://localhost:4200/home

