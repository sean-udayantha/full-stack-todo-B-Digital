# full-stack-todo-B-Digital Fontend steup

React + TypeScript with Material UI, Atomic Design, RTK Query, Redux Toolkit, React Hook Form and Zod. Vite handles local development and production builds.


## Setup

From the **repository root**:

```powershell
npm install
```

`frontend/.env` is created in the working folder. After a fresh clone, copy `frontend/.env.example` to `frontend/.env`. It contains:

```dotenv
VITE_API_BASE_URL=http://localhost:4000/api
```

Start the MySQL database and backend using the [root setup](../README.md), then run:

```powershell
npm run dev
```

Open <http://localhost:5173>. To run both apps, use `npm run dev` at the root instead. Restart Vite after changing `.env`; Vite environment variables are public, build-time browser configuration.





# full-stack-todo-B-Digital Backend setup

A JavaScript ESM API using Node, Express, MVC and MySQL 8.0.46. The development Node version is v23.7.0.


## Setup

Install dependencies from the **repository root**:

```powershell
npm install
```

Make sure the Windows `MySQL80` service is running. The working folder has `backend/.env`; after cloning, copy `backend/.env.example` to `backend/.env`. Set the connection values to match your MySQL installation:

```dotenv
NODE_ENV=development
PORT=4000
CLIENT_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_local_password
DB_NAME=daylist
```

If a password contains `#` or whitespace, quote it in `.env`. These values are read from the backend directory regardless of where a command is launched. Shell environment variables take precedence over `.env`.

```powershell
npm run db:init
npm run dev:backend
```

`db:init` creates the database and `todos` table if missing. It preserves existing tasks and requires CREATE permission. A MySQL user restricted to an existing database can have the database created by an administrator first. Normal API operation needs SELECT, INSERT, UPDATE and DELETE. 

Visit <http://localhost:4000/api/health> to check the connection. The server checks both database connectivity and table existence before listening. `ER_ACCESS_DENIED_ERROR` usually means the username/password needs correcting; `ECONNREFUSED` usually means MySQL is stopped or the host/port is wrong. `ER_BAD_DB_ERROR` or a missing table means `db:init` has not completed.


you can user Swagger UI: <http://localhost:4000/api-docs> check APIs