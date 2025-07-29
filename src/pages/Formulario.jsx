// Import necessary components from react-router-dom and other parts of the application.
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { crearContacto, editarContacto } from "../services/servicesAPI";
import { useState, useEffect } from "react";



export const Formulario = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
const { store, dispatch } = useGlobalReducer()
const {id} = useParams();
const navigate = useNavigate(); 


const [newContact, setNewContact] = useState({
  name: "",
  email: "",
  phone: "",
  address: ""
})
const [showAlert, setShowAlert] = useState(false);

const handleInputsChange = (e) => {
  setNewContact({...newContact, [e.target.name]: e.target.value})
}

const handleSubmit = (e) => {
  e.preventDefault();
  if(!newContact.name || !newContact.email || !newContact.phone || !newContact.address) {
    setShowAlert(true);
    setTimeout(()=> setShowAlert(false), 2000);
    return;
  }
 if (id) {
  editarContacto(id, newContact, dispatch, navigate)
 }else {
  crearContacto(newContact, dispatch)
 }
 navigate("/")
}
useEffect(() => {
  if (id && store.contacts.length > 0) {
    const contacto = store.contacts.find((c) => c.id === parseInt(id));
    if (contacto) {
      setNewContact({
        name: contacto.name,
        email: contacto.email,
        phone: contacto.phone,
        address: contacto.address
      });
    }
  }
}, [id, store.contacts]);
// LE QUITE LOS REQUIRED PORQUE SINO NO ME SALTA LA ALERTA
  return (
    <div className="container flex-column justify-content-center align-items-center d-flex bg-secondary-subtle mt-4"
    > Introduce los datos de tu contacto
        {showAlert && (
      <div className="alert alert-warning" role="alert"> Todos los campos son obligatorios </div>
    )}
      <form
      onSubmit={handleSubmit} 
      className="mx-auto" action="">
        <label htmlFor="name"
         className="col-md-10 form-label"> Nombre completo 
          <input className="form-control mt-4" 
          type="text"
          placeholder="name"
          name = "name"
          onChange={handleInputsChange}
          value={newContact.name}
           />
        </label>
        <label htmlFor="name"
         className="col-md-10 form-label"> email 
          <input className="form-control mt-4" 
          type="text"
          placeholder="email"
          name = "email"
          onChange={handleInputsChange}
          value={newContact.email}
           />
        </label>
        <label htmlFor="name"
         className="col-md-10 form-label"> phone 
          <input className="form-control mt-4" 
          type="text"
          placeholder="phone"
          name = "phone"
          onChange={handleInputsChange}
          value={newContact.phone}
           />
        </label>
        <label htmlFor="name"
         className="col-md-10 form-label"> address 
          <input className="form-control mt-4" 
          type="text"
          placeholder="address"
          name = "address"
          onChange={handleInputsChange}
          value={newContact.address}
          />
        </label>
        <button type="submit" className="col-md-10 btn btn-success">Agregar Contacto</button>
      </form>



      <Link to="/">
        <button className="btn btn-primary mt-4 ">Back home</button>
      </Link>
    </div> 
  );
};
