# 📚 Biblioteca Digital - Frontend

Aplicación web en React para gestionar libros, usuarios y préstamos de una biblioteca digital.
Se conecta a un backend en Spring Boot.

---

## ✅ Requisitos previos

Antes de correr el proyecto, asegúrate de tener instalado:

- **Node.js** v18 o superior → https://nodejs.org
- **npm** (viene incluido con Node.js)
- El **backend** corriendo en `http://localhost:8080`

Para verificar que Node y npm están instalados, abre una terminal y ejecuta:

```bash
node --version
npm --version
```

---

## 🚀 Cómo correr el proyecto

**1. Clonar o descargar el proyecto**

```bash
git clone <url-del-repositorio>
cd biblioteca-frontend
```

**2. Instalar las dependencias**

```bash
npm install
```

> Solo es necesario hacerlo la primera vez, o cuando se agreguen nuevas librerías.

**3. Iniciar la aplicación**

```bash
npm start
```

La app se abre automáticamente en el navegador en:
**http://localhost:3000**

---

## 📦 Dependencias del proyecto

| Paquete | Versión | Para qué se usa |
|---|---|---|
| `react` | 19.x | Librería principal de la interfaz |
| `react-router-dom` | 7.x | Navegación entre páginas |
| `axios` | 1.x | Llamadas HTTP al backend |
| `bootstrap` | 5.x | Estilos y diseño responsivo |
| `react-bootstrap` | 2.x | Componentes visuales (botones, tablas, modales) |
| `react-icons` | 5.x | Iconos |
| `sweetalert2` | 11.x | Alertas y popups con estilo |

Todas se instalan automáticamente con `npm install`.

---

## 🔗 Conexión con el Backend

El frontend consume los siguientes endpoints:

| Servicio | URL base |
|---|---|
| Autenticación | `http://localhost:8080/api/auth` |
| Libros | `http://localhost:8080/api/libros` |
| Préstamos | `http://localhost:8080/api/prestamos` |

> El backend debe estar corriendo **antes** de usar la aplicación.

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Layout.js         → Contenedor con barra de navegación
│   ├── Navbar.js         → Barra de navegación superior
│   └── PrivateRoute.js   → Protección de rutas privadas
├── pages/
│   ├── Login.js          → Pantalla de inicio de sesión
│   ├── Register.js       → Pantalla de registro
│   ├── Dashboard.js      → Panel principal con estadísticas
│   ├── Libros.js         → Gestión del catálogo de libros
│   └── Prestamos.js      → Gestión de préstamos y devoluciones
├── services/
│   ├── authService.js    → Login, registro y manejo de sesión
│   ├── libroService.js   → CRUD de libros
│   └── prestamoService.js→ Préstamos y devoluciones
├── App.js                → Definición de rutas
└── index.js              → Punto de entrada
```

---

## 📖 Documentación detallada

Consulta el archivo [`DOCUMENTACION.md`](./DOCUMENTACION.md) para ver en detalle qué hace cada archivo, componente y servicio del proyecto.
