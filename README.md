# TP Sprint 6 - Backend

API REST para gestión académica construida con Node.js, Express y MongoDB.

## 1. Objetivo

Este servicio expone endpoints para autenticación, administración de usuarios, gestión de colegios, cursos, estudiantes, inscripciones, evaluaciones, historial de cambios de notas y plantillas de evaluación.

## 2. Stack técnico

- Runtime: Node.js (ESM)
- Framework HTTP: Express 5
- Base de datos: MongoDB + Mongoose
- Autenticación: JWT
- Hash de contraseñas: bcryptjs
- Validación: express-validator
- Gestión de configuración: dotenv
- CORS: cors
- Gestor de paquetes: pnpm

## 3. Estructura del proyecto

```text
src/
  app.mjs                    # Configuración de Express y middlewares globales
  config/
    dbconfig.mjs             # Conexión a MongoDB
  controllers/               # Adaptadores HTTP (req/res)
  services/                  # Lógica de negocio
  repositories/              # Acceso a datos
  models/                    # Esquemas de Mongoose
  middleware/                # Auth JWT y validaciones
  routes/                    # Definición de endpoints
  validators/                # Reglas de express-validator
server.mjs                   # Bootstrap del servidor
scripts/
  create-admin.mjs           # Seed de usuario administrador
```

## 4. Flujo de arranque

1. Cargar variables de entorno.
2. Conectar a MongoDB.
3. Levantar servidor HTTP en el puerto configurado.
4. Exponer rutas bajo el prefijo global /api.

## 5. Variables de entorno

Basado en .env.example:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://dbAdmin:<db_password>@cluster0.039s5ru.mongodb.net/?appName=<db_cluster>
JWT_SECRET=<jwt_secret_key>
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@email.com
ADMIN_PASSWORD=admin123
```

Notas:
- JWT_SECRET es requerido para firma y verificación de tokens.
- ADMIN_* se utiliza por el script de seed.

## 6. Instalación y ejecución

```bash
pnpm install
pnpm dev
```

Comandos adicionales:

```bash
pnpm start
pnpm seed:admin
```

## 7. Seguridad y autorización

Middleware principal en src/middleware/authMiddleware.mjs:

- authenticateToken: valida token Bearer y carga req.user.
- authorizeRoles(...roles): restringe acceso por rol.

Header esperado:

```http
Authorization: Bearer <jwt_token>
```

## 8. Módulos de API

Prefijo base: /api

### 8.1 Auth

- POST /auth/register
- POST /auth/login

### 8.2 Usuarios

- GET /users
- GET /users/school/:schoolId/teachers
- GET /users/:id
- POST /users/create
- PUT /users/update/:id
- PATCH /users/update/:id/password
- PATCH /users/deactivate/:id
- DELETE /users/delete/:id

### 8.3 Colegios

- GET /schools
- GET /schools/mine
- GET /schools/:id/exists
- GET /schools/:id
- POST /schools/create
- PUT /schools/update/:id
- PATCH /schools/deactivate/:id

### 8.4 Cursos

- GET /courses/teacher/:teacherId
- GET /courses/school/:schoolId
- GET /courses/school/:schoolId/with-student-count
- GET /courses/:courseId/teacher/:teacherId/is-owner
- GET /courses/:id
- POST /courses/create
- PUT /courses/update/:id
- PATCH /courses/deactivate/:id

### 8.5 Estudiantes

- GET /students/school/:schoolId
- GET /students/school/:schoolId/search
- GET /students/school/:schoolId/document/:documentNumber
- GET /students/:id
- POST /students/create
- POST /students/bulk-create
- PUT /students/update/:id
- PATCH /students/deactivate/:id

### 8.6 Inscripciones

- GET /enrollments/course/:courseId
- GET /enrollments/course/:courseId/count
- GET /enrollments/student/:studentId
- GET /enrollments/course/:courseId/student/:studentId
- GET /enrollments/school/:schoolId/course/:courseId/students-not-enrolled
- GET /enrollments/:id
- POST /enrollments/course/:courseId/add-student
- POST /enrollments/course/:courseId/add-students-bulk
- POST /enrollments/create
- POST /enrollments/bulk-create
- PUT /enrollments/update/:id
- PATCH /enrollments/update/:id/status
- PATCH /enrollments/course/:courseId/student/:studentId/drop

### 8.7 Evaluaciones

- GET /evaluations/course/:courseId
- GET /evaluations/course/:courseId/student/:studentId
- GET /evaluations/course/:courseId/distinct
- GET /evaluations/course/:courseId/export
- GET /evaluations/enrollment/:enrollmentId
- GET /evaluations/enrollment/:enrollmentId/numeric
- GET /evaluations/original/:originalEvaluationId/recoveries
- GET /evaluations/:id
- POST /evaluations/create
- PUT /evaluations/update/:id
- DELETE /evaluations/delete/:id

### 8.8 Historial de notas

- GET /grade-history/evaluation/:evaluationId
- GET /grade-history/course/:courseId
- GET /grade-history/course/:courseId/student/:studentId
- GET /grade-history/teacher/:teacherId
- POST /grade-history/log/create
- POST /grade-history/log/update
- POST /grade-history/log/delete

### 8.9 Plantillas de evaluación

- GET /assessment-templates/global
- GET /assessment-templates/school/:schoolId
- GET /assessment-templates/school/:schoolId/available
- GET /assessment-templates/:id/active
- GET /assessment-templates/:id
- POST /assessment-templates/create
- PUT /assessment-templates/update/:id
- PATCH /assessment-templates/deactivate/:id

## 9. Health check recomendado

Actualmente no existe endpoint de health explícito. Para monitoreo en producción se recomienda agregar:

- GET /api/health
- Respuesta mínima: status, uptime, timestamp, versión

## 10. Deploy

Pegar aquí la URL pública del backend para copiarla rápido:

```txt
https://TU-BACKEND-DEPLOY.com
```

Opcional, en formato extendido:

```txt
Backend API: https://TU-BACKEND-DEPLOY.com
Frontend: https://TU-FRONTEND-DEPLOY.com
```
