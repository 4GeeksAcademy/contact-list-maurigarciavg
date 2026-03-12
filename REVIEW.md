# 🎓 Revisión de Código — Contact List App Using React & Context

**Estudiante:** Mauricio Garcia-Valdecasas Gámez
**Proyecto:** Contact List App Using React & Context
**Fecha:** 2026-03-12
**Rigurosidad:** Mínima
**Nota:** 90/100 ✅ APROBADO

---

## 📦 Mapa del Proyecto

```
📦 contact-list-maurigarciavg
 ├── 📄 index.html              ← Página base (plantilla, no tocar) ⬜
 ├── 📁 src/
 │   ├── ⚡ main.jsx             ← Punto de entrada ⬜ Plantilla
 │   ├── ⚡ routes.jsx           ← Rutas de la app ✅ Revisado
 │   ├── 📦 store.js            ← Estado global y acciones 👈 FOCO ✅
 │   ├── 📁 hooks/
 │   │   └── ⚡ useGlobalReducer.jsx ← Provider del contexto ✅ Revisado
 │   ├── 📁 pages/
 │   │   ├── ⚡ Home.jsx         ← Vista lista de contactos 👈 FOCO ✅
 │   │   ├── ⚡ AddNewContact.jsx← Formulario crear/editar 👈 FOCO ✅
 │   │   ├── ⚡ Layout.jsx       ← Estructura general ✅ Revisado
 │   │   ├── 🎨 home.css        ← Estilos de la lista ✅ Revisado
 │   │   └── 🎨 addNewContact.css← Estilos del formulario ✅ Revisado
 │   ├── 📁 components/
 │   │   ├── ⚡ Navbar.jsx       ← Barra de navegación ✅ Revisado
 │   │   ├── ⚡ Footer.jsx       ← Pie de página ✅ Revisado
 │   │   └── ⚡ ScrollToTop.jsx  ← Scroll automático ⬜ Boilerplate
 │   └── 🎨 index.css           ← Estilos globales ⬜ No revisado
 ├── 📄 package.json            ← Configuración ⬜
 └── 📄 vite.config.js          ← Config Vite ⬜

✅ = Revisado | ⬜ = No revisado (plantilla/config) | 👈 = Archivo importante
```

---

## 🔄 Diagrama de Flujo de Datos

```
¿Cómo funciona tu app?

[El usuario abre la página]
        │
        ▼
[Se carga Home.jsx]
        │
        ▼
[useEffect llama a checkOrCreateAgenda()] ✅
        │
        ▼
[¿Existe la agenda "mauri-agenda"?]
   │              │
   ▼              ▼
  SÍ ✅         NO (404)
   │              │
   │              ▼
   │      [Se crea con POST] ✅
   │              │
   │              ▼
   │      [Se vuelve a pedir con GET] ✅
   │              │
   ◄──────────────┘
   │
   ▼
[Los contactos se guardan en el store con dispatch] ✅
        │
        ▼
[store.contacts se renderiza con .map()] ✅
        │
        ▼
[Cada contacto muestra: nombre, dirección, teléfono, email] ✅
        │
        ├── [Botón editar → navega a /edit/:id] ✅
        │         │
        │         ▼
        │   [AddNewContact.jsx carga los datos del contacto] ✅
        │         │
        │         ▼
        │   [PUT a la API → actualiza el contacto] ✅
        │
        └── [Botón borrar → DELETE a la API] ✅
                  │
                  ▼
            [Se recarga la lista] ✅

[Botón "Add new contact" → /add]
        │
        ▼
[AddNewContact.jsx con formulario vacío] ✅
        │
        ▼
[POST a la API → crea el contacto] ✅
        │
        ▼
[Navega de vuelta a / y se ve el contacto nuevo] ✅
```

---

## ✅ Lo que hiciste bien

¡Muy buen trabajo, Mauricio! Estas cosas las hiciste genial:

✓ **CRUD completo funcionando** — Crear, leer, editar y borrar contactos, todo conectado a la API de 4Geeks. ¡Esto es lo más importante y lo tienes!

✓ **Nombres de variables muy claros** — `fullName`, `email`, `phone`, `address`, `contactToEdit`, `handleSave`, `deleteContact`... cualquiera que lea tu código entiende al instante qué hace cada cosa. Excelente.

✓ **Context API bien implementado** — Tu `store.js` con `initialStore`, `actions` y `storeReducer` sigue el patrón correcto. El provider en `useGlobalReducer.jsx` está limpio y funcional.

✓ **Diseño visual cuidado** — El tema oscuro con los colores turquesa, las tarjetas con hover, los iconos de react-icons, el formulario centrado... se nota que le dedicaste tiempo al CSS y queda muy profesional.

✓ **Formulario reutilizado para crear y editar** — Usaste la misma vista `AddNewContact.jsx` para ambas acciones, diferenciando con `params.id`. Muy inteligente.

✓ **Validación HTML nativa** — Usaste `required`, `type="email"`, `type="tel"` y `pattern` en los inputs. Eso previene que se envíen datos vacíos o mal formateados.

---

## 💡 Oportunidades de mejora

### 1. Falta el componente `ContactCard` separado (-10 puntos)

El proyecto pedía crear un componente `ContactCard` en su propio archivo para renderizar cada contacto. Tú escribiste todo el HTML de la tarjeta directamente dentro de `Home.jsx`. ¡Funciona perfecto! Pero separarlo en su propio componente es un requisito del enunciado.

```
┌─────────────────────────────────┬─────────────────────────────────┐
│ Tu código (Home.jsx)             │ Código mejorado                  │
├─────────────────────────────────┼─────────────────────────────────┤
│ {store.contacts.map((contact)   │ // En components/ContactCard.jsx│
│   => (                           │ const ContactCard = ({contact,  │
│   <div className="contactCard"> │   onDelete}) => {               │
│     <div className="d-flex..."> │   return (                      │
│       <img src={...} />          │     <div className="contactCard">│
│       <div className="contact-  │       ... (mismo HTML)          │
│         info">                   │     </div>                      │
│         ...40 líneas de HTML...  │   );                            │
│       </div>                     │ };                              │
│     </div>                       │                                  │
│   </div>                         │ // En Home.jsx                  │
│ ))}                              │ <ContactCard                    │
│                                  │   contact={contact}             │
│                                  │   onDelete={deleteContact} />   │
└─────────────────────────────────┴─────────────────────────────────┘
💬 ¿Por qué? Imagina que tu Home.jsx es como una cocina. Si metes
   la receta de cada plato dentro de la cocina, se llena de papeles.
   Es mejor tener cada receta en su propia tarjeta (archivo) y solo
   "llamarla" cuando la necesites. Así tu cocina queda ordenada.
```

---

## 📊 Semáforo de Conceptos

```
📊 ¿Cómo va tu proyecto?

🟢 Estructura de rutas (React Router)     — Tres rutas bien definidas: /, /add, /edit/:id
🟢 Estado global (Context API)            — Store centralizado con reducer y actions
🟢 Consumo de API (fetch)                 — CRUD completo contra la API de 4Geeks
🟢 Formularios controlados                — Inputs con useState y onChange, validación HTML
🟢 Diseño visual (CSS)                    — Tema oscuro profesional, responsive, hover effects
🟡 Separación en componentes              — Falta extraer ContactCard a su propio archivo

Leyenda: 🟢 = Bien  |  🟡 = Funciona pero mejorable  |  🔴 = Necesita corrección
```

---

## 📈 Barras de Progreso

```
📈 Tu progreso por áreas:

Funcionalidad  ████████████ 100/100 "CRUD completo, todo funciona contra la API"
Código limpio  ██████████░░  85/100 "Variables claras, falta separar ContactCard"
Diseño visual  ████████████  95/100 "Tema oscuro profesional con hover y responsive"

Total: 90/100 puntos ✅ APROBADO
```

---

## 📋 Tabla de Evaluación

| Criterio | Peso | Nota | Comentario |
|----------|------|------|------------|
| App arranca sin errores | Crítico | ✅ | La app carga y funciona correctamente |
| Usa Context API | Crítico | ✅ | Store centralizado con useReducer + Context |
| Consume API de 4Geeks | Crítico | ✅ | GET, POST, PUT, DELETE funcionando |
| Vista lista de contactos | Crítico | ✅ | Home.jsx renderiza todos los contactos |
| Formulario crear contactos | Crítico | ✅ | AddNewContact.jsx con formulario controlado |
| React Router (2+ vistas) | Crítico | ✅ | 3 rutas: /, /add, /edit/:id |
| Editar contactos | Requerido | ✅ | Reutiliza el formulario con params.id |
| Eliminar contactos | Requerido | ✅ | Borra via API y recarga la lista |
| Componente ContactCard separado | Requerido | ❌ | Renderizado inline en Home.jsx (-10) |
| Nombres de variables legibles | Min | ✅ | Excelentes nombres descriptivos |

---

## 🔢 Desglose del Score

```
Nota inicial:                     100
Componente ContactCard no separado: -10
─────────────────────────────────────
TOTAL:                             90/100 ✅ APROBADO
```

---

## 📁 Archivos Corregidos en esta PR

1. **`src/components/ContactCard.jsx`** (NUEVO) — Componente separado para renderizar cada tarjeta de contacto
2. **`src/pages/Home.jsx`** (MODIFICADO) — Ahora importa y usa `ContactCard` en vez de tener el HTML inline

---

## 🎯 Mensaje Final

¡Excelente trabajo, Mauricio! 🎉 Tu app de contactos está **completamente funcional**: crear, ver, editar y borrar contactos, todo conectado a la API real de 4Geeks. El diseño oscuro se ve muy profesional y los nombres de tus variables son un ejemplo a seguir.

El único detalle es separar la tarjeta de contacto en su propio componente — que es exactamente lo que incluye esta PR como ejemplo. ¡Sigue así, vas por muy buen camino! 💪
