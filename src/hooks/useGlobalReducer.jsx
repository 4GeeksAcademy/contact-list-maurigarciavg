import { useContext, useReducer, createContext, useMemo } from "react";
import storeReducer, { initialStore, actions } from "../store"; // 👈 Importamos las actions

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    const boundActions = useMemo(() => actions(store, dispatch), [store, dispatch]); // 📝 Asegúrate de que actions retorne un objeto

    return (
        <StoreContext.Provider value={{ store, dispatch, actions: boundActions }}> // ✅ Buen uso de useMemo para optimizar
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useGlobalReducer debe usarse dentro de un StoreProvider"); // ✅ Mensaje de error claro
    }
    return context;
}