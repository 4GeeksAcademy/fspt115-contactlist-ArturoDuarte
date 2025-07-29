// AQUI VAN LAS FUNCIONES QUE SE COMUNICAN CON LA API Y HAY QUE EXPORTARLAS TODAS Y CADA UNA DE LAS QUE SE VAYA A UTILZAR. 


// const username = `arturod`
// const contactUser = `https://playground.4geeks.com/contact/agendas/${username}`
// const contactApi = `https://playground.4geeks.com/contact/agendas/${username}/contacts`
const apiUrl = "https://playground.4geeks.com/contact/agendas/primera-agenda"

export const getContact = async (dispatch) => {
    const response = await fetch(`${apiUrl}/contacts`,)
    console.log(response);
    if (!response.ok) {
        console.log("debo crear el usuario");
        crearAgenda()
        return
    }
    const data = await response.json()
    console.log(data);
    dispatch({ type: 'set_contacts', payload: data.contacts })


}

export const crearAgenda = async () => {
    const response = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
    })
    const data = await response.json()
    console.log(data);

}

export const crearContacto = async (newContact, dispatch) => {
    const response = await fetch(`${apiUrl}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact)
    })
    if (response.ok) {
        getContact(dispatch)
    }

}

export const editarContacto = async (id, newContact, dispatch, navigate) =>  {
    const response = await fetch(`${apiUrl}/contacts/${id}`, {
        method: "PUT",
        headers:  { "Content-Type": "application/json" },
        body: JSON.stringify(newContact)
    })
    if (response.ok) {
        getContact(dispatch)
        navigate("/")
    }
}

export const eliminarContacto = async (id, dispatch) => {
    const response = await fetch(`${apiUrl}/contacts/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
      dispatch({
        type: "delete_contact",
        payload: id
    })};
}

