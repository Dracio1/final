import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteExperience, deleteEducation } from '../../actions/profile'

const Experiences = ({experience, type, deleteExperience, deleteEducation }) => {

    const experiencias = experience.map(exp => {

        const fechaFrom = new Date(exp.from)
        const fechaFromConv = fechaFrom.toLocaleDateString() 
        let fechaTo, fechaToConv  

        if(exp.to){
            fechaTo = new Date(exp.to)
            fechaToConv = fechaTo.toLocaleDateString()
        }else{
            fechaToConv = ' actual '
        }

        return (
            <tr key={exp._id} className="">
                <td>{exp.company || exp.school}</td>
                <td>{exp.title || exp.degree}</td>
                <td className='hide'>
                    <div className="d-flex justify-content-between w-75">
                        <p>{fechaFromConv}</p>
                        
                        <i className="fa-solid fa-angles-right"></i>

                        <p>{fechaToConv}</p>
                    </div>
                </td>
                <td>
                    <button 
                        onClick={() => handleDelete(exp._id, type)}
                        className='btn btn-danger'> 
                        Borrar 
                    </button>
                </td>
            </tr>
        )
    })

    const handleDelete =  (id, type) => {
       /*  type === 'experience' && deleteExperience(id)
        type === 'education' && deleteEducation(id) */
        if(type === 'experience'){deleteExperience(id)}
        if(type === 'education'){deleteEducation(id)}
    } 

  return (
    <>
      <h2 className='my-2'> 
        {type === 'experience' ? 'empleos' : null } 
        {type === 'education' ? 'estudios' : null } 
      </h2>
      <table className='table table-hover'>
          <thead>
              <tr>
                  <th className='' style={{width:"30%"}}> 
                      {type === 'experience' ? 'experiencia laboral' : null }
                      {type === 'education' ? 'experiencia educativa' : null }
                  </th>
                  <th className='' style={{width:"30%"}} >
                      { type === 'experience' ? 'puesto' : null}
                      { type === 'education' ? 'titulo' : null}
                  </th>
                  <th className='hide' style={{width:"30%"}} >
                      duración
                  </th>
                  <th className='' style={{width:"10%"}}>
                      <i className="fa-solid fa-gear ml-4"></i>
                  </th>
              </tr>
          </thead>
          <tbody>
              {experiencias}
          </tbody> 
      </table>
    </>
  )
}

Experiences.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience, deleteEducation})(Experiences)