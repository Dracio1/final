import React from 'react'
import { Link } from "react-router-dom";

const DashboardActions = () => {
    return (
        <div className="centeredRow mb-4">
            <Link to="/persona" className="btn red-icon"
            ><i className="fas fa-user-circle red-icon"></i> Editar tu Perfil</Link>
            
            <Link to="/add-education" className="btn "
            ><i className="fab fa-black-tie green-icon"></i> Agregar Documentación</Link>
        </div>
    )
}

export default DashboardActions
