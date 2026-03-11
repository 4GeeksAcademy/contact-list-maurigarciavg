import { useContext, useReducer, createContext, useMemo } from "react";
import storeReducer, { initialStore, actions } from "../store"; // 👈 Importamos las actions

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    const boundActions = useMemo(() => actions(store, dispatch), [store, dispatch]); // 📝 Usamos useMemo para evitar recalculos innecesarios

    return (
        <StoreContext.Provider value={{ store, dispatch, actions: boundActions }}> // ✅ Bien hecho al incluir actions en el contexto
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useGlobalReducer debe usarse dentro de un StoreProvider"); // 📝 Mensaje claro de error
    }
    return context;
}