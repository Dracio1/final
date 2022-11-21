import { useEffect, useState } from 'react';
//import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addCarrera } from '../../actions/carreras'
import PropTypes from 'prop-types';
import EnviarVolver from '../layout/EnviarVolver';
import { getMaterias } from '../../actions/materias';


const AddCarrera = ({ addCarrera,getMaterias, history, materias:{materias, loading}, user: {tipo} }) => {
    
    useEffect(() => {
        
        getMaterias()
      
    }, [getCarreras])

    const listaMaterias = materias;
    const [formData, setFormData] = useState({
        nombre: '',
        materias: '',
        duracion:''
       
    })

    

    const { 
        nombre,
        materias,
        duracion} = formData

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

  return (
    <>{ (tipo == "Administrador"&& !loading )? 
        <>
      <div className='centeredColumn'>
        <h1 className="large text-primary">
        Nueva Carrera
        </h1>
        <small>* = el campo es requerido</small>
      </div>

      <form className="form w-75" onSubmit={ e => {
        e.preventDefault()
        addCarrera(formData, history)
      }}>

        <div className="centeredColumn">
          <input type="text"
          onChange={(e)=>onChange(e)} 
          placeholder="* Nombre de la carrera" 
          name="nombre"
          value={nombre} 
          required />
        
        </div>
        
        <div className="centeredColumn">
          <input type="text" 
          onChange={(e)=>onChange(e)}      
          placeholder="Duración de la carrera en años" 
          name="duracion" 
          value={duracion}
          />

        </div>

        <div className="centeredColumn">
          
          <select name="materias">
            {listaMaterias.map((materia)=>{return <option value={materia._id}>{materia.nombre}</option>})}
          </select>

        </div>

        

        <EnviarVolver/>
      </form>
      </> : <></>}
    </>
    )
};

AddCarrera.propTypes = {
    addCarrera: PropTypes.func.isRequired,
    materias: PropTypes.object.isRequired,
    getMaterias: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    materias : state.materias,
    user: state.auth.user
})
export default connect(mapStateToProps,{ addCarrera, getMaterias })(AddCarrera);
