import { useContext, useReducer, createContext, useMemo } from "react";
import storeReducer, { initialStore, actions } from "../store"; // 👈 Importamos las actions

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    const boundActions = useMemo(() => actions(store, dispatch), [store, dispatch]);

    return (
        <StoreContext.Provider value={{ store, dispatch, actions: boundActions }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useGlobalReducer debe usarse dentro de un StoreProvider");
    }
    return context;
}