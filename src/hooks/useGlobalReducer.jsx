import { useContext, useReducer, createContext, useMemo } from "react";
import storeReducer, { initialStore, actions } from "../store"; // 👈 Importamos las actions

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore()); // ✅ Usando useReducer correctamente

    const boundActions = useMemo(() => actions(store, dispatch), [store, dispatch]); // 📝 Memoriza las acciones para optimizar rendimiento

    return (
        <StoreContext.Provider value={{ store, dispatch, actions: boundActions }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const context = useContext(StoreContext); // ✅ Usando useContext correctamente
    if (!context) {
        throw new Error("useGlobalReducer debe usarse dentro de un StoreProvider"); // 📝 Mensaje claro de error
    }
    return context;
}