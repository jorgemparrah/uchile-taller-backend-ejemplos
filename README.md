# Demo Backend - Taller

Proyecto educativo para demostrar conceptos de backend con NestJS.

## Estructura

```
ejemplos/
├── backend/          # API NestJS (puerto 3000)
│   └── src/
│       ├── messages/     # Módulo de mensajes (en memoria)
│       ├── utilities/    # Utilidades simples
│       └── ai/           # Endpoint con IA externa
└── frontend-demo/    # Frontend HTML/CSS/JS puro
```

## Cómo correr el proyecto

### Backend

```bash
cd backend
npm run start:dev
```

- API disponible en: `http://localhost:3000`
- Swagger docs en:   `http://localhost:3000/api`

### Frontend

Abrir `frontend-demo/index.html` directamente en el navegador, o servir con cualquier servidor estático:

```bash
# Opción simple con Python
cd frontend-demo
python3 -m http.server 8080
```

### Exponer con ngrok (opcional)

```bash
ngrok http 3000
```

Luego actualizar la variable `API_URL` en `frontend-demo/app.js` con la URL de ngrok.

## Módulos del backend

| Módulo       | Descripción                             |
|--------------|-----------------------------------------|
| `/messages`  | CRUD de mensajes almacenados en memoria |
| `/utilities` | Sumar, mayúsculas, filtrar lista        |
| `/ai`        | Respuesta generada por IA externa       |

## Variables de entorno

Crear un archivo `.env` dentro de `backend/`:

```env
PORT=3000
OPENAI_API_KEY=tu_clave_aqui
# Opcional: OPENAI_MODEL=gpt-4o-mini
```
