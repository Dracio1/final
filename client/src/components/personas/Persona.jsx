import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { connect }from 'react-redux'
import EnviarVolver from '../layout/EnviarVolver';
import { updatePersona } from '../../actions/personas';


const Persona = ({ personas: {persona},updatePersona}) => {

    const [formData, setFormData] = useState({
        idPersona: persona._id,
        nombres: persona.nombres,
        apellidos: persona.apellidos,
        direccion: (persona.direccion)?persona.direccion:"",
        telefonos: (persona.telefonos)?persona.telefonos:"",
        email: persona.email,
        documentos: (persona.documentos)?persona.documentos:""

    })

    const {idPersona, nombres, apellidos, direccion, telefonos, email, documentos} = formData

    const handleChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        updatePersona({idPersona, nombres, apellidos, direccion, telefonos, email, documentos})
    }
  return (
    <>
        {
            
            <>
            <h1 className='text-primary'>Editar datos personales</h1>
            
            <form className='form' onSubmit={(e)=>handleOnSubmit(e)}>
                <label htmlFor="nombres">Nombres</label>
                <input type="text" name="nombres" id="nombres" value={nombres} onChange={(e)=>handleChange(e)}/>
                <label htmlFor="apellidos">Apellidos</label>
                <input type="text" name="apellidos" id="apellidos" value={apellidos} onChange={(e)=>handleChange(e)}/>
                <label htmlFor="direccion">Direccion</label>
                <input type="text" name="direccion" id="direccion" value={direccion} onChange={(e)=>handleChange(e)}/>
                <label htmlFor="telefonos">Telefonos</label>
                <input type="text" name="telefonos" id="telefonos" value={telefonos} onChange={(e)=>handleChange(e)}/>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={email} onChange={(e)=>handleChange(e)}/>
                <label htmlFor="documentos">Documentos</label>
                <input type="text" name="documentos" id="documentos" value={documentos} onChange={(e)=>handleChange(e)}/>

                <EnviarVolver></EnviarVolver>

            </form>
            </>
                   
            
        }
    </>
  )
}

Persona.propTypes = {
    updatePersona: PropTypes.func.isRequired,
    personas: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    personas : state.personas,
    auth: state.auth
})

export default connect(mapStateToProps, {updatePersona})(Persona) 