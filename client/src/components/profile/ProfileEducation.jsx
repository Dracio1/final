import React from 'react'
import PropTypes from 'prop-types'

const ProfileEducation = ({
  education: {
    school, degree, fieldofstudy , current, 
    to, from, description  
  }
}) => {

  const fechaFrom = new Date(from)
  const fechaFromConv = fechaFrom.toLocaleDateString()

  let fechaTo, fechaToConv

  if(to){
    fechaTo = new Date(to)
    fechaToConv = fechaTo.toLocaleDateString()
  }else{
    fechaToConv = ' actual '
  }

  return (
    <div>
        <h3>{school}</h3>
        <p>
          {fechaFromConv}{' '}
         - 
          {!to ? ' actual ' : `  ${fechaToConv}`}
        </p>
        <p>
          <strong>grado: </strong> {degree}
        </p>
        <p>
          <strong>campo: </strong> {fieldofstudy}
        </p>
        <p>
          <strong>descripción: </strong> {description}
        </p>
    </div>
  )
}

ProfileEducation.propTypes = {
  education : PropTypes.object.isRequired,
}

export default ProfileEducation