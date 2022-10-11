import { useState } from 'react';
//import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile'
import PropTypes from 'prop-types';
import EnviarVolver from '../layout/EnviarVolver';


const AddEducation = ({ addEducation, history }) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const { 
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description } = formData

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

  return (
    <>
      <div className='centeredColumn'>
        <h1 className="large text-primary">
        Agregar Educación
        </h1>

        <p className="lead">
            <i className="fas fa-code-branch"></i> agrega información acerca de tu nivel de estudios
        </p>

        <small>* = el campo es requerido</small>
      </div>

      <form className="form w-75" onSubmit={ e => {
        e.preventDefault()
        addEducation(formData, history)
      }}>

        <div className="centeredColumn">
          <input type="text"
          onChange={(e)=>onChange(e)} 
          placeholder="* nombre de la institución" 
          name="school"
          value={school} 
          required />
          
          <small className="form-text text-center">nombre de la institución de la cual egresaste </small>
        
        </div>
        

        <div className="centeredColumn">
          
          <input type="text" 
          onChange={(e)=>onChange(e)}
          placeholder="* grado" 
          name="degree"
          value={degree} 
          required />

          <small className="form-text text-center">
            que grado obtuviste 
          </small>
        </div>

        <div className="centeredColumn">
          <input type="text" 
          onChange={(e)=>onChange(e)}      
          placeholder="campo de estudio" 
          name="fieldofstudy" 
          value={fieldofstudy}
          />

          <small className="form-text text-center">
            campo del conocimiento que abarca el título  
          </small>
        
        </div>

       
        <div className='row border border-5 mb-3 '>
          <div className="col-md-4 mt-1 centeredColumn">
            <h6>Fecha Desde</h6>
            <input type="date"
            className='text-center'  
            onChange={(e)=>onChange(e)}
            value={from}
            name="from" 
            style={{height:"25px", fontSize:"15px", paddingTop: "2px", width: "75%" }}
            />
          </div>

          <div className="col-md-4 mt-1 centeredColumn">
            <h6>Fecha Hasta</h6>
            <input type="date"
            className='text-center' 
            onChange={(e)=>onChange(e)}
            name="to" 
            value={to}
            disabled={toDateDisabled ? true : false}
            style={{height:"25px", fontSize:"15px", paddingTop: "2px", width: "75%" }}
            />
          </div>

          <div className="col-md-4 mt-2 centeredColumn">
          
            <h6>Cursando Actualmente</h6>

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
                    style={{height:"25px", fontSize:"10px", paddingTop: "2px"}} 
                  />
                    <small className=''> asistiendo</small>
                  {/* <label className="form-check-label" htmlFor="flexCheckDefault">
                  </label> */}
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
            cols="30"rows="5"
            placeholder="Descripción"
          ></textarea>
          
          <small className="form-text text-center">
            cuéntanos algo acerca de tu experiencia durante el aprendizaje
          </small>
        </div>
        
        <EnviarVolver/>
      </form>

    </>
    )
};

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
};

export default connect(null,{ addEducation })(AddEducation);
