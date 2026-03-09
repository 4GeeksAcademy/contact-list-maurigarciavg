# 📝 Revisión del proyecto: Contact List App Using React & Context

## ✅ Aspectos Positivos

1. **CRUD real contra la API**: El proyecto ya estaba conectado al playground oficial de 4Geeks y resolvía lectura, creación, edición y borrado reales.

2. **Buena base de formulario controlado**: Los inputs del formulario ya usaban `useState`, y el flujo de edición estaba planteado sobre una misma page reutilizable.

3. **Dirección visual consistente**: Había una identidad visual clara y un layout usable tanto en la lista como en el formulario.

4. **Intención correcta de store global**: Ya existían `store.js` y `useGlobalReducer.jsx`, así que la base conceptual del ejercicio estaba encaminada.

---

## 🔍 Áreas de Mejora

### 1. Mantener `useGlobalReducer.jsx` limpio y mover la lógica async a `store.js`

En el estado original, el provider estaba construyendo `actions` con `useMemo`, y además parte del flujo async seguía repartido entre `Home.jsx`, `AddNewContact.jsx` y `store.js`. La rúbrica pide que `useGlobalReducer.jsx` sea solo provider/hook compartido.

**Código actual:**

```jsx
export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());
  const boundActions = useMemo(() => actions(store, dispatch), [store, dispatch]);

  return (
    <StoreContext.Provider value={{ store, dispatch, actions: boundActions }}>
      {children}
    </StoreContext.Provider>
  );
}
```

**Código mejorado:**

```jsx
export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
```

**¿Por qué es mejor?**

- El hook vuelve a cumplir el contrato del boilerplate.
- Toda la lógica de negocio vive en `store.js`.
- La arquitectura queda más enseñable y más fácil de mantener.
- Las pages pasan a consumir `store` y funciones async reutilizables sin duplicar `fetch`.

### 2. Separar pages y componentes como pide la solución

La lista original renderizaba toda la tarjeta del contacto dentro de `Home.jsx`. Eso hacía más difícil reutilizar la UI y no cumplía el requisito explícito de tener un `ContactCard`.

**Código actual:**

```jsx
{store.contacts.map((contact) => (
  <div key={contact.id} className="contactCard">
    <div className="d-flex align-items-center">
      <img src={`https://picsum.photos/seed/${contact.id}/150/150`} />
      <div className="contact-info">
        <div className="name">{contact.name}</div>
        ...
      </div>
    </div>
  </div>
))}
```

**Código mejorado:**

```jsx
{contacts.map((contact) => (
  <ContactCard key={contact.id} contact={contact} />
))}
```

**¿Por qué es mejor?**

- `ContactList` se centra en estados de carga/error/empty.
- `ContactCard` encapsula la representación y sus acciones.
- La UI queda más modular y alineada con la rúbrica.
- Es mucho más fácil extender o retocar una tarjeta sin tocar la page entera.

### 3. Añadir feedback real de carga, error y sincronización

En el estado original, el CRUD funcionaba, pero faltaban feedbacks claros: la lista no mostraba `loading`, no había `retry`, no existía estado vacío y el borrado no pedía confirmación.

**Código actual:**

```jsx
useEffect(() => {
  actions.checkOrCreateAgenda();
}, []);

const deleteContact = async (id) => {
  const response = await fetch(`.../contacts/${id}`, { method: "DELETE" });
  if (response.ok) {
    actions.checkOrCreateAgenda();
  }
};
```

**Código mejorado:**

```jsx
const isBusy = isLoadingContacts || isSavingContact;

{error ? (
  <div className="alert alert-danger">
    <span>{error}</span>
    <button onClick={() => loadContacts(dispatch)}>Retry</button>
  </div>
) : null}
```

**¿Por qué es mejor?**

- El usuario entiende cuándo la app está cargando o guardando.
- La UI puede recuperarse de errores sin recargar manualmente.
- El borrado deja de ser abrupto gracias a la confirmación previa.
- Las mutaciones vuelven a sincronizar la lista desde la API para evitar incoherencias.

---

## 🎯 Patrones y Anti-patrones Identificados

### Patrones Positivos Encontrados ✅

#### 1. Formulario controlado

**Tipo:** Patrón ✅

**Dónde aparece:**
- `src/pages/AddNewContact.jsx`

**Descripción:** El alumno ya estaba usando `useState` para mantener sincronizados los inputs con la UI.

**¿Por qué es importante?**

- Facilita validación.
- Permite reutilizar el mismo formulario para crear y editar.
- Mantiene el flujo de React predecible.

#### 2. Persistencia real en API

**Tipo:** Patrón ✅

**Dónde aparece:**
- `src/store.js`
- `src/pages/Home.jsx`
- `src/pages/AddNewContact.jsx`

**Descripción:** El proyecto no se quedó en memoria local; ya consumía la API oficial.

**¿Por qué es importante?**

- Cumple el objetivo real del ejercicio.
- Evita una falsa sensación de CRUD completo.
- Permite evaluar sincronización entre frontend y backend.

### Anti-patrones a Mejorar ❌

#### 1. Lógica async repartida entre hook, store y pages

**Tipo:** Anti-patrón ❌

**Dónde aparece:**
- `src/hooks/useGlobalReducer.jsx`
- `src/pages/Home.jsx`
- `src/pages/AddNewContact.jsx`

**Descripción:** Parte del flujo global estaba en el hook y otra parte directamente en las pages.

**Alternativa aplicada:**

```jsx
export const loadContacts = async (dispatch) => {
  // ...
};
```

**Conceptos relacionados:**

- Separación de responsabilidades
- Store centralizado
- Arquitectura mantenible

#### 2. UI embebida sin `ContactCard`

**Tipo:** Anti-patrón ❌

**Dónde aparece:**
- `src/pages/Home.jsx`

**Descripción:** Toda la representación del contacto estaba pegada a la page principal.

**Alternativa aplicada:**

```jsx
<ContactCard key={contact.id} contact={contact} />
```

**Conceptos relacionados:**

- Componentización
- Reutilización
- Legibilidad

#### 3. Tooling y boilerplate sin cerrar

**Tipo:** Anti-patrón ❌

**Dónde aparece:**
- `eslint.cjs`
- `index.html`
- `src/components/ScrollToTop.jsx`

**Descripción:** El lint no arrancaba por el nombre del archivo de configuración, el título seguía en boilerplate y `ScrollToTop` no recibía `location`.

**Alternativa aplicada:**

```jsx
.eslintrc.cjs
window.scrollTo({ top: 0, behavior: "smooth" });
```

**Conceptos relacionados:**

- Mantenibilidad
- Calidad de tooling
- Cierre de boilerplate

---

## 📊 Evaluación Detallada

### Criterios de Evaluación (Total: 68/100)

| Criterio | Puntos | Obtenido | Comentario |
|----------|--------|----------|------------|
| **Funcionalidad Básica** | 30 | 25 | El CRUD real estaba bastante avanzado, pero el flujo de edición dependía demasiado del estado en memoria y faltaba robustez al recargar |
| **Código Limpio** | 20 | 13 | El proyecto era legible, pero tenía archivos template y responsabilidades mezcladas |
| **Estructura** | 15 | 7 | Había store global, pero faltaba `ContactCard` y la arquitectura no seguía del todo el patrón pedido |
| **Buenas Prácticas** | 15 | 10 | Formularios controlados y Router correctos, pero sin estados de carga/error consistentes ni lógica async realmente centralizada |
| **HTML/CSS** | 10 | 8 | La interfaz era clara y usable, con un estilo coherente |
| **UX/Animaciones** | 10 | 5 | Faltaban empty state, retry, confirmación de borrado y feedback más claro al usuario |
| **TOTAL** | **100** | **68** | **NECESITA MEJORA** |

### Desglose de Puntos Perdidos (-32 puntos)

1. **-6 puntos** - `src/hooks/useGlobalReducer.jsx` ya no era un provider limpio y parte del contrato del boilerplate quedaba difuso.
2. **-5 puntos** - No existía `ContactCard`; toda la UI del contacto estaba embebida en la page principal.
3. **-4 puntos** - La lógica de `fetch` estaba repartida entre store y pages en lugar de quedar centralizada.
4. **-4 puntos** - Faltaban estados visibles de `loading`, `error`, `empty` y `retry` en el flujo principal.
5. **-3 puntos** - El flujo `/edit/:id` era frágil si se entraba con la store vacía o tras recargar la página.
6. **-3 puntos** - El borrado no pedía confirmación antes de eliminar un contacto persistido.
7. **-3 puntos** - El lint no funcionaba porque la configuración estaba en `eslint.cjs` en vez de `.eslintrc.cjs`.
8. **-2 puntos** - Quedaban restos de boilerplate (`Hello Rigo`, `ScrollToTop` sin funcionar realmente).
9. **-2 puntos** - La organización de pages y naming no estaba alineada con la solución de referencia.

### Cómo Llegar a 100/100

Aplicando las correcciones de este PR:

- ✅ +6 puntos - `useGlobalReducer.jsx` vuelve a ser un provider/hook limpio y toda la lógica global vive en `store.js`.
- ✅ +5 puntos - Se crea `ContactCard` como componente separado y reutilizable.
- ✅ +4 puntos - El CRUD queda orquestado desde `store.js` con sincronización real tras cada mutación.
- ✅ +4 puntos - Se añaden `loading`, `error`, `empty state` y `retry`.
- ✅ +3 puntos - El flujo de edición ya recarga contactos si hace falta antes de abrir `/edit/:id`.
- ✅ +3 puntos - El borrado incorpora confirmación previa.
- ✅ +3 puntos - `.eslintrc.cjs` deja el lint operativo.
- ✅ +2 puntos - Se corrige el boilerplate del template (`index.html`, `ScrollToTop`).
- ✅ +2 puntos - La app queda alineada con `ContactList`, `ContactForm` y `ContactCard`.

**= 100/100** 🎉

---

## 📊 Resumen

| Aspecto | Estado |
|---------|--------|
| CRUD contra API | ✅ Bien encaminado |
| Arquitectura del store | ⚠️ Necesitaba orden |
| Componentización | ⚠️ Incompleta |
| Validación y formularios | ✅ Buena base |
| Feedback al usuario | ⚠️ Insuficiente |
| Tooling y boilerplate | ⚠️ Sin cerrar |

**Nota final**: Había una base funcional bastante mejor que la media porque el proyecto ya estaba persistiendo datos reales. El salto que faltaba aquí no era “hacer que funcione”, sino ordenar la arquitectura para que el proyecto enseñe el patrón correcto del ejercicio y no solo un CRUD que pasa por casualidad.
