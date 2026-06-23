# 📚 Documentación - Biblioteca Digital (Frontend)

## ¿Qué es este proyecto?

Es una aplicación web hecha en **React** que permite gestionar una biblioteca digital.
Se conecta a un backend en Spring Boot que corre en `http://localhost:8080`.

Permite a los usuarios:
- Registrarse e iniciar sesión
- Ver, agregar, editar y eliminar libros
- Registrar préstamos y devoluciones

---

## 🗂️ Estructura del proyecto

```
src/
├── components/     → Piezas reutilizables de interfaz
├── pages/          → Pantallas completas de la app
├── services/       → Comunicación con el backend (API)
├── App.js          → Rutas de la aplicación
├── index.js        → Punto de entrada
├── App.css         → Estilos generales
└── index.css       → Estilos base
```

---

## 📦 SERVICES — Comunicación con el Backend

Son los archivos que hacen las llamadas HTTP al servidor.
Están en `src/services/`.

---

### `authService.js`
Maneja todo lo relacionado con el usuario (login, registro, sesión).

| Método | Qué hace |
|---|---|
| `login(correo, contrasena)` | Envía correo y contraseña al backend. Si es correcto, guarda el token en `localStorage` |
| `register(nombre, correo, contrasena)` | Crea una cuenta nueva en el sistema |
| `logout()` | Elimina la sesión del `localStorage` |
| `getCurrentUser()` | Devuelve los datos del usuario que está logueado |
| `isAuthenticated()` | Devuelve `true` si hay un usuario logueado, `false` si no |

---

### `libroService.js`
Maneja todas las operaciones sobre los libros.

| Método | Qué hace |
|---|---|
| `getAll()` | Trae todos los libros del sistema |
| `getDisponibles()` | Trae solo los libros que no están prestados |
| `getById(id)` | Trae un libro específico por su ID |
| `create(libro)` | Crea un libro nuevo |
| `update(id, libro)` | Actualiza los datos de un libro existente |
| `delete(id)` | Elimina un libro del sistema |

---

### `prestamoService.js`
Maneja los préstamos de libros.

| Método | Qué hace |
|---|---|
| `getAll()` | Trae todos los préstamos (activos y devueltos) |
| `getActivos()` | Trae solo los préstamos que aún no han sido devueltos |
| `create(prestamoData)` | Registra un nuevo préstamo (qué libro, qué usuario) |
| `devolver(id)` | Marca un préstamo como devuelto |

---

## 🧩 COMPONENTS — Piezas reutilizables

Son componentes que se usan en varias páginas.
Están en `src/components/`.

---

### `Navbar.js`
Es la barra de navegación que aparece en la parte superior de todas las páginas (excepto login y registro).

**Contiene:**
- Logo y nombre "Biblioteca Digital"
- Enlace a Dashboard
- Enlace a Libros
- Enlace a Préstamos
- Nombre del usuario logueado
- Botón "Salir" que cierra la sesión y redirige al login

---

### `PrivateRoute.js`
Protege las rutas que requieren estar logueado.

**Cómo funciona:**
- Si el usuario **está logueado** → muestra la página normalmente
- Si el usuario **NO está logueado** → lo redirige automáticamente a `/login`

Se usa en `App.js` para envolver las páginas protegidas.

---

### `Layout.js`
Es el contenedor general de las páginas privadas.

**Contiene:**
- El `Navbar` en la parte superior
- El contenido de la página debajo

Todas las páginas internas (Dashboard, Libros, Prestamos) usan este Layout para no repetir el Navbar en cada una.

---

## 📄 PAGES — Pantallas de la aplicación

Están en `src/pages/`.

---

### `Login.js`
Pantalla de inicio de sesión.

**Qué hace:**
- Muestra un formulario con campos de correo y contraseña
- Al enviar, llama a `authService.login()`
- Si el login es exitoso → muestra alerta de bienvenida y redirige al Dashboard
- Si falla → muestra mensaje de error

---

### `Register.js`
Pantalla de registro de nuevos usuarios.

**Qué hace:**
- Muestra un formulario con nombre, correo, contraseña y confirmar contraseña
- Valida que las contraseñas coincidan y tengan mínimo 6 caracteres
- Si el registro es exitoso → redirige al Login
- Si falla → muestra mensaje de error

---

### `Dashboard.js`
Pantalla principal después de iniciar sesión.

**Qué muestra:**
- Saludo con el nombre del usuario logueado
- 3 tarjetas con estadísticas:
  - Total de libros en el sistema
  - Libros disponibles para préstamo
  - Préstamos activos actualmente
- Sección informativa con las funciones principales del sistema

---

### `Libros.js`
Pantalla de gestión del catálogo de libros.

**Qué hace:**
- Muestra una tabla con todos los libros (ID, título, autor, año, ISBN, estado)
- El estado puede ser **Disponible** (verde) o **Prestado** (rojo)
- Botón **Nuevo Libro** → abre un formulario para crear un libro
- Botón **Editar** (lápiz) → abre el formulario con los datos del libro para modificarlos
- Botón **Eliminar** (basura) → pide confirmación y elimina el libro
- Si no hay libros → muestra un mensaje y botón para agregar el primero

---

### `Prestamos.js`
Pantalla de gestión de préstamos.

**Qué hace:**
- Muestra una tabla con todos los préstamos (usuario, libro, fechas, estado)
- El estado puede ser **ACTIVO** (amarillo) o **DEVUELTO** (verde)
- Botón **Nuevo Préstamo** → abre un formulario donde se selecciona el libro a prestar
  - El usuario se toma automáticamente del que está logueado
  - Solo muestra libros disponibles en el selector
  - Nota informativa: el período de préstamo es de 15 días
- Botón **Devolver** → aparece solo en préstamos activos, registra la devolución

---

## 🔀 App.js — Rutas de la aplicación

Define a qué página va el usuario según la URL.

| Ruta | Página | ¿Requiere login? |
|---|---|---|
| `/` | Redirige a `/login` | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/dashboard` | Dashboard | ✅ Sí |
| `/libros` | Libros | ✅ Sí |
| `/prestamos` | Prestamos | ✅ Sí |

Las rutas con "✅ Sí" están envueltas en `PrivateRoute`, por lo que si el usuario no está logueado, lo manda automáticamente al login.

---

## 🎨 Estilos

### `index.css`
- Resetea márgenes y paddings de todos los elementos
- Aplica el fondo con gradiente morado/azul a toda la app
- Fuente: Segoe UI

### `App.css`
- Estilo del área de contenido (debajo del Navbar)
- Animación suave en las cards al pasar el mouse (se elevan)
- Animación en los botones al pasar el mouse (se agrandan levemente)

---

## 🔗 Dependencias principales

| Paquete | Para qué se usa |
|---|---|
| `react-router-dom` | Navegación entre páginas (rutas) |
| `axios` | Hacer llamadas HTTP al backend |
| `bootstrap` + `react-bootstrap` | Componentes visuales y estilos (tablas, botones, modales, etc.) |
| `react-icons` | Iconos (FaBook, FaEdit, FaTrash, etc.) |
| `sweetalert2` | Alertas y confirmaciones con estilo (popups de éxito, error, confirmación) |

---

## ▶️ Cómo ejecutar el proyecto

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Iniciar la aplicación
npm start
```

La app abre en: **http://localhost:3000**
El backend debe estar corriendo en: **http://localhost:8080**
