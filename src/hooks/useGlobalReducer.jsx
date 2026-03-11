import { useContext, useReducer, createContext, useMemo } from "react"; // ✅ Importando hooks de React
import storeReducer, { initialStore, actions } from "../store"; // 👈 Importamos las actions

const StoreContext = createContext(); // 📝 Creamos el contexto para el estado global

export function StoreProvider({ children }) { // ✅ Componente que provee el contexto
    const [store, dispatch] = useReducer(storeReducer, initialStore()); // 📝 Usamos useReducer para manejar el estado

    const boundActions = useMemo(() => actions(store, dispatch), [store, dispatch]); // 📝 Memoriza las acciones para evitar recrearlas

    return (
        <StoreContext.Provider value={{ store, dispatch, actions: boundActions }}> // ✅ Proveemos el contexto
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() { // ✅ Hook personalizado para acceder al contexto
    const context = useContext(StoreContext); // 📝 Usamos useContext para acceder al StoreContext
    if (!context) { // 📝 Verificamos que el contexto exista
        throw new Error("useGlobalReducer debe usarse dentro de un StoreProvider"); // 🔧 Mensaje de error claro si se usa fuera del proveedor
    }
    return context; // ✅ Retornamos el contexto
}