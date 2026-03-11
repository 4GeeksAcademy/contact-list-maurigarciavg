import { useContext, useReducer, createContext, useMemo } from "react"; // 📝 Importamos hooks de React
import storeReducer, { initialStore, actions } from "../store"; // 👈 Importamos las actions

const StoreContext = createContext(); // 📝 Creamos el contexto

export function StoreProvider({ children }) { // ✅ Buen uso de props
    const [store, dispatch] = useReducer(storeReducer, initialStore()); // 📝 Reducer para manejar el estado

    const boundActions = useMemo(() => actions(store, dispatch), [store, dispatch]); // 📝 Memoriza las acciones para evitar recalculos innecesarios

    return (
        <StoreContext.Provider value={{ store, dispatch, actions: boundActions }}> // ✅ Proporcionas el contexto correctamente
            {children} // ✅ Renderizas los hijos
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() { // ✅ Buen nombre para la función
    const context = useContext(StoreContext); // 📝 Usamos el contexto
    if (!context) { // 📝 Verificamos si el contexto existe
        throw new Error("useGlobalReducer debe usarse dentro de un StoreProvider"); // ✅ Mensaje de error claro
    }
    return context; // ✅ Retornamos el contexto
}