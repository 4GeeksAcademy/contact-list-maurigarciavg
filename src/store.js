export const initialStore = () => {
    return {
        contacts: []
    };
};

export const actions = (store, dispatch) => {
    const myAgenda = "mauri-agenda"; // ✅ Nombre claro para la agenda
    const baseUrl = `https://playground.4geeks.com/contact/agendas/${myAgenda}`;

    return {
        checkOrCreateAgenda: async () => {
            try {
                let response = await fetch(baseUrl);
                
                if (response.status === 404) {
                    const createResp = await fetch(baseUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" }
                    });
                    if (createResp.ok) {
                        response = await fetch(baseUrl);
                    }
                }

                if (response.ok) {
                    const data = await response.json();
                    dispatch({
                        type: 'SET_CONTACTS',
                        payload: data.contacts || []
                    });
                }
            } catch (error) {
                console.error("Error en la gestión de la agenda:", error); // 💡 Tip: Considera manejar el error de forma más amigable para el usuario
            }
        }
    };
};

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case 'SET_CONTACTS':
            return { ...store, contacts: action.payload }; // ✅ Buen uso de spread operator
        case 'ADD_CONTACT':
            return { ...store, contacts: [...store.contacts, action.payload] }; // ✅ Buen uso de spread operator
        case 'DELETE_CONTACT':
            return { ...store, contacts: store.contacts.filter(c => c.id !== action.payload) }; // ✅ Buen uso de filter
        case 'MODIFY_CONTACT':
            return {
                ...store,
                contacts: store.contacts.map(item => item.id == action.payload.id ? action.payload : item) // 💡 Tip: Considera usar '===' para comparación estricta
            };
        default:
            return store;
    }
}