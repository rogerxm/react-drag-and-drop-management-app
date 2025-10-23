# Prueba Técnica - Desarrollador Frontend (React)

##### Este es un proyecto que implementa una interfaz de drag and drop para gestionar listas de usuarios.

#### Demo

https://react-drag-and-drop-management-app.vercel.app/

### Características Principales

- **Listas de Usuarios**: Muestra dos listas: "Usuarios Generales" y "Usuarios Seleccionados".
- **Drag & Drop**: Permite mover usuarios entre las dos listas usando dnd-kit.
- **Navegación**: Usa react-router para mostrar una vista de detalle (/users/:id) y un formulario de creación (/users/new).
- **Gestión de Estado**: Maneja el estado global de las listas de usuarios usando Redux Toolkit.
- **¿Por qué elegí Redux?**

  La app necesita cargar datos de una API, mover usuarios entre dos listas y añadir nuevos. Redux Toolkit me da un lugar centralizado y muy organizado para manejar toda esa lógica.

- **Persistencia**: Guarda el estado de Redux en localStorage para persistir los cambios si se recarga la página.
- **Diseño Responsivo**: La interfaz se adapta a dispositivos móviles.

### Stack utilizado

- React
- TypeScript
- Vite
- Redux Toolkit (para manejo de estado)
- React Router (para navegación)
- @dnd-kit (para el drag and drop)
- Tailwind CSS (para estilos)
- Toaser (para notificaciones)
- Axios (para el consumo de la API)
- Vercel (para el deployment)

### Instrucciones para ejecutar el proyecto:

1. Clonar el Repositorio
   Link del repo: https://github.com/rogerxm/react-drag-and-drop-management-app

2. Instalar Dependencias

```
   npm install
```

3. Ejecutar el Proyecto

```
   npm run dev
```
