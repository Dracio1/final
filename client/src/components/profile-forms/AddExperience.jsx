import { useState } from 'react';
//import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile'
import PropTypes from 'prop-types';
import EnviarVolver from '../layout/EnviarVolver';


const AddExperience = ({ addExperience, history }) => {

    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const { 
    company,
    title,
    location,
    from,
    to,
    current,
    description } = formData

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

  return (
    <>
      <div className='centeredColumn'>
        <h1 className="large text-primary">
        Agregar Experiencia
        </h1>

        <p className="lead">
            <i className="fas fa-code-branch"></i> agrega cualquier puesto como developer/programador/a
            que hayas tenido en el pasado
        </p>

        <small>* = el campo es requerido</small>
      </div>

      <form className="form w-75" onSubmit={ e => {
        e.preventDefault()
        addExperience(formData, history)
      }}>

        <div className="centeredColumn">
          <input type="text"
          onChange={(e)=>onChange(e)} 
          placeholder="* nombre del puesto" 
          name="title"
          value={title} 
          required />
          
          <small className="form-text text-center">nombre del puesto que ocupaste</small>
        
        </div>
        

        <div className="centeredColumn">
          
          <input type="text" 
          onChange={(e)=>onChange(e)}
          placeholder="* Companía" 
          name="company"
          value={company} 
          required />

          <small className="form-text text-center">
            el nombre de la cía. para la cual trabajaste 
          </small>
        </div>

        <div className="centeredColumn">
          <input type="text" 
          onChange={(e)=>onChange(e)}      
          placeholder="ubicación" 
          name="location" 
          value={location}
          />

          <small className="form-text text-center">
            ubicación de la cía. para la cual trabajaste 
          </small>
        
        </div>

        <div className='row'>
          <div className="col mt-1 centeredColumn">
            <h6>Fecha Desde</h6>
            <input type="date" 
            onChange={(e)=>onChange(e)}
            value={from}
            name="from" />
          </div>

          <div className="col mt-1 centeredColumn">
            <h6>Fecha Hasta</h6>
            <input type="date" 
            onChange={(e)=>onChange(e)}
            name="to" 
            value={to}
            disabled={toDateDisabled ? true : false}
            />
          </div>

          <div className="col mt-4 centeredColumn">
          
            <h6>Trabajo actual</h6>

              {/* <div className=''> */}
                <div className="form-check">
                  <input  className="form-check-input" type="checkbox"
                    id="flexCheckDefault"
                    onChange={ e => {
                      setFormData({...formData, current: !current})
                      toggleDisabled(!toDateDisabled)
                    }}
                    checked={current}  
                    value={current}
                    name="current" 
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    <small className=''> trabajo aquí actualmente</small>
                  </label>
                </div> 
              {/* </div> */}

          </div>
        </div>


        <div className="centeredColumn">
          <textarea
            id="description"
            onChange={(e)=>onChange(e)}
            name="description"
            value={description}
            cols="30"
            rows="5"
            placeholder="Descripción del puesto"
          ></textarea>
          
          <small className="form-text text-center">
            cuéntanos algo acerca del puesto que ocupaste
          </small>
        </div>
        
        <EnviarVolver/>
      </form>
    </>
    )
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
};

export default connect(null,{ addExperience })(AddExperience);
