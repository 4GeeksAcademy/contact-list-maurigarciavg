export const initialStore = () => {
  return {
    contacts: [
      {
        "id": 16,
        "full_name": "Indiana Jones",
        "phone": "555-1936",
        "email": "henry.jonesjr@marshall.edu",
        "address": "Departamento de Arqueología, Connecticut"
      },
      {
        "id": 17,
        "full_name": "Gandalf el Gris",
        "phone": "000-WIZARD",
        "email": "mithrandir@middle-earth.com",
        "address": "Bolsón Cerrado, La Comarca (de paso)"
      },
      {
        "id": 18,
        "full_name": "Alan Grant",
        "phone": "555-DINO",
        "email": "agrant@isla-nublar.com",
        "address": "Excavación de Fósiles, Montana"
      },
      {
        "id": 19,
        "full_name": "Joel Miller",
        "phone": "555-0203",
        "email": "joel@fireflies.org",
        "address": "Zona de Cuarentena, Boston"
      },
      {
        "id": 20,
        "full_name": "James Holden",
        "phone": "555-2350",
        "email": "captain@rocinante.space",
        "address": "Nave Rocinante, Cinturón de Asteroides"
      },
      {
        "id": 21,
        "full_name": "Han Solo",
        "phone": "555-Kessel",
        "email": "han@millennium-falcon.reb",
        "address": "Puerto de Mos Eisley, Tatooine"
      },
      {
        "id": 22,
        "full_name": "Harry Potter",
        "phone": "555-9340",
        "email": "h.potter@hogwarts.ac.uk",
        "address": "Alacena bajo la escalera, Privet Drive 4"
      },
      {
        "id": 23,
        "full_name": "Aragorn",
        "phone": "555-KING",
        "email": "trancos@rangers.north",
        "address": "Trono de Gondor, Minas Tirith"
      },
      {
        "id": 25,
        "full_name": "Din Djarin",
        "phone": "555-WAY",
        "email": "mando@bounty-hunters.guild",
        "address": "Sector Nevarro, El Borde Exterior"
      },
      {
        "id": 26,
        "full_name": "Graham Hess",
        "phone": "555-SIGNS",
        "email": "g.hess@buckscounty.pa",
        "address": "Granja de Maíz, Pensilvania"
      },
      {
        "id": 27,
        "full_name": "Hermione Granger",
        "phone": "555-BOOKS",
        "email": "h.granger@ministry.magic",
        "address": "Biblioteca de Hogwarts, Sección Prohibida"
      },
      {
        "id": 28,
        "full_name": "Ian Malcolm",
        "phone": "555-CHAOS",
        "email": "chaos.theory@jurassic.org",
        "address": "Instituto de Sistemas Complejos, Texas"
      },
      {
        "id": 29,
        "full_name": "Ellie Williams",
        "phone": "555-0214",
        "email": "ellie@jackson.comm",
        "address": "Asentamiento de Jackson, Wyoming"
      },
      {
        "id": 30,
        "full_name": "Obi-Wan Kenobi",
        "phone": "555-HELLO-THERE",
        "email": "ben.kenobi@jedi-council.rep",
        "address": "Mar de las Dunas, Tatooine"
      }
    ]
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...store,
        contacts: [
          ...store.contacts,
          action.payload
        ]
      };
    case 'DELETE_CONTACT':
      return {
        ...store,
        contacts:
          store.contacts.filter(contacts => contacts.id !== action.payload)
      };
    case 'MODIFY_CONTACT':
      return {
        ...store,
        contacts: store.contacts.map((item) =>
          item.id == action.payload.id ? action.payload : item
        )
      };
    case 'MODIFY_CONTACT':
      return {
        ...store,
        contacts: store.contacts.map((item) =>
          item.id == action.payload.id ? action.payload : item
        )
      };
    /* case 'SET_CONTACTS':
      return {
        ...store,
        contacts: action.payload
      }; */
    default:
      return store;
  };
};
