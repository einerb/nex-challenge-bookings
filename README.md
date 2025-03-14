# API de Booking Room

🏨 API para el agendamiento o reserva de habitaciones en un hotel. Se implementó el enfoque de arquitectura limpia (Clean Architecture) conuna estructura de carpeta   

## 🚀 Instalación y Ejecución

Puedes ejecutar este proyecto de dos formas:

### 1️⃣ Instalación Manual (Sin Docker)

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/einerb/nex-challenge-bookings.git
   cd nex-challenge-bookings
   ```

2. **Instalar dependencias:**

   ```bash
   yarn install
   ```

3. **Configurar variables de entorno:**

   - Renombrar el archivo de ejemplo .env.example:
     ```bash
     mv .env.example .env
     ```

4. **Ejecutar migraciones y semillas (si aplica):**

   ```bash
   npm run db:deploy
   ```

5. **Levantar el servidor:**
   ```bash
   npm run start
   ```
   La API estará corriendo en `http://localhost:3000/graphql`

---

### 2️⃣ Usando Docker 🐳

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/einerb/nex-challenge-bookings.git
   cd nex-challenge-bookings
   ```

2. **Levantar los contenedores:**

   ```bash
   docker compose up --build -d
   ```

   Esto levantará la API junto con su base de datos.

3. **Verificar que todo esté corriendo:**

   ```bash
   docker ps
   ```

4. **Acceder a la API en:**
   ```
   http://localhost:3000/graphql
   ```


## 🛠 Tecnologías Utilizadas

- **NestJS**
- **Typescript** como lenguaje de programación
- **PostgreSQL** como base de datos
- **Prisma** como ORM
- **Docker** para contenerización

---

## 🏗 Arquitectura

El proyecto sigue la **Arquitectura Limpia (Clean Architecture)** con la separación en capas:

- **Domain:** Entidades y lógica de negocio.
- **Application:** Casos de uso y servicios.
- **Infrastructure:** Repositorios y conexión con bases de datos.
- **Presentation:** Resolver y la exposición de schema GraphQL.

---

## 📫 Contacto

Si tienes dudas o sugerencias, puedes contactarme en:
📧 [einerbravo@gmail.com](mailto:einerbravo@gmail.com)
