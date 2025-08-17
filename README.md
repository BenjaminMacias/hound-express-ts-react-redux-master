# hound-express-ts-react-redux

Aplicación **full-stack** con **Express + TypeScript** en el backend y **React + Redux** en el frontend. La idea es mostrar un flujo completo: API REST tipada, manejo de estado global en el cliente y una estructura limpia para crecer.

> ⚠️ Nota: los nombres de carpetas pueden ser `server/` y `client/`. Ajusta los comandos si tu repo difiere.

---

## 🧭 Descripción

- **Backend (Express + TS):** API REST con rutas básicas, validación y controladores desacoplados.
- **Frontend (React + Redux):** vistas con Redux (Toolkit o redux clásico) para gestionar estado de forma predecible.
- **Objetivo:** servir de plantilla/boilerplate para proyectos TypeScript con separación clara entre cliente y servidor.

---

## 🛠️ Tecnologías utilizadas

**Backend**
- Node.js + Express
- TypeScript
- (Opcional) Zod/Joi para validación
- (Opcional) Jest + Supertest para pruebas

**Frontend**
- React 18
- Redux / Redux Toolkit + react-redux
- (Opcional) React Router
- (Opcional) Vite o Create React App
- (Opcional) Vitest / RTL para pruebas

---

## 📦 Instalación

Clona el repo y entra a la carpeta raíz:

```bash
git clone https://github.com/BenjaminMacias/hound-express-ts-react-redux-master.git
cd hound-express-ts-react-redux-master
1) Backend
bash
Copiar
Editar
cd server            # o la carpeta correspondiente
npm install
cp .env.example .env # si existe; si no, crea .env
Variables de ejemplo para .env:

env
Copiar
Editar
PORT=4000
NODE_ENV=development
# DB_URL=... (si aplica)
# CORS_ORIGIN=http://localhost:5173  # o 3000 según tu frontend
Compilar y levantar:

bash
Copiar
Editar
# desarrollo (ts-node / tsx)
npm run dev

# producción
npm run build
npm start
2) Frontend
En otra terminal:

bash
Copiar
Editar
cd client           # o la carpeta correspondiente
npm install
Si el frontend necesita conocer la URL del backend, crea .env:

env
Copiar
Editar
VITE_API_URL=http://localhost:4000
# o REACT_APP_API_URL=http://localhost:4000 si usas CRA
Levantar en desarrollo:

bash
Copiar
Editar
npm run dev   # (Vite)
# o
npm start     # (CRA)
▶️ Uso rápido
Backend: endpoints de ejemplo
bash
Copiar
Editar
# Salud del servidor
curl http://localhost:4000/api/health
# → { "status": "ok" }

# Recurso de ejemplo (ajusta si tu API es distinta)
curl http://localhost:4000/api/items
Frontend: consumo de la API
En el código del cliente, una llamada típica usando fetch:

ts
Copiar
Editar
// client/src/api/items.ts
const API = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL || "";

export async function getItems() {
  const res = await fetch(`${API}/api/items`);
  if (!res.ok) throw new Error("Error al obtener items");
  return res.json();
}
Redux: ejemplo de slice (simplificado)
ts
Copiar
Editar
// client/src/store/itemsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItems } from "../api/items";

export const fetchItems = createAsyncThunk("items/fetch", async () => {
  return await getItems();
});

const itemsSlice = createSlice({
  name: "items",
  initialState: { data: [], loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchItems.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchItems.fulfilled, (s, a) => { s.loading = false; s.data = a.payload; })
     .addCase(fetchItems.rejected, (s, a) => { s.loading = false; s.error = a.error.message || "Error"; });
  }
});

export default itemsSlice.reducer;
Y en un componente React:

tsx
Copiar
Editar
// client/src/pages/Home.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../store/itemsSlice";

export default function Home() {
  const dispatch = useDispatch<any>();
  const { data, loading, error } = useSelector((s: any) => s.items);

  useEffect(() => { dispatch(fetchItems()); }, [dispatch]);

  if (loading) return <p>Cargando…</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <ul>
      {data.map((it: any) => <li key={it.id}>{it.name}</li>)}
    </ul>
  );
}
🧪 Pruebas (opcional)
Backend

bash
Copiar
Editar
cd server
npm test
Frontend

bash
Copiar
Editar
cd client
npm test
📂 Estructura sugerida
pgsql
Copiar
Editar
hound-express-ts-react-redux-master/
├─ server/                 # Express + TypeScript
│  ├─ src/
│  │  ├─ app.ts
│  │  ├─ routes/
│  │  ├─ controllers/
│  │  └─ types/
│  ├─ tests/
│  └─ tsconfig.json
└─ client/                 # React + Redux
   ├─ src/
   │  ├─ api/
   │  ├─ store/
   │  ├─ pages/
   │  └─ App.tsx
   └─ vite.config.ts | package.json (CRA)
🔧 Troubleshooting
CORS: si el navegador bloquea peticiones, compara CORS_ORIGIN del backend con la URL del frontend.

Variables de entorno: confirma VITE_API_URL (Vite) o REACT_APP_API_URL (CRA).

Puertos: por defecto client corre en 5173 (Vite) o 3000 (CRA), y server en 4000.

📄 Licencia
MIT (o la que elijas).

makefile
Copiar
Editar
::contentReference[oaicite:0]{index=0}
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
