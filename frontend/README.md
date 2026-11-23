# full-stack-todo-B-Digital Fontend

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