import PropTypes from 'prop-types'
//import Moment from "react-moment";
import { connect } from 'react-redux'

//rafcp

const Education = ({ education }) => {

  const educations = education.map(edu => {

    const fechaFrom = new Date(edu.from)
    const fechaFromConv = fechaFrom.toLocaleDateString() 
    let fechaTo, fechaToConv  

    if(edu.to){
        fechaTo = new Date(edu.to)
        fechaToConv = fechaTo.toLocaleDateString()
    }else{
        fechaToConv = ' actual '
    }

    return (
        <tr key={edu._id} className="">
            <td>{edu.school}</td>
            <td>{edu.degree}</td>            
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
      <h2 className=''> Educación </h2>
      <table className='table'>
          <thead>
              <tr>
                  <th>Institución</th>
                  <th className='hide-sm' scope="col">Grado</th>
                  <th className='hide-sm' scope="col">Años</th>
                  <th scope="col">
                      <i className="fa-solid fa-gear ml-4"></i>
                  </th>
              </tr>
          </thead>
          <tbody>
              {educations}
          </tbody> 
      </table>
    </>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
}

export default Education