## Prueba Arkix

#### Pasos para instalar la API REST:
1. Instalar MongoDB y obtener la URI de la base de datos.
2. ``git clone https://github.com/carlosenambam/arkixtest.git``.
3. En el archivo ``settings.js`` del proyecto, asignar la URI de la base de datos MongoDB en la variable ``MONGODB`` y el puerto en el cual se ejecuta el servidor en la variable ``PORT``.
4. En el archivo ``public/js/crud.js``configurar la url del servidor en la variable ``url`` al inicio del archivo, esto será necesario para que las peticiones ``AJAX`` funcionen adecuadamente. Es importante que esta ``url`` tenga ``/books`` al final.
5. Dentro de la carpeta ejecutar: ``npm start``


### API REST
Con este API se pueden manipular los datos acerca de libros en el sistema.

- Para ver todos los libros se debe enviar una petición tipo ``GET``: ``/books``
- Para ver un libro en especifico, se debe enviar una petición tipo ``GET``: ``/books/{book_id}``, donde ``book_id`` es el ID del libro.
- Para crear un libro se debe enviar una petición tipo ``POST``: ``/books/``, el cuerpo de esta petición debe tener el formato ``JSON`` y debe tener tres propiedades: ``title``,``pages``, ``author``, el primero se refiere al titulo del libro, el segundo al número de páginas y el tercero al nombre del autor. Ejemplo: ``{ "title": "Cien Años de Soledad", "pages": "471", "author": "Gabriel Garcia Marquez"}``
- Para editar un libro se debe hacer una petición tipo ``PATCH``: ``/books/{book_id}``, el cuerpo de esta petición debe tener el formato ``JSON`` (mirar punto anterior) y debe tener por lo menos una de las siguientes propiedades propiedades: ``title``,``pages``, ``author``.
- Para eliminar un libro se debe enviar una petición tipo ``DELETE``: ``/books/{book_id}``.

### Despliegue en Heroku
Hay un despligue de esta API en Heroku: ``https://arkix-test.herokuapp.com/``, al entrar a la anterior URL se mostrará en pantalla un interfaz de usuario que usa la API REST. Esta interfaz también puede ser vista en ambiente local, solo hay que abrir un navegador y acceder a la ``url`` que se configuro en el paso 3 sin el ``/books`` al final (Ejemplo: ``http://localhost:3000/``).