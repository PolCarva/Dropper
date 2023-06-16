# Dropper
https://droppershop.netlify.app/

Este proyecto es una aplicación de ecommerce básica utilizada como parte de un curso de React. La aplicación permite a los usuarios ver y navegar una lista de prendas de vestir en una tienda imaginaria y realizar compras en línea. Los productos y las órdenes de compra se almacenan en una base de datos de Firebase.

## Tecnologías utilizadas
- React: una biblioteca de JavaScript para construir interfaces de usuario.
- React Router: una biblioteca de enrutamiento para aplicaciones de React.
- Firebase: una plataforma de desarrollo de aplicaciones en la nube que proporciona servicios y herramientas para la creación de aplicaciones web y móviles.
- Vite: un entorno de desarrollo web rápido que permite construir aplicaciones React de manera eficiente.
- Bootstrap: un framework de diseño front-end que facilita el desarrollo de sitios web y aplicaciones web responsivas.
- Sweet Alert 2: una biblioteca de JavaScript que proporciona una forma fácil y atractiva de mostrar alertas. Es una mejora y una alternativa a las alertas modales predeterminadas del navegador.

## Funcionalidades
- Ver una lista de productos disponibles.
- Filtrar productos por categoría.
- Agregar productos al carrito de compras.
- Ver detalle del producto.
- Ver el carrito de compras.
- Realizar una orden de compra la cual disminuye el stock en la base de datos.
- Recargar randómicamente el stock en caso de que no haya productos (siempre hay como mínimo uno sin stock como muestra).

## Instalación

### Para instalar y ejecutar la aplicación en tu máquina local, sigue los siguientes pasos:

1. Asegúrate de tener Node.js instalado en tu sistema.
2. Clona el repositorio a tu máquina local.
3. Abre una terminal en el directorio del proyecto.
4. Ejecuta el comando npm install para instalar las dependencias.
5. Ejecuta el comando npm run dev para iniciar la aplicación.
6. Abre tu navegador y navega a http://localhost:5173/ para ver la aplicación en acción.

## Configuración de Firebase

### Para utilizar Firebase en esta aplicación, debes seguir los siguientes pasos:

1. Crea una cuenta en Firebase y crea un nuevo proyecto.
2. En la sección "Authentication" de Firebase, habilita el proveedor de 3. autenticación de correo electrónico y contraseña.
4. En la sección "Firestore" de Firebase, crea una nueva base de datos y configura las reglas de seguridad para permitir lectura/escritura solamente a usuarios autenticados.
5. En la sección "Project settings" de Firebase, haz clic en "Add app" y sigue las instrucciones para agregar una nueva aplicación web.
6. Copia las credenciales de Firebase y configura las variables de entorno en el archivo .env de tu proyecto.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más información.
