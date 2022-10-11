import React from 'react'
import PropTypes from 'prop-types'

const ProfileExperience = ({
  experience: {
    company, title,
    location, current, 
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
        <h3>{company}</h3>
        <p>
          {fechaFromConv}{' '}
         - 
          {!to ? ' actual ' : `  ${fechaToConv}`}
        </p>
        <p>
          <strong>puesto: </strong> {title}
        </p>
        <p>
          <strong>descripción: </strong> {description}
        </p>
    </div>
  )
}

ProfileExperience.propTypes = {
  experience : PropTypes.object.isRequired,
}

export default ProfileExperience