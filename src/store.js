export const initialStore = () => {
  return {
    contacts: []   // este es el valor inicial
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_contacts':
      return {
        ...store,
        contacts: action.payload // esto es lo que me va a devolver cuando haga el dispatch me da esta acccion! 
      }
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      };
    default:
      throw Error('Unknown action.');
  }
}
