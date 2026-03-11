export const initialStore = () => {
    return {
        contacts: []
    };
};

export const actions = (store, dispatch) => {
    const myAgenda = "mauri-agenda";
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
                console.error("Error en la gestión de la agenda:", error);
            }
        }
    };
};

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case 'SET_CONTACTS':
            return { ...store, contacts: action.payload };
        case 'ADD_CONTACT':
            return { ...store, contacts: [...store.contacts, action.payload] };
        case 'DELETE_CONTACT':
            return { ...store, contacts: store.contacts.filter(c => c.id !== action.payload) };
        case 'MODIFY_CONTACT':
            return {
                ...store,
                contacts: store.contacts.map(item => item.id == action.payload.id ? action.payload : item)
            };
        default:
            return store;
    }
}
// 📝 Asegúrate de que el reducer maneje correctamente los casos de acción.
// ✅ Buen uso de async/await para manejar promesas.
// 💡 Considera agregar validaciones para los datos de entrada en las acciones.