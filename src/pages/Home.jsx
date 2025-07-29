
import { Link, Navigate, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { eliminarContacto, getContact } from "../services/servicesAPI.js";
import { useEffect } from "react";



export const Home = () => {
	const navigate = useNavigate();

	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {
		getContact(dispatch)
	}, [dispatch])

	const handleDelete = (id) => {
		eliminarContacto(id, dispatch);
	}




	return (
		<>
			{store.contacts.map((contact, index) => (<div className="card mb-3" style={{ maxWidth: '90 %' }} key={contact.id}>
				<div className="row  align-items-center" >
					<div className="col-md-2 text-center">
						<img
							src="https://tse4.mm.bing.net/th/id/OIP.dB2EQJiq3XUHysbsQQ6dtQHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
							className="img-fluid rounded-circle m-3"
							alt="Foto de perfil"
						/>
					</div>
					<div className="col-md-8" >
						<div className="card-body">
							<h5 className="card-title mb-1">{contact.name}</h5>
							<p className="card-text mb-1">
								<i className="card-adress"></i>{contact.address}
							</p>
							<p className="card-text mb-1">
								<i className="card-adress"></i>{contact.phone}
							</p>
							<p className="card-text">
								<i className="card-adress"></i>{contact.email}
							</p>
						</div>
					</div>
					<div className="col-md-2 text-center">
						<button
							type="button"
							className="btn btn-primary btn-sm mb-2 w-75"
							onClick={() => navigate(`/editar/${contact.id}`)}
						>
							<i className="editarlo"></i> Editar
						</button>
						<button
							type="button"
							onClick={() => handleDelete(contact.id)}
							className="btn btn-danger btn-sm w-75"
						>
							<i className="eliminarlo"></i> Eliminar
						</button>
					</div>
				</div>
			</div>
			))
			}

		</>

	);
}; 