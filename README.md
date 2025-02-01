<p align="center">
  <a href="https://nextjs.org" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" width="120" alt="Next.js Logo">
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://laravel.com" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" width="120" alt="Laravel Logo">
  </a>
</p>

# Proyecto Next.js con API RESTful de Laravel "List to do"

Este proyecto es complemento de una **API RESTful** creada anteriormente con **Laravel**. Utiliza **Sanctum** para la autenticación de usuarios, permitiendo un acceso seguro mediante tokens en un login. Está diseñado como un entorno backend y puede ser integrado con frameworks frontend como lo es este caso, que se utilizo **Next.js** para su uso.

## Características

- **Autenticación segura**: Implementación de autenticación basada en tokens con Laravel Sanctum.
- **CRUD completo**: Operaciones de creación, lectura, actualización y eliminación para los recursos de las tareas asignadas.
- **UI minimalisata**: Obtado por una mejor experiecia de usuario.

## Requisitos previos

- Laravel (Backend)
- Node.js 

## Instalación

1. Clona el backend de la API RESTful:
   ```bash
   git clone https://github.com/JoseNava100/laravel-api-rest-to-do-list
   cd laravel-api-rest-to-do-list
   ```

2. Clona el frontend:
   ```bash
   git clone https://github.com/JoseNava100/nextjs-api-rest-list-to-do
   cd nextjs-api-rest-list-to-do
   ```

3. Crea un archivo `.env.local`:
   - Crea la variable del nombre del proyecto que se utiliza:
     ```bash
     NEXT_NAME_APLICATION="List to do"
     ```

4. Instala las dependencias de Node.js:
   ```bash
   npm install
   ```

5. Ejecuta la aplicación:
   ```bash
   npm run dev
   ```

## Creador

Este proyecto fue creado por [JoseNava100](https://github.com/JoseNava100/laravel-sanctum-api-rest).

## Capturas

