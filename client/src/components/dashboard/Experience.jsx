import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import Moment from 'react-moment'

const Experience = ({ experience }) => {

    const experiencies = experience.map(exp => {

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
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <div className="d-flex justify-content-between w-75">
                        <p>{fechaFromConv}</p>
                        
                        <i className="fa-solid fa-angles-right"></i>

                        <p>{fechaToConv}</p>
                    </div>
                </td>
                <td>
                    <button className='btn btn-danger'> Borrar </button>
                </td>
            </tr>
        )
    })

  return (
    <>
        <h2 className='my-2'>Experiencia</h2>
        <table className='table'>
            <thead>
                <tr>
                    <th scope="col">Compañía</th>
                    <th className='hide-sm' scope="col">Título</th>
                    <th className='hide-sm' scope="col">Años</th>
                    <th scope="col">
                        <i className="fa-solid fa-gear ml-4"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                {experiencies}
            </tbody>  
        </table>
    </>
  )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
}

export default Experience