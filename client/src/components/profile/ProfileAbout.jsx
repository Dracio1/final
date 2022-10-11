import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile: {
    bio,
    skills,
    user: {name}
}}) => {
    
   return (
    <div className="profile-about bg-light p-2">
        
        {
            bio && 
                <>
                    <h2 className="text-secondary"> Biografía de {name}</h2>
                    <p>
                        {bio}    
                    </p>
                    <div className="line"></div>
                </> 
        }
    
        <h4 className="text-secondary">habilidades</h4>
        <div className="skills">

        {
           skills && skills.map((item,index) => (
            <div key={index} className="p-1">
                <i className="fas fa-check"></i> {item}
            </div>
           ))
        }
        
        </div>
    </div>
  )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileAbout