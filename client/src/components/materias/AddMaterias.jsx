import { useEffect, useState } from 'react';
//import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EnviarVolver from '../layout/EnviarVolver';
import { addMateria } from '../../actions/materias';


const AddMaterias = () => {
   
    const [formData, setFormData] = useState({
        nombre: '',
    })
    const {nombre} = formData

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

  return (
    <>
      <div className='centeredColumn'>
        <h1 className="large text-primary">
        Nueva Materia
        </h1>
      
      </div>

      <form className="form w-75" onSubmit={ e => {
        e.preventDefault()
        addMateria(formData)
      }}>

        <div className="centeredColumn">
          <input type="text"
          onChange={(e)=>onChange(e)} 
          placeholder="* Nombre de la materia" 
          name="nombre"
          value={nombre} 
          required />
        
        </div>
        
        <EnviarVolver/>
      </form>
      
    </>
    )
};

export default connect(null)(AddMaterias);
